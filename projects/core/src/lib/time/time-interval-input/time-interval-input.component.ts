import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef} from '@angular/core';
import {ProjectService} from '../../project/project.service';
import {Subscription} from 'rxjs';
import {Time, TimeStepDuration} from '../time.model';
import moment, {Moment} from 'moment';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    UntypedFormBuilder,
    UntypedFormGroup,
    ValidationErrors,
    Validator,
    Validators,
} from '@angular/forms';
import {Config} from '../../config.service';

const startBeforeEndValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof UntypedFormGroup)) {
        return null;
    }

    const start = control.controls.start.value as Moment;
    const end = control.controls.end.value as Moment;
    const timeAsPoint = control.controls.timeAsPoint.value as boolean;

    if (start && end && (timeAsPoint || start.isSameOrBefore(end))) {
        return null;
    } else {
        return {valid: false};
    }
};

export interface TimeIntervalForm {
    start: FormControl<Moment>;
    timeAsPoint: FormControl<boolean>;
    end: FormControl<Moment>;
}

export interface TimeInterval {
    start: Moment;
    timeAsPoint: boolean;
    end: Moment;
}

@Component({
    selector: 'geoengine-time-interval-input',
    templateUrl: './time-interval-input.component.html',
    styleUrls: ['./time-interval-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimeIntervalInputComponent), multi: true},
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: TimeIntervalInputComponent,
        },
    ],
})
export class TimeIntervalInputComponent implements ControlValueAccessor, Validator, AfterViewInit {
    onTouched?: () => void;
    onChange?: (_: Moment) => void = undefined;

    form: FormGroup<TimeIntervalForm>;

    onChangeSubs: Subscription[] = [];

    constructor(
        private projectService: ProjectService,
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: UntypedFormBuilder,
        public config: Config,
    ) {
        // initialize with the current time to have a defined value
        const time = new Time(moment.utc(), moment.utc());

        this.form = this.formBuilder.group({
            start: [time.start, [Validators.required]],
            timeAsPoint: [this.config.TIME.ALLOW_RANGES, Validators.required],
            end: [time.end, [Validators.required]],
        });
        this.form.setValidators(startBeforeEndValidator);
    }

    timeStepComparator(option: TimeStepDuration, selectedElement: TimeStepDuration): boolean {
        const equalAmount = option.durationAmount === selectedElement.durationAmount;
        const equalUnit = option.durationUnit === selectedElement.durationUnit;
        return equalAmount && equalUnit;
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.changeDetectorRef.markForCheck());
    }

    // Set touched on blur
    onBlur(): void {
        if (this.onTouched) {
            this.onTouched();
        }
    }

    writeValue(value: TimeInterval): void {
        if (value) {
            this.form.setValue(value);
        }
    }

    registerOnChange(
        onChange: (
            _: Partial<{
                start: moment.Moment;
                timeAsPoint: boolean;
                end: moment.Moment;
            }>,
        ) => void,
    ): void {
        const sub = this.form.valueChanges.subscribe((a) => onChange(a));
        this.onChangeSubs.push(sub);
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return startBeforeEndValidator(control);
    }
}

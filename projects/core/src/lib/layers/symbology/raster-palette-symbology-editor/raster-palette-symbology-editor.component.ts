import {Component, Input, ChangeDetectionStrategy, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {RasterLayer} from '../../layer.model';
import {MapService} from '../../../map/map.service';
import {ProjectService} from '../../../project/project.service';
import {Config} from '../../../config.service';
import {BackendService} from '../../../backend/backend.service';
import {PaletteColorizer} from '../../../colors/colorizer.model';
import {ColorAttributeInput} from '../../../colors/color-attribute-input/color-attribute-input.component';
import {UserService} from '../../../users/user.service';
import {Color} from '../../../colors/color';
import {ColorMapSelectorComponent} from '../../../colors/color-map-selector/color-map-selector.component';
import {LayoutService} from '../../../layout.service';
import {ColorTableEditorComponent} from '../../../colors/color-table-editor/color-table-editor.component';
import {ColorBreakpoint} from '../../../colors/color-breakpoint.model';

/**
 * An editor for generating raster symbologies.
 */
@Component({
    selector: 'geoengine-raster-palette-symbology-editor',
    templateUrl: 'raster-palette-symbology-editor.component.html',
    styleUrls: ['raster-palette-symbology-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RasterPaletteSymbologyEditorComponent implements OnInit {
    @ViewChild(ColorMapSelectorComponent)
    colorMapSelector!: ColorMapSelectorComponent;

    @ViewChild(ColorTableEditorComponent)
    colorPaletteEditor!: ColorTableEditorComponent;

    @Input() layer!: RasterLayer;

    @Input() colorizer!: PaletteColorizer;
    @Output() colorizerChange = new EventEmitter<PaletteColorizer>();

    // The min value used for color table generation
    layerMinValue: number | undefined = undefined;
    // The max value used for color table generation
    layerMaxValue: number | undefined = undefined;

    protected defaultColor?: ColorAttributeInput;
    protected noDataColor?: ColorAttributeInput;

    constructor(
        protected readonly projectService: ProjectService,
        protected readonly backend: BackendService,
        protected readonly layoutService: LayoutService,
        protected readonly userService: UserService,
        protected readonly mapService: MapService,
        protected readonly config: Config,
    ) {}

    ngOnInit(): void {
        this.updateNodataAndDefaultColor();

        this.updateLayerMinMaxFromColorizer();
    }

    get colorTable(): Array<ColorBreakpoint> {
        return this.colorizer.getBreakpoints();
    }

    updateColorTable(colorTable: Array<ColorBreakpoint>): void {
        const colors = new Map<number, Color>();
        for (const breakpoint of colorTable) {
            colors.set(breakpoint.value, breakpoint.color);
        }

        if (this.colorMapEquals(this.colorizer.colors, colors)) {
            return;
        }

        this.colorizer = this.colorizer.cloneWith({colors});
        this.colorizerChange.emit(this.colorizer);
    }

    /**
     * Set the max value to use for color table generation
     */
    updateLayerMinValue(min: number): void {
        if (this.layerMinValue !== min) {
            this.layerMinValue = min;
        }
    }

    /**
     * Set the max value to use for color table generation
     */
    updateLayerMaxValue(max: number): void {
        if (this.layerMaxValue !== max) {
            this.layerMaxValue = max;
        }
    }

    updateBounds(histogramSignal: {binStart: [number, number]}): void {
        if (!histogramSignal || !histogramSignal.binStart || histogramSignal.binStart.length !== 2) {
            return;
        }

        const [min, max] = histogramSignal.binStart;

        this.updateLayerMinValue(min);
        this.updateLayerMaxValue(max);
    }

    getDefaultColor(): ColorAttributeInput {
        if (!this.defaultColor) {
            throw new Error('uninitialized defaultColor');
        }

        return this.defaultColor;
    }

    updateDefaultColor(defaultColorInput: ColorAttributeInput): void {
        const defaultColor = defaultColorInput.value;

        this.colorizer = this.colorizer.cloneWith({defaultColor: defaultColor});

        this.colorizerChange.emit(this.colorizer);
    }

    getNoDataColor(): ColorAttributeInput {
        if (!this.noDataColor) {
            throw new Error('uninitialized noDataColor');
        }

        return this.noDataColor;
    }

    /**
     * Set the no data color
     */
    updateNoDataColor(noDataColorInput: ColorAttributeInput): void {
        const noDataColor = noDataColorInput.value;

        this.colorizer = this.colorizer.cloneWith({noDataColor});

        this.colorizerChange.emit(this.colorizer);
    }

    createColorMap(): Map<number, Color> {
        const colorMap = new Map<number, Color>();
        const colorizer: PaletteColorizer = this.colorizer as PaletteColorizer;
        colorizer.getBreakpoints().forEach((bp, index) => {
            colorMap.set(bp.value, colorizer.getColorAtIndex(index));
        });
        return colorMap;
    }

    /**
     * Sets the layer min/max values from the colorizer.
     */
    updateLayerMinMaxFromColorizer(): void {
        const breakpoints = this.colorizer.getBreakpoints();
        this.updateLayerMinValue(breakpoints[0].value);
        this.updateLayerMaxValue(breakpoints[breakpoints.length - 1].value);
    }

    private updateNodataAndDefaultColor(): void {
        this.defaultColor = {
            key: 'Default Color',
            value: this.colorizer.defaultColor,
        };
        this.noDataColor = {
            key: 'No Data Color',
            value: this.colorizer.noDataColor,
        };
    }

    private colorMapEquals(a: Map<number, Color>, b: Map<number, Color>): boolean {
        if (a.size !== b.size) {
            return false;
        }

        for (const [key, aValue] of a) {
            const bValue = b.get(key);

            if (!bValue || !aValue.equals(bValue)) {
                return false;
            }
        }

        return true;
    }
}

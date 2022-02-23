import {Injectable} from '@angular/core';
import {Layer, ProjectService, RasterLayer, Time, VectorLayer, LoadingState} from 'wave-core';
import {first, map, mergeMap, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import moment from 'moment';

export interface DataRange {
    min: number;
    max: number;
}

@Injectable({
    providedIn: 'root',
})
export class DataSelectionService {
    readonly layers: Observable<Array<Layer>>;

    readonly rasterLayer = new BehaviorSubject<RasterLayer | undefined>(undefined);
    readonly speciesLayer = new BehaviorSubject<VectorLayer | undefined>(undefined);

    readonly speciesLoadingState$: Observable<'query' | 'determinate'>;

    readonly timeSteps = new BehaviorSubject<Array<Time>>([new Time(moment.utc())]);
    readonly timeFormat = new BehaviorSubject<string>('YYYY'); // TODO: make configurable

    readonly dataRange = new BehaviorSubject<DataRange>({min: 0, max: 1});

    constructor(private readonly projectService: ProjectService) {
        this.layers = combineLatest([this.rasterLayer, this.speciesLayer]).pipe(
            map(([rasterLayer, polygonLayer]) => {
                const layers = [];
                if (rasterLayer) {
                    layers.push(rasterLayer);
                }
                if (polygonLayer) {
                    layers.push(polygonLayer);
                }
                return layers;
            }),
        );

        this.speciesLoadingState$ = this.speciesLayer.pipe(
            mergeMap((layer) => {
                if (layer) {
                    return this.projectService.getLayerStatusStream(layer);
                } else {
                    return of(LoadingState.OK);
                }
            }),
            map((status) => (status === LoadingState.LOADING ? 'query' : 'determinate')),
        );
    }

    setTimeSteps(timeSteps: Array<Time>): void {
        if (!timeSteps.length) {
            throw Error('`timeSteps` must not be empty');
        }

        this.timeSteps.next(timeSteps);
        this.projectService.setTime(timeSteps[0]);
    }

    setRasterLayer(layer: RasterLayer, dataRange: DataRange): Observable<void> {
        return this.rasterLayer.pipe(
            first(),
            mergeMap((currentLayer) => {
                if (currentLayer) {
                    return this.projectService.removeLayer(currentLayer);
                } else {
                    return of(undefined);
                }
            }),
            tap(() => this.rasterLayer.next(undefined)),
            mergeMap(() => this.projectService.addLayer(layer)),
            tap(() => {
                this.rasterLayer.next(layer);
                this.dataRange.next(dataRange);
            }),
        );
    }

    setSpeciesLayer(layer: VectorLayer): Observable<void> {
        return this.speciesLayer.pipe(
            first(),
            mergeMap((currentLayer) => {
                if (currentLayer) {
                    return this.projectService.removeLayer(currentLayer);
                } else {
                    return of(undefined);
                }
            }),
            tap(() => this.speciesLayer.next(undefined)),
            mergeMap(() => this.projectService.addLayer(layer)),
            tap(() => this.speciesLayer.next(layer)),
        );
    }
}
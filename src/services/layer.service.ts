import {Injectable} from "angular2/core";
import {BehaviorSubject} from "rxjs/Rx";

import {Layer} from '../layer.model';

import {Operator, ResultType} from '../operator.model';

@Injectable()
export class LayerService {
    private layers$: BehaviorSubject<Array<Layer>> = new BehaviorSubject([]);
    private selectedLayer$: BehaviorSubject<Layer> = new BehaviorSubject(undefined);
    
    constructor() {
        this.layers$.next([
            new Layer(new Operator(
                'source',
                ResultType.RASTER,
                new Map<string, string | number>().set('channel', 0)
                                                  .set('sourcename', 'srtm'),
                'EPSG:4326',
                'SRTM'
            )),
            new Layer(new Operator(
                'gfbiopointsource',
                ResultType.POINTS,
                new Map<string, string | number>()
                    .set('datasource', 'GBIF')
                    .set('query', '{"globalAttributes":{"speciesName":"Puma concolor"},"localAttributes":{}}'),
                'EPSG:4326',
                'Puma Concolor'
            ))
        ]);
    }
    
    getLayers() {
        return this.layers$;
    }
    
    getLayersOnce() {
        return this.layers$.getValue();
    }
    
    setLayers(layers: Array<Layer>) {
        this.layers$.next(layers);
    }
    
    addLayer(layer: Layer) {
       let layers = this.layers$.getValue();
       layers.push(layer);
       this.setLayers(layers);
    }
    
    setSelectedLayer(layer: Layer) {
        this.selectedLayer$.next(layer);
    }
    
    getSelectedLayer() {
        return this.selectedLayer$.asObservable();
    }
    
    getSelectedLayerOnce() {
        return this.selectedLayer$.getValue();
    }
}
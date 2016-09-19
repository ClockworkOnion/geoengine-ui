import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import ol from 'openlayers';

export interface ViewportSize {
    extent: [number, number, number, number]  | ol.Extent;
    resolution: number;
    maxExtent?: [number, number, number, number];
}

@Injectable()
export class MapService {
    private viewportSize$ = new BehaviorSubject<ViewportSize>({
        extent: [0, 0, 0, 0],
        resolution: 1,
    });

    constructor() {
        //this.viewportSize$.subscribe(
        //   v => console.log('viewport', v.extent.join(','), v.resolution)
        //);
    }

    setViewportSize(newViewportSize: ViewportSize) {
        if (newViewportSize.extent.length !== 4 || newViewportSize.resolution <= 0) {
            throw 'Corrupt Viewport Size';
        }

        const oldViewportSize = this.viewportSize$.value;
        if (!this.viewportSizeEquals(oldViewportSize, newViewportSize)) {

            const w = ol.extent.getWidth(newViewportSize.extent);
            const h = ol.extent.getHeight(newViewportSize.extent);
            let newExtent = ol.extent.buffer(newViewportSize.extent, Math.max(w, h) * 0.5);
            //console.log('newExtent', w, h, newViewportSize.extent, newExtent);

            if ( newViewportSize.maxExtent ) {
                newExtent = ol.extent.getIntersection(newExtent, newViewportSize.maxExtent);
            }
            newViewportSize.extent = newExtent;

            this.viewportSize$.next(newViewportSize);
        }
    }

    getViewportSize(): ViewportSize {
        return this.viewportSize$.value;
    }

    getViewportSizeStream(): Observable<ViewportSize> {
        return this.viewportSize$;
    }

    private viewportSizeEquals(v1: ViewportSize, v2: ViewportSize): boolean {
        if (v1.resolution !== v2.resolution) {
            return false;
        }
/*
        for (let i = 0; i < 4; i++) {
            if (v1.extent[i] !== v2.extent[i]) {
                return false;
            }
        }
*/
        return ol.extent.containsExtent(v1.extent, v2.extent);

        // return true;
    }
}

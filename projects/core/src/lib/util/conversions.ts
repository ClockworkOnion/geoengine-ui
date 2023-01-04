import {BBoxDict} from '../backend/backend.model';
import {utc} from 'moment';
import {Feature as OlFeature} from 'ol';
import OlFormatGeoJson from 'ol/format/GeoJSON';
import OlGeometry from 'ol/geom/Geometry';
import {Extent as OlExtent} from 'ol/extent';
import {Observable, ReplaySubject} from 'rxjs';

/**
 * Converts an `OlExtent` to an extent as a tuple of four numbers.
 * Throws an error if something went wrong.
 */
export const olExtentToTuple = (extent: OlExtent): [number, number, number, number] => {
    if (extent.length !== 4) {
        throw Error('OlExtent must be of size 4');
    }
    return [extent[0], extent[1], extent[2], extent[3]];
};

export const extentToBboxDict = ([minx, miny, maxx, maxy]: [number, number, number, number]): BBoxDict => ({
    lowerLeftCoordinate: {
        x: minx,
        y: miny,
    },
    upperRightCoordinate: {
        x: maxx,
        y: maxy,
    },
});

export const bboxDictToExtent = (extent: BBoxDict): [number, number, number, number] => {
    const minx = extent.lowerLeftCoordinate.x;
    const miny = extent.lowerLeftCoordinate.y;
    const maxx = extent.upperRightCoordinate.x;
    const maxy = extent.upperRightCoordinate.y;

    return [minx, miny, maxx, maxy];
};

/**
 * Convert a unix timestamp in ms to an ISO timestamp string.
 */
export const unixTimestampToIsoString = (unixTimestamp: number): string => utc(unixTimestamp).toISOString();

export function hashCode(str: string): number {
    // java String#hashCode
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash); // eslint-disable-line no-bitwise
    }
    return hash;
}

// TODO: use a faster hash function
export function featureToHash(feature: OlFeature<OlGeometry>): number {
    const sortObjKeys = (obj: {[_: string]: any}): any => {
        Object.keys(obj)
            .sort()
            .reduce((x, key) => {
                x[key] = obj[key];
                return x;
            }, {} as {[_: string]: any});
    };

    const jsonObj: {[_: string]: any} = new OlFormatGeoJson().writeFeatureObject(feature);
    if (jsonObj['properties']) {
        jsonObj['properties'] = sortObjKeys(jsonObj['properties']);
    }
    const json = JSON.stringify(jsonObj);

    return hashCode(json);
}

/**
 * Subscribes to the observable and consumes it completely.
 * Returns a new observable to listen to the values.
 */
export function subscribeAndProvide<T>(observable: Observable<T>): Observable<T> {
    const subject = new ReplaySubject<T>();

    observable.subscribe({
        next: (value) => subject.next(value),
        error: (error) => subject.error(error),
        complete: () => subject.complete(),
    });

    return subject.asObservable();
}

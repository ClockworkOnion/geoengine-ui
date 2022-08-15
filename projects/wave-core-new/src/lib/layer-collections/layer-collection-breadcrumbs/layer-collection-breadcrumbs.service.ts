import {Component, Injectable} from '@angular/core';
import {LayerCollectionDict, LayerCollectionItemDict} from '../../backend/backend.model';
import {LayerCollectionNavigationComponent} from '../layer-collection-navigation/layer-collection-navigation.component';

@Injectable({
    providedIn: 'root',
})
export class LayerCollectionBreadcrumbsService {
    constructor() {}

    private history: Array<LayerCollectionItemDict> = [];
    private navigation: LayerCollectionNavigationComponent | undefined;

    addToHistory(id: LayerCollectionItemDict): void {
        this.history.push(id);
    }

    getHistory(): Array<LayerCollectionItemDict> {
        return this.history;
    }

    registerNavigationComponent(nav: LayerCollectionNavigationComponent): void {
        this.navigation = nav;
    }

    eraseHistoryByLength(count: number) {
        this.history = this.history.slice(0, this.history.length - count);
    }

    /**
     * Resets the travel history to the first occurence of the specified LayerCollectionItemDict
     * @param id The collection to revert to
     */
    travelBackwards(id: LayerCollectionItemDict): Array<LayerCollectionItemDict> {
        let foundPosition = -1;
        this.history.forEach((x, index) => {
            if (x === id) foundPosition = index;
        });

        // Reset navigation keys back/forward
        this.navigation?.eraseHistory(foundPosition);

        this.history = this.history.slice(0, foundPosition);
        return this.history;
    }
}

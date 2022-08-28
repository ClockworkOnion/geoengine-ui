import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {Component, ChangeDetectionStrategy, Injector, Provider} from '@angular/core';
import {LayerCollectionItemDict, ProviderLayerCollectionIdDict} from '../../backend/backend.model';
import {CONTEXT_TOKEN, LayerCollectionListComponent} from '../layer-collection-list/layer-collection-list.component';

@Component({
    selector: 'wave-layer-collection-navigation',
    templateUrl: './layer-collection-navigation.component.html',
    styleUrls: ['./layer-collection-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerCollectionNavigationComponent {
    collections: Array<LayerCollectionItemDict> = [];
    allTrails: Array<Array<LayerCollectionItemDict>> = [];
    displayedTrail: Array<LayerCollectionItemDict> = [];

    selectedCollection = -1;

    selectedPortal!: Portal<any>;

    constructor() {
        this.setPortal(undefined);
    }

    selectCollection(id: LayerCollectionItemDict): void {
        this.collections = this.collections.splice(0, this.displayedTrail.length);
        this.collections.push(id);
        this.selectedCollection += 1;

        // Create a new trail, append it to the collection and display it
        let clone = this.collections.map((x) => Object.assign({}, x)); // ???
        this.allTrails = this.allTrails.slice(0, this.selectedCollection);
        this.allTrails.push(clone);
        this.displayedTrail = this.allTrails[this.selectedCollection];

        this.setPortal(id);
    }

    back(): void {
        if (this.selectedCollection > 0) {
            this.selectedCollection -= 1;
            this.updateLayerView();
        }
        if (this.selectedCollection === 0) {
            this.displayedTrail = [];
            this.showRoot();
        }
    }

    forward(): void {
        if (this.selectedCollection < this.allTrails.length - 1) {
            this.selectedCollection += 1;
            this.updateLayerView();
        }
    }

    updateLayerView() {
        const currentTrail = this.allTrails[this.selectedCollection];
        this.displayedTrail = currentTrail;
        const lastId = currentTrail[currentTrail.length - 1];
        this.setPortal(lastId);
    }

    onBreadCrumbClick(index: number) {
        // Creates and appends a new crumbtrail, then moves forward to it
        if (index === this.displayedTrail.length - 1) return;
        const newTrail = this.displayedTrail.map((x) => Object.assign({}, x)).slice(0, index + 1);
        this.allTrails.push(newTrail);
        this.selectedCollection = this.allTrails.length - 2;
        this.forward();
    }

    navigateToRoot(): void {
        const newTrail: Array<LayerCollectionItemDict> = [];
        this.allTrails.push(newTrail);
        this.selectedCollection = this.allTrails.length - 2;
        this.forward();
    }

    showRoot(): void {
        this.selectedPortal = new ComponentPortal(LayerCollectionListComponent, null, this.createInjector());
    }

    private setPortal(id?: LayerCollectionItemDict): void {
        const providerLayer = id?.id as ProviderLayerCollectionIdDict;
        this.selectedPortal = new ComponentPortal(LayerCollectionListComponent, null, this.createInjector(providerLayer));
    }

    private createInjector(id?: ProviderLayerCollectionIdDict): Injector {
        return Injector.create({
            providers: [
                {
                    provide: CONTEXT_TOKEN,
                    useValue: {id, selectListener: (selection: LayerCollectionItemDict) => this.selectCollection(selection)},
                },
            ],
        });
    }
}

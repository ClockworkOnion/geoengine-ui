import {ComponentPortal, Portal} from '@angular/cdk/portal';
import {Component, ChangeDetectionStrategy, Injector} from '@angular/core';
import {LayerCollectionDict, LayerCollectionItemDict} from '../../backend/backend.model';
import {LayerCollectionBreadcrumbsService} from '../layer-collection-breadcrumbs/layer-collection-breadcrumbs.service';
import {CONTEXT_TOKEN, LayerCollectionListComponent} from '../layer-collection-list/layer-collection-list.component';

@Component({
    selector: 'wave-layer-collection-navigation',
    templateUrl: './layer-collection-navigation.component.html',
    styleUrls: ['./layer-collection-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerCollectionNavigationComponent {
    collections: Array<LayerCollectionItemDict | undefined> = [undefined];

    selectedCollection = 0;

    selectedPortal!: Portal<any>;

    constructor(private readonly breadCrumbService: LayerCollectionBreadcrumbsService) {
        this.setPortal(undefined);
        this.breadCrumbService.registerNavigationComponent(this);
    }

    selectCollection(id: LayerCollectionItemDict): void {
        this.collections = this.collections.splice(0, this.selectedCollection + 1);
        this.collections.push(id);
        this.selectedCollection += 1;

        this.setPortal(id);
        // console.log(id as LayerCollectionDict);
        // LayerCollectionItemDict should have name / description property as per interface, but looks like ProviderLayerCollectionIdDict in console!?
        // except in layer=collection-list.components.ts it works so that must be a different object even though it's the same type
    }

    eraseHistory(length: number) {
        this.collections = this.collections.slice(0, length);
        this.selectedCollection = length - 1;
    }

    back(): void {
        if (this.selectedCollection > 0) {
            this.selectedCollection -= 1;
            const id = this.collections[this.selectedCollection];

            this.breadCrumbService.eraseHistoryByLength(1);

            this.setPortal(id);
        }
    }

    forward(): void {
        if (this.selectedCollection < this.collections.length - 1) {
            this.selectedCollection += 1;
            const id = this.collections[this.selectedCollection];

            if (id !== undefined) this.breadCrumbService.addToHistory(id);

            this.setPortal(id);
        }
    }

    private setPortal(id?: LayerCollectionItemDict): void {
        this.selectedPortal = new ComponentPortal(LayerCollectionListComponent, null, this.createInjector(id));
    }

    private createInjector(id?: LayerCollectionItemDict): Injector {
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

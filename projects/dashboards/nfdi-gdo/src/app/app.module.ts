import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {
    Config,
    LayoutService,
    MapService,
    NotificationService,
    ProjectService,
    RandomColorService,
    SidenavRef,
    SpatialReferenceService,
    UserService,
    CoreModule,
} from '@geoengine/core';
import {AppConfig} from './app-config.service';
import {PortalModule} from '@angular/cdk/portal';
import {LegendComponent} from './legend/legend.component';
import {AttributionsComponent} from './attributions/attributions.component';
import {SpeciesSelectorComponent} from './species-selector/species-selector.component';
import {DataSelectionService} from './data-selection.service';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [AppComponent, AttributionsComponent, LegendComponent, SpeciesSelectorComponent, MainComponent, LoginComponent],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        FormsModule,
        HttpClientModule,
        NgxMatSelectSearchModule,
        PortalModule,
    ],
    providers: [
        {provide: Config, useClass: AppConfig},
        {
            provide: APP_INITIALIZER,
            useFactory: (config: AppConfig) => (): Promise<void> => config.load(),
            deps: [Config],
            multi: true,
        },
        LayoutService,
        MapService,
        NotificationService,
        ProjectService,
        RandomColorService,
        SidenavRef,
        SpatialReferenceService,
        DataSelectionService,
        UserService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

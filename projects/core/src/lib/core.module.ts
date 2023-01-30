import {NgModule} from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule, MAT_CARD_CONFIG} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ColorPickerModule} from 'ngx-color-picker';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DialogHeaderComponent} from './dialogs/dialog-header/dialog-header.component';
import {DialogSectionHeadingComponent} from './dialogs/dialog-section-heading/dialog-section-heading.component';
import {VatLogoComponent} from './logo.component';
import {LoginComponent} from './users/login/login.component';
import {BreakpointToCssStringPipe} from './util/pipes/breakpoint-to-css-string.pipe';
import {SafeHtmlPipe} from './util/pipes/safe-html.pipe';
import {TrimPipe} from './util/pipes/trim.pipe';
import {CssStringToRgbaPipe} from './util/pipes/css-string-to-rgba.pipe';
import {HighlightPipe} from './util/pipes/highlight.pipe';
import {RgbaArrayCssGradientPipe, ColorBreakpointsCssGradientPipe, ColorizerCssGradientPipe} from './util/pipes/color-gradients.pipe';
import {RgbaToCssStringPipe} from './util/pipes/rgba-to-css-string.pipe';
import {CommonModule} from '@angular/common';
import {DialogHelpComponent} from './dialogs/dialog-help/dialog-help.component';
import {SidenavHeaderComponent} from './sidenav/sidenav-header/sidenav-header.component';
import {SidenavContainerComponent} from './sidenav/sidenav-container/sidenav-container.component';
import {NavigationComponent} from './sidenav/navigation/navigation.component';
import {SidenavSearchComponent, SidenavSearchRightDirective} from './sidenav/sidenav-search/sidenav-search.component';
import {ZoomHandlesComponent} from './map/zoom-handles/zoom-handles.component';
import {MapContainerComponent} from './map/map-container/map-container.component';
import {OlRasterLayerComponent, OlVectorLayerComponent} from './map/map-layer.component';
import {RenameLayerComponent} from './layers/rename-layer/rename-layer.component';
import {VectorLegendComponent} from './layers/legend/legend-vector/vector-legend.component';
import {LayerListComponent} from './layers/layer-list/layer-list.component';
import {LayerListElementComponent} from './layers/layer-list/layer-list-element/layer-list-element.component';
import {PointIconComponent} from './layers/layer-icons/point-icon/point-icon.component';
import {LineIconComponent} from './layers/layer-icons/line-icon/line-icon.component';
import {RasterIconComponent} from './layers/layer-icons/raster-icon/raster-icon.component';
import {PolygonIconComponent} from './layers/layer-icons/polygon-icon/polygon-icon.component';
import {
    CastMeasurementToClassificationPipe,
    CastMeasurementToContinuousPipe,
    RasterLegendComponent,
} from './layers/legend/legend-raster/raster-legend.component';
import {SafeStylePipe} from './util/pipes/safe-style.pipe';
import {SmallTimeInteractionComponent} from './time/small-time-interaction/small-time-interaction.component';
import {TimeConfigComponent} from './time/time-config/time-config.component';
import {TimeInputComponent} from './time/time-input/time-input.component';
import {WorkspaceSettingsComponent} from './project/workspace-settings/workspace-settings.component';
import {ChangeSpatialReferenceComponent} from './project/change-spatial-reference/change-spatial-reference.component';
import {IfGuestDirective} from './util/directives/if-guest.directive';
import {IfLoggedInDirective} from './util/directives/if-logged-in.directive';
import {NewProjectComponent} from './project/new-project/new-project.component';
import {LoadProjectComponent} from './project/load-project/load-project.component';
import {SaveProjectAsComponent} from './project/save-project-as/save-project-as.component';
import {MultiLayerSelectionComponent} from './operators/dialogs/helpers/multi-layer-selection/multi-layer-selection.component';
import {OperatorListComponent} from './operators/dialogs/operator-list/operator-list.component';
import {ExpressionOperatorComponent} from './operators/dialogs/expression-operator/expression-operator.component';
import {OperatorOutputNameComponent} from './operators/dialogs/helpers/operator-output-name/operator-output-name.component';
import {AddDataComponent} from './datasets/add-data/add-data.component';
import {DatasetListComponent} from './datasets/dataset-list/dataset-list.component';
import {DatasetComponent} from './datasets/dataset/dataset.component';
import {PlotListComponent} from './plots/plot-list/plot-list.component';
import {StatisticsPlotComponent} from './operators/dialogs/statistics-plot/statistics-plot.component';
import {PlotDetailViewComponent} from './plots/plot-detail-view/plot-detail-view.component';
import {PlotListEntryComponent} from './plots/plot-list-entry/plot-list-entry.component';
import {HistogramOperatorComponent} from './operators/dialogs/histogram-operator/histogram-operator.component';
import {BoxPlotOperatorComponent} from './operators/dialogs/boxplot-operator/boxplot-operator.component';
import {ScatterplotOperatorComponent} from './operators/dialogs/scatterplot-operator/scatterplot-operator.component';
import {LayerSelectionComponent} from './operators/dialogs/helpers/layer-selection/layer-selection.component';
import {VegaViewerComponent} from './plots/vega-viewer/vega-viewer.component';
import {LineageGraphComponent} from './provenance/lineage-graph/lineage-graph.component';
// eslint-disable-next-line max-len
import {MeanRasterPixelValuesOverTimeDialogComponent} from './operators/dialogs/mean-raster-pixel-values-over-time-dialog/mean-raster-pixel-values-over-time-dialog.component';
import {RasterVectorJoinComponent} from './operators/dialogs/raster-vector-join/raster-vector-join.component';
import {RasterTypeConversionComponent} from './operators/dialogs/raster-type-conversion/raster-type-conversion.component';
import {RasterScalingComponent} from './operators/dialogs/raster-scaling/raster-scaling.component';
import {PointInPolygonFilterOperatorComponent} from './operators/dialogs/point-in-polygon-filter/point-in-polygon-filter.component';
import {UploadComponent} from './datasets/upload/upload.component';
import {DataTableComponent} from './datatable/table/table.component';
import {TabsComponent} from './tabs/tabs.component';
import {PortalModule} from '@angular/cdk/portal';
import {RasterSymbologyEditorComponent} from './layers/symbology/raster-symbology-editor/raster-symbology-editor.component';
import {ColorAttributeInputComponent} from './colors/color-attribute-input/color-attribute-input.component';
import {ColorMapSelectorComponent} from './colors/color-map-selector/color-map-selector.component';
import {DrawFeaturesComponent} from './datasets/draw-features/draw-features.component';
import {ColorBreakpointInputComponent} from './colors/color-breakpoint-input/color-breakpoint-input.component';
import {AsyncNumberSanitizer, AsyncStringSanitizer, AsyncValueDefault} from './util/pipes/async-converters.pipe';
import {VectorSymbologyEditorComponent} from './layers/symbology/vector-symbology-editor/vector-symbology-editor.component';
import {ColorParamEditorComponent} from './layers/symbology/color-param-editor/color-param-editor.component';
import {NumberParamEditorComponent} from './layers/symbology/number-param-editor/number-param-editor.component';
import {FeatureAttributeOvertimeComponent} from './operators/dialogs/feature-attribute-over-time/feature-attribute-over-time.component';
import {NotificationsComponent} from './project/notifications/notifications.component';
import {TemporalRasterAggregationComponent} from './operators/dialogs/temporal-raster-aggregation/temporal-raster-aggregation.component';
import {DragAndDropComponent} from './datasets/drag-and-drop/drag-and-drop.component';
import {AddWorkflowComponent} from './datasets/add-workflow/add-workflow.component';
import {ProvenanceTableComponent} from './provenance/table/provenance-table.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {LayerListMenuComponent} from './layers/layer-list/layer-list-menu/layer-list-menu.component';
import {ModalLoginComponent} from './users/modal-login/modal-login.component';
import {CodeEditorComponent} from './util/components/code-editor.component';
import {TimeStepSelectorComponent} from './time/time-step-selector/time-step-selector.component';
import {AutocompleteSelectDirective} from './util/directives/autocomplete-select.directive';
import {TokenLoginComponent} from './users/token-login/token-login.component';
import {TimeSliderComponent} from './time/time-slider/time-slider.component';
import {FullDisplayComponent} from './datatable/table/full-display/full-display.component';
import {LayerCollectionListComponent} from './layer-collections/layer-collection-list/layer-collection-list.component';
import {LayerCollectionNavigationComponent} from './layer-collections/layer-collection-navigation/layer-collection-navigation.component';
import {ClassHistogramOperatorComponent} from './operators/dialogs/class-histogram-operator/class-histogram-operator.component';
import {ColumnRangeFilterComponent} from './operators/dialogs/column-range-filter/column-range-filter.component';
import {LayerCollectionDropdownComponent} from './layer-collections/layer-collection-dropdown/layer-collection-dropdown.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {DialogSplashCheckboxComponent} from './dialogs/dialog-splash-checkbox/dialog-splash-checkbox.component';
import {MediaviewComponent} from './datatable/mediaview/mediaview.component';
import {MediaviewDialogComponent} from './datatable/mediaview/dialog/mediaview.dialog.component';
import {MediaviewPlaylistComponent} from './datatable/mediaview/playlist/mediaview.playlist.component';
import {OidcComponent} from './users/oidc/oidc.component';
import {InterpolationComponent} from './operators/dialogs/interpolation/interpolation.component';
import {NeighborhoodAggregateComponent} from './operators/dialogs/neighborhood-aggregate/neighborhood-aggregate.component';
import {NotFoundPageComponent} from './util/components/not-found/not-found-page.component';
import {BackendStatusPageComponent} from './util/components/backend-status-page/backend-status-page.component';
import {SymbologyCreatorComponent} from './layers/symbology/symbology-creator/symbology-creator.component';
import {OperatorDialogContainerComponent} from './operators/dialogs/helpers/operator-dialog-container/operator-dialog-container.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {LayerCollectionLayerComponent} from './layer-collections/layer-collection-layer/layer-collection-layer.component';
import {TimeShiftComponent} from './operators/dialogs/time-shift/time-shift.component';
import {PieChartComponent} from './operators/dialogs/pie-chart/pie-chart.component';
import {ColorPaletteEditorComponent} from './colors/color-palette-editor/color-palette-editor.component';
import {RasterizationComponent} from './operators/dialogs/rasterization/rasterization.component';

export const MATERIAL_MODULES = [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
];

const CORE_PIPES = [
    AsyncNumberSanitizer,
    AsyncStringSanitizer,
    AsyncValueDefault,
    BreakpointToCssStringPipe,
    CastMeasurementToClassificationPipe,
    CastMeasurementToContinuousPipe,
    ColorBreakpointsCssGradientPipe,
    ColorizerCssGradientPipe,
    CssStringToRgbaPipe,
    HighlightPipe,
    RgbaArrayCssGradientPipe,
    RgbaToCssStringPipe,
    SafeHtmlPipe,
    SafeStylePipe,
    TrimPipe,
];

const CORE_COMPONENTS = [
    AddDataComponent,
    AddWorkflowComponent,
    AutocompleteSelectDirective,
    BackendStatusPageComponent,
    BoxPlotOperatorComponent,
    ChangeSpatialReferenceComponent,
    ClassHistogramOperatorComponent,
    CodeEditorComponent,
    ColorAttributeInputComponent,
    ColorBreakpointInputComponent,
    ColorMapSelectorComponent,
    ColorParamEditorComponent,
    ColumnRangeFilterComponent,
    DatasetComponent,
    DatasetListComponent,
    DataTableComponent,
    DialogHeaderComponent,
    DialogHelpComponent,
    DialogSectionHeadingComponent,
    DialogSplashCheckboxComponent,
    DragAndDropComponent,
    DrawFeaturesComponent,
    ExpressionOperatorComponent,
    FeatureAttributeOvertimeComponent,
    FullDisplayComponent,
    HistogramOperatorComponent,
    IfGuestDirective,
    IfLoggedInDirective,
    InterpolationComponent,
    LayerCollectionDropdownComponent,
    LayerCollectionListComponent,
    LayerCollectionLayerComponent,
    LayerCollectionNavigationComponent,
    LayerListComponent,
    LayerListElementComponent,
    LayerListMenuComponent,
    LayerSelectionComponent,
    LineageGraphComponent,
    LineageGraphComponent,
    LineIconComponent,
    LoadProjectComponent,
    LoginComponent,
    MapContainerComponent,
    MeanRasterPixelValuesOverTimeDialogComponent,
    MediaviewComponent,
    MediaviewDialogComponent,
    MediaviewPlaylistComponent,
    ModalLoginComponent,
    MultiLayerSelectionComponent,
    NavigationComponent,
    NeighborhoodAggregateComponent,
    NewProjectComponent,
    NotFoundPageComponent,
    NotificationsComponent,
    NumberParamEditorComponent,
    OidcComponent,
    OlRasterLayerComponent,
    OlVectorLayerComponent,
    OperatorDialogContainerComponent,
    OperatorListComponent,
    OperatorOutputNameComponent,
    PieChartComponent,
    PlotDetailViewComponent,
    PlotListComponent,
    PlotListEntryComponent,
    PointIconComponent,
    PointInPolygonFilterOperatorComponent,
    PolygonIconComponent,
    ProvenanceTableComponent,
    RasterIconComponent,
    RasterizationComponent,
    RasterLegendComponent,
    RasterLegendComponent,
    RasterScalingComponent,
    RasterSymbologyEditorComponent,
    RasterTypeConversionComponent,
    RasterVectorJoinComponent,
    RasterVectorJoinComponent,
    RenameLayerComponent,
    SaveProjectAsComponent,
    ScatterplotOperatorComponent,
    SidenavContainerComponent,
    SidenavHeaderComponent,
    SidenavSearchComponent,
    SidenavSearchRightDirective,
    SmallTimeInteractionComponent,
    StatisticsPlotComponent,
    SymbologyCreatorComponent,
    TabsComponent,
    TemporalRasterAggregationComponent,
    TimeConfigComponent,
    TimeInputComponent,
    TimeShiftComponent,
    TimeSliderComponent,
    TimeStepSelectorComponent,
    TokenLoginComponent,
    UploadComponent,
    VatLogoComponent,
    VectorLegendComponent,
    VectorSymbologyEditorComponent,
    VegaViewerComponent,
    WorkspaceSettingsComponent,
    ZoomHandlesComponent,
];

@NgModule({
    declarations: [...CORE_PIPES, ...CORE_COMPONENTS, ColorPaletteEditorComponent],
    imports: [
        ...MATERIAL_MODULES,
        ColorPickerModule,
        CommonModule,
        DragDropModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        NgxMatSelectSearchModule,
        PortalModule,
        ReactiveFormsModule,
        ScrollingModule,
    ],
    exports: [
        /* re-exports */
        ...MATERIAL_MODULES,
        FlexLayoutModule,
        PortalModule,
        ReactiveFormsModule,
        ScrollingModule,
        /* library exports */
        ...CORE_PIPES,
        ...CORE_COMPONENTS,
    ],
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
        {provide: MAT_CARD_CONFIG, useValue: {appearance: 'outlined'}},
    ],
})
export class CoreModule {}

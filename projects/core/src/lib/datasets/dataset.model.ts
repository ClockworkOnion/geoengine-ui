import {
    DatasetDict,
    TypedResultDescriptorDict,
    UUID,
    WorkflowDict,
    SrsString,
    RasterResultDescriptorDict,
    VectorResultDescriptorDict,
    SourceOperatorDict,
    BBoxDict,
} from '../backend/backend.model';
import {Measurement} from '../layers/measurement';
import {Symbology} from '../layers/symbology/symbology.model';
import {
    RasterDataType,
    RasterDataTypes,
    VectorColumnDataType,
    VectorColumnDataTypes,
    VectorDataType,
    VectorDataTypes,
} from '../operators/datatype.model';
import {Time} from '../time/time.model';

export class Dataset {
    readonly id: UUID;
    readonly name: string;
    readonly displayName: string;
    readonly description: string;
    readonly resultDescriptor: ResultDescriptor;
    readonly sourceOperator: string;
    readonly symbology?: Symbology;

    constructor(config: DatasetDict) {
        this.id = config.id;
        this.name = config.name;
        this.displayName = config.displayName;
        this.description = config.description;
        this.resultDescriptor = ResultDescriptor.fromDict(config.resultDescriptor);
        this.sourceOperator = config.sourceOperator;
        this.symbology = config.symbology ? Symbology.fromDict(config.symbology) : undefined;
    }

    static fromDict(dict: DatasetDict): Dataset {
        return new Dataset(dict);
    }

    createSourceWorkflow(): WorkflowDict {
        return this.createSourceWorkflowWithOperator({
            type: this.sourceOperator,
            params: {
                data: this.name,
            },
        });
    }

    createSourceWorkflowWithOperator(operator: SourceOperatorDict): WorkflowDict {
        return {
            type: this.resultDescriptor.getTypeString(),
            operator,
        };
    }
}

export abstract class ResultDescriptor {
    readonly spatialReference: SrsString;

    protected constructor(spatialReference: SrsString) {
        this.spatialReference = spatialReference;
    }

    static fromDict(dict: TypedResultDescriptorDict): ResultDescriptor {
        if (dict.type === 'vector') {
            return VectorResultDescriptor.fromDict(dict);
        } else if (dict.type === 'raster') {
            return RasterResultDescriptor.fromDict(dict);
        }

        throw Error('invalid result descriptor type');
    }

    abstract getTypeString(): 'Vector' | 'Raster';
}

export class RasterResultDescriptor extends ResultDescriptor {
    readonly dataType: RasterDataType;
    readonly bbox?: BBoxDict;
    readonly time?: Time;

    constructor(config: RasterResultDescriptorDict) {
        super(config.spatialReference);
        this.dataType = RasterDataTypes.fromCode(config.dataType);
        if (config.bbox) {
            this.bbox = {
                lowerLeftCoordinate: {
                    x: config.bbox.upperLeftCoordinate.x,
                    y: config.bbox.lowerRightCoordinate.y,
                },
                upperRightCoordinate: {
                    x: config.bbox.lowerRightCoordinate.x,
                    y: config.bbox.upperLeftCoordinate.y,
                },
            };
        }
        this.time = config.time ? Time.fromDict(config.time) : undefined;
    }

    static override fromDict(dict: RasterResultDescriptorDict): RasterResultDescriptor {
        return new RasterResultDescriptor(dict);
    }

    getTypeString(): 'Vector' | 'Raster' {
        return 'Raster';
    }
}

export class VectorResultDescriptor extends ResultDescriptor {
    readonly dataType: VectorDataType;
    readonly columns: Map<string, VectorColumnDataType>;
    readonly measurements: Map<string, Measurement>;

    constructor(config: VectorResultDescriptorDict) {
        super(config.spatialReference);
        this.dataType = VectorDataTypes.fromCode(config.dataType);
        this.columns = new Map(Object.entries(config.columns).map(([key, value]) => [key, VectorColumnDataTypes.fromCode(value.dataType)]));
        this.measurements = new Map(Object.entries(config.columns).map(([key, value]) => [key, Measurement.fromDict(value.measurement)]));
    }

    static override fromDict(dict: VectorResultDescriptorDict): ResultDescriptor {
        return new VectorResultDescriptor(dict);
    }

    getTypeString(): 'Vector' | 'Raster' {
        return 'Vector';
    }
}

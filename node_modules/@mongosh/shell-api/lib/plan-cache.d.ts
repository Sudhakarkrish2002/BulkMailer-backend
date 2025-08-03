import { ShellApiWithMongoClass } from './decorators';
import type { Document } from '@mongosh/service-provider-core';
import type { CollectionWithSchema } from './collection';
import { asPrintable } from './enums';
import type Mongo from './mongo';
import type { MQLPipeline, MQLQuery } from './mql-types';
export default class PlanCache extends ShellApiWithMongoClass {
    _collection: CollectionWithSchema;
    constructor(collection: CollectionWithSchema);
    get _mongo(): Mongo;
    [asPrintable](): string;
    clear(): Promise<Document>;
    clearPlansByQuery(query: MQLQuery, projection?: Document, sort?: Document): Promise<Document>;
    list(pipeline?: MQLPipeline): Promise<Document[]>;
    listQueryShapes(): never;
    getPlansByQuery(): never;
}

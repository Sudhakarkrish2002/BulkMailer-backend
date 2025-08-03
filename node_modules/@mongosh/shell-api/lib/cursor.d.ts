import type { ServiceProviderFindCursor, Document, CollationOptions, ReadPreferenceLike, ReadConcernLevel, TagSet, HedgeOptions } from '@mongosh/service-provider-core';
import type Mongo from './mongo';
import { AggregateOrFindCursor } from './aggregate-or-find-cursor';
export default class Cursor extends AggregateOrFindCursor<ServiceProviderFindCursor> {
    _tailable: boolean;
    constructor(mongo: Mongo, cursor: ServiceProviderFindCursor);
    toJSON(): void;
    private _addFlag;
    addOption(optionFlagNumber: number): this;
    allowDiskUse(allow?: boolean): this;
    allowPartialResults(): this;
    collation(spec: CollationOptions): this;
    comment(cmt: string): this;
    count(): Promise<number>;
    hasNext(): Promise<boolean>;
    hint(index: string): this;
    limit(value: number): this;
    max(indexBounds: Document): this;
    maxAwaitTimeMS(value: number): this;
    min(indexBounds: Document): this;
    next(): Promise<Document | null>;
    noCursorTimeout(): this;
    oplogReplay(): this;
    readPref(mode: ReadPreferenceLike, tagSet?: TagSet[], hedgeOptions?: HedgeOptions): this;
    returnKey(enabled: boolean): this;
    size(): Promise<number>;
    tailable(opts?: {
        awaitData: boolean;
    }): this;
    maxScan(): void;
    showRecordId(): this;
    readConcern(level: ReadConcernLevel): this;
}

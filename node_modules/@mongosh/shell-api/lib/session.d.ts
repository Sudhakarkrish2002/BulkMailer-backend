import { ShellApiWithMongoClass } from './decorators';
import type { ClientSessionOptions, ClientSession, TransactionOptions, ClusterTime, TimestampType, ServerSessionId } from '@mongosh/service-provider-core';
import { asPrintable } from './enums';
import type Mongo from './mongo';
import type { DatabaseWithSchema } from './database';
import type { GenericServerSideSchema, StringKey } from './helpers';
export default class Session<M extends GenericServerSideSchema = GenericServerSideSchema> extends ShellApiWithMongoClass {
    id: ServerSessionId | undefined;
    _session: ClientSession;
    _options: ClientSessionOptions;
    _mongo: Mongo<M>;
    private _databases;
    constructor(mongo: Mongo<M>, options: ClientSessionOptions, session: ClientSession);
    [asPrintable](): ServerSessionId | undefined;
    getDatabase<K extends StringKey<M>>(name: K): DatabaseWithSchema<M, M[K]>;
    advanceOperationTime(ts: TimestampType): void;
    advanceClusterTime(clusterTime: ClusterTime): void;
    endSession(): Promise<void>;
    hasEnded(): boolean | undefined;
    getClusterTime(): ClusterTime | undefined;
    getOperationTime(): TimestampType | undefined;
    getOptions(): ClientSessionOptions;
    startTransaction(options?: TransactionOptions): void;
    commitTransaction(): Promise<void>;
    abortTransaction(): Promise<void>;
    withTransaction<T extends (...args: any) => any>(fn: T, options?: TransactionOptions): Promise<ReturnType<T>>;
}

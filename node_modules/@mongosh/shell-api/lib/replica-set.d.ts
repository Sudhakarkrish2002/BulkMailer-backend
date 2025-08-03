import type { Document } from '@mongosh/service-provider-core';
import type Mongo from './mongo';
import type { Database, DatabaseWithSchema } from './database';
import { ShellApiWithMongoClass } from './decorators';
import { asPrintable } from './enums';
import type { CommandResult } from './result';
import type { GenericDatabaseSchema, GenericServerSideSchema } from './helpers';
export type ReplSetMemberConfig = {
    _id: number;
    host: string;
    priority?: number;
    votes?: number;
    arbiterOnly?: boolean;
};
export type ReplSetConfig = {
    version: number;
    _id: string;
    members: ReplSetMemberConfig[];
    protocolVersion: number;
};
export default class ReplicaSet<M extends GenericServerSideSchema = GenericServerSideSchema, D extends GenericDatabaseSchema = GenericDatabaseSchema> extends ShellApiWithMongoClass {
    _database: DatabaseWithSchema<M, D>;
    constructor(database: DatabaseWithSchema<M, D> | Database<M, D>);
    get _mongo(): Mongo<M>;
    initiate(config?: Partial<ReplSetConfig>): Promise<Document>;
    _getConfig(): Promise<ReplSetConfig>;
    config(): Promise<ReplSetConfig>;
    conf(): Promise<ReplSetConfig>;
    reconfig(config: Partial<ReplSetConfig>, options?: {}): Promise<Document>;
    reconfigForPSASet(newMemberIndex: number, config: Partial<ReplSetConfig>, options?: {}): Promise<Document>;
    status(): Promise<Document>;
    isMaster(): Promise<Document>;
    hello(): Promise<Document>;
    printSecondaryReplicationInfo(): Promise<CommandResult>;
    printSlaveReplicationInfo(): never;
    printReplicationInfo(): Promise<CommandResult>;
    add(hostport: string | Partial<ReplSetMemberConfig>, arb?: boolean): Promise<Document>;
    addArb(hostname: string): Promise<Document>;
    remove(hostname: string): Promise<Document>;
    freeze(secs: number): Promise<Document>;
    stepDown(stepdownSecs?: number, catchUpSecs?: number): Promise<Document>;
    syncFrom(host: string): Promise<Document>;
    secondaryOk(): Promise<void>;
    [asPrintable](): string;
    private _emitReplicaSetApiCall;
}

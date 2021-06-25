import { Action } from '@ngrx/store';

export const LOAD_POKES = '[poke]s load';

export type PokeAction = LoadPokes


export class LoadPokes implements Action {
    readonly type = LOAD_POKES;
    constructor(public filterBy: string = '') {
        
     }
}
import { Action } from '@ngrx/store';
import { Filter } from 'src/app/models/filter';
import { Pokemon } from 'src/app/models/pokemon';

export const LOAD_POKES = '[poke]s load';
export const LOAD_POKE = '[poke] load';
export const SET_LOADING = '[poke]s loading';
export const SET_ERROR = '[poke]s error';
export const LOADED_POKE = '[poke] loaded';
export const LOADED_POKES = '[poke]s loaded';
export const REMOVE_POKE = '[poke] remove';
export const REMOVED_POKE = '[poke] removed';
export const SAVE_POKE = '[poke] saved';
export const ADDED_POKE = '[poke] added';
export const UPDATED_POKE = '[poke] updated';
export const IS_DONE = '[action] done';
export const IS_DONED = '[action] doned';

export type PokeAction = LoadPokes | LoadPoke | RemovePoke | SavePoke

export class LoadPokes implements Action {
  readonly type = LOAD_POKES;
  constructor(public filterBy: Filter = null) {
  }
}
export class LoadPoke implements Action {
  readonly type = LOAD_POKE;
  constructor(public pokeName: string = '') { }
}
export class RemovePoke implements Action {
  readonly type = REMOVE_POKE;
  constructor(public pokeId: number) { }
}
export class IsDoneAction implements Action {
  readonly type = IS_DONE;
  constructor() { }
}
export class LoadedPokes implements Action {
  readonly type = LOADED_POKES;
  constructor(public pokes: Pokemon[] = []) { }
}
export class LoadedPoke implements Action {
  readonly type = LOADED_POKE;
  constructor(public poke: Pokemon) { }
}
export class RemovedPoke implements Action {
  readonly type = REMOVED_POKE;
  constructor(public pokeId: number) { }
}
export class SavePoke implements Action {
  readonly type = SAVE_POKE;
  constructor(public poke: Pokemon) { }
}
export class AddedPoke implements Action {
  readonly type = ADDED_POKE;
  constructor(public poke: Pokemon) { }
}
export class UpdatedPoke implements Action {
  readonly type = UPDATED_POKE;
  constructor(public poke: Pokemon) { }
}
export class LoadingPokes implements Action {
  readonly type = SET_LOADING;
  constructor(public isLoading: boolean = true) { }
}
export class PokeError implements Action {
  readonly type = SET_ERROR;
  constructor(public error: string) { }
}
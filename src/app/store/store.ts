import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import * as pokeModule from './reducers/poke.reducer';


export interface State {
    pokeState: pokeModule.PokeState;
}

export const reducers: ActionReducerMap<State> = {
    pokeState: pokeModule.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? []
    : [];

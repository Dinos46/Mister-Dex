import { Pokemon } from 'src/app/models/pokemon';
import { LOAD_POKES } from '../actions/poke.actions';


export interface PokeState {
    pokes: Pokemon[];
}

const initialState: PokeState = {
    pokes: [],
};

export function reducer(state: PokeState = initialState, action: any): PokeState {
    switch (action.type) {
        case LOAD_POKES:
            const { pokes } = action;
            // console.log(`Reducer: Setting loaded pokes (${pokes.length}) pokemons`);
            
            return { ...state, pokes };
            break
        default:
            return state
    }
}
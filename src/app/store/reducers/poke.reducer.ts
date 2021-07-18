import { Pokemon } from 'src/app/models/pokemon';
import { LOADED_POKES, LOADED_POKE, ADDED_POKE, UPDATED_POKE, REMOVED_POKE, SET_ERROR, SET_LOADING, IS_DONED } from '../actions/poke.actions';


export interface PokeState {
    pokes: Pokemon[];
    poke: Pokemon | null;
    isLoading: boolean;
    error: string,
    isDone: boolean
}

const initialState: PokeState = {
    pokes: [],
    poke: null,
    isLoading: false,
    error: '',
    isDone: false
};

export function reducer(state: PokeState = initialState, action: any): PokeState {
    switch (action.type) {
        case SET_LOADING: {
            const { isLoading } = action;
            console.log(`Reducer: Setting isLoading to ${isLoading}`);
            return { ...state, isLoading, error: '' };
        }
        case SET_ERROR: {
            const { error } = action;
            console.log(`Reducer: Setting poke error`, error);
            return { ...state, error, isLoading: false };
        }
        case LOADED_POKES: {
            const { pokes, } = action;
            // console.log(`Reducer: Setting loaded pokes (${pokes.length}) pokemons`);
            return { ...state, pokes, isLoading: false, error: '' };
        }
        case LOADED_POKE: {
            const { poke } = action;
            // console.log(`Reducer: Setting loaded item ${poke.id}`);
            return { ...state, poke, error: '' };
        }
        case IS_DONED: {
            return { ...state, isDone: action.isDone };
        }
        case REMOVED_POKE: {
            const { pokeId } = action;
            console.log('Reducer: Removing item:', pokeId);
            const pokes = state.pokes.filter(poke => poke.id !== pokeId)
            return { ...state, pokes, error: '', isDone: true };
        }
        case ADDED_POKE: {
            const { poke } = action;
            // console.log('Reducer: Adding item:', poke);
            const pokes = [...state.pokes, poke]
            return { ...state, pokes, error: '' };
        }
        case UPDATED_POKE: {
            const { poke } = action;
            // console.log('Reducer: Updating item:', poke);
            const pokes = state.pokes.map(currPoke => (currPoke.id === poke.id) ? poke : currPoke)
            return { ...state, pokes, poke: null, error: '' };
        }
        default:
            return state
    }
}
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap, tap } from "rxjs/operators";
import { PokeServiceService } from "../services/poke-service.service";
import { LOAD_POKES, PokeAction } from "./actions/poke.actions";

@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions<PokeAction>,
        private pokeService: PokeServiceService
        ){}

    loadPokes$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(LOAD_POKES),
          tap(() => {}),
          switchMap((action) =>
            this.pokeService.query(action.filterBy).pipe(
              tap(() => {}),
              map((pokes) => ({
                type: LOAD_POKES,
                pokes,
              })),
            //   catchError((error) => {
            //     console.log('Effect: Caught error ===> Reducer', error)
            //     return of({
            //       type: SET_ERROR,
            //       error: error.toString(),
            //     })
            //   })
            )
          )
        );
      });
      // console.log('Effects: load pokemons ==> service')
      // console.log('Effects: Got items from service, send it to ===> Reducer')


}
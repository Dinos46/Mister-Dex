import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap, tap, switchMapTo } from "rxjs/operators";
import { PokeServiceService } from "../services/poke-service.service";
import { LOAD_POKE, LOAD_POKES, PokeAction, REMOVED_POKE, REMOVE_POKE, UPDATED_POKE, LOADED_POKE, LOADED_POKES, SAVE_POKE, SET_ERROR, ADDED_POKE, IS_DONE, IS_DONED } from "./actions/poke.actions";

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions<PokeAction>,
    private pokeService: PokeServiceService
  ) { }

  isDone$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IS_DONE),
      map(() => (
        {
          type: IS_DONED,
          isDone: false
        }
      )
      ))
  })

  loadPokes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_POKES),
      tap(() => { console.log(this.actions$) }),
      switchMap((action) =>
        this.pokeService.query(action.filterBy).pipe(
          tap(() => console.log('here', action)),
          map((pokes) => ({
            type: LOADED_POKES,
            pokes,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      )
    );
  });
  loadPoke$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LOAD_POKE),
      tap(() => console.log('Effects: load pokemon ==> service')),
      switchMap((action) =>
        this.pokeService.getByName(action.pokeName).pipe(
          tap(() => console.log('Effects: Got pokemon from service ===> Reducer')),
          map((poke) => ({
            type: LOADED_POKE,
            poke,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),
    );
  });
  removePokes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(REMOVE_POKE),
      switchMap((action) =>
        this.pokeService.remove(action.pokeId).pipe(
          tap(poke => console.log('PIPE', poke)),
          tap(() => console.log('Effects: poke removed by service ===> Reducer')),
          map(() => ({
            type: REMOVED_POKE,
            pokeId: action.pokeId,
          })),
          catchError((error) => {
            console.log('Effect: Caught error ===> Reducer', error)
            return of({
              type: SET_ERROR,
              error: error.toString(),
            })
          })
        )
      ),

    );

  });

  // saveItem$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(SAVE_POKE),
  //     switchMap((action) =>
  //       this.pokeService.save(action.poke).pipe(
  //         tap(() => console.log('Effects: poke saved by service, inform the ===> Reducer')),
  //         map((savedPoke) => ({
  //           type: (action.poke.id) ? UPDATED_POKE : ADDED_POKE,
  //           item: savedPoke,
  //         })),
  //         catchError((error) => {
  //           console.log('Effect: Caught error ===> Reducer', error)
  //           return of({
  //             type: SET_ERROR,
  //             error: error.toString(),
  //           })
  //         })
  //       )
  //     )
  //   );
  // })
}
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { PokeState } from '../store/reducers/poke.reducer';
import { IsDoneAction, LoadingPokes, LoadPokes } from '../store/actions/poke.actions';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class PokeServiceService {
  KEY = 'pokemon';
  URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';

  constructor(
    private http: HttpClient,
    private store: Store<PokeState>
  ) {
    const pokes = JSON.parse(localStorage.getItem(this.KEY) || 'null');
    if (!pokes || pokes.length === 0) {
      this._getDataFromApi()
    }
  }

  query(filterBy: Filter = null): Observable<Pokemon[]> {
    this.store.dispatch(new LoadingPokes());
    console.log('pokeService: Return pokes ===> effect');
    let pokes = storageService.query(this.KEY, filterBy)
    return from(pokes as Promise<Pokemon[]>)
  }

  getByName(pokeName: string) {
    console.log('PokeService: Return pokemon ===> effect');
    return from(storageService.get(this.KEY, pokeName) as Promise<any>)
  }

  remove(pokeId: number): Observable<boolean> {
    console.log('PokeService: Removing pokemon ===> effect');
    return from(storageService.remove(this.KEY, pokeId))
  }

  save(poke: Pokemon): Observable<any> {
    const method = (poke.id) ? 'put' : 'post'
    const prmSavedpoke = storageService[method](this.KEY, poke)
    console.log('PokeService: Saving Pokemon ===> effect');
    return from(prmSavedpoke) as Observable<any>
  }

  async _getDataFromApi() {
    const data: any = []
    const pokesUrl: any = await this.http.get(this.URL).toPromise()
    pokesUrl.results.map(async (poke: any) => {
      const pokes = await this.http.get(poke.url).toPromise()
      data.push(pokes)
      data.sort((a: any, b: any) => a.id - b.id)
      localStorage.setItem(this.KEY, JSON.stringify(data))
    });
  }
}
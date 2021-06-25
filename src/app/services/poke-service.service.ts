import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { PokeState } from '../store/reducers/poke.reducer'; 
import { LoadPokes } from '../store/actions/poke.actions';


@Injectable({
  providedIn: 'root'
})
export class PokeServiceService {
  KEY = 'pokemon'
  URL = 'https://pokeapi.co/api/v2/pokemon/'
  
  constructor(
    private http: HttpClient,
    private store: Store<PokeState>
    ) {
      const pokes = JSON.parse(localStorage.getItem(this.KEY) || 'null');
      if (!pokes || pokes.length === 0) {
        this.getDataFromApi()
      }
    }
    
  query(filterBy = ''): Observable<any> {
    // this.store.dispatch(new LoadPokes());
    // console.log('ItemService: Return Items ===> effect');
    
    return from(storageService.query(this.KEY) as Promise<any[]>)
  }

  async getDataFromApi() {
    const data: any = []
    POKEMON.map(poke=>data.push(poke.url))
    const pokePrms = await data.map((url: any)=>{
      return this.http.get(url).toPromise()
    })
    Promise.all(pokePrms).then((res: any)=>{
      localStorage.setItem(this.KEY, JSON.stringify(res))
    })
  }
}


const POKEMON = [
  { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }, { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }, { "name": "venusaur", "url": "https://pokeapi.co/api/v2/pokemon/3/" }, { "name": "charmander", "url": "https://pokeapi.co/api/v2/pokemon/4/" }, { "name": "charmeleon", "url": "https://pokeapi.co/api/v2/pokemon/5/" }, { "name": "charizard", "url": "https://pokeapi.co/api/v2/pokemon/6/" }, { "name": "squirtle", "url": "https://pokeapi.co/api/v2/pokemon/7/" }, { "name": "wartortle", "url": "https://pokeapi.co/api/v2/pokemon/8/" }, { "name": "blastoise", "url": "https://pokeapi.co/api/v2/pokemon/9/" }, { "name": "caterpie", "url": "https://pokeapi.co/api/v2/pokemon/10/" }, { "name": "metapod", "url": "https://pokeapi.co/api/v2/pokemon/11/" }, { "name": "butterfree", "url": "https://pokeapi.co/api/v2/pokemon/12/" }, { "name": "weedle", "url": "https://pokeapi.co/api/v2/pokemon/13/" }, { "name": "kakuna", "url": "https://pokeapi.co/api/v2/pokemon/14/" }, { "name": "beedrill", "url": "https://pokeapi.co/api/v2/pokemon/15/" }, { "name": "pidgey", "url": "https://pokeapi.co/api/v2/pokemon/16/" }, { "name": "pidgeotto", "url": "https://pokeapi.co/api/v2/pokemon/17/" }, { "name": "pidgeot", "url": "https://pokeapi.co/api/v2/pokemon/18/" }, { "name": "rattata", "url": "https://pokeapi.co/api/v2/pokemon/19/" }, { "name": "raticate", "url": "https://pokeapi.co/api/v2/pokemon/20/" }
] 

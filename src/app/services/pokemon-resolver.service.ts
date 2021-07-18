import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { PokeServiceService } from './poke-service.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonResolverService implements Resolve<Observable<Pokemon>> {

  constructor(private PokeService: PokeServiceService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const { name } = route.params
    return this.PokeService.getByName(name)
  }
}

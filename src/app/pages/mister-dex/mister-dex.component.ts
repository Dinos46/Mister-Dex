import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import { LoadPokes } from 'src/app/store/actions/poke.actions';
import { Pokemon } from 'src/app/models/pokemon';
import { PokeServiceService } from 'src/app/services/poke-service.service';

@Component({
  selector: 'mister-dex',
  templateUrl: './mister-dex.component.html',
  styleUrls: ['./_mister-dex.component.scss']
})
export class MisterDexComponent implements OnInit {
  pokes$: Observable<Pokemon[]>
  filterBy: string = ''
  pokes: Pokemon[]


  constructor(private store: Store<State>) {
    this.pokes$ = this.store.select('pokeState').pipe(pluck('pokes'))

  }

  ngOnInit(): void {
    
    this.store.dispatch(new LoadPokes(this.filterBy))
    this.pokes$.subscribe(res => {
      this.pokes = res
    })
  }

}

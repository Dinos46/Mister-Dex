import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { State } from '../../store/store';
import { IsDoneAction, LoadPokes } from 'src/app/store/actions/poke.actions';
import { Pokemon } from 'src/app/models/pokemon';
import { Filter } from 'src/app/models/filter';

@Component({
  selector: 'mister-dex',
  templateUrl: './mister-dex.component.html',
  styleUrls: ['./_mister-dex.component.scss']
})
export class MisterDexComponent implements OnInit {
  pokes$: Observable<Pokemon[]>
  poke$: Observable<Pokemon | null>
  filterBy: Filter | null
  pokes: Pokemon[]
  isLoading$: Observable<boolean>
  error$: Observable<string>

  constructor(private store: Store<State>) {
    this.pokes$ = this.store.select('pokeState').pipe(pluck('pokes'));
    this.poke$ = this.store.select('pokeState').pipe(pluck('poke'));
    this.isLoading$ = this.store.select('pokeState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('pokeState').pipe(pluck('error'));
    this.filterBy = { name: '', type: '' }
  }

  ngOnInit(): void {
    this.store.dispatch(new IsDoneAction())
    this.store.dispatch(new LoadPokes(this.filterBy))
    this.pokes$.subscribe(pokes => {
      this.pokes = pokes
    })
  }

  onSetFilter(filterBy: Filter) {
    this.filterBy = filterBy
    this.store.dispatch(new LoadPokes({ ...this.filterBy }))
  }
}

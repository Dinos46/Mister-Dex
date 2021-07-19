import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { pluck } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../../store/store';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadPoke, SavePoke } from 'src/app/store/actions/poke.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './app-edit.component.html',
  styleUrls: ['./_app-edit.component.scss']
})
export class AppEditComponent implements OnInit {
  poke$: Observable<Pokemon | null>
  subs: Subscription
  pokeName: string
  poke: Pokemon

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.poke$ = this.store.select('pokeState').pipe(pluck('poke'));
  }

  ngOnInit(): void {
    this.subs = this.route.data.subscribe((res) => {
      this.poke = res.poke
    })
    this.subs = this.route.params.subscribe(res => {
      this.pokeName = res.name
    })
    this.store.dispatch(new LoadPoke(this.pokeName))
    this.poke$.subscribe(data => {
      this.poke = data
    })
  }

  onUpDatePokemon() {
    const pokeToSave = {
      ...this.poke,
      name: this.pokeName
    }
    this.store.dispatch(new SavePoke(pokeToSave))
    this.router.navigateByUrl('/')
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}

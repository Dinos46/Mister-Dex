import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { IsDoneAction, RemovePoke } from 'src/app/store/actions/poke.actions';
import { Store } from '@ngrx/store';
import { State } from '../../store/store';
import { pluck } from 'rxjs/operators';



@Component({
  selector: 'app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./_app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {
  poke: Pokemon
  subs: Subscription
  isDone: boolean
  doneSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {
    this.doneSub = this.store.select('pokeState').pipe(pluck('isDone')).subscribe(isDone => {
      if (isDone) this.router.navigateByUrl('/poke')
    });
  }

  async ngOnInit(): Promise<void> {
    this.subs = this.route.data.subscribe(data => this.poke = data.poke)
  }

  removePoke(pokeId: number) {
    console.log('pokeApp: dispatching remove');
    this.store.dispatch(new RemovePoke(pokeId));
  }

  goToEditPage(pokeName: string) {
    this.router.navigateByUrl(`/poke/edit/${pokeName}`)
  }

  goBack() {
    this.router.navigateByUrl('/poke')
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
    this.doneSub.unsubscribe()
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./_app-list.component.scss']
})
export class AppListComponent implements OnInit {
  @Input() pokes: Pokemon[] | null = []
  @Output() removed = new EventEmitter<string>()
  page: 1;
  total: 1118;

  constructor() { }

  ngOnInit(): void { }

  removePoke(pokeId: string) {
    console.log('PokeList Emitting removed to Parent');
    this.removed.emit('' + pokeId)
  }

}

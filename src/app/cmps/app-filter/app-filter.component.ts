import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/models/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './app-filter.component.html',
  styleUrls: ['./_app-filter.component.scss']
})
export class AppFilterComponent implements OnInit {

  @Input() filterBy: Filter
  @Output() setFilter = new EventEmitter<Filter>()
  filterByCopy: Filter
  types = [
    'all',
    'fire',
    'water',
    'grass',
    'poison',
    'bug',
    'dragon',
    'fighting',
    'ghost',
    'flying',
    'ice',
    'normal',
    'psychic',
    'rock'
  ]

  constructor() {
    this.filterByCopy = { name: '', type: '' }
  }

  ngOnInit(): void {
    console.log(this.filterBy);

  }

}

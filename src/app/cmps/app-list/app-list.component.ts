import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./_app-list.component.scss']
})
export class AppListComponent implements OnInit {
  @Input() pokes: Pokemon[] | null = []

  constructor() { }

  ngOnInit(): void {
    
  }

}

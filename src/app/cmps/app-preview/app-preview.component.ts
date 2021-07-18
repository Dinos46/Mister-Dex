import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { AppListComponent } from '../app-list/app-list.component';

@Component({
  selector: 'app-preview',
  templateUrl: './app-preview.component.html',
  styleUrls: ['./_app-preview.component.scss']
})
export class AppPreviewComponent implements OnInit {
  @Input() poke: Pokemon
  

  constructor() { }

  ngOnInit() {
    
  }
}

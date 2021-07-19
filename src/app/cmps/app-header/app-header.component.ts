import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./_app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  isOpen = false

  constructor() { }

  ngOnInit(): void {
  }

  onToggleMenu(): void {
    this.isOpen = !this.isOpen
  }
}

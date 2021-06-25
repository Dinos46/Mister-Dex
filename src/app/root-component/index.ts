import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
            <div class="main-container">
              <app-header class="full"></app-header>
              <main>
                <router-outlet></router-outlet>
              </main>
              <app-footer class="flex full"></app-footer>
            </div>
            `,
})
export class AppComponent {
  title = 'Mister Dex';
}
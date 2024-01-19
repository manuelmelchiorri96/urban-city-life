import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentRouter: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.prendiURL();
  }

  prendiURL() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRouter = this.router.url.slice(1);
      }
    });
  }
}

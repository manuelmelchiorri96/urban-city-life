import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
      ],
      declarations: [AppComponent, NavbarComponent, LayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should update currentRouter on navigation end', () => {
    const navigationEndEvent = new NavigationEnd(1, '/', '/dummy');

    app.prendiURL();

    (router.events as Subject<any>).next(navigationEndEvent);

    expect(app.currentRouter).toBe('');
  });

  it('should not update currentRouter on non-navigation events', () => {
    const nonNavigationEvent = new Event('some-event');

    app.prendiURL();

    (router.events as Subject<any>).next(nonNavigationEvent);

    expect(app.currentRouter).toBe('');
  });
});

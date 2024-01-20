import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, MatIconModule],
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for current page', () => {
    component.currentRouter = 'home';
    const result = component.isCurrentPage('home');
    expect(result).toBeTruthy();
  });

  it('should return false for non-current page', () => {
    component.currentRouter = 'dashboard';
    const result = component.isCurrentPage('home');
    expect(result).toBeFalsy();
  });

  it('should render home link when user is logged', () => {
    spyOn(component, 'userIsLogged').and.returnValue(true);
    fixture.detectChanges();
    const homeLink = fixture.debugElement.query(By.css('[routerLink="/home"]'));
    expect(homeLink).toBeTruthy();
  });

  it('should render login link when user is not logged', () => {
    spyOn(component, 'userIsLogged').and.returnValue(false);
    fixture.detectChanges();
    const loginLink = fixture.debugElement.query(
      By.css('[routerLink="/login"]')
    );
    expect(loginLink).toBeTruthy();
  });

  it('should toggle mobileMenu on viewMenuMobile()', () => {
    component.mobileMenu = false;
    component.viewMenuMobile();
    expect(component.mobileMenu).toBeTruthy();
  });

  it('should close mobileMenu on chiudiMenuMobile()', () => {
    component.mobileMenu = true;
    component.chiudiMenuMobile();
    expect(component.mobileMenu).toBeFalsy();
  });

  it('should navigate to login on confirmLogout()', () => {
    spyOn(router, 'navigate');
    component.confirmLogout();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should have showLogoutConfirmation set to false initially', () => {
    expect(component.showLogoutConfirmation).toBeFalsy();
  });

  it('should have mobileMenu set to false initially', () => {
    expect(component.mobileMenu).toBeFalsy();
  });
});

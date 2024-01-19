import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/core/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() currentRouter: string = '';
  showLogoutConfirmation: boolean = false;
  mobileMenu: boolean = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  viewMenuMobile() {
    if (this.mobileMenu) {
      this.mobileMenu = false;
    } else {
      this.mobileMenu = true;
    }
  }

  chiudiMenuMobile() {
    if (this.mobileMenu) {
      this.mobileMenu = false;
    }
  }

  isCurrentPage(route: string) {
    return this.currentRouter === route;
  }

  userIsLogged(): boolean {
    return this.localStorageService.getIsLogged() === 'true';
  }

  startLogoutConfirmation() {
    this.showLogoutConfirmation = true;
  }

  cancelLogout() {
    this.showLogoutConfirmation = false;
  }

  confirmLogout() {
    this.showLogoutConfirmation = false;
    this.localStorageService.setIsLogged(false);
    this.router.navigate(['login']);
  }
}

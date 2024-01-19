import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../core/local-storage.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const isLogged = LocalStorageService.prototype.getIsLogged() === 'true';
  let router: Router = new Router();

  if (isLogged) {
    return true;
  } else {
    router.navigate(['home']);
    return false;
  }
};

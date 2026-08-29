import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  if(isLoggedIn === "true"){
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

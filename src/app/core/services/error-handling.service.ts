import { ErrorHandler, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService implements ErrorHandler {
  hasErrorSubject = new BehaviorSubject<boolean>(false);
  hasError = this.hasErrorSubject.asObservable();

  setErrorState(hasError: boolean): void {
    this.hasErrorSubject.next(hasError);
  }

  router = inject(Router);

  handleError(error: any) {
    console.error(error);
    this.setErrorState(true);
    this.router.navigate(['/error']);
  }

}

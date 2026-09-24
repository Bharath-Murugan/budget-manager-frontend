import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { RegisterService } from '../../services/register.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: jasmine.SpyObj<RegisterService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    registerService = jasmine.createSpyObj<RegisterService>('RegisterService', ['registerUser']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: RegisterService, useValue: registerService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.userName = 'test-user';
    component.email = 'test@example.com';
    component.password = 'Password123';
    component.confirmPassword = 'Password123';
    component.role = 'USER';
    fixture.detectChanges();
  });

  it('navigates to login after a successful 200 response', () => {
    registerService.registerUser.and.returnValue(of(new HttpResponse({ status: 200 })));

    component.register();

    expect(registerService.registerUser).toHaveBeenCalledWith(jasmine.objectContaining({
      userName: 'test-user',
      email: 'test@example.com',
      password: 'Password123',
      role: 'USER'
    }));
    expect(router.navigate).toHaveBeenCalledWith(['/'], {
      queryParams: { registered: 'success' }
    });
    expect(component.isSubmitting).toBeFalse();
  });

  it('shows the duplicate account message for HTTP 400', () => {
    registerService.registerUser.and.returnValue(throwError(() => new HttpErrorResponse({ status: 400 })));

    component.register();

    expect(component.errorMsg).toBe('An account with this user ID, username, or email already exists.');
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.isSubmitting).toBeFalse();
  });

  it('shows the network error message for a connection failure', () => {
    registerService.registerUser.and.returnValue(throwError(() => new HttpErrorResponse({ status: 0 })));

    component.register();

    expect(component.errorMsg).toBe('Unable to connect to the server. Please try again.');
    expect(component.isSubmitting).toBeFalse();
  });

  it('disables duplicate submissions while the request is running', () => {
    const request = new Subject<HttpResponse<unknown>>();
    registerService.registerUser.and.returnValue(request.asObservable());

    component.register();
    component.register();

    expect(registerService.registerUser).toHaveBeenCalledTimes(1);
    expect(component.isSubmitting).toBeTrue();

    request.next(new HttpResponse({ status: 200 }));
    request.complete();

    expect(component.isSubmitting).toBeFalse();
  });
});

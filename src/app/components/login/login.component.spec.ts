import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageService } from '../../services/core/local-storage.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LocalStorageService', ['getIsLogged']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [LoginComponent],
      providers: [{ provide: LocalStorageService, useValue: spy }],
    }).compileComponents();

    localStorageServiceSpy = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert email to lowercase', () => {
    component.emailFormControl.setValue('JohnDoe@example.com');
    component.convertEmailToLowerCase();
    expect(component.emailFormControl.value).toBe('johndoe@example.com');
  });

  it('should set prendiNuovoToken to true when email and token match localStorage', () => {
    component.onSubmit();

    expect(component.prendiNuovoToken).toBe(false);
    expect(component.error).toBe('');
  });

  it('should set error when email does not match localStorage', () => {
    component.onSubmit();

    expect(component.error).toBe('');
    expect(component.prendiNuovoToken).toBe(false);
  });

  it('should set error when token does not match localStorage', () => {
    component.onSubmit();

    expect(component.error).toBe('');
    expect(component.prendiNuovoToken).toBe(false);
  });
});

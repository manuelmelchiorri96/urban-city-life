import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneComponent } from './registrazione.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpService } from '../../services/http-service/http.service';
import { Observable, throwError } from 'rxjs';

describe('RegistrazioneComponent', () => {
  let component: RegistrazioneComponent;
  let fixture: ComponentFixture<RegistrazioneComponent>;
  const httpServiceSpy = jasmine.createSpyObj('HttpService', ['registraUser']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
      ],
      declarations: [RegistrazioneComponent],
      providers: [{ provide: HttpService, useValue: httpServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogged to true if user is logged in', () => {
    const localStorageServiceSpy = spyOn(
      component['localStorageService'],
      'getIsLogged'
    ).and.returnValue('true');
    component.ngOnInit();

    expect(localStorageServiceSpy).toHaveBeenCalled();
    expect(component.isLogged).toBeTrue();
  });

  it('should capitalize the first letter of the name', () => {
    component.nomeFormControl.setValue('john');
    component.capitalizeFirstLetter();
    expect(component.nomeFormControl.value).toBe('John');
  });

  it('should convert email to lowercase', () => {
    component.emailFormControl.setValue('JohnDoe@example.com');
    component.convertEmailToLowerCase();
    expect(component.emailFormControl.value).toBe('johndoe@example.com');
  });

  it('should set messageErr when token is invalid', () => {
    const nome = 'John';
    const genere = 'male';
    const email = 'john@example.com';
    const token = 'invalidToken';

    component.nomeFormControl.setValue(nome);
    component.genereFormControl.setValue(genere);
    component.emailFormControl.setValue(email);
    component.tokenFormControl.setValue(token);

    httpServiceSpy.registraUser.and.returnValue(throwError({ status: 401 }));

    component.onSubmit();

    expect(component.messageErr).toBe('Token non valido.');
  });

  it('should set messageErr when email is already registered', () => {
    const nome = 'John';
    const genere = 'male';
    const email = 'john@example.com';
    const token = '12345';

    component.nomeFormControl.setValue(nome);
    component.genereFormControl.setValue(genere);
    component.emailFormControl.setValue(email);
    component.tokenFormControl.setValue(token);

    httpServiceSpy.registraUser.and.returnValue(throwError({ status: 422 }));

    component.onSubmit();

    expect(component.messageErr).toBe("L'e-mail inserita è già esistente.");
  });
});

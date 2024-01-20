import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockUserData: any[];

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
        MatOptionModule,
        MatIconModule,
      ],
      declarations: [AccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    mockUserData = [
      {
        id: 0,
        name: '',
        email: '',
        gender: '',
        status: '',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile on ngOnInit', () => {
    const trovaUsersSpy = spyOn(
      component['httpService'],
      'trovaUsers'
    ).and.returnValue(of(mockUserData));

    component.ngOnInit();

    expect(trovaUsersSpy).toHaveBeenCalled();
    expect(component.user).toEqual(mockUserData[0]);
  });

  it('should save changes and update localStorage', () => {
    const modificaProfiloSpy = spyOn(
      component['httpService'],
      'modificaProfilo'
    ).and.returnValue(of({}));

    component.editing = true;
    component.user = {
      id: 1,
      name: 'Test',
      email: 'test@example.com',
      gender: 'male',
      status: 'active',
    };
    component.saveChanges();

    expect(modificaProfiloSpy).toHaveBeenCalledWith(component.user);
    expect(component['localStorageService'].getName()).toBe('Test');
    expect(component.editing).toBeFalse();
  });

  it('should load user profile on ngOnInit', () => {
    const trovaUsersSpy = spyOn(
      component['httpService'],
      'trovaUsers'
    ).and.returnValue(of(mockUserData));

    component.ngOnInit();

    expect(trovaUsersSpy).toHaveBeenCalled();
    expect(component.user).toEqual(mockUserData[0]);
  });
});

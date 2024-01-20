import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiComponent } from './utenti.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

describe('UtentiComponent', () => {
  let component: UtentiComponent;
  let fixture: ComponentFixture<UtentiComponent>;

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
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCardModule,
      ],
      declarations: [UtentiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users based on input', () => {
    const inputElement = document.createElement('input');
    spyOnProperty(inputElement, 'value', 'get').and.returnValue('john');
    const event = { target: inputElement } as unknown as Event;

    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('john');
  });

  it('should clear filter when input is empty', () => {
    const inputElement = document.createElement('input');
    spyOnProperty(inputElement, 'value', 'get').and.returnValue('');
    const event = { target: inputElement } as unknown as Event;

    component.dataSource.filter = 'PreviousFilter';
    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('');
  });

  it('should set showDeleteConfirmation to false on cancelDelete', () => {
    component.cancelDelete();
    expect(component.showDeleteConfirmation).toBeFalse();
  });

  it('should set showDeleteConfirmation to false on confirmDelete', () => {
    component.confirmDelete();
    expect(component.showDeleteConfirmation).toBeFalse();
  });

  it('should set showDeleteConfirmation to true and idUtenteDaEliminare to userId', () => {
    const userId = 123;

    component.eliminaUtente(userId);

    expect(component.showDeleteConfirmation).toBeTrue();
    expect(component.idUtenteDaEliminare).toBe(userId);
  });

  it('should call leggiUtenti on ngOnInit', () => {
    spyOn(component, 'leggiUtenti');

    component.ngOnInit();

    expect(component.leggiUtenti).toHaveBeenCalled();
  });

  it('should set paginator and sort on ngAfterViewInit', () => {
    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.sort);
  });
});

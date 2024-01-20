import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpService } from '../../services/http-service/http.service';
import { LocalStorageService } from '../../services/core/local-storage.service';
import { MatCardModule } from '@angular/material/card';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', [
      'trovaUsers',
      'trovaPostDellUtente',
      'aggiungiPost',
      'commentaPost',
      'leggiCommentiPost',
    ]);
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'getId',
      'getName',
      'getEmail',
      'setIsLogged',
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
      ],
      declarations: [DashboardComponent],
      providers: [
        { provide: HttpService, useValue: httpServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call visualizzaAllPost on ngOnInit', () => {
    const spy = spyOn(component, 'visualizzaAllPost');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call aggiungiPost and reset bodyPost on aggiungiPost', () => {
    component.bodyPost = 'Test body';
    const fakePost = { id: 1, userName: 'Test User', body: 'Test body' };
    httpServiceSpy.aggiungiPost.and.returnValue(of(fakePost));

    component.aggiungiPost();

    expect(httpServiceSpy.aggiungiPost).toHaveBeenCalledWith(
      jasmine.any(Object)
    );
    expect(component.bodyPost).toBe('');
  });

  it('should call visualizzaCommenti with postId on visualizzaCommenti', () => {
    const postId = 1;
    const spy = spyOn(component, 'visualizzaCommenti');

    component.visualizzaCommenti(postId);

    expect(spy).toHaveBeenCalledWith(postId);
  });

  it('should call leggiCommentiPost with postId on leggiCommenti', () => {
    const postId = 1;
    const spy = spyOn(component, 'leggiCommenti');

    component.leggiCommenti(postId);

    expect(spy).toHaveBeenCalledWith(postId);
  });

  it('should toggle commentoStato on commenta', () => {
    const postId = 1;

    expect(component.commentoStato[postId]).toBeFalsy();

    component.commenta(postId);
    expect(component.commentoStato[postId]).toBeTruthy();

    component.commenta(postId);
    expect(component.commentoStato[postId]).toBeFalsy();
  });

  it('should toggle miPiaceStato on miPiace', () => {
    const postId = 1;

    expect(component.miPiaceStato[postId]).toBeFalsy();

    component.miPiace(postId);
    expect(component.miPiaceStato[postId]).toBeTruthy();

    component.miPiace(postId);
    expect(component.miPiaceStato[postId]).toBeFalsy();
  });

  it('should display posts correctly', () => {
    const fakeUser = { id: 1, name: 'Test User' };
    const fakePost = { id: 1, userName: 'Test User', body: 'Test body' };
    httpServiceSpy.trovaUsers.and.returnValue(of([fakeUser]));
    httpServiceSpy.trovaPostDellUtente.and.returnValue(of([fakePost]));

    fixture.detectChanges();

    const postElement = fixture.debugElement.query(By.css('.single-post'));
    expect(postElement).toBeTruthy();
    expect(postElement.nativeElement.textContent).toContain('Test User');
    expect(postElement.nativeElement.textContent).toContain('Test body');
  });
});

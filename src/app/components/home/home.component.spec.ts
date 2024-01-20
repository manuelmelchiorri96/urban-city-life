import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../../services/core/local-storage.service';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let localStorageService: LocalStorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      providers: [LocalStorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    localStorageService = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login if not logged in', () => {
    spyOn(localStorageService, 'getIsLogged').and.returnValue('false');
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to next slide on nextSlide()', () => {
    const initialIndex = component.currentIndex;
    component.nextSlide();
    expect(component.currentIndex).toBe(
      (initialIndex + 1) % component.slides.length
    );
  });

  it('should navigate to previous slide on prevSlide()', () => {
    const initialIndex = component.currentIndex;
    component.prevSlide();
    expect(component.currentIndex).toBe(
      (initialIndex - 1 + component.slides.length) % component.slides.length
    );
  });
});

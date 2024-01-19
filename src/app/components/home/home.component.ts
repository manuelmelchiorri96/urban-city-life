import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/core/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  currentIndex = 0;
  intervalId: any;
  slides = [
    'assets/immagine_1.png',
    'assets/immagine_2.jpg',
    'assets/immagine_3.jpg',
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startAutoSlide();

    if (this.localStorageService.getIsLogged() !== 'true') {
      this.router.navigate(['login']);
    }
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  onArrowClick() {
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }
}

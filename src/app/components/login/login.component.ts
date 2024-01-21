import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/core/local-storage.service';
import { HttpService } from '../../services/http-service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;
  message: string = '';
  prendiNuovoToken: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  tokenFormControl = new FormControl('', [Validators.required]);
  nuovoTokenFormControl = new FormControl('', [Validators.required]);

  convertEmailToLowerCase() {
    const email = this.emailFormControl.value;
    if (email) {
      this.emailFormControl.setValue(email.toLowerCase());
    }
  }

  onSubmit() {
    const email = this.emailFormControl.value;
    const token = this.tokenFormControl.value;

    if (email && token) {
      if (
        email === this.localStorageService.getEmail() &&
        token === this.localStorageService.getToken() &&
        token !== ''
      ) {
        this.prendiNuovoToken = true;
        this.message = '';
      } else if (email !== this.localStorageService.getEmail()) {
        this.message = "L' e-mail inserita è errata";
      } else if (token !== this.localStorageService.getToken()) {
        this.message = 'Il token inserito è errato';
      }
      if (this.prendiNuovoToken && this.nuovoTokenFormControl.value) {
        const nuovoToken = this.nuovoTokenFormControl.value;
        this.localStorageService.setToken(nuovoToken);
        this.message = '';

        if (email === this.localStorageService.getEmail()) {
          this.httpService.trovaUsers().subscribe({
            next: (data) => {
              this.isLogged = true;
              this.localStorageService.setIsLogged(this.isLogged);
              this.router.navigate(['home']);
            },
            error: (error) => {
              console.error('Error fetching data:', error);
              this.message = 'Nuovo token non valido';
            },
          });
        }
      }
    }
  }
}

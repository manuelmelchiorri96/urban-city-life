import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserSignUp } from '../../models/interface/userSignUp';
import { LocalStorageService } from '../../services/core/local-storage.service';
import { HttpService } from '../../services/http-service/http.service';

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.css',
})
export class RegistrazioneComponent implements OnInit {
  user: UserSignUp = {
    name: '',
    email: '',
    gender: '',
    status: '',
  };
  message: string = '';
  isLogged: boolean = false;
  generi: any[] = ['male', 'female'];

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.userIsLogged()) {
      this.isLogged = true;
    }
  }

  userIsLogged(): boolean {
    return this.localStorageService.getIsLogged() === 'true';
  }

  nomeFormControl = new FormControl('', [Validators.required]);
  genereFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  tokenFormControl = new FormControl('', [Validators.required]);

  capitalizeFirstLetter() {
    const nome = this.nomeFormControl.value;
    if (nome) {
      this.nomeFormControl.setValue(
        nome.charAt(0).toUpperCase() + nome.slice(1)
      );
    }
  }

  convertEmailToLowerCase() {
    const email = this.emailFormControl.value;
    if (email) {
      this.emailFormControl.setValue(email.toLowerCase());
    }
  }

  onSubmit() {
    const nome = this.nomeFormControl.value;
    const genere = this.genereFormControl.value;
    const email = this.emailFormControl.value;
    const token = this.tokenFormControl.value;
    const status = 'active';

    if (nome && genere && email && token) {
      this.user = {
        name: nome,
        email: email,
        gender: genere,
        status: status,
      };

      if (!this.isLogged) {
        this.localStorageService.setToken(token);
      }

      this.httpService.registraUser(this.user).subscribe({
        next: (data) => {
          if (!this.isLogged) {
            this.message =
              genere === 'male'
                ? nome + ', ti sei registrato correttamente.'
                : nome + ', ti sei registrata correttamente.';

            this.localStorageService.setName(nome);
            this.localStorageService.setEmail(email);
            this.localStorageService.setGenere(genere);
            this.localStorageService.setStatus(status);
            this.localStorageService.setId(data['id']);
          } else {
            this.message =
              this.localStorageService.getName() +
              ', hai registrato correttamente ' +
              nome;
          }
        },
        error: (err) => {
          console.error('Errore durante la richiesta:', err);
          console.log(err.status);

          if (err.status === 401) {
            this.message = 'Token non valido.';
          } else if (err.status === 422) {
            this.message = "L' e-mail inserita è già esistente.";
          }
        },
      });
    }
  }
}

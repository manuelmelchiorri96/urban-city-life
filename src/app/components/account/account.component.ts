import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/interface/user';
import { LocalStorageService } from '../../services/core/local-storage.service';
import { HttpService } from '../../services/http-service/http.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    email: '',
    gender: '',
    status: '',
  };
  editing: boolean = false;
  nomeUtente: string | null = this.localStorageService.getName();
  startDelete: boolean = false;

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caricaProfilo();
  }

  caricaProfilo() {
    this.httpService.trovaUsers().subscribe({
      next: (data) => {
        const userIdToFind = Number(this.localStorageService.getId());
        const userToFind = data.find((user: any) => user.id === userIdToFind);

        if (userToFind) {
          this.user = {
            id: userToFind.id,
            name: userToFind.name,
            email: userToFind.email,
            gender: userToFind.gender,
            status: userToFind.status,
          };
        } else {
          console.log('Utente non trovato');
        }
      },
      error: (error) => {
        console.error(error);

        if (error.status === 401) {
          this.localStorageService.setIsLogged(false);
          this.router.navigate(['login']);
        }
      },
    });
  }

  editProfile() {
    this.editing = true;
  }

  saveChanges() {
    this.httpService.modificaProfilo(this.user).subscribe({
      next: (data) => {
        if (
          this.user.email &&
          this.user.gender &&
          this.user.name &&
          this.user.status
        ) {
          this.localStorageService.setId(this.user.id.toString());
          this.localStorageService.setEmail(this.user.email);
          this.localStorageService.setName(this.user.name);
          this.localStorageService.setStatus(this.user.status);
          this.localStorageService.setGenere(this.user.gender);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
    this.user = {
      id: Number(this.localStorageService.getId()),
      name: this.localStorageService.getName(),
      email: this.localStorageService.getEmail(),
      gender: this.localStorageService.getGenere(),
      status: this.localStorageService.getStatus(),
    };
  }

  cancelDelete() {
    this.startDelete = false;
  }

  startDeleteProfile() {
    this.startDelete = true;
  }

  deleteAccount() {
    this.httpService.eliminaUser(this.user.id).subscribe({
      next: (data) => {
        this.startDelete = false;
        this.logout();
      },
      error: (error) => {
        console.error(error);
        this.startDelete = false;
      },
    });
  }

  logout() {
    this.localStorageService.setIsLogged(false);
    this.localStorageService.setEmail('');
    this.router.navigate(['login']);
  }
}

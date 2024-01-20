import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/interface/user';
import { LocalStorageService } from '../../services/core/local-storage.service';
import { HttpService } from '../../services/http-service/http.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.css',
})
export class UtentiComponent implements OnInit {
  showDeleteConfirmation: boolean = false;
  idUtenteDaEliminare: number = 0;
  users: User[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'gender',
    'status',
    'elimina-utente',
  ];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.leggiUtenti();
  }

  leggiUtenti() {
    this.httpService.trovaUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
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

  isMyAccount(email: string) {
    return email === this.localStorageService.getEmail();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    if (!filterValue) {
      this.dataSource.filter = '';
      return;
    }

    // Filtra gli utenti in base al valore digitato nel campo Filter
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const nameMatch = (data.name ?? '').toLowerCase().includes(filter);
      const emailMatch = (data.email ?? '').toLowerCase().includes(filter);
      const genderMatch = (data.gender ?? '').toLowerCase() === filter;
      const statusMatch = (data.status ?? '').toLowerCase() === filter;

      return nameMatch || emailMatch || genderMatch || statusMatch;
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  confirmDelete() {
    this.showDeleteConfirmation = false;

    this.httpService.eliminaUser(this.idUtenteDaEliminare).subscribe({
      next: (data) => {
        this.leggiUtenti();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  eliminaUtente(userId: number) {
    this.showDeleteConfirmation = true;
    this.idUtenteDaEliminare = userId;
  }
}

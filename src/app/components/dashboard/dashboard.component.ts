import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commento } from '../../models/interface/commento';
import { Post } from '../../models/interface/post';
import { RegisterPost } from '../../models/interface/registerPost';
import { User } from '../../models/interface/user';
import { LocalStorageService } from '../../services/core/local-storage.service';
import { HttpService } from '../../services/http-service/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  allPost: Post[] = [];
  allUsers: User[] = [];
  bodyPost: string = '';
  nuovoPost: RegisterPost = {
    user_id: 0,
    title: '',
    body: '',
  };

  commento: Commento = {
    name: '',
    email: '',
    body: '',
    post_id: 0,
  };
  commentoErr: string = '';
  commentiPost: Commento[] = [];
  vediCommenti: number | null = null;

  commentoStato: { [postId: number]: boolean } = {};
  numeroCommentiMap: { [postId: number]: number } = {};
  miPiaceStato: { [postId: number]: boolean } = {};

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.visualizzaAllPost();
  }

  aggiungiPost() {
    this.nuovoPost = {
      user_id: Number(this.localStorageService.getId()),
      title: 'Post',
      body: this.bodyPost,
    };

    this.httpService.aggiungiPost(this.nuovoPost).subscribe({
      next: (data) => {
        this.allPost.unshift(data);
        const ultimoPost = this.allPost[0];
        ultimoPost.userName = this.localStorageService.getName();

        this.numeroCommentiMap[data.id] = 0;
        this.bodyPost = '';
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  visualizzaAllPost() {
    this.httpService.trovaUsers().subscribe({
      next: (users) => {
        this.allUsers = users;

        this.allUsers.forEach((user) => {
          this.httpService.trovaPostDellUtente(user.id).subscribe({
            next: (userPosts) => {
              userPosts.forEach((post: Post) => {
                post.userName = user.name;
                this.allPost.push(post);
                this.numeroCommentiMap[post.id] = 0;
                this.leggiCommenti(post.id);
              });
            },
            error: (error) => {
              console.error(error);
            },
          });
        });
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

  gestisciAzione(postId: number, azione: string) {
    switch (azione) {
      case 'miPiace':
        this.miPiace(postId);
        break;
      case 'inviaCommento':
        this.inviaCommento(postId);
        break;
      case 'commenta':
        this.commenta(postId);
        break;
    }
  }

  commenta(postId: number) {
    this.commentoStato[postId] = !this.commentoStato[postId];
  }

  miPiace(postId: number) {
    this.miPiaceStato[postId] = !this.miPiaceStato[postId];
  }

  inviaCommento(postId: number) {
    this.commento = {
      name: this.localStorageService.getName(),
      email: this.localStorageService.getEmail(),
      body: this.commento.body,
      post_id: postId,
    };

    this.httpService.commentaPost(this.commento).subscribe({
      next: (data) => {
        this.commento.body = '';
        this.leggiCommenti(postId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  visualizzaCommenti(postId: number) {
    this.leggiCommenti(postId);

    if (this.vediCommenti === postId || this.numeroCommentiMap[postId] === 0) {
      this.vediCommenti = null;
    } else {
      this.vediCommenti = postId;
    }
  }

  leggiCommenti(postId: number) {
    this.httpService.leggiCommentiPost(postId).subscribe({
      next: (data) => {
        this.commentiPost = data;
        this.numeroCommentiMap[postId] = data.length;
        this.commentoStato[postId] = false;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

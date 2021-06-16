import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces/Post.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dahsboard-page',
  templateUrl: './dahsboard-page.component.html',
  styleUrls: ['./dahsboard-page.component.scss']
})
export class DahsboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public unsubscribe: Subscription = new Subscription();
  public searchStr: string = '';

  constructor(private auth: AuthService, private postsService: PostsService) {
  }

  public ngOnInit(): void {
    this.postsService.getAllPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }


  test() {
    console.log(this.auth.token);
  }


  remove(id: number) {
    this.postsService.remove(id).subscribe((post) => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }
}

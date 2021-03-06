import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../shared/interfaces/Post.interface';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../shared/posts.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  @Input() post: Post;
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {
  }

  ngOnInit() {
    this.post$ = this.route.params
      .pipe(switchMap((params) => {
        return this.postService.getById(params['id']);
      }));
  }

}

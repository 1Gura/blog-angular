import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {PostsService} from '../../shared/posts.service';
import {switchMap} from 'rxjs/operators';
import {Post} from '../../shared/interfaces/Post.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  post: Post;
  dataForm: FormGroup;
  submitted: boolean = false;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id']);
      })).subscribe((post: Post) => {
      this.post = post;
      this.dataForm = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      });
    });
  }

  submit() {
    if (this.dataForm.invalid) {
      return;
    }
    this.post.text = this.dataForm.value.text;
    this.post.title = this.dataForm.value.title;
    this.submitted = true;
    this.sub = this.postService.editPost(this.post).subscribe(() => {
      this.submitted = false;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

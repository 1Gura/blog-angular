import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces/Post.interface';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  });

  constructor(private postsService: PostsService, private alert: AlertService) {
  }

  ngOnInit() {

  }

  public submit() {
    if (this.dataForm.invalid) {
      return;
    }
    const post: Post = {
      title: this.dataForm.value.title,
      author: this.dataForm.value.author,
      text: this.dataForm.value.text,
      date: new Date()
    };
    this.postsService.create(post).subscribe((data:Post)=>{
      this.dataForm.reset();
      this.alert.success('Пост был создан');
      })
  }

}

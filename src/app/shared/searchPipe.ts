import {Pipe, PipeTransform} from '@angular/core';
import {Post} from './interfaces/Post.interface';

@Pipe({
  name: 'searchPosts'
})

export class SearchPipe implements PipeTransform{
  transform(posts: Post[], search: string): any {
    if (!search.trim()) {
      return posts
    }
    return posts.filter((post)=>{
      return post.title.toLowerCase().includes(search.toLowerCase());
    })
  }

}

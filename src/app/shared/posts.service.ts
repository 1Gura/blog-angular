import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './interfaces/Post.interface';

@Injectable({providedIn: 'root'})
export class PostsService {
  private fbDbUrl = 'https://localhost:44353/api/post';

  constructor(private http: HttpClient) {
  }

  public create(post: Post): Observable<Post> {
    const urlString = `${this.fbDbUrl}/createPost`;
    return this.http.post<Post>(urlString, post);
  }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.fbDbUrl);
  }

  public getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.fbDbUrl}/${id}`);
  }

  public editPost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${this.fbDbUrl}`, post);
  }

  public remove(id: number): Observable<void> {
    const str = `https://localhost:44353/api/post/deletePost/${id}`;
    return this.http.delete<void>(str);
  }

}

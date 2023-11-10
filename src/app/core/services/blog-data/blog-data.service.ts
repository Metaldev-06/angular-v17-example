import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostData } from '../../interfaces/post-data/post-data';
import { CourseData } from '../../interfaces/course-data/course-data';

@Injectable({
  providedIn: 'root',
})
export class BlogDataService {
  private readonly apiUrl = environment.apiUrl;

  private blogData: BehaviorSubject<PostData> = new BehaviorSubject(
    {} as PostData
  );
  public blogData$ = this.blogData.asObservable();

  private readonly http = inject(HttpClient);

  constructor() {
    const blogDataStorage = sessionStorage.getItem('blogData');

    if (blogDataStorage) {
      this.blogData.next(JSON.parse(blogDataStorage));
    }
  }

  setBlogData(data: PostData) {
    sessionStorage.setItem('blogData', JSON.stringify(data));
    this.blogData.next(data);
  }

  clearBlogData() {
    sessionStorage.removeItem('blogData');
  }

  private getCommonParams(): HttpParams {
    return new HttpParams()
      .set('fields[0]', 'title')
      .set('fields[1]', 'slug')
      .set('fields[2]', 'description')
      .set('fields[3]', 'technology')
      .set('fields[4]', 'publishedAt')
      .set('populate[image][fields][5]', 'formats');
  }

  getPosts(page = 1): Observable<PostData> {
    let params = this.getCommonParams()
      .set('sort', 'publishedAt:desc')
      .set('pagination[pageSize]', '8')
      .set('pagination[page]', page);

    return this.http.get<PostData>(`${this.apiUrl}/posts`, { params });
  }

  getPostBySlug(slug: string): Observable<PostData> {
    const params = new HttpParams()
      .set('populate', '*')
      .set('filters[slug][$eq]', slug);

    return this.http.get<PostData>(`${this.apiUrl}/posts`, { params });
  }

  getLatestPosts(): Observable<PostData> {
    const params = this.getCommonParams()
      .set('sort', 'publishedAt:desc')
      .set('pagination[limit]', '4');

    return this.http.get<PostData>(`${this.apiUrl}/posts`, { params });
  }

  getCoursesByYoutube(): Observable<CourseData> {
    const params = new HttpParams().set('populate', '*');

    return this.http.get<CourseData>(`${this.apiUrl}/courses`, {
      params,
    });
  }

  searchPost(query: string): Observable<PostData> {
    const params = this.getCommonParams()
      .set('filters[$or][0][title][$containsi]', query)
      .set('filters[$or][1][technology][$containsi]', query)
      .set('pagination[limit]', '5');
    return this.http.get<PostData>(`${this.apiUrl}/posts`, { params });
  }

  searchCourse(query: string): Observable<CourseData> {
    const params = new HttpParams()
      .set('filters[$or][0][title][$containsi]', query)
      .set('filters[$or][1][technology][$containsi]', query)
      .set('populate', '*')
      .set('pagination[limit]', '5');
    return this.http.get<CourseData>(`${this.apiUrl}/courses`, { params });
  }
}

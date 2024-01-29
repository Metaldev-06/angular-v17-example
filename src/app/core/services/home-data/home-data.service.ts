import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@src/environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DataAttributes,
  HomeDataResponse,
} from '../../interfaces/home-data/home-data';
import { ProjectDataResponse } from '../../interfaces/project-data/project-data';
import { i18nService } from '../transloco/i18n.service';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {
  private homeData: BehaviorSubject<DataAttributes> = new BehaviorSubject(
    {} as DataAttributes,
  );
  public homeData$ = this.homeData.asObservable();

  private readonly apiUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);

  constructor() {
    const homeDataStorage = sessionStorage.getItem('homeData');

    if (homeDataStorage) {
      this.homeData.next(JSON.parse(homeDataStorage));
    }
  }

  getData(lang?: string): Observable<HomeDataResponse> {
    if (lang === 'es') {
      lang = 'es-AR';
    } else {
      lang = 'en';
    }

    const params = new HttpParams()
      .set('populate[0]', 'projects')
      .set('populate[1]', 'projects.image')
      .set('populate[2]', 'image_profile')
      .set('populate[3]', 'resume_cv')
      .set('populate[4]', 'skills')
      .set('populate[5]', 'skills.image')
      .set('populate[6]', 'certifications')
      .set('populate[7]', 'certifications.image')
      .set('populate[8]', 'educations')
      .set('populate[9]', 'educations.image')
      .set('locale', lang!);

    return this.http.get<HomeDataResponse>(`${this.apiUrl}/home`, { params });
  }

  getProjectsData(): Observable<ProjectDataResponse> {
    const params = new HttpParams().set('populate', 'image');

    return this.http.get<ProjectDataResponse>(`${this.apiUrl}/projects`, {
      params,
    });
  }

  setHomeData(data: DataAttributes) {
    sessionStorage.setItem('homeData', JSON.stringify(data));
    this.homeData.next(data);
  }

  clearHomeData() {
    sessionStorage.removeItem('homeData');
    this.homeData.next({} as DataAttributes);
  }

  getHomeData() {
    sessionStorage.getItem('homeData');
  }
}

import {TRIP} from '../models/tripModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {endpoints} from '../config';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  getTrip(body): Observable<TRIP[]> {
    return this.httpClient.post<TRIP[]>(endpoints.BASE, body);
  }
  constructor(private httpClient: HttpClient) { }
}

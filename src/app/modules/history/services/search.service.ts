import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly URL=  environment.api;

  constructor(private http: HttpClient) { }

  searchTracks(term: string): Observable<any>{
    return this.http.get(this.URL+ '/tracks?src='+ term)

  }
}

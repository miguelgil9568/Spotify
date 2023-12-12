import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {TracksModel} from "@core/model/tacks.model";
import * as dataRaw from '../../../data/tracks.json'
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrackService {


  private readonly URL = environment.api;

  dataTracksTrending$ : Observable<TracksModel[]> = of([])
  dataTracksRandom$ : Observable<TracksModel[]> = of([])

  constructor( private httpClient:HttpClient) {
    // const {data} : any = (dataRaw as any).default;
    //
    // this.dataTracksTrending$ = of(data);
    //
    // this.dataTracksRandom$ = new Observable((observer) => {
    //   const trackExample: TracksModel = {
    //     _id: 9,
    //     name: 'Regalada sales cara',
    //     album: 'Rio bravo',
    //     url: 'http:',
    //     cover: 'https://i.musicaimg.com/fotos/foto_37720_2.jpg'
    //   }
    //   setTimeout(() => {
    //     observer.next([trackExample]);
    //   }, 3500)
    // });
  }

  /**
   *
   */
  getAllTracks$ (): Observable<any>{
    return this.httpClient.get(this.URL+'/tracks').pipe(
      map((dataRaw: any)=>{
        return dataRaw.data;
      })
    )
  }

  /**
   *
   */

  getAllRandom$ (): Observable<any>{
    return this.httpClient.get(this.URL+'/tracks').pipe(
      map((dataRaw: any)=>{
        return dataRaw.data.reverse();
      })
    )
  }


  getAllRandomPipe$ (): Observable<any>{
    return this.httpClient.get(this.URL+'/tracks').pipe(
      map((dataRaw: any)=>{
        return dataRaw.reverse();
      },
      catchError(err => {
        console.log('Revisame algo paso ',err);
        return of([])
      }))
    )
  }
}

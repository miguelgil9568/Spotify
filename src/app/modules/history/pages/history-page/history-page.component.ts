import { Component, OnInit } from '@angular/core';
import {SearchService} from "@modules/history/services/search.service";
import {TracksModel} from "@core/model/tacks.model";
import {map, Observable, of} from "rxjs";

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  tracksResult: Observable<any>= of([]);

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(event: string){
    console.log('Estoy en el padre --->, ', event);
    this.tracksResult = this.searchService.searchTracks(event)
      .pipe(
        map((dataRaw: any) => dataRaw.data)
      );
    //   .subscribe(response =>{
    //     this.tracksResult= response;
    // })
  }


}

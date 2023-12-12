import {Component, OnDestroy, OnInit} from '@angular/core';
import { TracksModel} from "@core/model/tacks.model";
import {TrackService} from "@modules/tracks/services/track.service";
import {Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {


  mockTrending : Array <TracksModel> = [];
  mockRandom : Array <TracksModel> = [];

  listbserver$ : Array<Subscription> = []

  constructor(private trackServices: TrackService) { }

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  loadDataAll(){
    this.trackServices.getAllTracks$()
      .subscribe((response: TracksModel[]) => {
      this.mockTrending = response;
    })
  }

  loadDataRandom(){
    this.trackServices.getAllRandom$().subscribe((response: TracksModel[]) => {
      this.mockRandom = response;
    })
  }

  ngOnDestroy(): void {
  }

}

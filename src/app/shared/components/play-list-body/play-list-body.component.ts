import {Component, Input, OnInit} from '@angular/core';
import * as dataRaw from '../../../data/tracks.json';
import {TracksModel} from "@core/model/tacks.model";
import {MultimediaService} from "@shared/services/multimedia.service";
import {TrackService} from "@modules/tracks/services/track.service";

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {



  @Input() tracks : Array <TracksModel> = [];
  optionSort : {propertie: string | null, order: string } = {propertie: null, order: 'asc'}

  constructor(public multimediaService:MultimediaService,
              private trackService: TrackService) { }

  ngOnInit(): void {
    const { data } : any  = (dataRaw as any).default
    // console.log(data);
    this.trackService.getAllTracks$().subscribe( response=>{
      this.tracks = response;
    })
  }

  changeSort(properte: string){
    const { order } = this.optionSort;
    this.optionSort = {
      propertie: properte,
      order: order === 'asc' ? 'desc' : 'asc'
    }
  }


  play(track: TracksModel){
    console.log('cancion enviada ', track)
    this.multimediaService.trackInfo$.next(track);
  }

}

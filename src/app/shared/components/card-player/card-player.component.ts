import {Component, Input, OnInit} from '@angular/core';
import {TracksModel} from "@core/model/tacks.model";
import {MultimediaService} from "@shared/services/multimedia.service";

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {

  @Input()
  public track: TracksModel = {
    name: ''
    ,
    album: ''
    ,
    cover: ''
    ,
    url: ''
    ,
    _id: ''
  };

  @Input()
  mode : 'small' | 'big' = 'small';

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
  }

  sendPlay(track: TracksModel){
    // console.log('Enviando cancion al reproductor ---->' ,track);
    // this.multimediaService.callBack.emit(track);
    this.multimediaService.trackInfo$.next(track);

  }



}

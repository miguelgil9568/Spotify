import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TracksModel} from "@core/model/tacks.model";
import {MultimediaService} from "@shared/services/multimedia.service";
import {Observable, Subscription} from "rxjs";
import * as dataRaw from "../../../data/tracks.json"; //Programacion reactiva

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  // mockCover!: TracksModel ;

  // listObservers$: Array<Subscription> = []

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    // const observer1$: Subscription = this.multimediaService.callBack.subscribe((response: TracksModel) =>{
    //   console.log('Recibiendo cancion ---> ', response)
    // })
    // this.listObservers$ = [observer1$];
    // this.multimediaService.trackInfo$.subscribe( reponse =>{
    //   console.log('Debo reproducir esta cancion ', reponse)
    // })
  }

  ngOnDestroy(): void {
    // this.listObservers$.forEach(u => u.unsubscribe());
    // console.log('BOOMMMMM se destruyo el componente' )
  }

  public handlePosition(event: MouseEvent){
    const {clientX} = event;
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x;
    const percentageX = (clickX * 100) / width;
    this.multimediaService.saltarPlayer(percentageX);
    console.log(clientX,' ---- ' ,width, '--------', x);
  }

  next(){
    console.log('Finaliza la cancion ');
    const { data } : any  = (dataRaw as any).default;
    console.log('Cancion entrante ', data[0]);
    this.multimediaService.trackInfo$.next(data[0]);
  }

}

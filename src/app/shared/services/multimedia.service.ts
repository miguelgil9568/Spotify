import {EventEmitter, Injectable} from '@angular/core';
import {TracksModel} from "@core/model/tacks.model";
import {BehaviorSubject, Observable, Observer, Subject} from "rxjs";
import * as dataRaw from "../../data/tracks.json";

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                              callBack: EventEmitter<any> = new EventEmitter<any>();


  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public timeElapsed: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public playStatus: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playPercentage: BehaviorSubject<number> = new BehaviorSubject(0)

  public audio: HTMLAudioElement =  new Audio();

  constructor() {
    this.trackInfo$.subscribe(responseOk => {
      if (responseOk) {
        this.setAudio(responseOk);
        this.listenAllEvents();
        console.log('Llego al service ', responseOk)
      }
    })
    // this.myObservable1$ = new Observable(
    //   (observer: Observer<any>) =>{
    //     observer.next();
    //     observer.complete()
    //  });
  }

  public setAudio(track: TracksModel) {
    this.audio.src = track.url;
    this.audio.play();
  }

  private listenAllEvents() {
    this.audio.addEventListener('timeupdate', this.calculeTime, false)
    this.audio.addEventListener('playing', this.setplayerstatus, false)
    this.audio.addEventListener('pause', this.setplayerstatus, false)
    this.audio.addEventListener('play', this.setplayerstatus, false)
    this.audio.addEventListener('ended', this.setplayerstatus, false)

  }

  private setplayerstatus = (state: any) => {
    console.log('Evento de play' + state);
    switch (state.type) {
      case 'play':
        this.playStatus.next('play')
        break;
      case 'playing':
        this.playStatus.next('playing')
        break;
      case 'ended':
        this.playStatus.next('ended') ;
        console.log('Finaliza la cancion ');
        const { data } : any  = (dataRaw as any).default;
        console.log('Cancion entrante ', data[0]);
        this.setAudio(data[0]);
        this.listenAllEvents();
        break;
      default:
        this.playStatus.next('paused')
        break;
    }

  }

  public togglePlayer(){
    (this.audio.paused) ? this.audio.play(): this.audio.pause();
  }

  public saltarPlayer(percentage: number){
    const {duration} = this.audio;
    const percentagetosencont = (percentage * duration) / 100
    this.audio.currentTime = percentagetosencont;
  }

  private calculeTime = () => {
    const {duration, currentTime} = this.audio
    // console.table([duration, currentTime])
    this.setTimeElased(currentTime);
    this.setTimeReimining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setPercentage(currenTime: number, duration: number){
    const percentage = (currenTime * 100) / duration;
    this.playPercentage.next(percentage);
   }

  private setTimeElased(currenTime: number) {
    let seconds = Math.floor(currenTime % 60)
    let minutes = Math.floor((currenTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? '0' + seconds : seconds;
    const displayMinutes = (minutes < 10) ? '0' + minutes : seconds;

    const displayFormat = displayMinutes + ':' + displaySeconds;

    this.timeElapsed.next(displayFormat);
    this.timeElapsed.next(displayFormat);

  }

  private setTimeReimining(currenTime: number, duration: number) {
    let timeLeft = duration - currenTime;

    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)

    const displaySeconds = (seconds < 10) ? '0' + seconds : seconds;
    const displayMinutes = (minutes < 10) ? '0' + minutes : seconds;

    const displayFormat = displayMinutes + ':' + displaySeconds;

    this.timeRemaining.next(displayFormat);

  }


}

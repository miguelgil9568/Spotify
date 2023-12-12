import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  constructor(private elHost: ElementRef) {
    console.log(this.elHost);
  }

  @HostListener('error') handlerError(){
    const elNative = this.elHost.nativeElement;
    console.log('Esta imagen revento ----> ' , this.elHost );
    elNative.src = '../../../assets/images.png'
  }
}

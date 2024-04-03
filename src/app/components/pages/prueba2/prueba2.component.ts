import { Component, ElementRef, Renderer2 } from '@angular/core';
import gsap, {Power2} from 'gsap';

@Component({
  selector: 'app-prueba2',
  templateUrl: './prueba2.component.html',
  styleUrls: ['./prueba2.component.scss']
})
export class Prueba2Component {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {

    this.createBox(window.innerWidth/2, window.innerHeight/2);

    //Con timeLine encadeno .to que se ejecutan en cascada

    const tl1 = gsap.timeline()
    .to(".box", { //Esto es hacia lo que va el elemento
      scale: 3,
      duration: 4,
      rotate: 90,
      delay: 1,
      ease: Power2.easeOut
    })
    .addLabel("toRed") //Los labels para al hacer tl1.seek("toRed"); empieze ahi la animacion
    .to(".box", {

      background: "red"
    })
    .addLabel("fadeOut")
    .to(".box", {
      delay: 1,
      opacity: 0
    });


  }

  createBox(left: number, top: number){
    const boxDomEl = this.renderer.createElement('div');
    this.renderer.addClass(boxDomEl, 'box');
    this.renderer.appendChild(this.elementRef.nativeElement, boxDomEl);

    gsap.set(boxDomEl, { //Esto es como empieza el elemento
      left: left-50,
      top: top -50,
      scale: 1,
    })
  }

  randomInt(min: number, max: number): number {
    // Asegurarse de que min y max sean enteros
    min = Math.ceil(min);
    max = Math.floor(max);
    // Generar un número aleatorio entre min (incluido) y max (excluido)
    return Math.floor(Math.random() * (max - min)) + min;
  }

  randomFloat(min: number, max: number): number {
    // Generar un número aleatorio entre min (incluido) y max (incluido)
    return Math.random() * (max - min) + min;
  }
}

import { Component, ElementRef, Renderer2 } from '@angular/core';
import gsap, {Bounce, random} from 'gsap';

@Component({
  selector: 'app-prueba1',
  templateUrl: './prueba1.component.html',
  styleUrls: ['./prueba1.component.scss']
})
export class Prueba1Component {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const padding = 120;

    for(let x = 0; x < window.innerWidth; x += padding){
      for(let y = 0; y < window.innerHeight; y += padding){
        this.createBox(x,y);
      }
    }

    gsap.to(".box", { //Esto es hacia lo que va el elemento
      background: 'pink',
      rotate: 90,
      duration: 5,
      delay: 1,
      //opacity: 0,
      xPercent: "+=100",
      scale: 0.2,
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 4,
        from: "center",
        grid: "auto"
      },
      // onComplete: () => {
      //   alert("animacion terminada");
      // }
      ease: Bounce.easeInOut,
    });

  }

  createBox(left: number, top: number){
    const boxDomEl = this.renderer.createElement('div');
    this.renderer.addClass(boxDomEl, 'box');
    this.renderer.appendChild(this.elementRef.nativeElement, boxDomEl);

    gsap.set(boxDomEl, { //Esto es como empieza el elemento
      left,
      top,
      scale: this.randomFloat(0.2,1),
      background: `rgba(${this.randomInt(100,255)},0,0,1)`,
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

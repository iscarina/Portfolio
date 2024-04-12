import { Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
//import { SplitText } from "gsap-trial/dist/SplitText";
import { Power2 } from 'gsap';


//gsap.registerPlugin(SplitText);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  private tweens: { [key: string]: gsap.core.Tween } = {}; // Define tweens como una propiedad privada

  constructor(private _renderer: Renderer2, private elementRef: ElementRef, private router: Router){

  }

  ngOnInit(){

    this._renderer.setStyle(document.body, 'overflow', 'hidden');

    const letters: HTMLElement[] = Array.from(document.querySelectorAll(".letter"));

    letters.forEach((letter: HTMLElement, index: number) => {
      this.tweens[index.toString()] = gsap.to(letter, { yPercent: -50, yoyo: true, repeat: 1, paused: true });
      letter.dataset['tween'] = index.toString();
    });

    const element: HTMLElement | null = document.querySelector('.wtg');
    if (element) {
      element.addEventListener('mouseover', (event: MouseEvent) => this.onMouseOver(event));
    }

  }

  ngOnDestroy(): void {
    this._renderer.removeStyle(document.body, 'overflow');
  }

  onName(){
    gsap.timeline()
    .to('.letter', {
      duration: 0.5, // Duración del impulso inicial en segundos
      y: -100, // Desplazamiento vertical hacia arriba
      ease: "power2.out" // Easing para una animación más suave
    })
    .to('.letter', {
      duration: 0.5, // Duración de la caída en segundos
      y: 0, // Regresar a la posición original
      ease: "elastic.out(1, 0.3)" // Easing elástico para simular la caída con efecto de rebote
    });
  }

  onNameLeave(){

  }

  onMouseEnter() {
    gsap.to('.overlay', { duration: 0.5, ease: 'power2.out', width: '100%', left: '0%', right: 'auto' });
    gsap.to('.text', { duration: 0.5, ease: 'power2.out', color: 'white' });
    gsap.to('.conoceme', { duration: 0.5, ease: 'power2.out', border: '1px solid white'});
    gsap.to('.fas', {duration: 0.7, rotate: 360});
  }

  onMouseLeave() {
    gsap.to('.overlay', { duration: 0.5, ease: 'power2.out', width: '0%', left: 'auto', right: '0%' });
    gsap.to('.text', { duration: 0.5, ease: 'power2.out', color: 'black' });
    gsap.to('.conoceme', { duration: 0.5, ease: 'power2.out', border: 'none'});
    gsap.to('.fas', {duration: 0.7, rotate: 0});
  }

  onMouseEnterCircle(event: MouseEvent){
      gsap.to('#circle', {
        duration: 0.3,
        scaleX: 1.1,
        scaleY: 1.1,
        ease: 'elastic.out(1, 0.3)'
      });
  }

  onMouseLeaveCircle(){
    gsap.to('#circle', {
      duration: 0.3,
      scaleX: 1,
      scaleY: 1,
      ease: 'elastic.out(1, 0.3)'
    });
  }

  onMouseOver(event: MouseEvent) {
    const trg: HTMLElement = event.target as HTMLElement;

    if (trg.dataset['tween']) {
      const tween: gsap.core.Tween = this.tweens[trg.dataset['tween']];

      if (!gsap.isTweening(trg)) {
        tween.play(0);
      }
    }
  }

  goToConoceme(){
    this.router.navigateByUrl('/conoceme');
  }

  goToProyects(){
    this.router.navigateByUrl('/proyectos');
  }

}

import { Component, OnInit, Renderer2 } from '@angular/core';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { NONE_TYPE } from '@angular/compiler';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {
    //this._renderer.setStyle(document.body, 'overflow', 'hidden');

    gsap.set(".a.name", { rotation: 0 });

    //Con timeLine encadeno .to que se ejecutan en cascada
    const tl1 = gsap.timeline()
    .to(".a.name", { //Esto es hacia lo que va el elemento
      left: "-50vw",
    })
    .to(".a.job", {
      left: "-50vw",
      rotate: 30,
      rotateX: 180
    })
    // .to(".a.socials", {
    //   duration: 4,
    //   left: "-50vw"
    // });

    ScrollTrigger.create({
      animation: tl1,
      trigger: "#container",
      start: "top center ",
      end: "+=4000",
      scrub: true,
      pin: true,
    });
  }

}

import { Component, Input, OnInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-iconos-tecno',
  templateUrl: './iconos-tecno.component.html',
  styleUrls: ['./iconos-tecno.component.scss']
})
export class IconosTecnoComponent implements OnInit {

  @Input() tecnologia!: string;
  @Input() nivel!: number;

  protected nombre: any;

  constructor() { }

  ngOnInit(): void {
    this.nombre = this.tecnologia.split('-')[1];
  }

  skillHover(icon: HTMLElement){
    gsap.to(icon,{
      rotate: 360,
      color: "#fe520b",
      duration: 0.8
    });

    var nombres = document.querySelectorAll(".nombre");

    nombres.forEach(e => {
      if(e.innerHTML === this.nombre){
        gsap.to(e,{
          rotate: 360,
          visibility: "visible",
        });
      }
    });
  }

  skilLeave(icon: HTMLElement){
    gsap.to(icon,{
      rotate: 0,
      color: "var(--color-blanco)",
      duration: 1
    });

    gsap.to(".nombre",{
      rotate: 0,
      visibility: "hidden",
    });
  }

}

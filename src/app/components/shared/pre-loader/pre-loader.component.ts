import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-pre-loader',
  templateUrl: './pre-loader.component.html',
  styleUrls: ['./pre-loader.component.scss']
})
export class PreLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.startLoader();

    gsap.to(".counter", 0.25, {
      delay: 3.5,
      opacity: 0,
      right: '-50vw',
      onComplete: () => {
        // Desactiva los eventos de ratón cuando las animaciones de GSAP hayan terminado
        gsap.to(".counter", { pointerEvents: "none" });
      }
    });
    gsap.to(".bar", 1.5, {
      delay: 3.5,
      height: 0,
      right: '-50vw',
      stagger:{
        amount: 0.5,
      },
      ease:"power4.inOut",
      onComplete: () => {
        // Desactiva los eventos de ratón cuando las animaciones de GSAP hayan terminado
        gsap.to(".ovaerlay", { pointerEvents: "none" });
      }
    });

    setTimeout(() => {
      (document.querySelector(".overlay") as HTMLElement).style.pointerEvents = "none";
    }, 4000); // Tiempo suficiente para asegurar que las animaciones de GS

  }

  startLoader() {
    let counterElement = document.querySelector(".counter");
    let currentValue = 0;

    function updateCounter() {
      if (currentValue === 100) {
        return;
      }

      currentValue += Math.floor(Math.random() * 10) + 1;

      if (currentValue > 100) {
        currentValue = 100;
      }

      counterElement!.textContent = currentValue.toString();

      let delay = Math.floor(Math.random() * 200) + 50;
      setTimeout(updateCounter, delay);
    }

    updateCounter();
  }


}

// function startLoader(){
//   let counterElement = document.querySelector(".counter");
//   let currentValue = 0;

//   function updateCounter(){
//     if(currentValue === 100){
//       return;
//     }

//     currentValue += Math.floor(Math.random() * 10)+1;

//     if(currentValue > 100){
//       currentValue = 100;
//     }

//     counterElement!.textContent = currentValue.toString();

//     let delay = Math.floor(Math.random()*200) + 50;
//     setTimeout(updateCounter, delay);

//   }

//   updateCounter();

// }

// startLoader();

// gsap.to(".counter", 0.25, {
//   delay: 3.5,
//   opacity: 0
// });
// gsap.to(".bar", 1.5, {
//   delay: 3.5,
//   height: 0,
//   stagger:{
//     amount: 0.5,
//   },
//   ease:"power4.inOut",
// });

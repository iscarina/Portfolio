import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

@Component({
  selector: 'app-conoceme',
  templateUrl: './conoceme.component.html',
  styleUrls: ['./conoceme.component.scss']
})
export class ConocemeComponent implements OnInit {

  @ViewChild('marquee', {static: true}) marquee!: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    gsap.set('.a2',{
      rotate:90,
    })

    this.startScrollAnimation();

    this.descAnim();

    this.arrowAnim();

    this.DVDEffect();

  }

  //DVDEffect
  DVDEffect(){
    let x = 0;
    let y = 0;
    let dirX = 1;
    let dirY = 1;
    const speed = 1.6;
    const pallete = ["#ff8800", "#e124ff", "#6a19ff", "#ff2188"];
    let dvd = document.getElementById("dvd");
    dvd!.style.backgroundColor = pallete[0];
    let prevColorChoiceIndex = 0;
    const dvdWidth = dvd!.clientWidth;
    const dvdHeight = dvd!.clientHeight;

    function getNewRandomColor() {
      const currentPallete = [...pallete]
      currentPallete.splice(prevColorChoiceIndex,1)
      const colorChoiceIndex = Math.floor(Math.random() * currentPallete.length);
      prevColorChoiceIndex = colorChoiceIndex<prevColorChoiceIndex?colorChoiceIndex:colorChoiceIndex+1;
      const colorChoice = currentPallete[colorChoiceIndex];
      return colorChoice;
    }

    function animate() {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const scrollTop = window.scrollY;

      if (y + dvdHeight >= windowHeight + scrollTop || y < scrollTop) {
        dirY *= -1;
        dvd!.style.backgroundColor = getNewRandomColor();
      }
      if (x + dvdWidth >= windowWidth || x < 0) {
        dirX *= -1;
        dvd!.style.backgroundColor = getNewRandomColor();
      }
      x += dirX * speed;
      y += dirY * speed;
      dvd!.style.left = x + "px";
      dvd!.style.top = y + "px";
      window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
  }
  //DVDEffect
  // DVDEffect(){
  //   let x = 0;
  //   let y = 0;
  //   let dirX = 1;
  //   let dirY = 1;
  //   const speed = 1;
  //   const pallete = ["#ff8800", "#e124ff", "#6a19ff", "#ff2188"];
  //   let dvd = document.getElementById("dvd");
  //   dvd!.style.backgroundColor = pallete[0];
  //   let prevColorChoiceIndex = 0;
  //   let black = document.getElementById("black");
  //   const dvdWidth = dvd!.clientWidth;
  //   const dvdHeight = dvd!.clientHeight;

  //   function getNewRandomColor() {
  //     const currentPallete = [...pallete]
  //     currentPallete.splice(prevColorChoiceIndex,1)
  //     const colorChoiceIndex = Math.floor(Math.random() * currentPallete.length);
  //     prevColorChoiceIndex = colorChoiceIndex<prevColorChoiceIndex?colorChoiceIndex:colorChoiceIndex+1;
  //     const colorChoice = currentPallete[colorChoiceIndex];
  //     return colorChoice;
  //   }

  //   function animate() {
  //     const screenHeight = document.body.clientHeight;
  //     const screenWidth = document.body.clientWidth;

  //     if (y + dvdHeight >= screenHeight || y < 0) {
  //       dirY *= -1;
  //       dvd!.style.backgroundColor = getNewRandomColor();
  //     }
  //     if (x + dvdWidth >= screenWidth || x < 0) {
  //       dirX *= -1;
  //       dvd!.style.backgroundColor = getNewRandomColor();
  //     }
  //     x += dirX * speed;
  //     y += dirY * speed;
  //     dvd!.style.left = x + "px";
  //     dvd!.style.top = y + "px";
  //     window.requestAnimationFrame(animate);
  //   }

  //   window.requestAnimationFrame(animate);
  // }

  //Descripcion
  descAnim(){

    const sections = this.elementRef.nativeElement.querySelectorAll('.descripcion > div');

    sections.forEach((section: any, index:any) => {
      gsap.set(section, { x: '100%', opacity: 0 }); // Oculta todos los párrafos al inicio, desplazándolos hacia la derecha
      gsap.to(section, {
        opacity: 1,
        x: '0%', // Desplaza los nuevos párrafos desde la derecha hasta su posición original
        scrollTrigger: {
          trigger: section,
          start: 'top center', // Inicia la animación cuando el párrafo está en el centro de la vista
          toggleActions: 'play none none reverse'
        }
      });
    });

  }

  //Flecha bajar
  arrowAnim(){

    gsap.to(".fas",{
      y: -20,
      repeat:Infinity,
      yoyo: true,
    });

  }

  arrowDie(){
    gsap.to(".fas",{
      yPercent: 1000, yoyo: true, duration: 3, opacity: 0
    });
  }

  //Marquee
  startScrollAnimation(): void {
    const wrapper = document.querySelector(".wrapper");
    const items = gsap.utils.toArray(".item");

    const loop = horizontalLoop(items, {
      paused: false,
      repeat: -1,
      reversed: true,
      speed: 1,
    });
  }

}

export function horizontalLoop(items: any, config: any): gsap.core.Timeline {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: function() {
      tl.totalTime(tl.rawTime() + tl.duration() * 100);
    }
  }),
    length = items.length,
    startX = items[0].offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
    totalWidth: number, curX: number, distanceToStart: number, distanceToLoop: number, item: HTMLElement, i: number;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 + parseFloat(gsap.getProperty(el, "xPercent") as string));
      return xPercents[i];
    }
  });

  gsap.set(items, { x: 0 });

  totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX +
    items[length - 1].offsetWidth * parseFloat(gsap.getProperty(items[length - 1], "scaleX") as string) + (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * parseFloat(gsap.getProperty(item, "scaleX") as string);


    tl.to(item, {
      xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
      duration: distanceToLoop / pixelsPerSecond
    }, 0)
      .fromTo(item, {
        xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
      }, {
        xPercent: xPercents[i],
        duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
        immediateRender: false
      }, distanceToLoop / pixelsPerSecond);

    tl.add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars?: gsap.TweenVars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }

    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl['next'] = (vars?: gsap.TweenVars) => toIndex(curIndex + 1, vars);
  tl['previous'] = (vars?: gsap.TweenVars) => toIndex(curIndex - 1, vars);
  tl['current'] = () => curIndex;
  tl['toIndex'] = (index: number, vars?: gsap.TweenVars) => toIndex(index, vars);
  tl['times'] = times;
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    if (tl.vars && tl.vars.onReverseComplete) {
      tl.vars.onReverseComplete();
    }
    tl.reverse();
  }

  return tl;
}

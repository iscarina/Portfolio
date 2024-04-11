import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
// import { DrawSVGPlugin } from "gsap-trial/dist/DrawSVGPlugin";

// gsap.registerPlugin(DrawSVGPlugin);

@Component({
  selector: 'app-conoceme',
  templateUrl: './conoceme.component.html',
  styleUrls: ['./conoceme.component.scss']
})
export class ConocemeComponent implements OnInit {

  @ViewChild('marquee', {static: true}) marquee!: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.startScrollAnimation();
    //this.dibujaCara();
  }

  // dibujaCara(){
  //   const svg = this.elementRef.nativeElement.querySelector('.caraSVG');

  //   const tl = gsap.timeline({ paused: true })
  //     .from('.path2', { drawSVG: 0, ease: 'none'});

  //   svg.addEventListener('mouseenter', () => tl.play());
  //   svg.addEventListener('mouseleave', () => tl.reverse());
  // }

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

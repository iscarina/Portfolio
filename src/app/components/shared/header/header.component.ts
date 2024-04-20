import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onMouseEnter() {
    gsap.to('.contact', { duration: 0.2, x: -80, ease: 'power2.out' }); // Movemos hacia la izquierda (-10)
    gsap.to('.line', { duration: 0.2, width: '80px', ease: 'power2.out' });
  }

  onMouseLeave() {
    gsap.to('.contact', { duration: 0.2, x: 0, ease: 'power2.out' }); // Regresamos a la posición original (0)
    gsap.to('.line', { duration: 0.2, width: '0', ease: 'power2.out' });
  }

  goToMain(){
    this.router.navigateByUrl('');
  }

  goToContacto(){
    this.router.navigateByUrl('contacto');
  }

}

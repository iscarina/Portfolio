import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  checkoutForm;

  constructor(private _renderer: Renderer2, private formBuilder: FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if(this.checkoutForm.valid){
      console.log(this.checkoutForm.value);
    }
    else{
      console.log("Rellena todos los campos");
    }
  }

  gotoLinkedin(){
    window.open("https://www.linkedin.com/in/ismael-cari%C3%B1anos-s%C3%A1enz-de-jubera-b23673233/?locale=en_US");
  }

  enterLink(){
    gsap.to(".iconLinkedin",{
      color: "#fe520b",
      cursor: "pointer",
      zoom: 1.1
    });
  }

  leaveLink(){
    gsap.to(".iconLinkedin",{
      color: "var(--color-blanco)",
      zoom: 1,
    });
  }

  enterEnvio(){
    gsap.to(".botonEnvio",{
      rotate: 3,
      backgroundColor: "var(--color-blanco)",
      border:"2px solid #fe520b",
      color: "var(--color-principal)",
      cursor: "pointer"
    });
  }

  leaveEnvio(){
    gsap.to(".botonEnvio",{
      rotate: 0,
      backgroundColor: "#fe520b",
      border:"2px solid var(--color-blanco)",
      color: "var(--color-blanco)",
    });
  }

}

import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { gsap } from 'gsap';
import emailjs from '@emailjs/browser';
import * as Notiflix from 'notiflix';

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

  async onSubmit(event: Event) {
    event.preventDefault();
    if(this.checkoutForm.valid){
      emailjs.init('oJlaFjFnpDXpjiK_h');

      Notiflix.Loading.standard({
        svgColor: "var(--color-secundario)"
      });

      let response = await emailjs.send("service_j5957il","template_7u30skw",{
        from_name: this.checkoutForm.value.nombre,
        from_email: this.checkoutForm.value.email,
        message: this.checkoutForm.value.mensaje,
      });

      Notiflix.Loading.remove();

      if (response.status === 200) {
        Notiflix.Notify.success('¡Correo enviado con éxito!');
        this.checkoutForm.reset();
      } else {
        Notiflix.Notify.failure('Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.');
      }
    }
    else{
      Notiflix.Notify.failure('Rellena todos los campos.');
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

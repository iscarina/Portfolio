import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
      nombre: '',
      email: '',
      mensaje: ''
    });
  }

  ngOnInit(): void {
    this._renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  onSubmit(info: any[]) {
    this.checkoutForm.reset();

    console.log(info);
  }

}

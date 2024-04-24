import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-estudioyexperriencia',
  templateUrl: './estudioyexperriencia.component.html',
  styleUrls: ['./estudioyexperriencia.component.scss']
})
export class EstudioyexperrienciaComponent implements OnInit {

  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() tiempo!: string;

  @Input() imagen!: string;

  constructor() { }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb:FormBuilder ) {

    this.crearFormulario();

  }

  ngOnInit(): void {
  }

  get nombreNoValido(): boolean {

    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;

  }

  get apellidoNoValido(): boolean {

    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;

  }

  get correoNoValido(): boolean {

    return this.forma.get('correo').invalid && this.forma.get('correo').touched;

  }

  get distritoNoValido(): boolean {

    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;

  }

  get ciudadNoValido(): boolean {

    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;

  }

  crearFormulario(): void {

    this.forma = this.fb.group({
      // <value> : ['<default_value>', 'synchronous_validators', 'asynchronous_validators']
      nombre  : ['', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', [Validators.required, Validators.minLength(5)] ],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      direccion: this.fb.group({
        distrito: ['', Validators.required ],
        ciudad: ['', Validators.required]
      })
    });

  }

  guardar(): void {

    console.log(this.forma);

    if ( this.forma.invalid ) {

        // * GET FORM ELEMENTS TO CHANGE ITS STATE

        Object.values( this.forma.controls ).forEach( (control) => {

          // * VERIFY IF CONTROL IS A FORM GROUP

          if ( control instanceof FormGroup ) {

            Object.values( control.controls ).forEach( control => control.markAsTouched() );

          } else {

            control.markAsTouched();

          }

          // console.log(control);

        });

        return;

    }
  }


}

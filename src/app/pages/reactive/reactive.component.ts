import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) {

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  get pasaTiempos(): FormArray {

    return this.forma.get('pasatiempos') as FormArray;

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

  get usuarioNoValido(): boolean {

    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;

  }

  get distritoNoValido(): boolean {

    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;

  }

  get ciudadNoValido(): boolean {

    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;

  }

  get pass1NoValido(): boolean {

    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;

  }

  get pass2NoValido(): boolean {

    const pass1 =  this.forma.get('pass1').value;

    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;

  }

  crearFormulario(): void {

    this.forma = this.fb.group({
      // <value> : ['<default_value>', 'synchronous_validators', 'asynchronous_validators']
      nombre  : ['', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noHerrera] ],
      correo  : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      usuario: ['', , this.validadores.existeUsuario ],
      pass1  : ['', Validators.required ],
      pass2  : ['', Validators.required ],
      direccion: this.fb.group({
        distrito: ['', Validators.required ],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array( [] )
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });

  }

  cargarDataAlFormulario(): void {

    // this.forma.setValue({
    this.forma.reset({
      nombre: 'Jhoon',
      apellido: 'Dooee',
      correo: 'jhondoe@gmail.com',
      usuario: 'user',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'disctric',
        ciudad: 'city'
      }
    });

    ['Comer', 'Dormir'].forEach( valor => this.pasaTiempos.push( this.fb.control(valor) ) );

  }

  agregarPasaTiempo(): void{

    this.pasaTiempos.push( this.fb.control( '' ) );

  }

  borrarPasaTiempo(i: number): void{

    this.pasaTiempos.removeAt(i);

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

        // return;

    }

    // * POST INFO
    this.forma.reset();

  }

  crearListeners() {

    this.forma.valueChanges.subscribe( valor => console.log(valor) );

    this.forma.statusChanges.subscribe( status => console.log(status) );

    this.forma.get('nombre').valueChanges.subscribe( console.log );

  }


}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellidos: '',
    email: '',
    pais: '',
    genero: ''
  };

  paises: any[] = [];

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {

    this.paisService.getPaises()
      .subscribe( paises =>  {

        this.paises = paises;

        this.paises.unshift({
          nombre: '[ Seleccione país ]', codigo: ''
        });

      });

  }

  guardar( forma: NgForm ): void{


    if ( forma.invalid ) {

      // * GET FORM ELEMENTS TO CHANGE ITS STATE

      Object.values( forma.controls ).forEach( (control) => {

        control.markAsTouched();

      });

      return;
    }

    console.log(forma);
    console.log(forma.value);
  }
}

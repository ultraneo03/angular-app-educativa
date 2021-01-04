import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemperaturaService } from 'src/app/services/temperatura.service';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css']
})
export class TiempoComponent implements OnInit {

  public formulario: FormGroup;
  tiempo: any;
  name: any;
  temperatura: any;
  humedad: any;
  latitud: any;
  longitud: any;
  descripcion: any;
  showError: boolean;
  mensajeError: string;
  fecha= new Date();
   
  constructor(private fb: FormBuilder, private _tiempo: TemperaturaService) {
      this.iniciaFormulario();
  }

  ngOnInit(): void {
  }

  /**
   * metodo que crea e inicia un formulario
   */
  iniciaFormulario(){
    this.formulario = this.fb.group({
      ciudad: ['',[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      codigo: ['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]]
    });
  }

  consultar(){
    this.showError = false;
    //0e7824df675b6153df86c10bdff901e9
    console.log("Formulario", this.formulario);

    var _ciudad: string = this.formulario.get('ciudad')?.value;
    var _codigo: string = this.formulario.get('codigo')?.value;

    this._tiempo.getEstadoTiempo(_ciudad, _codigo).subscribe(respuesta => {
      this.tiempo = respuesta;
      this.name = this.tiempo.name;
      this.temperatura = this.tiempo.main.temp;
      this.humedad = this.tiempo.main.humidity;
      this.latitud = this.tiempo.coord.lat;
      this.longitud = this.tiempo.coord.lon;
      this.descripcion = this.tiempo.weather[0].description;
      console.log("respuesta", respuesta);
    },
    error =>{
      this.showError = true;
      this.mensajeError = "Error al consultar el tiempo. Intentelo nuevamente!!";
    });
    
  }

}

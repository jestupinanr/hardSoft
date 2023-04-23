import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  public status: boolean = false;

  constructor() { }

  public activarFuncion(): void {
    // Lógica de la función que se quiere activar en otro componente
  }
}

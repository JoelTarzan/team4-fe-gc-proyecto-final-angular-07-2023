import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // Mapa para almacenar los textos y sus valores actuales
  textos: Map<string, string> = new Map<string, string>();

  // Mapa para rastrear si un texto está siendo editado o no
  editando: Map<string, boolean> = new Map<string, boolean>();

  // Variable temporal para almacenar el texto mientras se edita
  tempText: string = ''; 

  // Array de nombres de textos que se mostrarán en el perfil
  textosNombre: string[] = ['apellidos', 'nombre', 'titulo']; 

  constructor() {
    // Configuración inicial de los textos y valores
    this.textos.set('apellidos', 'Apellidos');
    this.textos.set('nombre', 'Nombre');
    this.textos.set('titulo', 'Título');
    // Agregar más textos y valores iniciales si es necesario

    // Inicializar el rastreo de edición para cada texto
    this.textosNombre.forEach(texto => {
      this.editando.set(texto, false);
    });
  }

  // Función para iniciar la edición de un texto
  editar(texto: string) {
    const textoActual = this.textos.get(texto);
    if (textoActual !== undefined) {
      this.tempText = textoActual;
      this.editando.set(texto, true);
    }
  }
  
  // Función para guardar los cambios realizados en un texto editado
  guardar(texto: string) {
    this.textos.set(texto, this.tempText);
    this.editando.set(texto, false);
  }

  // Función para cancelar la edición de un texto
  cancelar(texto: string) {
    this.editando.set(texto, false);
  }

}

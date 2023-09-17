import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editMode: boolean = false;

  user: User | undefined;
  copyOfUser: User | undefined;

  imageUrl: string | null = null;

  constructor(
    private tokenStorageService: TokenStorageService,
    private usersService: UsersService) {

  }

  ngOnInit(): void {
    // Recogemos el usuario logueado
    this.usersService.getOneById(this.tokenStorageService.getUser()).subscribe(result => {
      this.user = result;
      this.copyOfUser = { ...result };
      this.convertBase64ToImage();
    });
  }

  // Controla el modo edición
  changeEditMode() {
    this.editMode = !this.editMode;
  }

  // Actualiza los cambios
  updateChanges() {
    this.usersService.update(this.user!.id, this.user!).subscribe(() => {
      this.changeEditMode();
    });
  }

  // Cancela los cambios
  cancelChanges() {
    this.user = {...this.copyOfUser!};
    this.changeEditMode();
  }

  // Guarda la imagen
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = e => {
        const uint8Array = new Uint8Array(e.target?.result as ArrayBuffer);
  
        const avatarArray: number[] = Array.from(new Uint8Array(uint8Array));
        this.user!.avatar = avatarArray;

      };
  
      reader.readAsArrayBuffer(file);
    }
  }

  // Transforma la imagen
  convertBase64ToImage() {
    if (this.user?.avatar && this.user?.avatar.length > 0) {
      
      // Creamos una URL de datos (Data URL) a partir de la cadena Base64
      this.imageUrl = `data:image/png;base64,${this.user?.avatar}`; // Cambia 'image/png' al tipo de imagen correcto si es diferente
    }
  }

  // Devuelve la URL de la imagen
  getAvatarUrl(): string | null {
    return this.imageUrl;
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenProcess } from '../models/open-process';

@Injectable({
  providedIn: 'root'
})
export class IdUserOpenProcessService {
  endpoint: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  // Recoge subscripciones
  getSubscribeUserProcess(id : number):any {
    return this.http.get(this.endpoint + `subscriptions/${id}` );
  }

  // Recoge subscripciones
  getSubscribeFindByUser_Process(id : number):any {
    return this.http.get(this.endpoint + `subscriptions/?id_user=${id}` );
  }

  // Añade subscripciones
  addSubscribeUserProcess (data:any) {
    console.log(data);
    return this.http.post(this.endpoint + `subscriptions`,data).subscribe(res => {
      console.log("Registration successful");
      //this.isSuccessful = true;
  },
  err => {
      console.error("Registration failed: " + err);
      //this.isSignUpFailed = true;
  }
);;
  }

  // Elimina subscripciones
  removeSubscribeUserProcess (data:any) {
    console.log(data)
    return this.http.delete(this.endpoint + `subscriptions/${data.id}`).subscribe();
  }
}

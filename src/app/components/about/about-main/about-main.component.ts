import { Component } from '@angular/core';

@Component({
  selector: 'app-about-main',
  templateUrl: './about-main.component.html',
  styleUrls: ['./about-main.component.css']
})
export class AboutMainComponent {
  /* Info developers */
  tarjetas:any =[
    {
      nombre:"Joel Tarzán",
      descripcion:"Uno de los dessarrolladores de esta aplicación web",
      tiempo:"Last updated 3 mins ago",
      imgurl:"../../../../assets/joel_about.jpg",
      altimg:"Image_Joel",
      linkedinurl:"https://www.linkedin.com/in/joeltarzan/"
    },
    {
      nombre:"Marco Santoro",
      descripcion:"Uno de los dessarrolladores de esta aplicación web",
      tiempo:"Last updated 3 mins ago",
      imgurl:"../../../../assets/marco_about.jpg",
      altimg:"Image_Marco",
      linkedinurl:"https://www.linkedin.com/in/marco-santoro-serrano-a778a6184/"
    },
    {
      nombre:"Gerard Fernández",
      descripcion:"Uno de los desarrolladores que ha contribuido en la construccion del programa Aurum RH",
      tiempo:"Last updated 3 mins ago",
      imgurl:"../../../../assets/gerard_about.jpg",
      altimg:"Image_Gerard",
      linkedinurl:"https://www.linkedin.com/in/gerard-fern%C3%A1ndez-tejada-b82076278/"
    }
  ]
}

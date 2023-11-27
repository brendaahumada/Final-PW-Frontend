import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  constructor(private router: Router){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd){
        console.log('Evento',event)
        switch(event.urlAfterRedirects){
          case "":
            this.seleccionado = [true, false, false];
            break;
          case "/contact":
            this.seleccionado = [false, true, false];
            break;
          case "/location":
            this.seleccionado =[false, false, true];
            break;
          default:
            this.seleccionado= [true, false, false];
            break;
        }

      }

    })

  }
  seleccionado = [false, false, false ]


  //metodo
  navegar (direccion:string){
    this.router.navigate([direccion])
    console.log(direccion)

  }

}

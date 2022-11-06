import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SideBarModel } from '@core/models/sidebar.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  itemSideBar: SideBarModel[] = [];
  showNavBar : boolean = false;
  @Output()
  messageFather: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    // Fill the sidebar
    this.itemSideBar = [
      {
        name: "Recursos",
        open: false,
        icon: "phone_iphone",
        children: [
          {
            name: "Agregar hardware",
            url: '/resource/create/hardware'
          },
          {
            name: "Agregar software",
            url: '/resource/create/software'
          },
          {
            name: "Consultar",
            url: '/resource/search'
          }
        ]
      },
      {
        name: "Usuarios",
        open: false,
        icon: "person",
        children: [
          {
            name: "Crear usuario",
            url: '/person/create/person'
          },
          {
            name: "Buscar usuario",
            url: '/person/search'
          }
          
        ]
      },
      {
        name: "Asignaciones",
        open: false,
        icon: "menu_book",
        children: [
          {
            name: "Asignar recursos"
          },
          {
            name: "Crear incidencias"
          },
          {
            name: "Ver incidencias"
          }
        ]
      },
      {
        name: "Reportes",
        open: false,
        icon: "description",
        children: [
          {
            name: "Generar reporte"
          },
        ]
      },
    ];

  }

  onShowHideItem(item: SideBarModel): void {
    this.itemSideBar.forEach(originalItem => {
      if (originalItem.name === item.name)
        originalItem.open = !originalItem.open
    })
  }

  showHideSidebar():void {
    this.showNavBar = !this.showNavBar;
    this.messageFather.emit(this.showNavBar)
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Assigment, SearchAssigment } from '@core/models/assigment/Assigments.model';
import { ToastrService } from 'ngx-toastr';
import { AssigmentService } from 'src/app/services/assigment.service';

@Component({
  selector: 'search-page-assigment',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {

  @Input () value: boolean;
  assigments: SearchAssigment[] = [];
  @Output() assigment = new EventEmitter<Assigment>();

  constructor(
    private assigmentService: AssigmentService,
    private toastr: ToastrService,
    private router:Router
  ) {
     this.getAllAssigment()
  }

  getAllAssigment () {
    this.assigmentService.getAllAssigments().subscribe(
      (res) => {
        this.organiceElements(res);
      },
      (error) => {
        error.error.message.map((msg:string) =>
          this.toastr.error(msg)
        )
      }
    );
  };

  organiceElements (res: Assigment[]) {
    const initial: string[] = res.map((objet) => objet.user.name.charAt(0).toUpperCase());

    const filtered: Record<string, SearchAssigment> = {};

    for (let i = 0; i < initial.length; i++) {
      const letra = initial[i];
      if (!(letra in filtered)) {
        filtered[letra] = { letter: letra, assigment: [] };
      }
      filtered[letra].assigment.push(res[i]);
    }

    const claves = Object.keys(filtered).sort();

    for (const order of claves) {
      this.assigments.push(filtered[order])
    }
  };

  hanldeRedirect = (assigment: Assigment) => {
    if (this.value) {
      this.assigment.emit(assigment);
    } else {
      this.router.navigate(['/assignment/detail' , assigment.id])
    }
  };

}

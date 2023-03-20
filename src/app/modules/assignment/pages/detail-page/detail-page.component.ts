import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assigment } from '@core/models/assigment/Assigments.model';
import { ToastrService } from 'ngx-toastr';
import { AssigmentService } from 'src/app/services/assigment.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public assigment: Assigment;
  constructor(
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private assigmentService: AssigmentService,
  ) { }


  ngOnInit(): void {
    this.getDataAssigment(this.route.snapshot.paramMap.get('id'))
  }

  getDataAssigment (id: string | null) {
    if (id === null) {
      this.toastr.error('Falta el id del recurso');
    } else {
      this.assigmentService.getOneAssigmentById(id).subscribe(
        (res) => {
          this.assigment = res;
        },
        (error) => {
          error.error.message.map((msg:string) =>
            this.toastr.error(msg)
          )
        }
      );
    }
  }

}

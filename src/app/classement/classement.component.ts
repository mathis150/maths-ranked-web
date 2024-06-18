import { Component, inject } from '@angular/core';
import { ClassementService } from './classement.service';

@Component({
  selector: 'app-classement',
  templateUrl: './classement.component.html',
  styleUrl: './classement.component.scss'
})
export class ClassementComponent {
  classementService = inject(ClassementService)

  classement : any = [];

  constructor() { }

  ngOnInit(): void {
    this.classementService.getClassement().subscribe((data: any) => {
      console.log(data);
      if(data.status == 200)
      {
        this.classement = data.data;
      }
    });
  }
}

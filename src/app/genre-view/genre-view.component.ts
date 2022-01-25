import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

  constructor(
    /**
    * @emits data - used to inject data from the parent component 
    * takes data passed in through the parent component
    */
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string }
  ) { }

  ngOnInit(): void {
  }

}

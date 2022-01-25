import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  constructor(
    /**
     * @emits data - used to inject data from the parent component 
     */
    @Inject(MAT_DIALOG_DATA) public data: { name: string, bio: string }

  ) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  test:any;

  constructor() { }

  ngOnInit(): void {

    document.write("aaaaaaaaaaaaaaa");
    document.getElementsByClassName("text");
    
  }
  
  

}

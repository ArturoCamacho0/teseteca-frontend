import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() message: string = 'Esto es un mensaje predeterminado';
  @Input() type: string = 'success';

  constructor() { }

  ngOnInit(): void {
  }

}

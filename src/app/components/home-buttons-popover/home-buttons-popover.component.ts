import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-buttons-popover',
  templateUrl: './home-buttons-popover.component.html',
  styleUrls: ['./home-buttons-popover.component.scss'],
})
export class HomeButtonsPopoverComponent {
  @Input() sound: string;
  @Input() openCloseSound: () => void;
  constructor() { 
    
  }


}

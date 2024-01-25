import { Component, Input } from '@angular/core';
import { Ipropertybase } from 'src/app/models/Ipropertybase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  // PROPERTY BINDING
  @Input() property  : Ipropertybase;

  //hideIcon input decorator is used to control,'edit & contact' icons from, preview card and property-list-card
  @Input() hideIcons : boolean;

}

import { Component} from '@angular/core';
import { ListPlacesComponent } from './list-places/list-places.component';
import { FormPlacesComponent } from "./form-places/form-places.component";
import { ViewStateComponent } from "../../shared/view-state/view-state.component";

@Component({
  selector: 'app-managment',
  imports: [FormPlacesComponent, ListPlacesComponent, ViewStateComponent],
  templateUrl: './managment.component.html'
})
export class ManagmentComponent {}

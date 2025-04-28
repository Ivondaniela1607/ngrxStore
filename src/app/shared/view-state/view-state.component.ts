import { Component, inject } from '@angular/core';
import { PlaceStore } from '../../state/place.store';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-state',
  imports: [CommonModule],
  templateUrl: './view-state.component.html',
  styleUrl: './view-state.component.css'
})
export class ViewStateComponent {

  expanded = false;

  readonly placeStore = inject(PlaceStore);
  toggleExpand() {
    this.expanded = !this.expanded;
  }
}

import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceStore } from '../../../state/place.store';
import { Place } from '../../../model/place.model';
import { OpcFiltersComponent } from '../opc-filters/opc-filters.component';


@Component({
  selector: 'app-list-places',
  imports: [CommonModule, OpcFiltersComponent ],
  templateUrl: './list-places.component.html',
})
export class ListPlacesComponent {
  @ViewChild("searchInput") searchInput: HTMLInputElement | null = null;

  readonly placeStore = inject(PlaceStore);

  deletePlace(item:Place) {
    this.placeStore.deletePlace(item);
    this.placeStore.selectedPlace.set(null)
  }

  editPlace(item: Place) {
    this.placeStore.selectedPlace.set(item);
  }
}

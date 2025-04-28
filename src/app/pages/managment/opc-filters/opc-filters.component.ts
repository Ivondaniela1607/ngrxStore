import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject, signal } from '@angular/core';
import { PlaceStore } from '../../../state/place.store';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-opc-filters',
  imports: [MatTooltipModule, OverlayModule],
  templateUrl: './opc-filters.component.html',
  styleUrl: './opc-filters.component.css'
})
export class OpcFiltersComponent {
  isPopoverTypeOpen = signal<boolean>(false);
  readonly placeStore = inject(PlaceStore);

  togglePopover( opc:string ) {
    if(opc === 'tipo'){
      this.isPopoverTypeOpen.set(!this.isPopoverTypeOpen());
    }
  }

  searchPlace( event: Event ): void {
    if (event.target instanceof HTMLInputElement) {
      this.placeStore.setSearchTerm(event.target.value);
    }
  }
  
  cleanSearch(): void {
    this.placeStore.setSearchTerm("");
  }
}

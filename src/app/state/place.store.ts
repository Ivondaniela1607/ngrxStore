
import { getState, patchState, withState, signalStore, withComputed, withHooks, withMethods } from "@ngrx/signals";
import { Place, Category, City } from '../model/place.model';
import { computed, inject, signal } from "@angular/core";
import { PlacesService } from "../core/services/places.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import Swal from 'sweetalert2'

interface PlaceState {
  places: Place[];
  cities: City[];
  categories: Category[];
  isLoading: boolean;
  filter: "todos" | "1" | "2" | "3" | "4";
  filterName: "todos" | "Naturaleza y aventura" | "Historia y cultura" | "Entretenimiento" | "Gastronomía y experiencias";
  searchTerm: string;
};

//Estado inicial  
const initialState: PlaceState = {
  places: [],
  cities: [],
  categories: [],
  isLoading: false,
  filter: "todos",
  filterName: "todos",
  searchTerm: ""
};

export const PlaceStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withComputed((store) => ({
    selectedPlace: signal<Place | null>(null),
    statePlace: signal<Place | null>(null),
    loading: signal<boolean>(false),
    filteredPlace: computed(() => {
      const places = store.places();
      const filter = store.filter();
      const search = store.searchTerm().toLowerCase();
      return places.filter((place) => {
        const matchesCategory = filter === "todos" || place.id_category === Number(filter);
        const matchesSearch = place.name_place.toLowerCase().includes(search) || place.description_place.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
      });
    })
  })),

  withMethods(
    (
      store, 
      placeService = inject(PlacesService)
    ) => ({
      stateSnapshot: computed(() => getState(store)),
    
      loadPlaces: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, { isLoading: true });
            return placeService.getPlaces().pipe(
              tapResponse({
                next: (res: Place[]) => {
                  const allPlaces = res;
                  patchState(store, {
                    places: allPlaces,
                    isLoading: false,
                  });
                },
                error: (error) => console.error("Error getting places:", error),
              }),
            );
          })
        )
      ),
      
      loadCategories: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, { isLoading: true });
            return placeService.getCategories().pipe(
              tapResponse({
                next: (res: Category[]) => {
                  const allCategories = res;    
                  patchState(store, {
                    categories: allCategories,
                    isLoading: false,
                  });
                },
                error: (error) => console.error("Error gtting categories:", error),
              }),
            );
          })
        )
      ),

      loadCities: rxMethod<void>(
        pipe(
          switchMap(() => {
            patchState(store, { isLoading: true });
            return placeService.getCities().pipe(
              tapResponse({
                next: (res: City[]) => {
                  const allPlaces: City[] = Array.isArray(res) ? res : [res];
                  patchState(store, {
                    cities: allPlaces,
                    isLoading: false,
                  });
                },
                error: (error) => console.error("Error getting cities:", error),
              }),
            );
          })
        )
      ),

      saveorUpdatePlace: rxMethod<Place>(
        pipe(
          switchMap((newPlace) => {
            patchState(store, { isLoading: true });
            if(!newPlace.id_place ){
              return placeService.savePlace().pipe(
                tapResponse({
                  next: (res: any) => {
                    newPlace.id_place = res.id_place;
                    Swal.fire(
                      {
                        icon: "success",
                        title: "Place saved successfully!",
                      }
                    );
                    patchState(store, {
                      places: [newPlace, ...store.places()],
                      isLoading: false,
                    });
                
                  },
                  error: (error) => console.error("Error saving place:", error),
                }),
              );
            }else {
              return placeService.updatePlace().pipe(
                tapResponse({
                  next: () => {
                    let updatedPlaces: Place[] = [];
                    const placeUpdate = store.places().find(place => place.id_place === newPlace.id_place);
                    if(placeUpdate){
                      updatedPlaces = store.places().map(p => p.id_place === newPlace.id_place ? newPlace : p);
                    }
                    Swal.fire(
                      {
                        icon: "success",
                        title: "Place updated successfully!",
                      }
                    );
                    patchState(store, {
                      places: updatedPlaces,
                      isLoading: false,
                    });
                  },
                  error: (error) => console.error("Error updating place:", error),
                }),
              );
            }
          })
        )
      ),

      deletePlace: rxMethod<Place>(
        pipe(
          switchMap((newPlace) => {
            patchState(store, { isLoading: true });
            return placeService.deletePlace().pipe(
              tapResponse({
                next: () => {
                  const placeUpdate = store.places().filter(place => place.id_place !== newPlace.id_place);
                  Swal.fire(
                    {
                      icon: "success",
                      title: "Place deleted successfully!",
                    }
                  );
                  patchState(store, {
                    places: placeUpdate,
                    isLoading: false,
                  });
                },
                error: (error) => console.error("Error deleting place:", error),
              }),
            );
        
          })
        )
      ),

      setSearchTerm: (term: string) => {
        patchState(store, { searchTerm: term });
      },

      setFilter(id: string, name: string) {
        patchState(store, {
          filter: id as "todos" | "1" | "2" | "3" | "4",
          filterName: name as "todos" | "Naturaleza y aventura" | "Historia y cultura" | "Entretenimiento" | "Gastronomía y experiencias",
        });
      }
    }),
  ),
  withHooks((store) => ({
    onInit: () => {
      store.loadPlaces();
      store.loadCities();
      store.loadCategories();
    },
    onDestroy: () => {
      console.log('onDestroy');
    }
  })),
);
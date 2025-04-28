import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PlaceStore } from '../../../state/place.store';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-places',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-places.component.html',
})
export class FormPlacesComponent {
  defaultImage = 'assets/hero/bg-hero.png';
  imagePreview: string | null = null;
  selectedFile: File | string | null = null;

  form!: FormGroup;

  readonly #formBuilder = inject(FormBuilder);
  readonly placeStore = inject(PlaceStore);

  isloading = signal(false);

  constructor() {
    this.formControl();
    effect(() => {
      const place = this.placeStore.selectedPlace();
      if (place) {
        this.imagePreview = place.image;
        this.form.patchValue({
          name_place: place.name_place,
          description_place: place.description_place,
          id_category: place.id_category,
          id_city: place.id_city,
          id_place: place.id_place,
        });
        this.selectedFile = place.image;
      } else if (place === null) {
        this.clearForm();
      }
    });
  }

  formControl() {
    this.form = this.#formBuilder.group({
      name_place: ['', Validators.required],
      id_place: [''],
      description_place: ['', Validators.required],
      id_category: ['', Validators.required],
      id_city: ['', Validators.required],
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      const file = target.files[0];
      if (file) {
        if (
          file.type !== 'image/png' &&
          file.type !== 'image/jpeg' &&
          file.type !== 'image/jpg'
        ) {
          Swal.fire({
            icon: 'error',
            title: 'This is not a valid image!',
          });
          return;
        }
        this.isloading.set(true);
        setTimeout(() => {
          this.isloading.set(false);
          this.selectedFile = file;
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePreview = e.target.result;
          };
          reader.readAsDataURL(file);
        }, 1000);
      }
    }
  }

  saveOrUpdatePlace() {
    if (!this.form.valid) return;
    const body = {
      ...this.form.value,
      image: this.selectedFile ? this.imagePreview : this.defaultImage,
    };
    this.placeStore.saveorUpdatePlace(body);
    this.clearForm();
  }

  clearForm() {
    this.form.get('name_place')?.setValue('');
    this.form.get('description_place')?.setValue('');
    this.form.get('id_category')?.setValue('');
    this.form.get('id_city')?.setValue('');
    this.form.get('id_place')?.setValue('');
    this.defaultImage = 'assets/hero/bg-hero.png';
    this.imagePreview = null;
    this.selectedFile = null;
  }

  deleteImage() {
    this.imagePreview = null;
    this.selectedFile = null;
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  /* RxResource */
  /*   categories = rxResource({
      loader: ({ request }) => this.#placesService.getCategories()
    });

    cities = rxResource({
      loader: ({ request }) => this.#placesService.getCities()
    });

    places = rxResource({
      loader: ({ request }) => this.#placesService.getPlaces()
    });
  */
}

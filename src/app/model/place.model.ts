export interface Place {
  id_place: number;
  name_place: string;
  description_place: string;
  id_category: number;
  id_city: number;
  image: string;
  price_place: number;
}

export interface Category {
  id_category: number;
  name_category: string;
}

export interface City {
  id_city: number;
  name_city: string;
  depto: string;
}
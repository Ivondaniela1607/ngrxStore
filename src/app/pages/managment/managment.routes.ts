import { Routes } from "@angular/router";


export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./managment.component").then(m => m.ManagmentComponent),
  }
]
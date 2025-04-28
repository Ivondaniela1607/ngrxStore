import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    canActivate: [],
    children: [
      {
        path: "",
        loadChildren: () => import("./pages/managment/managment.routes").then(m => m.routes),
      },
    ]
  }
];

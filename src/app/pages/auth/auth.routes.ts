

import { Routes } from '@angular/router';


export default [
  {
    path: "sign-in",
    loadComponent: () => import("./sign/sign.component").then(m => m.SignComponent),
  }
]as Routes; 

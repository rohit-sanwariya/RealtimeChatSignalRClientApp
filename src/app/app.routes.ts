import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',redirectTo:'chat', pathMatch:'full'
    },
    {
        path:'chat', loadComponent:()=>import("./Pages/chat/chat.component")
    }
];

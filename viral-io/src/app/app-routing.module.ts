import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomepageComponent} from './homepage/homepage.component';
import{LobbyComponent} from './lobby/lobby.component';
import{EnterLobbyComponent} from './enter-lobby/enter-lobby.component';
import{GDPRComponent} from './gdpr/gdpr.component';


const routes: Routes = [
    
        {   path: '',
            redirectTo: '/home',
            pathMatch: 'full'
        },
        {path: 'home', component:HomepageComponent},
    {path: 'lobby/:size/:lobby', component:LobbyComponent},
    {path: 'enter-lobby/:size', component:EnterLobbyComponent},
    {path: 'gdpr', component:GDPRComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

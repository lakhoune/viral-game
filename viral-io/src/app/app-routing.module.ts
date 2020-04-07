import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomepageComponent} from './homepage/homepage.component';
import{LobbyComponent} from './lobby/lobby.component';
import{EnterLobbyComponent} from './enter-lobby/enter-lobby.component';
import{GDPRComponent} from './gdpr/gdpr.component';


const routes: Routes = [
    
        {   path: '',
            redirectTo: '/gdpr',
            pathMatch: 'full'
        },
        {path: 'home', component:HomepageComponent},
    {path: 'lobby/:id', component:LobbyComponent},
    {path: 'enter-lobby/:id', component:EnterLobbyComponent},
    {path: 'gdpr', component:GDPRComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

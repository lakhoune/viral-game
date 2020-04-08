import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DnafloatDirective } from './dnafloat.directive';
import { CellfloatDirective } from './cellfloat.directive';
import { RotateOnScrollDirective } from './rotate-on-scroll.directive';
import { ParallaxDirective } from './parallax.directive';
import {SocketioService} from './socketio.service';
import { LobbyComponent } from './lobby/lobby.component';
import { EnterLobbyComponent } from './enter-lobby/enter-lobby.component';
import { GDPRComponent } from './gdpr/gdpr.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    
    NavbarComponent,
    HomepageComponent,
    DnafloatDirective,
    CellfloatDirective,
    RotateOnScrollDirective,
    ParallaxDirective,
    LobbyComponent,
    EnterLobbyComponent,
    GDPRComponent,
    GameboardComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      FormsModule
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }

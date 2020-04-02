import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DnafloatDirective } from './dnafloat.directive';
import { CellfloatDirective } from './cellfloat.directive';
import { RotateOnScrollDirective } from './rotate-on-scroll.directive';
import { ParallaxDirective } from './parallax.directive';

@NgModule({
  declarations: [
    AppComponent,
    
    NavbarComponent,
    HomepageComponent,
    DnafloatDirective,
    CellfloatDirective,
    RotateOnScrollDirective,
    ParallaxDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

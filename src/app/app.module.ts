import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgxEmojModule } from 'ngx-emoj';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgxEmojModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

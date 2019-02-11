import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, CodeModal, CodeCopiedSnackBar } from './app.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ClipboardModule } from 'ngx-clipboard';

import { NgxEmojModule } from 'ngx-emoj';
import { HeaderComponent } from './header/header.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatSliderModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CodeModal,
    CodeCopiedSnackBar
  ],
  imports: [
    BrowserModule,
    NgxEmojModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSliderModule,
    MatInputModule,
    ClipboardModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [CodeModal, CodeCopiedSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }

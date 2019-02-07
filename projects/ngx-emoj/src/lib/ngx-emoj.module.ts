import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgxEmojComponent } from './ngx-emoj.component';
import { NgxEmojHeaderComponent } from './components/header.component';
import { NgxEmojFooterComponent } from './components/footer.component';
import { NgxEmojCategoryComponent } from './components/category.component';
import {NgxEmojCategoryContentComponent } from './components/category-content.component';

@NgModule({
  declarations: [
    NgxEmojComponent,
    NgxEmojHeaderComponent,
    NgxEmojCategoryComponent,
    NgxEmojCategoryContentComponent,
    NgxEmojFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [NgxEmojComponent,
    NgxEmojHeaderComponent,
    NgxEmojCategoryComponent,
    NgxEmojCategoryContentComponent,
    NgxEmojFooterComponent],
    providers: [],
    entryComponents: [NgxEmojComponent]
})
export class NgxEmojModule { }

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'ngx-emoj-category',
  template: `
    <button (click)="selectCategory()" class="ngx-emoji-category-btn"
    [ngStyle]="{'color': categoryIconColor,
                'border-width': activeIndicatorHeight,
                'border-color': (active) ? activeIndicatorColor : 'transparent'}"
                [innerHTML]="sanitizer.bypassSecurityTrustHtml(
                  categoryIcon(((active) ? martCategoryColorActive : martCategoryColor), martCategoryFontSize, martCategoryFontSize))">
    </button>
  `,
  styles: [`
  .ngx-emoji-category-btn
  {
    background: transparent;
    padding: 15px 10% 10px 10%;
    border: none;
    outline: none;
    border-bottom: 2px solid transparent;
  }
  `]
})
export class NgxEmojCategoryComponent {

  @Input() categoryIcon: any;
  @Input() categoryName: string;
  @Input() categoryIconColor: string;
  @Output() onselect = new EventEmitter;
  @Input() active: boolean;
  @Input() activeIndicatorColor: string;
  @Input() activeIndicatorHeight: string;
  @Input() martCategoryFontSize: string;
  @Input() martCategoryColor: string;
  @Input() martCategoryColorActive: string;


  constructor(public sanitizer: DomSanitizer) {

  }

  selectCategory() {
      this.onselect.emit({name: this.categoryName, icon: this.categoryIcon});
  }




}

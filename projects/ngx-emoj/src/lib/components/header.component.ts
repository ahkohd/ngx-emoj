import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';




@Component({
  selector: 'ngx-emoj-header',
  template: `
    <div
      class="ngx-emoj-header"
      [ngStyle]="{'background-color': headerBG,
                  'color': headerFG,
                  'font-size': headerFontSize,
                  'padding': headerPadding.y+' '+headerPadding.x}">

                  <ngx-emoj-category *ngFor="let c of emojiCategories"
                   [categoryIcon]="c.icon[0]"
                   [categoryIconColor]="'white'"
                   [categoryName]="c.name"
                   [martCategoryFontSize]="martCategoryFontSize"
                   [martCategoryColor]="martCategoryColor"
                   [martCategoryColorActive]="martCategoryColorActive"
                   [activeIndicatorColor]="activeIndicatorColor"
                   [activeIndicatorHeight]="activeIndicatorHeight"
                   [active]="activeCategory === c.name"
                   (onselect)="onCategorySelect($event)">
                  </ngx-emoj-category>
    </div>
  `,
  styles: [`

  .ngx-emoj-header
  {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }


  `]
})

export class NgxEmojHeaderComponent implements OnInit  {

  @Input() headerBG: string;
  @Input() headerFG: string;
  @Input() headerFontSize: string;
  @Input() headerPadding;
  @Input() emojiCategories;
  @Input() activeIndicatorColor: string;
  @Input() activeIndicatorHeight: string;
  @Input() defaultActiveCategory: string;
  @Output() oncategorychange: any = new EventEmitter();
  @Input() martCategoryFontSize: string;
  @Input() martCategoryColor: string;
  @Input() martCategoryColorActive: string;

  @Input() activeCategory: string;



  constructor() {
  }

  ngOnInit(): void {
    if (!this.activeCategory) {
      this.activeCategory = this.defaultActiveCategory;
    }
  }
  onCategorySelect(e) {

    this.activeCategory = e.name;
    this.oncategorychange.emit({name: e.name});
  }

}

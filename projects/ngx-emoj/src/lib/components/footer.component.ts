import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
  selector: 'ngx-emoj-footer',
  template: `
    <div
      class="ngx-emoj-footer"
      [class.unveal]="hideFooter"
      [class.reveal]="!hideFooter"
      [ngStyle]="{'background-color': footerBG,
                  'color': footerFG,
                  'font-size': footerFontSize,
                  'padding': footerPadding.y+' '+footerPadding.x}">

                  <div class="l">
                        <button
                        class="emos-btn"
                *ngFor="let e of emos" [innerHTML]="sanitizer.bypassSecurityTrustHtml(
                          e.icon[0](((e.name == activeEmo ) ? martCategoryColorActive : martCategoryColor),
                                       martCategoryFontSize, martCategoryFontSize))">
                        </button>
                  </div>
                  <div class="r">
                      <button class="emos-btn"
                          (click)="deleteChar($event)"
                          [ngStyle]="{'color': martCategoryColor}"
                          [innerHTML]="sanitizer.bypassSecurityTrustHtml(
                            delButton(martCategoryColor, martCategoryFontSize, martCategoryFontSize))">
                      </button>
                  </div>
    </div>
  `,
  styles: [`
   .ngx-emoj-footer
  {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;

  }
  .ngx-emoj-footer .l
  {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 85%;
  }
  .ngx-emoj-footer .r
  {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
  }

  .emos-btn
  {
    background: transparent;
    padding: 15px 10% 10px 10%;
    border: none;
    outline: none;
    padding-left: 10%;
    padding-right: 10%;
    border: none;
  }


  .reveal
  {
    animation-name: reveal;
    animation-duration: .3s;
    animation-fill-mode: forwards;
  }


  .unveal
  {
    animation-name: unveal;
    animation-duration: .5s;
    animation-fill-mode: forwards;
  }

  @keyframes unveal
  {
    from
    {
      opacity: 1;
      bottom: 0;
    }

    to
    {
      opacity: 0;
      bottom: -150px;
    }
  }

  @keyframes reveal
  {

    from
    {
      opacity: 0;
      bottom: -150px;
    }

    to
    {
      opacity: 1;
      bottom: 0;
    }
  }

  `]
})

export class NgxEmojFooterComponent implements OnInit  {

  @Input() footerBG: string;
  @Input() footerFG: string;
  @Input() footerFontSize: string;
  @Input() footerPadding;
  @Input() emos;
  @Input() activeIndicatorColor: string;
  @Input() activeIndicatorHeight: string;
  @Input() defaultActiveEmo: string;
  @Output() onemochange: any = new EventEmitter();
  @Input() martCategoryFontSize: string;
  @Input() martCategoryColor: string;
  @Input() martCategoryColorActive: string;
  @Output() onchardelete: any = new EventEmitter();
  @Input() hideFooter: boolean;
  activeEmo: string;



  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.activeEmo = this.defaultActiveEmo;
  }
  onEmoSelect(e) {

    this.activeEmo = e.name;
    this.onemochange.emit({name: e.name});
  }

  deleteChar(e) {
      this.onchardelete.emit({deleteChar: true});
  }
  delButton(fill, width, height){
    return `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.374 511.374" width="${width}" height="${height}" fill="${fill}" style="enable-background:new 0 0 511.374 511.374" xml:space="preserve"><g><g><path d="M433.134,47.687h-213.28c-37.109,0.21-72.235,16.778-96,45.28l-1.44,1.6l-115.2,140.8c-9.619,11.779-9.619,28.701,0,40.48l115.36,141.92c23.6,28.794,58.771,45.618,96,45.92h216.16c41.414-2.536,74.363-35.691,76.64-77.12c0-0.96,0-1.92,0-2.88v-257.12C510.781,83.499,476.196,48.631,433.134,47.687z M447.374,382.567c-0.428,9.583-8.327,17.13-17.92,17.12h-208c-19.662,0.779-38.49-7.979-50.56-23.52l-98.24-120.48l97.92-119.68c11.851-15.727,30.553-24.78,50.24-24.32h209.6c11.04,0,16,6.4,16.96,16V382.567z"/></g></g><g><g><path d="M373.934,296.967l-11.52-11.52c-12.504-12.504-32.776-12.504-45.28,0s-12.504,32.776,0,45.28l11.52,11.52c12.504,12.504,32.776,12.504,45.28,0S386.438,309.471,373.934,296.967z"/></g></g><g><g><path d="M373.934,169.127c-12.504-12.504-32.776-12.504-45.28,0h0.16l-41.44,41.28l-41.44-41.44c-12.504-12.504-32.776-12.504-45.28,0s-12.504,32.776,0,45.28l41.44,41.44l-41.44,41.44c-12.504,12.504-12.504,32.776,0,45.28s32.776,12.504,45.28,0l128-128C386.438,201.903,386.438,181.631,373.934,169.127z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`;
  }

}

import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ngx-emoj-category-content',
  template: `
  <input *ngIf="activeIndex === 0"  type="text" (keyup)="search($event)" placeholder="{{ searchEmojiPlaceholderText }}"
  class="ngx-emoji-search" [ngStyle]="{'color': searchBoxStyle.FGcolor,
                                       'background': searchBoxStyle.BGcolor,
                                       'border-radius': searchBoxStyle.borderRadius,
                                       'border-color': searchBoxStyle.borderColor}"/>
                                       <div class="ngx-emoji-not-found" *ngIf="activeIndex === 0 && notFound == true"
                                       [ngStyle]="{
                                        'color': martEmojiNotFoundFG
                                        }">
                                        {{ emojiNotFoundText }}
                                       </div>
  <div class="ngx-emoji-category-content" [ngStyle]="{'padding': '5px',
                                           'border-bottom': emojiBtnPadding.y+' solid transparent'}"
                                           #emojiContainer>

      <div class="emoji-btn-container"
        *ngFor="let emo of categoryEmojiSet" [ngStyle]="{'height': emojiBtnPadding.y,
                                                         'width': emojiBtnPadding.x   }">
          <button (click)="pickEmoji(emo)" class="ngx-emoji-emoj-btn"
          [ngStyle]="{'font-size': emojiFontSize}">
      {{ emo[0] }}
    </button>
      </div>
  </div>
  `,
  styles: [`


  .ngx-emoji-not-found
  {
    display: table;
    margin: 60px auto;
    font-size: 15px;
    font-family: sans-serif;
  }

  .ngx-emoji-search
  {
    width: 87%;
    display: table;
    border: 1px solid;
    padding: 5px 10px;
    height: 18px;
    font-family: sans-serif;
    margin: 15px auto 10px auto;
    outline: none;
  }

  .ngx-emoji-category-content
  {
    overflow-y: scroll;
    height: 80%;
    width: 105% !important;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    align-content: flex-start;
    justify-content: flex-start;
  }

  .emoji-btn-container
  {
    display: flex;
    overflow: hidden;
  }
  .ngx-emoji-emoj-btn
  {
    background: transparent;
    margin: auto;
    border: none;
    outline: none;
    cursor: pointer;
  }
  `]
})
export class NgxEmojCategoryContentComponent implements AfterViewInit {

  @Input() categoryName: string;
  @Input() categoryEmojiSet: any;
  @Input() activeIndex: number;
  @Output() onpickemoji = new EventEmitter;
  @Input() emojiBtnPadding: any;
  @Input() emojiFontSize: string;
  @Output() oncontentscroll: any = new EventEmitter;
  @Output() oncontentSwipe: any = new EventEmitter;
  @Input() recentEmojiDB: any;
  @Input() searchEmojiPlaceholderText: string;
  @Input() searchBoxStyle: any;
  @Input() emojiNotFoundText: string;
  @Input() martEmojiNotFoundFG: string;

  doneInitial: boolean;
  notFound: boolean;

  @ViewChild('emojiContainer') emojiContainer: ElementRef;
  // @ViewChild('swipePane') swipePane: ElementRef;

  initialSearch: any = [];

  constructor(private rd: Renderer2) {

    this.doneInitial = false;
    this.notFound = false;
  }

  search(e) {


    if (!this.doneInitial) {
      this.initialSearch = this.categoryEmojiSet;
      this.doneInitial = true;
    }

    const query = e.target.value.toLowerCase();

    if (query && query.trim() !== '') {
      this.categoryEmojiSet =  this.initialSearch.filter( item => {
        if (item[1].toLowerCase().indexOf(query) > -1) {
            return item;
        }
      });

    } else {
      this.categoryEmojiSet = this.initialSearch;
    }
    if (this.categoryEmojiSet.length === 0) {
      this.notFound = true;
    } else {
      this.notFound = false;
    }
  }

  ngAfterViewInit() {

    // listen for scroll event
    this.rd.listen(this.emojiContainer.nativeElement, 'scroll', (e) => {
        this.oncontentscroll.emit({scrollTop: this.emojiContainer.nativeElement.scrollTop,
           scrollHeight: this.emojiContainer.nativeElement.scrollHeight});
      });

      // handle swipe...

      this.swipedetect(this.emojiContainer.nativeElement, (swipedir) => {

        if (swipedir === 'left' || swipedir === 'right') {
          this.oncontentSwipe.emit({direction: swipedir});
        }
      });
  }

  swipedetect(el, callback) {

    const touchsurface = el;
    let swipedir,
    startX,
    startY,
    dist,
    distX,
    distY;
    const threshold = 150; // required min distance traveled to be considered swipe
    const restraint = 100; // maximum distance allowed at the same time in perpendicular direction
    const allowedTime = 300; // maximum time allowed to travel that distance
    let elapsedTime,
    startTime;
    const handleswipe = callback;

    this.rd.listen(touchsurface, 'touchstart', (e) => {
      const touchobj = e.changedTouches[0];
        swipedir = 'none';
        dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
         // record time when finger first makes contact with surface

         // Uncommented this to enale scroll in div
         // e.preventDefault();

    });


    // Uncommented this to enale scroll in div
    // this.rd.listen(touchsurface, 'touchmove', (e) => {
      // prevent scrolling when inside DIV
      // e.preventDefault();
    // });

    this.rd.listen(touchsurface, 'touchend', (e) => {
      const touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime) { // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
            swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
        } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
            swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir);
        // Uncommented this to enale scroll in div
      // e.preventDefault();
    });

  }


  pickEmoji(emoji) {
    this.onpickemoji.emit({emoji: emoji});
  }




}

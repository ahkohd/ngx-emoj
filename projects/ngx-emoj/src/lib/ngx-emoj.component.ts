import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import Theme from './interfaces/Theme';
import DEFAULTS from './misc/defaults';
import { EMOJIS } from './misc/emojis.data';
import { EMOS } from './misc/emos.data';



@Component({
  selector: 'ngx-emoj',
  template: `
    <div class="ngx-emoji-mart"
      [ngStyle]="
      {'background-color': (theme.martBG || DEFAULTS.martBG),
       'width': (width || DEFAULTS.martWidth),
       'height': (height || DEFAULTS.martHeight),
       'font-family': (theme.martFontFamily || DEFAULTS.martFontFamily),
       'border-radius': (theme.martBorderRadius || DEFAULTS.martBorderRadius)}">
      <ngx-emoj-header
        *ngIf="theme.martShowHeader"
        [headerBG]="(theme.martHeaderBG || DEFAULTS.martHeaderBG)"
        [headerFG]="(theme.martHeaderFG || DEFAULTS.martHeaderFG)"
        [headerFontSize]="(theme.martHeaderFontSize || DEFAULTS.martHeaderFontSize)"
        [headerPadding]="(theme.martHeaderPadding || DEFAULTS.martHeaderPadding)"
        [defaultActiveCategory]="'People'"
        [activeCategory]="activeCategory"
        (oncategorychange)="handleCategoryChange($event)"
        [martCategoryFontSize]="(theme.martCategoryFontSize || DEFAULTS.martCategoryFontSize)"
        [martCategoryColor]="(theme.martCategoryColor || DEFAULTS.martCategoryColor)"
        [martCategoryColorActive]="(theme.martCategoryColorActive || DEFAULTS.martCategoryColorActive)"
        [activeIndicatorColor]="(theme.martActiveCategoryIndicatorColor || DEFAULTS.martActiveCategoryIndicatorColor)"
        [activeIndicatorHeight]="(theme.martActiveCategoryIndicatorHeight || DEFAULTS.martActiveCategoryIndicatorHeight)"
        [emojiCategories]="emojiCategories">
      </ngx-emoj-header>

      <ngx-emoj-category-content
      [categoryName]="activeCategory"
      [categoryEmojiSet]="activeEmojiSet"
      [activeIndex]="activeIndex"
      [martEmojiNotFoundFG]="(theme.martEmojiNotFoundFG || DEFAULTS.martEmojiNotFoundFG)"
      [emojiNotFoundText]="(emojiNotFoundText || DEFAULTS.emojiNotFoundText)"
      [searchBoxStyle]="(theme.martSearchBoxStyle || DEFAULTS.martSearchBoxStyle)"
      [searchEmojiPlaceholderText]="(searchEmojiPlaceholderText || DEFAULTS.searchEmojiPlaceholderText)"
      [emojiBtnPadding]="(theme.martEmojiPadding || DEFAULTS.martEmojiPadding)"
      [emojiFontSize]="(theme.martEmojiFontSize || DEFAULTS.martEmojiFontSize)"
      (onpickemoji)="handleEmojiPick($event)"
      (oncontentSwipe)="handleContentSwipe($event)"
      (oncontentscroll)="handleContentScroll($event)">
      </ngx-emoj-category-content>
      <ngx-emoj-footer
      *ngIf="theme.martShowFooter"
      [footerBG]="(theme.martFooterBG || DEFAULTS.martFooterBG)"
      [footerFG]="(theme.martFooterFG || DEFAULTS.martFooterFG)"
      [footerFontSize]="(theme.martFooterFontSize || DEFAULTS.martFooterFontSize)"
      [footerPadding]="(theme.martFooterPadding || DEFAULTS.martFooterPadding)"
      [defaultActiveEmo]="'Emoji'"
      (onchardelete)="handleCharDelete($event)"
      (onemochange)="handleEmoChange($event)"
      [martCategoryFontSize]="(theme.martCategoryFontSize || DEFAULTS.martCategoryFontSize)"
      [martCategoryColor]="(theme.martCategoryColor || DEFAULTS.martCategoryColor)"
      [martCategoryColorActive]="(theme.martCategoryColorActive || DEFAULTS.martCategoryColorActive)"
      [activeIndicatorColor]="(theme.martActiveCategoryIndicatorColor || DEFAULTS.martActiveCategoryIndicatorColor)"
      [activeIndicatorHeight]="(theme.martActiveCategoryIndicatorHeight || DEFAULTS.martActiveCategoryIndicatorHeight)"
      [emos]="emos"
      [hideFooter]="hideFooter">
    </ngx-emoj-footer>

    </div>
  `,
  styles: [`

    .ngx-emoji-mart
    {
      position: relative;
      margin: 0;
      margin-bottom: 10px;
      padding: 0px;
      box-sizing: border-box;
      overflow: hidden;
    }
  `]
})


export class NgxEmojComponent implements OnInit {

  readonly DEFAULTS = DEFAULTS;

  @Input() width: string;
  @Input() height: string;
  @Output() onemojipick: any = new EventEmitter;
  @Output() onchardelete: any = new EventEmitter;


  // Initially  apply default config...
  @Input() theme: Theme = {};

  emojiCategories: any[] = [];

  // list of emos type, e.g emoji, gifs, stickers...
  emos: any [] = [];
  activeCategory: string;
  activeEmo: string;
  activeIndex: number;
  activeEmojiSet: any[];
  hideFooter: Boolean = false;


  @Input() maxRecentEmoji: string;
  @Input() recentEmojiStoreKey: string;
  @Input() searchEmojiPlaceholderText: string;
  @Input() emojiNotFoundText: string;

  emojiDB: any;
  emojiDBKey: string;

  constructor() {
  }

  ngOnInit() {

    // Set recent emoji store key...
    this.emojiDBKey  = this.recentEmojiStoreKey || DEFAULTS.recentEmojiStoreKey;
    // Get recent emojis..
    this.emojiDB = window.localStorage.getItem(this.emojiDBKey);
    if (this.emojiDB) {
    this.emojiDB =  JSON.parse(this.emojiDB);
    } else {
      // no stored recent emoji, save in the store array ...
      this.emojiDB = [];
      window.localStorage.setItem(this.emojiDBKey, JSON.stringify(this.emojiDB));
    }

    this.activeCategory = 'People';
    // get the emoji categories
    this.emojiCategories = EMOJIS.map((value) => {
      return {name: value.name, icon: value.icon};
    });

    // filter to set defaults
    this.activeEmojiSet = EMOJIS.filter((category) => {
      if (category.name === this.activeCategory) {
            return category;
      }
    });

    this.activeIndex = this.activeEmojiSet[0].id;
    // console.log('Initial Emo Index:', this.activeIndex);
    this.activeEmojiSet = this.activeEmojiSet[0].emojis;


    this.activeEmo = 'Emoji';
    // collate the emos type
    this.emos = EMOS.map((value) => {
      return {name: value.name, icon: value.icon};
    });
  }

  handleCategoryChange(e) {
    // set active category name...
    this.activeCategory = e.name;

    if (e.name === 'Recent') {
        // If recent category, set emoji to emojis in the recent store...
        this.activeIndex = EMOJIS[1].id;
        this.activeEmojiSet = this.emojiDB;
      } else if (e.name === 'Search') {
          this.activeIndex = EMOJIS[0].id;
          this.activeEmojiSet = this.emojiDB.concat(EMOJIS[2].emojis);
      } else {
               // filter to set current emoji set...
            this.activeEmojiSet = EMOJIS.filter((category) => {
                if (category.name === this.activeCategory) {
                    return category;
              }
             });
           // update the index on manual change...
            this.activeIndex = this.activeEmojiSet[0].id;
            this.activeEmojiSet = this.activeEmojiSet[0].emojis;

      }
  }

  handleEmoChange(e) {
    this.activeEmo = e.name;
    // collate the emos type
  //   this.emos = EMOS.map((value) => {
  //    return {name: value.name, icon: value.icon};
  //  });
 }

 checkIfEmojiExistsInEmojiDB(name) {
  let emo_exists = false;
  // checks if emoji is already in recent emoji db store...
  for (let i = 0; i < this.emojiDB.length; i++) {
    if (this.emojiDB[i][1] === name) {
      emo_exists = true;
      break;
    }
  }

  return emo_exists;

 }
  addEmojiToRecentEmojiDB(emoji: string[]) {
    // check if there is no duplicate
    if (!this.checkIfEmojiExistsInEmojiDB(emoji[1])) {
        // recent emoji greater than the number of max, remove the first emoji and add new one
        // to the back...
        if (this.emojiDB.length < (this.maxRecentEmoji || DEFAULTS.maxRecentEmoji)) {
          this.emojiDB.push(emoji);
          window.localStorage.setItem(this.emojiDBKey, JSON.stringify(this.emojiDB));
      } else {
        this.emojiDB.splice(0, 1);
        this.emojiDB.push(emoji);
        window.localStorage.setItem(this.emojiDBKey, JSON.stringify(this.emojiDB));
      }
    }
  }


  handleEmojiPick(e) {

    // save the picked emoji inside recent emoji DB
    this.addEmojiToRecentEmojiDB(e.emoji);

    this.onemojipick.emit({char: e.emoji[0], name: e.emoji[1]});
  }

  handleCharDelete(e) {
    this.onchardelete.emit({deleteChar: true});
  }

  handleContentScroll(e) {
    // console.log('emitted', e.scrollTop, e.scrollHeight);

    if ((e.scrollHeight - e.scrollTop) <= 400) {

      // console.log('almost at the end');
      this.hideFooter = true;
    } else {
      // console.log('tooping the scroll');
      this.hideFooter = false;
    }
  }

  handleContentSwipe(e) {
    const currentIndex = this.activeIndex;
    const direction = e.direction;
    // Log the necessary details...
    if (direction === 'left') {
      const prev: number = currentIndex - 1;
      if (prev >= 0) {

        if (prev === 0) {
          // search
          this.activeIndex = EMOJIS[0].id;
          this.activeCategory = EMOJIS[0].name;
          this.activeEmojiSet = this.emojiDB.concat(EMOJIS[2].emojis);
        } else if (prev === 1 ) {
          // recent
          this.activeIndex = EMOJIS[1].id;
          this.activeCategory = EMOJIS[1].name;
          this.activeEmojiSet = this.emojiDB;
        } else {
          const prevCategoryData = EMOJIS.filter((category) => {
                if (category.id === prev) {
                  return category;
                }
            });
            // set the values...
            this.activeIndex = prev;
            this.activeCategory = prevCategoryData[0].name;
            this.activeEmojiSet = prevCategoryData[0].emojis;
        }
      }
    } else if (direction === 'right') {
        const next = currentIndex + 1;
        if (next === 0) {
          // search
          this.activeIndex = EMOJIS[0].id;
          this.activeCategory = EMOJIS[0].name;
          this.activeEmojiSet = this.emojiDB.concat(EMOJIS[2].emojis);
        } else if (next === 1 ) {
          // recent
          this.activeIndex = EMOJIS[1].id;
          this.activeEmojiSet = this.emojiDB;
          this.activeCategory = EMOJIS[1].name;

        } else {
          if (next <= (EMOJIS.length - 1)) {
                const prevCategoryData = EMOJIS.filter((category) => {
                  if (category.id === next) {
                    return category;
                  }
              });
              // set the values...
              this.activeIndex = next;
              this.activeCategory = prevCategoryData[0].name;
              this.activeEmojiSet = prevCategoryData[0].emojis;
          }
      }
    }
  }

}


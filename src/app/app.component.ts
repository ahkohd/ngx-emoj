import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ngx-emoji';
  isEmpty: boolean;

  martBGcolor: string = '#ebeff2';
  martHeaderBG: string = '#e3e7e8';
  martFooterBG: string = '#e3e7e8';
  martActiveCategoryIndicatorColor: string = '#00897b';
  martCategoryColor: string = '#94a0a6';
  martCategoryColorActive: string = '#455a64';
  martBorderRadius: number = 10;
  showHeader: boolean = true;
  showFooter: boolean = true;
  martActiveCategoryIndicatorHeight: number = 4;
  martEmojiFontSize: number = 150;
  martCategoryFontSize: number = 20;


  x1: number = 0;
  x2: number = 0;
  x3: number  = 40;
  y1: number = 0;
  y2: number = 0;
  y3 = 40;



constructor(public dialog: MatDialog) {
    this.firstPick = false;
    this.text = 'Pick an emoji 😉';
    this.isEmpty = true;
}


  text: string;
  firstPick: boolean;

  handleEmoji(e) {
    if (this.isEmpty) {
      this.isEmpty = false;
      this.text = '';
    }

    if (!this.firstPick) {
      this.text = '';
      this.firstPick = true;
    }
    this.text += e.char;
    console.log('Emoji Name', e.name);


  }

  handleCharDelete(e) {

    if (this.isEmpty) {
      return;
    }

    if (this.text.length > 0) {
      this.text = this.text.substr(0, this.text.length - 2);
      if (this.text.length  === 0 ) {
        this.isEmpty = true;
        this.text = 'Pick a emoji 😉';
      }
    }
  }


  openDialog() {
    let template =
    `{
      martShowHeader: ${this.showHeader},
      martShowFooter: ${this.showFooter},
      martHeaderPadding: {x: '${this.x1}px', y: '${this.y1}px'},
      martFooterPadding: {x: '${this.x2}px', y: '${this.y2}px'},
      martHeaderBG: '${this.martHeaderBG}',
      martFooterBG: '${this.martFooterBG}',
      martBG: '${this.martBGcolor}',
      martCategoryColor: '${this.martCategoryColor}',
      martCategoryColorActive:  '${this.martCategoryColorActive}',
      martActiveCategoryIndicatorColor: '${this.martActiveCategoryIndicatorColor}',
      martEmojiFontSize: '${this.martEmojiFontSize}%',
      martCategoryFontSize: '${this.martCategoryFontSize}px',
      martBorderRadius: '${this.martBorderRadius}px',
      martActiveCategoryIndicatorHeight: '${this.martActiveCategoryIndicatorHeight}px',
      martEmojiPadding: {x: '${this.x3}px', y: '${this.y3}px'}
    }`

     const dialogRef = this.dialog.open(CodeModal, {
      width: '65%',
      data: {code: template.trim()}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  }


}



  export interface DialogData {
    code: string;
  }


@Component({
  selector: 'show-code-modal',
  templateUrl: 'show-code-modal.html',
  styles: [`
      .code-area
      {
        width: 100%;
        border: 2px solid #eee;
        border-radius: 5px;
        height: 200px;
        margin: 10px auto;
      }

      .code-label
      {
        color: #666;
        
      }

      .code-label span  {
          background: #eee;
          color: #ff4081;
          padding: 5px;
          display: inline-block;
          border-radius: 3px;
        }
        
        .mat-dialog-title
        {
          margin-bottom: 0 !important;
        }
  `]
})
export class CodeModal {

  constructor(
    public dialogRef: MatDialogRef<CodeModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private snackBar: MatSnackBar) {}

  copied(): void {
     this.snackBar.openFromComponent(CodeCopiedSnackBar, {
      duration: 500,
    });
    this.dialogRef.close();
  }

}


@Component({
  selector: 'snack-bar-copied',
  template: `
    <span class="copied">
      😆💯 Copied to clipboard!
      </span>`,
  styles: [`
    .copied {
      color: hotpink;
    }
  `],
})
export class CodeCopiedSnackBar {}



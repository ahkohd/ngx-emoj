import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ngx-emoji';

  text: String = '';

  handleEmoji(e) {
    this.text += e.char;
    console.log('Emoji Name', e.name);
  }

  handleCharDelete(e) {
    if (this.text.length > 0) {
      this.text = this.text.substr(0, this.text.length - 2);
    }
  }
}

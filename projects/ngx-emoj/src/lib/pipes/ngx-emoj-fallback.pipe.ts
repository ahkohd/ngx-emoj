import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import ifEmoji from 'if-emoji'
import twemoji from 'twemoji';

@Pipe({
  name: 'ngxEmojFallback'
})
export class NgxEmojFallbackPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(emoji: string): string | SafeHtml {
    return ifEmoji(emoji) ? emoji : this.domSanitizer.bypassSecurityTrustHtml(twemoji.parse(emoji.trim()));
  }
}
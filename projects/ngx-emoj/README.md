# ngx-emoj

A simple, theme-able emoji mart/picker for angular 4+

## Demo
![ngx-emoji been used in a Ionic3 project](https://i.imgur.com/l73IfUG.gif)

### Theme Creator
Also see a demo at the [project's home page](https://ahkohd.github.io/ngx-emoj). You can use the theme creator to style up a new theme.

## Features
 - No use of external dependencies, implemented with Angular APIs.
 - Fully themeable with ease.
 - A light-weight library, does not load any stylesheets or images.
- Uses Unicode emoji chars, which makes emoji look and feels native.
 - Flexible Interfaces to theme the looks of the emoji mart.
 - Mobile ready, supports touch interactions, like swipe.
 - You can easily create themes with the theme creator at the [project's home page](https://ahkohd.github.io/ngx-emoj)
 - Persistently saves recently used emojis using `window.localStorage`
 -  Works with **Ng2** to **Ng7** projects and as well as **Ionic 3/4**.

# Install
### Install the module via NPM
```shell
npm i ngx-emoj --save
```
## Import it in your app's module(s)

Import `EmojiPickerModule.forRoot()` in your app's main module

app.module.ts

```ts
import  {  NgxEmojModule  }  from  'ngx-emoj';

@NgModule({
    ...
    imports: [
      ...
      NgxEmojModule
      ],
    ...
})
export class AppModule {}
```


## Sample
### A simple example of ngx-emoj in action
```html
<div>
	<h1>Pick an Emoji: {{ text }}</h1>
	<ngx-emoj
		(onemojipick)="handleEmoji($event)"
		(onchardelete)="handleCharDelete($event)"
		[width]="'35vw'"
		[height]="'50vh'">
	</ngx-emoj>
</div>
```

```ts
text:  string  =  '';

handleEmoji(e)  {
	this.text +=  e.char;
	console.log('Emoji Name',  e.name);
}

handleCharDelete(e)  {
	if (this.text.length >  0) {
		this.text =  this.text.substr(0,  this.text.length -  2);
	}
}
```


# Directive API:
```html
<ngx-emoj
		(onemojipick)="handleEmoji($event)"
		(onchardelete)="handleCharDelete($event)"
		[width]="'String. unit in css, i.e 30vh, 150px, 50% Required!'"
		[height]="'String. unit in css, i.e 30vh, 150px, 50% Required!'"
		[theme]="{ ...Implements Theme Interface... }"
		[maxRecentEmoji]="Number"
		[recentEmojiStoreKey]="'String'"
		[searchEmojiPlaceholderText]="'String'"
		[emojiNotFoundText]="'String'">
</ngx-emoj>
```

##
 - **[height]** :  The height of the emoji picker _(required!)_
 - **[width]** :  The width of the pre-loaded image. _(required!)_
 - **[maxRecentEmoji]** :  (Integer) of emojis to save as recently used emojis. (optional), default set  to 36 emojis.
 - **[recentEmojiStoreKey]** :   (String) The name of the key to store the recent emojis in the `window.localStorage` (optional) default set to `'ngx-emoji-picker-recent-emo-store'`
 - **[searchEmojiPlaceholderText]**: (String) Use to set custom emoji picker search box placeholder text. (Optional) default set to `'Search'`
 - **[emojiNotFoundText]**: (String) Use to set custom emoji picker no search result text. (Optional) default set to `'No results ;)'`
 - **[theme]**: (Theme) Use to set custom theme/ change the overall appearace of the emoji picker. Also see the **Theme Interface**` for more info on how to theme. (optional) Default, **Whatsapp EmojiPicker Theme**.

## Events
`<ngx-emoj>` component emits two events. Use this to

 - **(onemojipick)**:  Emits when user picks an emoji. Emits `EmojiEvent{ char : "😌", name: "relieved" }`
 ```html
	 ....
		 (onemojipick)="handleEmoji($event)"
		...
 ```
 ```ts
	 handleEmoji(e)  {
		// invoked when picks a emoji...
		this.text +=  e.char;
		// get the picked emoji
		console.log('Emoji Name',  e.name);
	}
 ```
 - **(onchardelete)**:  Emits when user clicks on the delete character button on the emoji picker. Use this to delete the last character/emoji in your string.
  ```html
	 ....
		 (onchardelete)="handleCharDelete($event)"
	 ...
 ```
 ```ts
 handleCharDelete(e)  {
	if (this.text.length >  0) {
		this.text =  this.text.substr(0,  this.text.length -  2);
	}
}
 ```

## Theming
 **ngx-emoj** can be themed using `[theme]` and passing in an object implementing the **Theme Interface**. Also you can easily theme with  the creator at the [project's home page](https://ahkohd.github.io/ngx-emoj)

```html
<ngx-emoj
	...
		[theme]="{...}"
	... >
</ngx-emoj>
```
The theme interface
```ts
interface  Theme  {
	martFontFamily?:  string;						// Font family used by the emoji picker.	
	martBG?:  string;								// Background color of the emoji picker.
	martShowHeader?:  boolean;						// If set to false, ngx-emoji will not show it's header.
	martHeaderBG?:  string;							// Background color of the mart header.
	martHeaderFG?:  string;							// Text color of the emoji picker header.
	martActiveCategoryIndicatorColor?:  string;		// Color of the  Icon of the active emoji category.
	martActiveCategoryIndicatorHeight?:  string;	// Border Color of the active emoji category indicator.
	martHeaderFontSize?:  string;					// Font size of the emoji picker header.
	martHeaderPadding?:  {x:  string,  y:  string}; // Padding of the emoji picker header, NOTE: once set, both 'x' and 'y' must be defined.
	martCategoryFG?:  string;						// Text color at the emoji picker category.
	martIconsFG?:  string;							// Color of the icons that marks a category at the emoji picker header.
	martWidth?:  string;							// Emoji picker width.
	martHeight?:  string;							// Emoji picker height.
	martBorderRadius?:  string;						// Border radius of the emoji picker.
	martEmojiFontSize?:  string;					// Overall font size of the emoji picker.
	martEmojiPadding?:  {x:  string;  y:  string};	// Overall padding of the emoji. NOTE: Once set, 'x' and 'y' values must be defined.
	martCategoryFontSize?:  string;					// Font size of the emoji picker category.
	martCategoryColor?:  string;					// Emoji picker category section text color.
	martCategoryColorActive?:  string;				// Emoji picker active category section color.
	martFooterFG?:  string;							// Emoji picker footer text color.
	martFooterBG?:  string;							//	Emoji picker footer background color.
	martFooterFontSize?:  string;					// Emoji picker footer font size.
	martFooterPadding?:  {x:  string,  y:  string}; // Padding of the emoji mart footer.
	martShowFooter?:  boolean;					    // If set to false, emoji picker footer will not be shown.
	martSearchBoxStyle?:  {							// Emoji picker search box style.
		FGcolor?:  string,
		BGcolor?:  string,
		borderColor?:  string,
		placeHolderColor?:  string,
		borderRadius?:  string
	};
}
```

### Theme Example - Whatsapp Emoji picker theme (default)
```html
<ngx-emoj
		(onemojipick)="handleEmoji($event)"
		(onchardelete)="handleCharDelete($event)"
		[width]="'35vh'"
		[height]="'50vh'"
		[theme]="{
			martShowHeader: true,
			martShowFooter: true,
			martHeaderPadding: {x: '0', y: '0'},
			martFooterPadding: {x: '0', y: '0'},
			martHeaderFontSize: '14px',
			martHeaderBG: '#e3e7e8',
			martFooterBG: '#e3e7e8',
			martBG: '#ebeff2',
			martCategoryColor: '#94a0a6',
			martCategoryColorActive: '#455a64',
			martActiveCategoryIndicatorColor: '#00897b',
			martEmojiFontSize: '150%',
			martCategoryFontSize: '20px',
			martBorderRadius: '5px',
			martActiveCategoryIndicatorHeight: '4px',
			martEmojiPadding: {x: '40px', y: '40px'}
		}"
		[maxRecentEmoji]="Number"
		[recentEmojiStoreKey]="'String'"
		[searchEmojiPlaceholderText]="'String'"
		[emojiNotFoundText]="'String'">
</ngx-emoj>
```


## Todo
- Add `gif` support using GIPHY API.
- Add stickers support.
 - Target for **Webcomponent** for use with other front-end frameworks and PWAs.
 
 
## Contributing

 - Your commits conform to the conventions established [here
](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md)

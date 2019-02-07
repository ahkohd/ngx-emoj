export default interface Theme {
    martFontFamily?: string;
    martBG?: string;
    martShowHeader?: boolean;
    martHeaderBG?: string;
    martHeaderFG?: string;
    martActiveCategoryIndicatorColor?: string;
    martActiveCategoryIndicatorHeight?: string;
    martHeaderFontSize?: string;
    martHeaderPadding?: {x: string, y: string};
    martCategoryFG?: string;
    martIconsFG?: string;
    martWidth?: string;
    martHeight?: string;
    martBorderRadius?: string;
    martEmojiFontSize?: string;
    martEmojiPadding?: {x: string; y: string};
    martCategoryFontSize?: string;
    martCategoryColor?: string;
    martCategoryColorActive?: string;
    martFooterFG?: string;
    martFooterBG?: string;
    martFooterFontSize?: string;
    martFooterPadding?: {x: string, y: string};
    martShowFooter?: boolean;
    martEmojiNotFoundFG?: string;
    martSearchBoxStyle?: {
      FGcolor?: string,
      BGcolor?: string,
      borderColor?: string,
      placeHolderColor?: string,
      borderRadius?: string
    };
}

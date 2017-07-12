export default function TextFieldStyle(style) {

  const baseFontsize = style.baseFontsize;
  const lineHeight = style.baseLineHeight;

  return {
    width: '100%',
    height: lineHeight * 3,
    fontSize: baseFontsize,
    lineHeight: `${lineHeight}px`,
    inputStyle: {
      marginTop: `${baseFontsize}px`,
    },
    errorStyle: {
    },
    hintStyle: {
      bottom: `${0.5 * baseFontsize}px`,
    },
    floatingLabelStyle: {
      top: `${lineHeight + baseFontsize}px`,
      lineHeight: `${lineHeight}px`,
    },
    floatingLabelShrinkStyle:{
      transform: `scale(0.75) translate(0, -${1.25*lineHeight}px)`
    },
    underlineStyle:{
      bottom: `${0.5 * baseFontsize}px`
    },
  }

}

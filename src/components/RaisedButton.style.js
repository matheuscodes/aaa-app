export default function RaisedButtonStyle(style) {

  return {
    margin: `${style.defaultMargin}px`,
    overlayStyle: {
      height: `${style.baseLineHeight * 2}px`,
    },
    buttonStyle: {
      height: `${style.baseLineHeight * 2}px`,
      lineHeight: `${style.baseLineHeight * 2}px`,
    },
    labelStyle: {
      padding: `${style.baseLineHeight}px`,
      lineHeight: `${style.baseLineHeight * 2}px`,
      fontSize: `${style.baseFontsize}px`,
    }
  }

}

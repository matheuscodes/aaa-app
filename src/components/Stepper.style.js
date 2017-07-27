export default function StepperStyle(style) {

  return {
    stepLabel: {
      fontSize: style.baseFontsize,
      height: style.styleProvider.select({
        phone: 2 * style.baseLineHeight,
        desktop: 3 * style.baseLineHeight,
      }),
      iconContainerStyle: {
        transform: `scale(${style.baseLineHeight / 24 /*step button width*/})`,
      },
      p: {
        paddingLeft: `${style.baseLineHeight / 2}px`,
      },
    },
    contentDivStyle: {
      margin: `${style.baseLineHeight / 2}px`,
      width: `calc(100% - ${style.baseLineHeight / 2}px)`,
    },
  }

}

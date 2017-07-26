import MUI from 'app/common/MaterialUI';

export default function DatePickerStyle(style) {

  const fixScale = style.TextField.height / 72; //72px is the default MUI size.
  const dialogScale = style.styleProvider.select({
    phone: style.styleProvider.percent(80),
    tablet: style.styleProvider.percent(30),
    desktop: style.styleProvider.percent(25),
  }) / 310; //310px is the default MUI size.

  const square = Math.sqrt(dialogScale);

  return {
    height: style.TextField.height,
    textFieldStyle: {
      transform: `translate(${fixScale*100 / 2 - 50}%,${fixScale*100 / 2 - 50}%) scale(${fixScale})`,
    },
    dialogContainerStyle: {
      transform: `scale(${square > 1 ? square : 1})`,
      boxShadow: '0px 14px 45px rgba(0, 0, 0, 0.25), 0px 10px 18px rgba(0, 0, 0, 0.22)',
      background: MUI.palette.canvasColor,
      backgroudSize: `${dialogScale*310}px ${dialogScale*470}px`
    },
  }

}

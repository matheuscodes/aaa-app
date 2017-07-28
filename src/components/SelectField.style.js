export default function SelectFieldStyle(style) {

  const baseFontsize = style.baseFontsize;
  const lineHeight = style.baseLineHeight;

  return {
    TextField: style.TextField,
    DropDownMenu: {
      menuItemStyle:{
        fontSize: `${baseFontsize}px`,
        lineHeight: `${lineHeight}px`,
        padding: `${lineHeight / 2}px ${lineHeight / 2}px`,
      },
      label: {
        paddingLeft: 0,
        lineHeight: `${lineHeight}px`,
        top: `${1.25*baseFontsize}px`,
      },
      icon: {
        right: 0,
        lineHeight: `${lineHeight}px`,
      },
      hideDropDownUnderline: {
        borderTop: 'none',
      },
      dropDownMenu: {
        display: 'block',
      },
    },
  }

}

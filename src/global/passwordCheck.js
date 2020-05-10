export default function passwordCheck(password, t) {
  if(password) {
    if(password.length < 8) {
      return {
        error: true,
        text: t('login:passwordTextField.errorShort')
      }
    } else if(!password.match(/[a-z]+/) || !password.match(/[A-Z]+/) || !password.match(/[0-9]+/)) {
      return {
        error: true,
        text: t('login:passwordTextField.errorNotSecure')
      }
    }
  }
  return {error:undefined,text:undefined}
}

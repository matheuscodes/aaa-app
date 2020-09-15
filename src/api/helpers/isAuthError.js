import deleteLocalArcher from "./deleteLocalArcher"

export default function isAuthError(error) {
  if(error instanceof Error){
    switch(error.message){
      case 'Missing Token.':
      case 'Token is invalid.':
      case 'No token provided.':
      case 'Authentication error.':
      case '{"message":"invalid signature"}':
        deleteLocalArcher();
        return true;
      default:
        return false;
    }
  }
  return false;
};

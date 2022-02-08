export function getErrorMessage(result: number) {
  switch(result) {
    case 422:
      return 'Incorrect e-mail or password';
    case 403:
      return 'Incorrect e-mail or password';
    case 404:
      return 'No such user, please register!';
    case 417:
      return 'User with this e-mail already exists';
    default: 
      return '';
  }
}

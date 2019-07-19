export function reducer(state = { isOn: true }, action) {
    switch (action.type) {
      case 'userLoggedIn': {
        return {
          isOn: false
        };
      }
  
      case 'userLoggedOut': {
        return {
          isOn: true
        };
      }
  
      default:
        return state;
    }
  }
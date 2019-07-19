// import { Action } from '@ngrx/store'
import { User } from './../auth/user.model';
import * as LoginActions from './../actions/login.actions'

const initialState: User = {
    email: 'NONE',
    userId: 'NONE'
}

export function reducer(state: User = initialState, action: LoginActions.Actions) {
    switch(action.type) {
        case LoginActions.USER_LOGGEDIN:
            return action.payload;

        case LoginActions.USER_LOGGEDOUT:
            return initialState;
        default:
            return state;
    }
}
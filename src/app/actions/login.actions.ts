    
// import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { User } from './../auth/user.model'

export const USER_LOGGEDIN       = '[USER] LOGIN'
export const USER_LOGGEDOUT    = '[USER] LOGOUT'

export class LoginUser implements Action {
    readonly type = USER_LOGGEDIN

    constructor(public payload: User) {}
}

export class LogoutUser implements Action {
    readonly type = USER_LOGGEDOUT

    // constructor(public payload: number) {}
}

export type Actions = LoginUser | LogoutUser
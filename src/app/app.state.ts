import { User } from './auth/user.model'

export interface AppState {
    readonly user: User;
}
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject'; 
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
// import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
// import { Store } from '@ngrx/store';
import { UIService } from '../shared/ui.service';
// import * as fromRoot from '../app.reducer';
// import * as UI from '../shared/ui.actions';
// import * as Auth from './auth.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthService {
    private isAuthenticted: boolean;
    authChange = new Subject<boolean>();
    
    constructor(private router: Router, private afAuth: AngularFireAuth, private uiService: UIService, private store: Store<any>,
        // private trainingService: TrainingService, private matSnackBar: MatSnackBar,
        // private store: Store<{ ui: fromRoot.State }>
    ) {}

    initAuthListener() {
        this.afAuth.authState.subscribe( user => {
            if(user) {
                this.isAuthenticted = true;
                this.authChange.next(true);
                // this.store.dispatch(new Auth.SetAuthenticated());
                //this.router.navigate(['/training']);
            } else {
                // this.trainingService.cancelSubscriptions();
                // this.store.dispatch(new Auth.SetUnauthenticated());
                this.isAuthenticted = false;
                this.authChange.next(false);
                // this.router.navigate(['/login']);
            }
        })
    }

    registerUser(authData: AuthData){
        // this.uiService.loadingStateChanged.next(true);
        // this.store.dispatch({ type: 'START_LOADING' });
        // this.store.dispatch(new UI.StartLoading());        
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                // this.uiService.loadingStateChanged.next(false);
                // this.store.dispatch({ type: 'STOP_LOADING' });
                // this.store.dispatch(new UI.StopLoading());
                this.store.dispatch({ type: 'userLoggedIn' })
            })
            .catch(error => {
            //    this.uiService.loadingStateChanged.next(false);
                // this.store.dispatch({ type: 'STOP_LOADING' });
                // this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
        });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        // this.store.dispatch({ type: 'START_LOADING' });
        // this.store.dispatch(new UI.StartLoading());
        // this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log("SUCCESS!!");
                this.uiService.loadingStateChanged.next(false);
                // this.store.dispatch({ type: 'STOP_LOADING' });
                // this.store.dispatch(new UI.StopLoading());
                this.store.dispatch({ type: 'userLoggedIn' })
            })
            .catch(error => {
                console.log("FAILED!!")
                this.uiService.loadingStateChanged.next(false);
                // this.store.dispatch({ type: 'STOP_LOADING' });
                // this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackbar(error.message, null, 3000);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
        this.store.dispatch({ type: 'userLoggedOut' })
    }

    isAuth() {
        return this.isAuthenticted;
    }
}
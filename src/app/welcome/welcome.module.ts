import { WelcomeComponent } from './welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  

import { TodaysComponent } from './todays/todays.component'; 
import { MaterialModule } from '../material.module';


const routes: Routes = [
    // { path: '', component: WelcomeComponent},
    // { path: 'wel/todays', redirectTo: 'TodaysComponent' },
    // { path: 'signup', component: SigninpopupComponent },
    // { path: 'login', component: LoginpopupComponent },

    {
        path: '', component: WelcomeComponent,
        children: [
            { path: 'charts/:name', component: TodaysComponent },
        ]
      }


  ];

@NgModule({
    declarations: [
        TodaysComponent,
        WelcomeComponent,
    ],
    imports: [
        // WelcomeRoutingModule,
        RouterModule.forChild(routes),
        // MatButtonModule, MatButtonToggleModule,
        MaterialModule,
        CommonModule
    ],
    exports: [
        RouterModule,
        // MatButtonModule, MatButtonToggleModule,
        MaterialModule
    ],
})

export class WelcomeModule {}
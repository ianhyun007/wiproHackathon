import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginpopupComponent } from '../loginpopup.component';
import { AuthService } from '../../auth/auth.service';

import { MatDialog } from '@angular/material';
import { SigninpopupComponent } from '../signinpopup.component';
import { Subscription } from 'rxjs';
import { CreateHackathonComponent } from '../create-hackathon.component';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../../posts/post.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscription: Subscription;
  private postsSub: Subscription;
  isAuth: boolean;

  constructor(private dialog: MatDialog, private authService: AuthService, private postsService: PostsService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      if(authStatus) {
        this.dialog.closeAll();
      } 
      this.isAuth = authStatus;
    });

    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.dialog.closeAll();
      });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogIn() {
      const dialogRef = this.dialog.open(LoginpopupComponent);
      // dialogRef.afterClosed().subscribe(result => {
      //   if(result) {
      //     this.trainingService.cancelExercise(this.progress);
      //   } else {
      //     this.startOrResumeTimer();
      //   }
      // })
  }

  onSignUp() {
    const dialogRef = this.dialog.open(SigninpopupComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {
    //     this.trainingService.cancelExercise(this.progress);
    //   } else {
    //     this.startOrResumeTimer();
    //   }
    // })
  }

  onHackCreate() {
    const dialogRef = this.dialog.open(CreateHackathonComponent);
  }

  onLogout() {
    this.authService.logout();
  }

}

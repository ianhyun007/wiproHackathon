import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UIService } from '../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';
import { CreateHackathonComponent } from '../navigation/create-hackathon.component';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { User } from './../auth/user.model';
// import { AppState } from './../app.state';
import * as LoginActions from './../actions/login.actions';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  displayedColumns = ['title','content','startDate'];
  dataSource = new MatTableDataSource<Post>();
  isAuth = true;
  authSubscription: Subscription;
  private postsSub: Subscription;
  posts: Post[] = [];
  butToggleVal = 'todays';
  showTable = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  user: Observable<User>;
  spinner$: Observable<boolean>;
  
  constructor(private uiService: UIService, private authService: AuthService, 
    private dialog: MatDialog, private postsService: PostsService, private router: Router,
    private store: Store<any>) {
    } 
    
  ngOnInit() {
    this.spinner$ = this.store.pipe(select(state => state.spinner.isOn));

    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      if(authStatus) {
        this.isAuth = false;
        this.store.dispatch({ type: 'userLoggedIn' })
      } else {
        this.isAuth = true;
        
      } 

      let test = 'wel/charts/:todays';
      this.router.navigate([test]);
    });

  }

  blockAuthMsg() {
    this.uiService.showSnackbar("Please Signup/Login first", null, 2000);
  }

  onValChange(val: string) {
    let test = 'wel/charts/:'+val;
    this.router.navigate([test]);
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  onEdit(post: Post) {
    const dialogRef = this.dialog.open(CreateHackathonComponent,
      {data: {post:post}});
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

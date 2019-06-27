import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UIService } from '../shared/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';
import { CreateHackathonComponent } from '../navigation/create-hackathon.component';

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

  butBgCol1: string = '#000';
  butBgCol2: string = '#FFF';
  butBgCol3: string = '#FFF';
  // butBgCol2: string = '#DEFAF8';
  // butBgCol3: string = 'lightgray';

  butFtCol1: string = '#FFF';
  butFtCol2: string = '#000';
  butFtCol3: string = '#000';


  constructor(private uiService: UIService, private authService: AuthService, 
    private dialog: MatDialog, private postsService: PostsService) {} 
    
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      if(authStatus) {
        this.isAuth = false;
      } else {
        this.isAuth = true;
      } 
    });

    this.postsService.getWhichPosts('todays');

    // this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.dataSource.data = posts;
        this.dataSource.sort = this.sort;
      });
  }

  blockAuthMsg() {
    this.uiService.showSnackbar("Please Signup/Login first", null, 2000);
  }

  onValChange(val: string) {
    this.butToggleVal = val;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    if(val === 'todays') {
      this.butBgCol1 = '#000';  
      this.butBgCol2 = '#FFF';
      this.butBgCol3 = '#FFF';
      this.butFtCol1 = '#FFF';
      this.postsService.getWhichPosts('todays');
    } else if(val === 'upcoming') {
      this.butBgCol2 = '#DEFAF8';
      this.butBgCol1 = '#FFF';  
      this.butBgCol3 = '#FFF';
      this.butFtCol1 = '#000';
      this.postsService.getWhichPosts('upcoming');
    } else {
      this.butBgCol3 = 'lightgray';
      this.butBgCol1 = '#FFF';  
      this.butBgCol2 = '#FFF';
      this.butFtCol1 = '#000';
      this.postsService.getWhichPosts('archived');
    }
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  // onEdit(postId: string, postTitle: string, postContent: string, postStartDate: Date) {
  onEdit(post: Post) {
    const dialogRef = this.dialog.open(CreateHackathonComponent,
      // {data: {id:post.id, title:post.title, content:post.content, sDate:post.startDate}});
      {data: {post:post}});
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}

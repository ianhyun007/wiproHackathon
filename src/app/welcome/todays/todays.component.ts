import { routeFadeStateTrigger, itemStateTrigger, itemStateTrigger2, itemStateTrigger3 } from './../shared/route-animations';
import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../../posts/post.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CreateHackathonComponent } from '../../navigation/create-hackathon.component';

@Component({
  selector: 'app-todays',
  templateUrl: './todays.component.html',
  styleUrls: ['./todays.component.css'],
  animations: [routeFadeStateTrigger, itemStateTrigger, itemStateTrigger2, itemStateTrigger3],
})
export class TodaysComponent implements OnInit {
  @HostBinding('@routeFadeState') routeAnimation = true;
  displayedColumns = ['title','content','startDate'];
  private postsSub: Subscription;
  dataSource = new MatTableDataSource<Post>();
  posts: Post[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  chartTitle = 'Ongoing Hackathon List';
  isCurUp = true;
  isComUp = false;
  isArcUp = false;
  constructor(private postsService: PostsService, private route: ActivatedRoute, private dialog: MatDialog) { }

  ngOnInit() {
    // this.postsService.getWhichPosts('todays');
    // this.postsSub = this.postsService.getPostUpdateListener()
    //   .subscribe((posts: Post[]) => {
    //     this.posts = posts;
    //     this.dataSource.data = posts;
    //     this.dataSource.sort = this.sort;
    //   });

    this.route.paramMap.subscribe(params => {
      let whichChart = params.get('name').slice(1);
      if(whichChart==='upcoming') {
        this.chartTitle = 'Upcoming Hackathon List';
        this.isCurUp = false;
        this.isComUp = true;
        this.isArcUp = false;
      } 
      else if(whichChart==='archived') {
        this.chartTitle = 'Archived Hackathon List';
        this.isCurUp = false;
        this.isComUp = false;
        this.isArcUp = true;
      } 
      else {
        this.chartTitle = 'Ongoing Hackathon List';
        this.isCurUp = true;
        this.isComUp = false;
        this.isArcUp = false;
      }
      this.postsService.getWhichPosts(whichChart);
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
          this.posts = posts;
          this.dataSource.data = posts;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
}

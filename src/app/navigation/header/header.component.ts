import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { LoginpopupComponent } from '../loginpopup.component';
import { AuthService } from '../../auth/auth.service';
import * as io from "socket.io-client";
import { MatDialog } from '@angular/material';
import { SigninpopupComponent } from '../signinpopup.component';
import { Subscription } from 'rxjs';
import { CreateHackathonComponent } from '../create-hackathon.component';
import { PostsService } from '../../posts/posts.service';
import { Post } from '../../posts/post.model';
import {TweenMax, Draggable} from './../../../gsap/all';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('myVideo') myVideoElement : ElementRef;

  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscription: Subscription;
  private postsSub: Subscription;
  isAuth: boolean;
  showCloseBut= false;
  isHide = true;
  public gStream: any = null; 
  public iceServers: any = {};
  public rtcPeerConnection = new RTCPeerConnection(this.iceServers);

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
    this.initDragging();
  }

  initDragging() {
    var dragging = new Draggable('#draggable',
    {
      edgeResistance:1,
      cursor:"pointer"  
    }) 
  }
  // ngAfterViewChecked(){this.gMyVideoRef = this.myVideoElement.nativeElement;
  //   
  //   console.log(this.myVideoElement);
  //   console.log(this.myVideoElement.nativeElement);
  //   console.log(this.gMyVideoRef);
  // }

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

  customerService(rmNum){
    let client = this;
    let myVideoRef = this.myVideoElement.nativeElement;
    let streamConstraints = { audio:false, video:true };
    const gSocket = io('http://localhost:3000');
    let rtcPeerConnection: any = this.rtcPeerConnection;
    let localStream = this.gStream;
    let tmpRoomNumber = rmNum;
    if(!client.showCloseBut && client.isHide) {
      gSocket.emit('create or join',{
        room:rmNum
      });
    }
    else if(client.showCloseBut && !client.isHide) {
      client.isHide = true; 
    }
    
    gSocket.on('created', function(room){
      let n = <any>navigator;
      n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;    
      navigator.mediaDevices.getUserMedia(streamConstraints)
      .then(function (stream) {
          console.log("going to display my stream... ");
          client.gStream = stream;
          localStream = stream;
          // myVideoRef.srcObject = stream;
      })
      .catch(function (err) {
          console.log('error with getUserMedia', err);
      });
    });  

    gSocket.on('joined', function(room){
      let n = <any>navigator;
      n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;    
      navigator.mediaDevices.getUserMedia(streamConstraints)
      .then(function (stream) {
          console.log("going to display my stream... ");
          client.gStream = stream;
          localStream = stream;
          // myVideoRef.srcObject = stream;
          gSocket.emit('ready', tmpRoomNumber);
      })
      .catch(function (err) {
        console.log('error with getUserMedia', err);
      });
    });

    gSocket.on('ready', function () {
      rtcPeerConnection.addStream(localStream);
      rtcPeerConnection.onaddstream = onAddStream;
      rtcPeerConnection.onicecandidate = onIceCandidate;
      rtcPeerConnection.createOffer(setLocalAndOffer, function (e) { console.log(e); });
    });

    gSocket.on('offer', function (event) {
        rtcPeerConnection.onicecandidate = onIceCandidate;
        rtcPeerConnection.onaddstream = onAddStream;
        rtcPeerConnection.addStream(localStream);
        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
        rtcPeerConnection.createAnswer(setLocalAndAnswer, function (e) { console.log(e); })
    })

    function onAddStream(event) {
      let myVideoRef = client.myVideoElement.nativeElement;
      myVideoRef.srcObject = event.stream;
      client.showCloseBut = true;
      client.isHide = false; 
      // client.oStream = event.stream;
    }

    function onIceCandidate(event) {
      if (event.candidate) {
        gSocket.emit('candidate', {
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
          room: tmpRoomNumber
        });
      }
    }

    function setLocalAndAnswer(sessionDescription) {
      rtcPeerConnection.setLocalDescription(sessionDescription);
      gSocket.emit('answer', {
        type: 'answer',
        sdp: sessionDescription,
        room: tmpRoomNumber
      })
    }

    function setLocalAndOffer(sessionDescription) {
      rtcPeerConnection.setLocalDescription(sessionDescription);
      gSocket.emit('offer', {
        type: 'offer',
        sdp: sessionDescription,
        room: tmpRoomNumber
      })
    }

    gSocket.on('answer', function (event) {
      rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event));
    })

    gSocket.on('candidate', function (event) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate
      });
      rtcPeerConnection.addIceCandidate(candidate);
    })

  }

  // hideVideoChat() {
  //   console.log('LPLPLP');
  //   this.showCloseBut = false;
  //   this.isHide = true; 
  // }
}





// socket.on('candidate', function (event) {
//   console.log("6(CUSTOMER). socket.on(candidate)  #302");
//   var candidate = new RTCIceCandidate({
//     sdpMLineIndex: event.label,
//     candidate: event.candidate
//   });
//   rtcPeerConnection.addIceCandidate(candidate);
// })
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts/posts.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-create-hackathon',
  templateUrl: './create-hackathon.component.html',
  styleUrls: ['./create-hackathon.component.css']
})
export class CreateHackathonComponent implements OnInit {

  maxDate;

  newUpdate = 'NEW';
  mode = 'create';
  hTitle = '';
  hContent = '';
  hDate = '';
  hId = '';
  hImagePath = '';

  form: FormGroup;
  imagePreview: string;

  constructor(public postsService: PostsService, @Inject(MAT_DIALOG_DATA) public data: any) {
    if(data!==null) {
      this.hId = data.post.id;
      this.hTitle = data.post.title;
      this.hContent = data.post.content;
      this.hDate = data.post.startDate;
      this.hImagePath = data.post.imagePath;
      this.mode = 'update';
      this.newUpdate = 'UPDATE';
    } else {
      this.hId = '';
      this.hTitle = '';
      this.hContent = '';
      this.hDate = '';
      this.hImagePath = '';
      this.mode = 'create';
      this.newUpdate = 'NEW';
    }
  }

  ngOnInit() {
    this.maxDate = new Date();

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      hackdate: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    if(this.mode==='update'){
      this.form.setValue({
        title: this.hTitle,
        content: this.hContent,
        hackdate: this.hDate,
        image: this.hImagePath
      });
    }
  }

  setBgColor() {
    let styles = {
      'background-color': this.mode === 'update' ? '#F9CDE5' : '#C9FCF9'
    };
    return styles;
  }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.hackdate, this.form.value.image);
    } else {
      this.postsService.updatePost(
        this.hId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.hackdate,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

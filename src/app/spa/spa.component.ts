import { Component, OnInit, } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Directive, Input, ViewChild,ElementRef,HostListener} from '@angular/core';
import printJS from 'print-js';
import { RouterModule, Routes,Router } from '@angular/router';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { shallowEqual } from '@angular/router/src/utils/collection';
import * as jsPDF from 'jspdf';

declare var $: any;
declare var kendo: any;
declare var window: any;


@Component({
  selector: 'app-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.css']
})
export class SPAComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private myElement: ElementRef) { }

  // Decleration
  Description = 'Observation Page';
  message;
  imagePath;
  imgURL;
  baseUrl = 'http://localhost/api';
  selectedImage: File;
  msg: string = null;

  registerGeneralInfo: FormGroup;
  registerObservation: FormGroup;
  registerGoodPhotos: FormGroup;
  registerStatistics: FormGroup;
  registerObservationAfter: FormGroup;


  // General Info
  inspector = ['aaa', 'bbb'];
  inspectiontype = ['aaa', 'bbb'];
  inspectionnumber = ['aaa', 'bbb'];
  participants = ['aaa', 'bbb'];
  msgGeneralInfo: string = null;

  // good photos
  location = ['aaa', 'bbb'];
  msgGoodphotos: string = null;

  // observation
  locations = ['aaa', 'bbb'];
  followup = ['aaa', 'bbb'];
  msgObservation: string = null;
  msgObservationAfter: string= null;
  name = ['aaa' , 'bbb'];

  // summary
  msgSummary: string = null;



  ngOnInit() {
    this.registerGeneralInfo = this.formBuilder.group({
      inspector: new FormControl('', Validators.compose([
        Validators.required,
     ])),
    inspectiontype: new FormControl(''),
    inspectiondate: new FormControl(''),
    inspectiontime: new FormControl(''),
    inspectionnumber: new FormControl(''),
    participants: new FormControl(''),
    summary: new FormControl('')
    });

    this.registerObservation = this.formBuilder.group({
      locations: new FormControl('', Validators.compose([
        Validators.required,
     ])),
     observationImages: new FormControl(''),
     observe: new FormControl(''),
     followup: new FormControl('')
    });

    this.registerObservationAfter = this.formBuilder.group({
      locations: new FormControl('', Validators.compose([
        Validators.required,
     ])),
     observationImagesAfter: new FormControl(''),
     comment: new FormControl(''),
     name: new FormControl('')
    });

    this.registerGoodPhotos = this.formBuilder.group({
      goodPhotos: new FormControl(''),
      location: new FormControl('', Validators.compose([
        Validators.required,
     ])),
     observe: new FormControl(''),
     description: new FormControl('')
    });

    this.registerStatistics = this.formBuilder.group({
      summary: new FormControl('')
      });
  }

ngAfterViewInit() {
  $(document).ready(function() {
    $('#btn1').click(function(){
      // $("#mainNav").slideUp();
    });
  });
}

ngAfterViewChecked() {

  // To allow access based on User role
  this.registerGeneralInfo.disable();
} 

toGeneralInfo(){
  // let el = this.myElement.nativeElement.querySelector('#section1');
  // el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

// print
print(){
  printJS ({
      printable: 'toprint',
      type: 'html',
      targetStyles: ['*'],
      header: 'Site Inspection',
      font_size: '12pt',
      showModal:true,
      style: '.custom-h3 { color: red; }'
  });
// setTimeout(this.alertFunc, 3000);
}

// export as pdf
exportContent() {
  const options = {
    filename: 'Site Inspection.pdf',
    html2canvas:{},
    jsPDF: {orientation: 'portrait'}
  };

  const content = document.getElementById('toprint');
  html2pdf()
  .from(content)
  .set(options)
  .save();
}

  // Image upload
  selectedFiles;
  url1; url2; url3;
  detectFilesA(event) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  detectFilesB(event) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url2 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  detectFilesC(event) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url3= event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // Call Service
  observation(data) {
      const formData=new FormData();
      let header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      let options = { headers: header, crossDomain: true, withCredentials: true };
      formData.append('observationImages',this.registerObservation.get('observationImages').value);
      formData.append('locations',this.registerObservation.get('locations').value);
      formData.append('observe',this.registerObservation.get('observe').value);
      formData.append('followup',this.registerObservation.get('followup').value);
      this.msgObservation = 'Registered successfully!!';
      this.http.post(`${this.baseUrl}/observe.php`, formData).subscribe((data)=>{
                console.log('Got some data from backend', data);
                // this.msg = 'Registered successfully!!';
              }, (error)=>{
                console.log('Error!', error);
                // this.msg = 'error';
              })
      console.log(data);
  }

  observationAfter(data) {
    const formData=new FormData();
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = { headers: header, crossDomain: true, withCredentials: true };
    formData.append('observationImagesAfter',this.registerObservationAfter.get('observationImagesAfter').value);
    formData.append('locations',this.registerObservationAfter.get('locations').value);
    formData.append('comment',this.registerObservationAfter.get('comment').value);
    formData.append('name',this.registerObservationAfter.get('name').value);
    this.msgObservationAfter = 'Registered successfully!!';
    this.http.post(`${this.baseUrl}/observeAfter.php`, formData).subscribe((data)=>{
              console.log('Got some data from backend', data);
              // this.msg = 'Registered successfully!!';
            }, (error)=>{
              console.log('Error!', error);
              // this.msg = 'error';
            })
    console.log(data);
}

  goodphotos(data) {
    const formData=new FormData();
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = { headers: header, crossDomain: true, withCredentials: true };
    formData.append('goodPhotos',this.registerGoodPhotos.get('goodPhotos').value);
    formData.append('location',this.registerGoodPhotos.get('location').value);
    formData.append('description',this.registerGoodPhotos.get('description').value);
    this.msgGoodphotos = 'Registered successfully!!';
    this.http.post(`${this.baseUrl}/goodphotos.php`, formData).subscribe((data)=>{
        console.log('Got some data from backend', data);
        // this.msg = 'Registered successfully!!';
      }, (error)=>{
        console.log('Error!', error);
        // this.msg = 'error';
      })
    console.log(data);
  }

  statistics(data) {
    const formData = new FormData();
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = { headers: header, crossDomain: true, withCredentials: true };
    formData.append('summary',this.registerStatistics.get('summary').value);
    this.msgSummary = 'Registered successfully!!';
    this.http.post(`${this.baseUrl}/statistics.php`, formData).subscribe((data) => {
              console.log('Got some data from backend', data);
              // this.msg = 'Registered successfully!!';
            }, (error)=>{
              console.log('Error!', error);
              // this.msg = 'error';
            })
    console.log(data);
  }

  generalInfo(data) {
    const formData = new FormData();
    let header = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    let options = { headers: header, crossDomain: true, withCredentials: true };
    formData.append('inspector',this.registerGeneralInfo.get('inspector').value);
    formData.append('inspectiontype',this.registerGeneralInfo.get('inspectiontype').value);
    formData.append('inspectiondate',this.registerGeneralInfo.get('inspectiondate').value);
    formData.append('inspectiontime',this.registerGeneralInfo.get('inspectiontime').value);
    formData.append('inspectionnumber',this.registerGeneralInfo.get('inspectionnumber').value);
    formData.append('participants',this.registerGeneralInfo.get('participants').value);
    formData.append('summary',this.registerGeneralInfo.get('summary').value);
    this.msgGeneralInfo = 'Registered successfully!!';
    this.http.post(`${this.baseUrl}/generalInfo.php`, formData).subscribe((data)=>{
              console.log('Got some data from backend', data);
              // this.msg = 'Registered successfully!!';
            }, (error)=>{
              console.log('Error!', error);
              // this.msg = 'error';
            })
    console.log(data);
  }

  //Signature
  points = [];
  signatureImage;

  showImage(data) {
    this.signatureImage = data;
    // console.log(data);
  }

  //Scroll top
  isShow: boolean;
  topPosToStartShowing = 100;

  @HostListener('window:scroll')
  checkScroll() {
  // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HomeService } from './home.service.js';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private fragment: string;
  routsNames = ['العناوين', 'الاستبيان', 'الاختبارات', 'المقابلة', 'الملاحظة',
    'الاستبانةالالكترونية', 'الاحصائي', 'اللغوي', 'الترجمة',
    'تقرير', 'نقدالدراسات', 'العناوين', 'كتابةالإطار',
    'الدراسة', 'االدراسة', 'العلمية', 'الاستبانات والدراسات',
    'تحكيمالبحوث', 'الرسائل', 'البحث'
  ]

  contactUsForm;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private homeService: HomeService,
    private _flashMessagesService: FlashMessagesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initcontactUsForm();
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit(): void {
    //We loading the player script on after view is loaded
    import("../../assets/js/main.js");
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }



  initcontactUsForm() {
    this.contactUsForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }


  get email() {
    return this.contactUsForm.get('email');
  }
  get firstName() {
    return this.contactUsForm.get('firstName');
  }
  get lastName() {
    return this.contactUsForm.get('lastName');
  }

  get message() {
    return this.contactUsForm.get('message');
  }

  submit(data) {
    if (this.contactUsForm.invalid) {
      this._flashMessagesService.show("برجاء ملء كل البيانات المطلوبة", { cssClass: 'alert-error', timeout: 5000 });
    }
    else {
      this.homeService.create(data).subscribe(data => {
        this._flashMessagesService.show('تم ارسال رسالتك بنجاح وسوف نرد عليك باقرب وقت ممكن ', { cssClass: 'alert-success', timeout: 5000 });
      },err=>{
        this._flashMessagesService.show(err.message, { cssClass: 'alert-error', timeout: 5000 });
      });
    }
  }

}

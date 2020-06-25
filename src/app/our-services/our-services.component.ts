import { Component, Input, ViewChild, AfterViewInit, ViewEncapsulation, OnInit, Inject  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { UploaderComponent, RemovingEventArgs } from '@syncfusion/ej2-angular-inputs';
import { ServicesService } from './services.service';

import { FlashMessagesService } from 'angular2-flash-messages';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface StateGroup {
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit {


  sub;
  ServicesForm;
  filesToUpload: Array<File> = [];
  options: string[] = ['Delhi', 'Mumbai', 'Banglore'];

  stateGroups: StateGroup[] = [{
    names: ['كتابة خطة البحث']
  }, {
    names: ['اهمية اعداد خطة البحث']
  }, {
    names: ['كتابة الإطار النظري']
  }, {
    names: ['تقرير فحص السرقة الأدبية']
  }, {
    names: ['توفير المراجع وتلخيص الدراسات السابقة']
  }, {
    names: ['ادوات الدراسة']
  }, {
    names: ['الاستبيان']
  },{
    names: ['الاختبارات']
  }, {
    names: ['المقابلة']
  }, {
    names: ['الملاحظة']
  }, {
    names: ['الاستبانة الالكترونية']
  }, {
    names: ['التحليل الاحصائي ومناقشة النتائج']
  }, {
    names: ['تحكيم الاستبانات والدراسات']
  }, {
    names: ['تحكيم البحوث العلمية']
  }, {
    names: ['تحكيم ادوات الدراسة']
  }, {
    names: ['التدقيق اللغوي']
  }, {
    names: ['تنسيق البحوث والرسائل العلمية']
  }, {
    names: ['الترجمة']
  }, {
    names: ['نقد الدراسات السابقة']
  }, {
    names: ['نشر البحوث العلمية']
  }];

  stateGroupOptions: Observable<StateGroup[]>;
  @ViewChild('defaultupload', {static: false})
  public uploadObj: UploaderComponent;

  public allowExtensions: string = '.pdf, .png, .txt';
  private fragment: string;
 
  // @Input() urlName: string;

  matcher = new MyErrorStateMatcher();
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private servicesService:ServicesService,
    private _flashMessagesService:FlashMessagesService
   
  ) { 
    
  }




  ngOnInit() {

    this.initServiceForm();
    this.stateGroupOptions = this.ServicesForm.get('service')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(`${value}`))
      );
      this.route.fragment.subscribe(fragment => { this.fragment = fragment; });

  }


  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment || 'about').scrollIntoView();
    } catch (e) { }
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  initServiceForm() {
    this.ServicesForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phone:['', Validators.required],
      service: ['', Validators.required],
      files: [null, []]
    });
  }



 

  submit(data){
    if(this.ServicesForm.invalid){
      this._flashMessagesService.show('برجاء ملئ كل البيانات المطلوبة قبل ارسال الطلب ', { cssClass: 'alert-error', timeout: 5000 });
    }
    else {
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      Object.entries(data).forEach(
        ([key, value]: any[]) => {
          if (value) {
            formData.set(key, value);
          }
        });
      for(let i =0; i < files.length; i++){
          formData.append("uploads[]", files[i], files[i]['name']);
      }
  
      this.servicesService.createService(formData).subscribe(data => {
        this._flashMessagesService.show('تم ارسال الطلب', { cssClass: 'alert-success', timeout: 5000 });
        this.ServicesForm.reset()
        }, err => {
        this._flashMessagesService.show('برجاء اعاده المحاوله مره اخرى لحجز الخدمه ', { cssClass: 'alert-error', timeout: 5000 });
      }
      );   
    }
  
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  get email() { 
    return this.ServicesForm.get('email');
  }
  get firstName() { 
    return this.ServicesForm.get('firstName');
  }
  get lastName() { 
    return this.ServicesForm.get('lastName');
  }
  get phone() { 
    return this.ServicesForm.get('phone');
  }

  
}

import { Component,ElementRef,HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  authentication:string;
  langFr:string = "fr";
  langUs:string = "us";
  opacityFr:string="0.5";
  opacityUs:string = "0.5";
  newNav:boolean = true;
  displayItem:boolean = true;
  displayIconClose:boolean = false;
  displayIconSearch:boolean = true;

  modalRef?: BsModalRef;

  myGroup = new FormGroup({
    title: new FormControl()
  })

  constructor(private service : MoviesService,private router : Router, private userService : UserService, public translate: TranslateService,private el : ElementRef, private modalService: BsModalService){
    translate.addLangs(['fr', 'us']);
    translate.setDefaultLang('fr');
    this.opacityFr = "1";
    
  } 

  ngOnInit(): void {
    console.log("oninit");
    this.userService.isAuthenticated.subscribe(data => this.authentication = data);
    this.userService.token.subscribe(data => console.log(data));
  }

  @HostListener('keydown') onKeydown() { 
  let part = this.el.nativeElement.querySelector('.inputsearch').value;
  this.service.emitEvent(part);
  }

  unsubscribe(){
    console.log("unsbscribe");
    this.userService.token.next("none");
    this.userService.isAuthenticated.next("none");
    this.userService.isAuthenticated.subscribe(data=>this.authentication = data);
    this.router.navigate(['movies']);
  }

  chooseLanguage(lang:string){   
    this.translate.use(lang);
    if(lang == 'fr'){
      this.opacityFr = "1";
      this.opacityUs = "0.5";
    } else{
      this.opacityUs = "1";
      this.opacityFr = "0.5";
    }
  }

   
  displaySmall(){
    if(screen.width < 576){
      this.newNav = !this.newNav;
      this.displayItem = !this.displayItem;
      this.displayIconClose = !this.displayIconClose
      this.displayIconSearch = !this.displayIconSearch;
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(window.innerWidth < 576){
      this.newNav = true;
    }
  }
 

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
}

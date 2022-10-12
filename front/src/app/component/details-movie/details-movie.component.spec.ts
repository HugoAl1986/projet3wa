import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMovieComponent } from './details-movie.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
describe('DetailsMovieComponent', () => {
  let component: DetailsMovieComponent;
  let fixture: ComponentFixture<DetailsMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMovieComponent ],
      imports: [
        TranslateModule.forRoot()    
      ],
      providers: [ TranslateService ]
    })
    
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

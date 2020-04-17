import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListbPage } from './listb.page';

describe('ListbPage', () => {
  let component: ListbPage;
  let fixture: ComponentFixture<ListbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

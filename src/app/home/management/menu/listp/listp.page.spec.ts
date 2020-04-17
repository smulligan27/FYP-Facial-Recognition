import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListpPage } from './listp.page';

describe('ListpPage', () => {
  let component: ListpPage;
  let fixture: ComponentFixture<ListpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListcPage } from './listc.page';

describe('ListcPage', () => {
  let component: ListcPage;
  let fixture: ComponentFixture<ListcPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

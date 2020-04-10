import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContractorPage } from './contractor.page';

describe('ContractorPage', () => {
  let component: ContractorPage;
  let fixture: ComponentFixture<ContractorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

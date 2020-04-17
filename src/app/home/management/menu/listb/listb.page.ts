import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-listb',
  templateUrl: './listb.page.html',
  styleUrls: ['./listb.page.scss'],
})
export class ListbPage implements OnInit {
  blocList: any;
  constructor(private crudService: CrudService, public router: Router) { }

  ngOnInit() {
    this.crudService.read_blocklayers().subscribe(data => {
 
      this.blocList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          contactNumber: e.payload.doc.data()['contactNumber'],
          skill: e.payload.doc.data()['skill'],
        };
      })
      console.log(this.blocList);
 
    });
  }
  EditRecord(record) {
    record.isEdit = true;
    record.Editname = record.name;
    record.EditcontactNumber = record.contactNumber;
    record.Editskill = record.skill;
  }
 
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.Editname;
    record['contactNumber'] = recordRow.EditcontactNumber;
    record['skill'] = recordRow.Editskill;
    this.crudService.update_blocklayer(recordRow.id, record);
    recordRow.isEdit = false;
  }

  RemoveRecord(rowID) {
    this.crudService.delete_blocklayer(rowID);
  }
}

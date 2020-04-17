import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-listp',
  templateUrl: './listp.page.html',
  styleUrls: ['./listp.page.scss'],
})
export class ListpPage implements OnInit {

  plumList: any;
  constructor(private crudService: CrudService, public router: Router) { }

  // Displays all the plumbers in card view to be acted on 
  ngOnInit() {
    this.crudService.read_plumbers().subscribe(data => {
 
      this.plumList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          contactNumber: e.payload.doc.data()['contactNumber'],
          skill: e.payload.doc.data()['skill'],
        };
      })
      console.log(this.plumList);
 
    });
  }

  // Allows user to edit plumber based of record id
  EditRecord(record) {
    record.isEdit = true;
    record.Editname = record.name;
    record.EditcontactNumber = record.contactNumber;
    record.Editskill = record.skill;
  }

  //updates the record
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.Editname;
    record['contactNumber'] = recordRow.EditcontactNumber;
    record['skill'] = recordRow.Editskill;
    this.crudService.update_plumber(recordRow.id, record);
    recordRow.isEdit = false;
  }

  //Deletes the record
  RemoveRecord(rowID) {
    this.crudService.delete_plumber(rowID);
  }
}


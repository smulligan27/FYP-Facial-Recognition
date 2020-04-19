import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-liste',
  templateUrl: './liste.page.html',
  styleUrls: ['./liste.page.scss'],
})
export class ListePage implements OnInit {

  elecList: any;

  constructor(
    
    private crudService: CrudService, 
    public router: Router
    
    ) { }

  ngOnInit() {
    // Displays all the electricians in card view to be acted on
    this.crudService.read_electricians().subscribe(data => {
 
      this.elecList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          contactNumber: e.payload.doc.data()['contactNumber'],
          skill: e.payload.doc.data()['skill'],
        };
      })
      console.log(this.elecList);
 
    });
  }

  // Allows user to edit electrician based of record id
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
    this.crudService.update_electrician(recordRow.id, record);
    recordRow.isEdit = false;
  }

  //Deletes the record 
  RemoveRecord(rowID) {
    this.crudService.delete_electrician(rowID);
  }
}


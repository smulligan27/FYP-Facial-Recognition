import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-listc',
  templateUrl: './listc.page.html',
  styleUrls: ['./listc.page.scss'],
})
export class ListcPage implements OnInit {

  contList: any;

  constructor(
    
    private crudService: CrudService, 
    public router: Router
    
    ) { }

  ngOnInit() {
    // Displays all the carpenters in card view to be acted on
    this.crudService.read_carpenters().subscribe(data => {
 
      this.contList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          contactNumber: e.payload.doc.data()['contactNumber'],
          skill: e.payload.doc.data()['skill'],
        };
      })
      console.log(this.contList);
 
    });
  }

  // Allows user to edit electrician based of record id
  EditRecord(record) {
    record.isEdit = true;
    record.Editname = record.name;
    record.EditcontactNumber = record.contactNumber;
    record.Editskill = record.skill;
  }
 
  //Updates the record
  UpdateRecord(recordRow) {
    let record = {};
    record['name'] = recordRow.Editname;
    record['contactNumber'] = recordRow.EditcontactNumber;
    record['skill'] = recordRow.Editskill;
    this.crudService.update_carpenter(recordRow.id, record);
    recordRow.isEdit = false;
  }

  //Deletes the record
  RemoveRecord(rowID) {
    this.crudService.delete_carpenter(rowID);
  }
}


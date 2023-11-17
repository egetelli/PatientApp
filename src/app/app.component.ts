import { PatientsService } from './Service/patients.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from './Models/patient.model';
import { response } from 'express';
import path from 'path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PatientApp';
  patients: Patient[] = [];
  patient: Patient = {
    patientID:'',
    patientName:'',
    sex:'',
    birthDate:'',
    address:'',
    phone:''
  }

  constructor(private patientsService: PatientsService){

  }
  ngOnInit(): void {
    this.getAllPatients();
  }

  getAllPatients() {
    this.patientsService.getAllPatients()
    .subscribe(
      response => {
        this.patients = response;
        console.log(response);
      }
    );
  }

  onSubmit() {
    if(this.patient.patientID === ''){
      this.patientsService.addPatient(this.patient)
      .subscribe(
        response => {
          this.getAllPatients();
          this.patient = {
            patientID:'',
            patientName:'',
            sex:'',
            birthDate:'',
            address:'',
            phone:''
          }
        }
      );
    } else {
      this.updatePatient(this.patient);
    }
  }

  deletePatient(id:string){
    this.patientsService.deletePatient(id)
    .subscribe(
      response => {
        this.getAllPatients();
      }
    );
  }

  populateForm(patient: Patient){
    this.patient = patient;
  }

  updatePatient(patient:Patient){
    this.patientsService.updateCard(patient)
    .subscribe(
      response => {
        this.getAllPatients();
      }
    );
  }

}

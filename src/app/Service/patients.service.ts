import { Patient } from './../Models/patient.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  baseUrl = 'https://localhost:7119/api/Patient';

  constructor(private http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  addPatient(patient: Patient): Observable<Patient[]> {
    patient.patientID = '0';
    return this.http.post<Patient[]>(this.baseUrl, patient);
  }

  deletePatient(id:string): Observable<Patient[]> {
    return this.http.delete<Patient[]>(this.baseUrl + "/" + id);
  }

  updateCard(patient:Patient): Observable<Patient[]> {
    return this.http.put<Patient[]>(this.baseUrl + "/" + patient.patientID, patient);
  }

}

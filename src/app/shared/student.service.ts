import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Student } from './student';
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentsRef: AngularFirestoreCollection<any>;    // Reference to Student data list, its an Observable
  studentRef: AngularFirestoreDocument<any>;   // Reference to Student object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFirestore) { }

    // Create Student
    AddStudent(student: Student) {
      console.log(student);
      this.studentsRef.add({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        mobileNumber: student.mobileNumber
      })
    }
  
    // Fetch Single Student Object
    GetStudent(id: string) {
      this.studentRef = this.db.doc('students-list/' + id);
      return this.studentRef;
    }
  
    // Fetch Students List
    GetStudentsList() {
      this.studentsRef = this.db.collection('students-list');
      return this.studentsRef;
    }  
  
    // Update Student Object
    UpdateStudent(student: Student) {
      this.studentRef.update({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        mobileNumber: student.mobileNumber
      })
    }  
  
    // Delete Student Object
    DeleteStudent(id: string) { 
      this.studentRef = this.db.doc('students-list/'+id);
      this.studentRef.delete();
    }
  
    AddFakeStudent() {
      const student: Student = {
        id: faker.random.alphaNumeric(20),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        mobileNumber: parseInt(faker.phone.phoneNumberFormat().replace(/[^0-9]/g, ''),10)
      }
  
      this.AddStudent(student);
    }
  
}

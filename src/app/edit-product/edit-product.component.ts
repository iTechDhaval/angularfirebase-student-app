import { ProductService } from './../shared/product.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../shared/student.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})

export class EditProductComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to student's edit form
  
  constructor(
    private crudApi: ProductService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ){ }

  ngOnInit() {
    this.updateProductData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetProduct(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }

  get name() {
    return this.editForm.get('name');
  }

  get price() {
    return this.editForm.get('price');
  }  

  get description() {
    return this.editForm.get('description');
  } 

  // Contains Reactive Form logic
  updateProductData() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.crudApi.UpdateProduct(this.editForm.value);       // Update product data using CRUD API
    this.toastr.success(this.editForm.controls['name'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-products']);               // Navigate to products's list page when product data is updated
  }

     // Reset student form's values
     ResetForm() {
      this.editForm.reset();
    }   

}
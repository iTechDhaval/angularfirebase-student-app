import { ProductService } from './../shared/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;  // Define FormGroup to product's form

  constructor(  
    public crudApi: ProductService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
    ) { }
  


  ngOnInit() {

    this.crudApi.GetProductsList();  // Call GetStudentsList() before main form is being called
    this.productForm1();              // Call student form when component is ready    
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }  

  get description() {
    return this.productForm.get('description');
  }  

  productForm1() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })  
  }

    // Reset student form's values
    ResetForm() {
      this.productForm.reset();
    }  

  submitProductData() {
    this.crudApi.AddProduct(this.productForm.value); // Submit student data using CRUD API
    this.toastr.success(this.productForm.controls['name'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}

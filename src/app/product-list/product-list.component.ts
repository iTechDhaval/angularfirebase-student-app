import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';  // CRUD API service class
import { Product } from './../shared/product';   // Product interface class for Data types.
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr


@Component({
  selector: 'app-products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  p: number = 1;                      // Fix for AOT compilation error for NGX pagination
  Product: Product[];                 // Save students data in Student's array.
  hideWhenNoProduct: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  

  constructor(
    public crudApi: ProductService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    ){ }


  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetProductsList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Product = [];
      data.forEach(item => {
        let a = item.payload.doc.data(); 
        a['id'] = item.payload.doc.id;
        console.log(a);
        this.Product.push(a as Product);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoProduct, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.crudApi.GetProductsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoProduct = false;
        this.noData = true;
      } else {
        this.hideWhenNoProduct = true;
        this.noData = false;
      }
    })
  }

  // Method to delete student object
  deleteProduct(product: Product) {
    if (window.confirm('Are sure you want to delete this product ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteProduct(product.id) // Using Delete student API to delete student.
      this.toastr.success(product.name + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }

  addFakeProduct() {
    this.crudApi.addFakeProduct();
  }

}
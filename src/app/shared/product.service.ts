import { Product } from './product';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import * as faker from 'faker';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  productsRef: AngularFirestoreCollection<any>;    // Reference to Student data list, its an Observable
  productRef: AngularFirestoreDocument<any>;   // Reference to Student object, its an Observable too

  // Inject AngularFireStore Dependency in Constructor
  constructor(private db: AngularFirestore) { }

    // Create Product
    AddProduct(product: Product) {
      console.log(product);
      this.productsRef.add({
        name: product.name,
        description: product.description,
        price: product.price
      })
    }

    // Fetch Products List
    GetProductsList() {
      this.productsRef = this.db.collection('products');
      return this.productsRef;
    }  

    // Delete Student Object
    DeleteProduct(id: string) { 
      this.productRef = this.db.doc('products/'+id);
      this.productRef.delete();
    }  

    addFakeProduct() {
      const product: Product = {
        
        id: faker.random.alphaNumeric(20),
        name: faker.name.firstName(),
        description : '',
        price: parseInt(faker.phone.phoneNumberFormat().replace(/[^0-9]/g, ''),10)
      };
  
      this.AddProduct(product);
    }


      // Fetch Single Product Object
    GetProduct(id: string) {
      this.productRef = this.db.doc('products/' + id);
      return this.productRef;
    }


    
    // Update Product Object
    UpdateProduct(product: Product) {
      this.productRef.update({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    } 
    
}

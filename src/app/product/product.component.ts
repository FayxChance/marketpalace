import { Component, OnInit } from '@angular/core';
import { Product } from "../product";
import { PRODUCTS } from "../mock-products";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  selectedProduct ?: Product;
  distance ?: number;
  products = PRODUCTS;
  deliveryPrice ?: number;
  totalPrice ?: number;
  onSelect(product : Product): void {
    this.selectedProduct = product;
  }

  deliveryPriceRequest(product : Product) :  void {
    // TODO Faire requete à l'api
    if (this.distance) {
      this.deliveryPrice = product.price*0.01 * this.distance / 10;
      this.totalPrice = this.deliveryPrice + product.price;
    }

  }

  constructor() { }

  ngOnInit(): void {

  }

}

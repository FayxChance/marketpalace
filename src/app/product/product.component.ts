import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { PRODUCTS } from '../mock-products';
import { RequestService } from '../request/request.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  selectedProduct?: Product;
  distance?: number;
  products = PRODUCTS;
  deliveryPrice?: number;
  totalPrice?: number;

  onSelect(product: Product): void {
    this.selectedProduct = product;
    this.distance = undefined;
    this.deliveryPrice = undefined;
    this.totalPrice = undefined;
  }

  deliveryPriceRequest(product: Product): void {
    if (this.distance) {
      var params = { weight: product.weight, distance: this.distance };
      var value = this.requestService.get(params);
      value.subscribe((value) => {
        this.deliveryPrice = value['deliveryCost'];
        if (this.deliveryPrice)
          this.totalPrice = this.deliveryPrice + product.price;
      });
    }
  }

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {}
}

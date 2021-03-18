import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { PRODUCTS } from '../mock-products';
import { RequestService } from '../request/request.service';
import { Observable, of } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  selectedProduct?: Product;
  distance?: number;
  products: any;
  deliveryPrice?: number;
  totalPrice?: number;
  loaded: boolean = false;

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

  constructor(private requestService: RequestService, private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getProducts {
              id
              weight
              name
              price
              description
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.loaded = true;
        this.products = result?.data?.getProducts;
      });
  }
}

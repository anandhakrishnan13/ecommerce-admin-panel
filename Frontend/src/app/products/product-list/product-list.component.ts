import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  editProduct(id: number) {
    this.router.navigate(['/products', id,'edit']);
  }

  addProduct() {
    this.router.navigate(['/products/new']);
  }

  viewProduct(id: number) {
  this.router.navigate(['/products', id, 'view']);
}
logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}

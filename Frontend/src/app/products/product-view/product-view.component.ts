import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product: Product = {
    sku: '',
    name: '',
    price: 0,
    images: []
  };

  currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getOne(+id).subscribe((data) => {
        this.product = data;
        this.currentImageIndex = 0; // reset slider
      });
    }
  }

  showPrev() {
    if (this.product.images.length > 0) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }

  showNext() {
    if (this.product.images.length > 0) {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.product.images.length;
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}

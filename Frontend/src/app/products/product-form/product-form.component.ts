import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    sku: '',
    name: '',
    price: 0,
    images: []
  };

  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getOne(+id).subscribe((data) => {
        this.product = data;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode && this.product.id) {
      this.productService.update(this.product.id, this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.create(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  selectedFile: File | null = null;

  onFilesSelected(event: any) {
  const files: FileList = event.target.files;

  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append('image', files[i]);

      this.http.post<{ imageUrl: string }>(
  'http://localhost:3000/products/upload',
  formData
).subscribe({
        next: (response) => {
          this.product.images.push(response.imageUrl);
        },
        error: (err) => {
          console.error('Image upload failed:', err);
        }
      });
    }
  }
}

removeImage(index: number) {
  const imageUrl = this.product.images[index];
  const filename = imageUrl.split('/').pop(); // Extract filename from URL

  if (filename) {
    this.http.delete(
  `http://localhost:3000/products/delete-image/${filename}`
)
.subscribe({
      next: () => {
        // Remove image from product object only after successful deletion
        this.product.images.splice(index, 1);
      },
      error: (err) => {
        console.error('Failed to delete image from server:', err);
      }
    });
  } else {
    console.error("Invalid image URL, couldn't extract filename.");
  }
}
}

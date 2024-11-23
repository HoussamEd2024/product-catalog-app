import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "../../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(1)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      selected: [true, Validators.required],
      available: [true, Validators.required]
    });
  }

  onSaveProduct(): void {
    this.submitted = true;

    // Vérifier si le formulaire est valide avant soumission
    if (this.productFormGroup?.invalid) return;

    // Sauvegarde des données
    this.productService.save(this.productFormGroup?.value).subscribe(
      data => {
        // Afficher un message de succès dans la console
        console.log("Product saved successfully:", data);

        // Redirection vers la page des produits
        this.router.navigate(['/products']);
      },
      error => {
        // Gestion des erreurs
        console.error("Error saving product:", error);
        alert("An error occurred while saving the product. Please try again.");
      }
    );
  }
}

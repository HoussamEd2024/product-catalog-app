import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductsService } from "../../services/product.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productId: number;
  productFormGroup?: FormGroup;
  submitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    // Charger le produit existant et initialiser le formulaire
    this.productService.getProductById(this.productId).subscribe(
      product => {
        this.productFormGroup = this.fb.group({
          id: [product.id],
          name: [product.name, [Validators.required, Validators.minLength(3)]],
          price: [product.price, [Validators.required, Validators.min(1)]],
          quantity: [product.quantity, [Validators.required, Validators.min(1)]],
          selected: [product.selected],
          available: [product.available]
        });
      },
      error => {
        console.error("Erreur lors du chargement du produit :", error);
        alert("Erreur lors du chargement du produit.");
      }
    );
  }

  onUpdateProduct(): void {
    this.submitted = true;

    // Vérifier si le formulaire est valide avant d'envoyer les données
    if (this.productFormGroup?.invalid) {
      alert("Le formulaire contient des erreurs. Veuillez vérifier les champs.");
      return;
    }

    // Mise à jour du produit
    this.productService.editProduct(this.productFormGroup?.value).subscribe(
      () => {
        // Afficher un message de succès et rediriger vers la liste des produits
        alert("Produit mis à jour avec succès !");
        this.router.navigate(['/products']);
      },
      error => {
        console.error("Erreur lors de la mise à jour du produit :", error);
        alert("Erreur lors de la mise à jour du produit. Veuillez réessayer.");
      }
    );
  }
}

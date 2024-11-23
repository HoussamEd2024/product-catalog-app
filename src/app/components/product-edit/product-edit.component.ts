import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
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
    private fb: FormBuilder
  ) {
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    // Récupération du produit à partir de l'ID et initialisation du formulaire
    this.productService.getProductById(this.productId).subscribe(
      product => {
        this.productFormGroup = this.fb.group({
          id: [product.id], // Ajout de l'ID dans le formulaire
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required]
        });
      }
    );
  }

  onUpdateProduct() {
    if (this.productFormGroup?.invalid) {
      alert("Le formulaire contient des erreurs. Veuillez vérifier les champs.");
      return;
    }

    // Envoi des données du produit pour la mise à jour
    this.productService.editProduct(this.productFormGroup?.value)
      .subscribe(data => {
        alert("Succès : Produit mis à jour !");
      }, error => {
        alert("Erreur lors de la mise à jour du produit.");
      });
  }
}

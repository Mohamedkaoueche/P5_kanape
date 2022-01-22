let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('produit'));
const cart__item = document.getElementById('cart__items');
let structureDuPanier = document.getElementById('cart__items');


 if (produitEnregistrerDansLocalStorage === null) {
// si le panier est vide on affiche "panier vide"
 let articlePanierVide = document.querySelector('h1');
 articlePanierVide.innerHTML ='<h1>Votre panier est vide</h1>'
}
else
{
  let structurePanier = [];

  for (let i = 0; i < produitEnregistrerDansLocalStorage.length; i++) {

    structurePanier = structurePanier + `  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${produitEnregistrerDansLocalStorage[i].imageDuProduitSelectionner}" alt="">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2 id="nom" >${produitEnregistrerDansLocalStorage[i].nomProduit}</h2>
        <p>${produitEnregistrerDansLocalStorage[i].couleurProduit}</p>
        <p>${produitEnregistrerDansLocalStorage[i].prixProduit} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistrerDansLocalStorage[i].quantiteProduit}">
        </div>
        <div class="cart__item__content__settings__delete">
          <button class="deleteItem">Supprimer</button>
        </div>
      </div>
    </div>
    </article>`;
    structureDuPanier.innerHTML = structurePanier ;
   
  }

  
}
//////////////////////// Fin de gestion du panier ////////////////////////

/////////////////////// Bouton supprimer produit/////////////////////////
let bouttonSuprimer = document.getElementsByClassName('deleteItem');

for (let j = 0; j < bouttonSuprimer.length; j++) {
  bouttonSuprimer[j].addEventListener("click",(e)=>{
    e.preventDefault();
    ///////////////// selection du de l'id du produit qui sera supprimé
    let id_selectionner_supression = produitEnregistrerDansLocalStorage[j].idProduit;
    produitEnregistrerDansLocalStorage = produitEnregistrerDansLocalStorage.filter( element => element.idProduit !== id_selectionner_supression);

   
  });
  produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('produit'));
}
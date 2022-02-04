let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('produit'));
let prixEnregistrerDansSessionSstorage = JSON.parse(sessionStorage.getItem('prix'));
const cart__item = document.getElementById('cart__items');
let structureDuPanier = document.getElementById('cart__items');


 if (produitEnregistrerDansLocalStorage === null ||produitEnregistrerDansLocalStorage ==0) {

// si le panier est vide on affiche "panier vide"
 let articlePanierVide = document.querySelector('h1');
 articlePanierVide.innerHTML ='<h1>Votre panier est vide</h1>'
}
else
{
  let structurePanier = [];

  for (let i = 0; i < produitEnregistrerDansLocalStorage.length && prixEnregistrerDansSessionSstorage.length; i++) {

    structurePanier = structurePanier + `  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${produitEnregistrerDansLocalStorage[i].imageDuProduitSelectionner}" alt="">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2 id="nom" >${produitEnregistrerDansLocalStorage[i].nomProduit}</h2>
        <p>${produitEnregistrerDansLocalStorage[i].couleurProduit}</p>
        <p>${prixEnregistrerDansSessionSstorage[i].prix} €</p>
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
  
    ///////////////// selection du de l'id du produit qui sera supprimé
    let id_selectionner_supression = produitEnregistrerDansLocalStorage[j].idProduit;
    let session_id_selectionner_supression = prixEnregistrerDansSessionSstorage[j].idProduit;
    produitEnregistrerDansLocalStorage = produitEnregistrerDansLocalStorage.filter( element => element.idProduit !== id_selectionner_supression);
    prixEnregistrerDansSessionSstorage = prixEnregistrerDansSessionSstorage.filter( element => element.idProduit !== session_id_selectionner_supression);
    window.location.href = ('cart.html');
    localStorage.setItem('produit',JSON.stringify(produitEnregistrerDansLocalStorage));
    sessionStorage.setItem('prix',JSON.stringify(prixEnregistrerDansSessionSstorage));
  });
  
}






/////////Montant total du panier ////////

let prixTotalCalcul = [];
let quantiteCalcul =[];

for (let k = 0; k < prixEnregistrerDansSessionSstorage.length; k++)
{
  prixTotalCalcul.push(prixEnregistrerDansSessionSstorage[k].prix);
  quantiteCalcul.push(produitEnregistrerDansLocalStorage[k].quantiteProduit) ;
}
// addition des prix des produits dans le panier
const reducer = (accumulateur, currentValue) => accumulateur+currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer,0);
const  quantiteTotal =  quantiteCalcul.reduce(reducer);










// Affichage du prix total dans la page panier

let prixTotalDesProduits = document.getElementById('totalPrice');
prixTotalDesProduits.textContent = prixTotal;

let affichePorduitTotal = document.getElementById('totalQuantity');
affichePorduitTotal.textContent = quantiteTotal;









/**********  Gestion du formulaire *********/

const afficherHtml = () => {

  const structureFormulaire = ` 
  
    <form method="get" class="cart__order__form">
    <div class="cart__order__form__question">
    <label for="firstName">Prénom: </label>
    <input type="text" name="firstName" id="firstName" required>
    <p id="firstNameErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="lastName">Nom: </label>
    <input type="text" name="lastName" id="lastName" required>
    <p id="lastNameErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="address">Adresse: </label>
    <input type="text" name="address" id="address" required>
    <p id="addressErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="city">Ville: </label>
    <input type="text" name="city" id="city" required>
    <p id="cityErrorMsg"></p>
  </div>
  <div class="cart__order__form__question">
    <label for="email">Email: </label>
    <input type="email" name="email" id="email" required>
    <p id="emailErrorMsg"></p>
  </div>
  <div class="cart__order__form__submit">
    <!-- Ajout du la fonction getElement-->
    <input type="submit"  value="Commander !" id="order">
  </div>
    </form>
  `;

// injection html

const formulaire = document.querySelector('.cart__order');
formulaire.insertAdjacentHTML("afterbegin",structureFormulaire);
}



// affichage du formulaire 
afficherHtml();



//recuperation du bouton 
let bouton = document.getElementById('order');



//listener 
bouton.addEventListener('click',(e)=>{
  e.preventDefault();



// Recuperation des donnees du formulaires
const contactValue = {
  Prenom : document.getElementById('firstName').value,
  Nom :document.getElementById('lastName').value,
  Adresse : document.getElementById('address').value,
  Ville :document.getElementById('city').value,
  Email :document.getElementById('email').value
}


// Envoie des valeur dans un objets
const objetContact = {
  firstName : localStorage.getItem('Prenom'),
  lastName : localStorage.getItem('Nom'),
  address : localStorage.getItem('Adresse'),
  city :localStorage.getItem('Ville'),
  email :localStorage.getItem('Email')
}
const aEnvoyer = {
  contact: objetContact,
  products: produitEnregistrerDansLocalStorage
}
controlFirstName();
controlLastName();
controlAdress();
controlCity();
controlEmail();
// Enoie de la commande
  if(controlFirstName()&& controlLastName()&& controlAdress()&& controlCity()&& controlEmail ())
  {
    localStorage.setItem('contact', JSON.stringify(contactValue));
  }
  const promise = fetch("http://localhost:3000/api/products/order",{
    method:'POST',
    body:JSON.stringify(aEnvoyer),
    headers:{
      "Content-Type": "application/json"
    }
  });

});



//// Validation du formulaire
function controlFirstName(){
  let inputName = document.getElementById('firstName').value;
  let regName = /^[a-z ,.'-]+$/i;
  if(regName.test(inputName) && firstNameErrorMsg)
  {
    firstNameErrorMsg.textContent='';
    return true
  }
  else{
    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    firstNameErrorMsg.textContent = 'Veuillez renseigner votre prénom ';
  }
}

function controlLastName(){
  let inputLastName = document.getElementById('lastName').value;
  let regName = /^[a-z ,.'-]+$/i;
  if(regName.test(inputLastName)&&lastNameErrorMsg)
  {
    lastNameErrorMsg.textContent = '';
    return true
  }
  else{
    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    lastNameErrorMsg.textContent = 'Veuillez renseigner votre nom';
  }
  return false
}

function controlAdress(){
  let inputAdress = document.getElementById('address').value;
  let regAdress = /^[a-zA-Z0-9\s,.'-]{3,}$/ ;
  if(regAdress.test(inputAdress)&& addressErrorMsg )
  {
    addressErrorMsg.textContent = '';
    return true
  }
  else{
    let addressErrorMsg= document.getElementById('addressErrorMsg');
    addressErrorMsg.textContent = 'Veuillez renseigner votre adresse';
  }
  return false
}

function controlCity(){
  let inputCity = document.getElementById('city').value;
  let regName = /^[a-z ,.'-]+$/i;
  if(regName.test(inputCity)&& cityErrorMsg)
  {
    cityErrorMsg.textContent = '';
    return true
  }
  else{
    let cityErrorMsg = document.getElementById('cityErrorMsg');
    cityErrorMsg.textContent = 'Veuillez renseigner votre ville';
  }
  return false
}

function controlEmail(){
  let inputEmail = document.getElementById('email').value;
  let regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(regMail.test(inputEmail)&& emailErrorMsg)
  {
    emailErrorMsg.textContent = '';
    return true
  }
  else{
    let emailErrorMsg = document.getElementById('emailErrorMsg');
    emailErrorMsg.textContent = 'Veuillez renseigner votre email';
  }
  return false
}


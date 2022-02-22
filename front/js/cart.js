let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('produit'));
const cart__item = document.getElementById('cart__items');
let structureDuPanier = document.getElementById('cart__items');
let prixTotalDesProduits = document.getElementById('totalPrice');
prixTotalDesProduits.textContent = "0";

let affichePorduitTotal = document.getElementById('totalQuantity');
affichePorduitTotal.textContent = "0";

if (produitEnregistrerDansLocalStorage === null || produitEnregistrerDansLocalStorage.length == 0) {
  // si le panier est vide on affiche "panier vide"
  let articlePanierVide = document.querySelector('h1');
  articlePanierVide.innerHTML ='<h1>Votre panier est vide</h1>'
}
else {
  for (let i = 0; i < produitEnregistrerDansLocalStorage.length; i++) {
    
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        function findObject(data)
        {
            return data._id === produitEnregistrerDansLocalStorage[i].idProduit;
        }

        const res  = data.find(findObject);

        

        // Affichage du prix total dans la page panier

        let prix = parseInt(prixTotalDesProduits.textContent);
        prix += res.price * produitEnregistrerDansLocalStorage[i].quantiteProduit;

        let quantiteTotal = parseInt(affichePorduitTotal.textContent);
        quantiteTotal += produitEnregistrerDansLocalStorage[i].quantiteProduit;


        structureDuPanier.innerHTML += `  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
          <img src="${produitEnregistrerDansLocalStorage[i].imageDuProduitSelectionner}" alt="">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2 id="nom" >${produitEnregistrerDansLocalStorage[i].nomProduit}</h2>
            <p>${produitEnregistrerDansLocalStorage[i].couleurProduit}</p>
            <p>${res.price * produitEnregistrerDansLocalStorage[i].quantiteProduit} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" 
              max="100" value="${produitEnregistrerDansLocalStorage[i].quantiteProduit}" 
              onchange="changerQuantite(${i})">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" onclick="supprimerProduit('${i}')">Supprimer</p>
            </div>
          </div>
        </div>
        </article>`;
        

        prixTotalDesProduits.textContent = prix;
        affichePorduitTotal.textContent = quantiteTotal;
    });
}
}
// Suppresion de l'article
var supprimerProduit = function(i) {
  let produitIndiceI = produitEnregistrerDansLocalStorage[i];

  let nouveauProduits =  produitEnregistrerDansLocalStorage.filter(produit => !(produit.idProduit == produitIndiceI.idProduit && produit.couleurProduit == produitIndiceI.couleurProduit));

  localStorage.setItem("produit", JSON.stringify(nouveauProduits));
  window.location.href = "cart.html";
};

///////////////////// Mettre  à jour la quantité du produit ///////////////
var changerQuantite = function(i) {
  let nouveaQuantieProduit = document.getElementsByClassName("itemQuantity")[i].value;

  if (nouveaQuantieProduit < 1) {
    produitEnregistrerDansLocalStorage[i].quantiteProduit = 1;
  }
  else if (nouveaQuantieProduit > 100) {
    produitEnregistrerDansLocalStorage[i].quantiteProduit = 100;
  }
  else {
    produitEnregistrerDansLocalStorage[i].quantiteProduit = parseInt(nouveaQuantieProduit);
  }

  localStorage.setItem("produit", JSON.stringify(produitEnregistrerDansLocalStorage));
  window.location.href = "cart.html";
}
//////////////////////// Fin de gestion du panier ////////////////////////


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
  firstName: document.getElementById('firstName').value,
  lastName :document.getElementById('lastName').value,
  address : document.getElementById('address').value,
  city :document.getElementById('city').value,
  email :document.getElementById('email').value
}

var productIds = [];
for (let produit of produitEnregistrerDansLocalStorage) {
  productIds.push(produit.idProduit);
}

const aEnvoyer = {
  contact: contactValue,
  products: productIds
}

//// Validation du formulaire

function controlFirstName(){
  let inputFirstname= document.getElementById('firstName').value;
  let regFirstName = /^[a-z ,.'-]+$/i;
  if(regFirstName.test(inputFirstname)&&firstNameErrorMsg)
  {
    firstNameErrorMsg.textContent = '';
    return true
  }
  else{
    let FirstnameErrorMsg = document.getElementById('firstNameErrorMsg');
    FirstnameErrorMsg.textContent = 'Veuillez renseigner votre nom';
  }
  return false
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
  let regMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

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

// Enoie de la commande

  if(controlFirstName()&&controlLastName() && controlAdress() && controlCity()&& controlEmail ())
  {
    localStorage.setItem('contact', JSON.stringify(contactValue));
  
    const promise = fetch("http://localhost:3000/api/products/order",{
      method:'POST',
      body:JSON.stringify(aEnvoyer),
      headers:{
        "Content-Type": "application/json",
      }
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("orderId", data.orderId);

      window.location.href = window.location.origin + "/front/html/confirmation.html";
    });
  }
});


// Recuperation de l'id dans l'url
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

var infosProduit;


fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {data

    // fonction qui renvoie le produit grace a l'id
    const res  = data.find(findObject);

    function findObject(data)
    {
        return data._id === id
    }
    
    // recuperation des donnée du produit
    let imageProduit = document.getElementById('imageProduit');
    imageProduit.setAttribute('src',res.imageUrl);

    let title = document.getElementById('title');
    title.textContent = res.name;

    let price = document.getElementById('price');
    price.textContent = res.price;

    let description = document.getElementById('description');
    description.textContent= res.description ;

    let select = document.getElementById('colors');
    const colors = res.colors;

    infosProduit = {
        idProduit : res._id,
        nomProduit : res.name,
        imageDuProduitSelectionner : res.imageUrl
    };

    //boucle d'iteration variable 
    for(const color of colors)
    {
        let option = document.createElement('option');
        option.setAttribute('value',color );
        option.textContent = color;
        select.append(option);
    }
});

let boutton = document.getElementById('addToCart');

    boutton.addEventListener('click',(e)=>{
        e.preventDefault();

        let couleur = document.getElementById('colors');
        let quantity = document.getElementById("quantity");

        infosProduit.couleurProduit = couleur.value;
        infosProduit.quantiteProduit = parseInt(quantity.value);

       produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

       //verifier que la couleur est séléctionné
       if(infosProduit.couleurProduit == '')
       {
           alert('SVP, choisissez une couleur ');
       }
       else
       {
        if (produitEnregistrerDansLocalStorage){
            // vérifer que le produit n'existe pas
            let produitExistePas = true;

            for (let i = 0; i < produitEnregistrerDansLocalStorage.length; i++) {
                let produit = produitEnregistrerDansLocalStorage[i];

                // si le produit existe déjà, je le mets à jour
                if (produit.idProduit == infosProduit.idProduit && produit.couleurProduit == infosProduit.couleurProduit) {
                    produitExistePas = false;
                    produit.quantiteProduit += infosProduit.quantiteProduit;
                }
            }
            
            // si le produit n'existe pas dans le panier
            if (produitExistePas == true) {
                produitEnregistrerDansLocalStorage.push(infosProduit);
            }
            
            // mettre à jour le panier
            localStorage.setItem('produit', JSON.stringify(produitEnregistrerDansLocalStorage));   
        }
        else {
            // si aucun produit dans le panier
            produitEnregistrerDansLocalStorage = [];
            produitEnregistrerDansLocalStorage.push(infosProduit);
            localStorage.setItem('produit', JSON.stringify(produitEnregistrerDansLocalStorage));
        }        
        alert("Le produit a bien été ajouté dans le panier.");
       }

});


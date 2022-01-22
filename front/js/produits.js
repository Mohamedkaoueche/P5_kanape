

// Recuperation de l'id dans l'url
let params = new URLSearchParams(document.location.search);
let id = params.get("id");


fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {data

    // fonctionqui renvoie le produit grace a l'id
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
//boucle d'iteration variable 
    for(const color of colors)
    {
        let option = document.createElement('option');
        option.setAttribute('value',color );
        option.textContent = color;
        select.append(option);
    }

    let boutton = document.getElementById('addToCart');
    let couleur = document.getElementById('colors');
    let quantity = document.getElementById('quantity');
    let img = document.getElementById('imageProduit');
    
    let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('produit'));

    boutton.addEventListener('click',(e)=>{
    e.preventDefault;
    let detailProduitPanier = {
        nomProduit : res.name,
        prixProduit : res.price,
        idProduit : res._id,
        couleurProduit : couleur.value,
        quantiteProduit : quantity.value,
        imageDuProduitSelectionner : img.src,
    };
  
    if (produitEnregistrerDansLocalStorage) {
        produitEnregistrerDansLocalStorage.push(detailProduitPanier);
        localStorage.setItem('produit',JSON.stringify(produitEnregistrerDansLocalStorage));
    }
    else
    {
        produitEnregistrerDansLocalStorage = [];    
        produitEnregistrerDansLocalStorage.push(detailProduitPanier);
        localStorage.setItem('produit',JSON.stringify(produitEnregistrerDansLocalStorage));
    }
 
    console.log(detailProduitPanier);

    });
    

});

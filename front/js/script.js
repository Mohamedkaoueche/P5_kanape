
/**** Affichage dynamique des produits */

const content = document.getElementById('items');

fetch('http://localhost:3000/api/products')
// la methode fetch permet de fair un appel a un serivce et renvoie un reponse.
    .then(res => res.json())
    //cette premiere methode permet d'avoir la reponse et elle retourne la reponse en json.
    .then(data => {
    //pernd la rpeonse en json et fais le traitement en html.
        for (const element of data)
        // parcour les element de data
         {
            let a = document.createElement('a');
            a.setAttribute('href', './product.html?id=' + element._id);

            let article = document.createElement('article');
            let image = document.createElement('img');
            image.setAttribute('src', element.imageUrl);
            image.setAttribute('alt', element.altTxt);
            let h3 = document.createElement('h3');
            h3.className = 'productName';
            h3.textContent = element.name;
            let p = document.createElement('p');
            p.className = 'productDescription';
            p.textContent=element.description;

            article.append(image, h3, p);
            a.append(article);
            content.append(a);
        }
    });

/**** Affichage dynamique des produits */

/*********** récupuration de l'ID du'produit ************/
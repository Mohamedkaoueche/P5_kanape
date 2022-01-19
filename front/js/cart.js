let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('produit'));



if (produitEnregistrerDansLocalStorage === null) {

 let articlePanierVide = document.querySelector('h1');
 articlePanierVide.textContent = 'Panier vide';
 document.append(articlePanierVide);
}
else
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
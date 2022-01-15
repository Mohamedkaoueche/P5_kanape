function sayHello(Hello)
{
    console.log(Hello);
    return Hello
}


let params = new URLSearchParams(document.location.search);
let id = params.get("id");


fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {data

    const res  = data.find(findObject);

    function findObject(data)
    {
        return data._id === id
    }

    let imageProduit = document.getElementById('imageProduit');
    imageProduit.setAttribute('src',res.imageUrl)

    let title = document.getElementById('title');
    title.textContent = res.name;

    let price = document.getElementById('price');
    price.textContent = res.price;

    let description = document.getElementById('description');
    description.textContent= res.description ;

    let select = document.getElementById('colors');
    const colors = res.colors;

    for(const color of colors)
    {
        let option = document.createElement('option');
        option.setAttribute('value',color );
        option.textContent = color;
        select.append(option);
    }

});


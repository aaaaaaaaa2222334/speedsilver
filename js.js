let productsGrid=document.getElementById('products-grid');
let productsArray=[];
let xhr =new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/Mark1906/second-new';

xhr.open('GET',url + '/products');
xhr.responseType='json'
xhr.onload=function(){
    let products=xhr.response;
    productsGrid.innerHTML=null;
    products.forEach(p=>{
        productsArray.push(p);
        let pElem=document.createElement('div');
        pElem.classList.add('product'
        );
        pElem.innerHTML=`
        <h2 class='product-name'>${p.name}</h2>
        <img class='product-photo' src='${p.photo_url}' alt ='${p.name}'>
        <p class='product-price'><b>Price: </b>${p.price}</p>
        <p class='product-description'><b>Description: </b>${p.description}</p>
        <a href='miraz.html?id=${p.author_id}'>Seller profile</a>
        <button onclick="addProductToCart('${p._id}')">Buy</button>`;
        productsGrid.append(pElem);
        });
}
xhr.send();
function openCart(){
    cartProd.classList.toggle('hide');
}

let cartProd = document.getElementById('cart-products');

let cart=[];
if(localStorage.getItem('cart')){
    cart=JSON.parse(localStorage.getItem('cart'));
    drawCartProducts();
}

function deletProductToCart(){
    cart=[];
    cartProd.innerHTML='car is empty';
    localStorage.setItem("cart",'[]');
}

function addProductToCart(id){
    let product=productsArray.find(function(p){
        return p.id==id;
    })
    cart.push(product);
    drawCartProducts();
    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById('cart-button').classList.add('active');
    setTimeout(function(){
        document.getElementById('cart-button').classList.remove('active');
    },500);
}

function drawCartProducts(){
    if(cart.length===0) return cartProd.innerHTML='Cart is empty';
    cartProd.innerHTML=null;
    let sum=0;
    cart.forEach(function(p){
        cartProd.innerHTML+=`
        <p><img src="${p.photo_url}"> ${p.name} |${p.price}pln</p>
        <hr>`;
        sum+=p.price;
    });
    cartProd.innerHTML+=`
    <p>suma: ${sum}Pln</p>
    <button onclick="buyAll()">buy all</button>
    <button onclick="deletAll()">delet all</button>`;
}

function buyAll(){
    modal.style.display="block";
    let sum =0;
    orderBlock.innerHTML=null;

    cart.forEach(function(p){
        orderBlock.innerHTML+=`
        <div class="item">
        <img width=100px" src="${p.photo_url}">
        <h2>${p.name}|${p.price}PLN</h2>
        </div>`;
        sum+=+p.price;
    });
    document.getElementById('price').innerHTML=sum+'PLN';
}

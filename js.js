let productsGrid=document.getElementById('products-grid');
let productsArray=[];
let xhr =new XMLHttpRequest();
let url = 'https://pespatron-3881.restdb.io/rest';

xhr.open('GET',url + '/wasia');

xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "68a067b54a80e51e65677186");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.responseType='json'
xhr.onload=function(){
    productsArray=xhr.response;
    productsGrid.innerHTML=null;
    productsArray.forEach(p=>{
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
        return p._id==id;
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
        <p> ${p.name} |${p.price}pln</p>
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
function deletAll(){
    cart=[];
    cartProd.innerHTML='korzyna ochyshchena'
    localStorage.setItem("cart",'[]');
}

let orderBlock=document.getElementById('order-block');


let modal=document.getElementById('myModal');

let span=document.getElementsByClassName('close')[0];

span.onclick=function(){
    modal.style.display='none';
}

window.onclick=function(event){
    if (event.target == modal){
        modal.style.display='none';
    }
}

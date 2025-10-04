let productForm=document.getElementById('add_product_form');

productForm.addEventListener('submit',function(event){
    event.preventDefault();
    let data=JSON.stringify({
        "name": event.target['name'].value,
        "description": event.target['description'].value,
        "price": event.target['price'].value,
        "photo_url": event.target['photo_url'].value
    });
    let xhr=new XMLHttpREquest();
    xhr.withCredentials=false;

    xhr.onload=function(){
        if(xhr.status===201){
            event.target.reset();
            alert('product added')
        }
        else{
            alert('server error')
        }
    };
    xhr.open("POST","https://pespatron-3881.restdb.io/rest/product");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "68a067b54a80e51e65677186");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
})

let orders=document.getElementById('admin_page_orders');

let xhr =new XMLHttpRequest();
xhr.open("GET", "https://pespatron-3881.restdb.io/rest/product");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "68a067b54a80e51e65677186");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.onload=function(){
    xhr.response.forEach(function(order){
        let orderElement = document.createElement('div');
        orderElement.classList.add('product');
        let statusColor='green';
        if(order.status=='Complated'){
            statusColor='yellow';
        }
        orderElement.innerHTML+=`
        <h2>Zamovlenia ${order._id}</h2>
        <p><b>Status:<b><span style="color:${statusColor}">${order.status}</span></p>
        <p><b>Name:</b> ${order.name}</p>
        <p><b>address:</b> ${order.address}</p>
        <p><b>phone:</b> ${order.phone}</p>
        <p><b>post Number:</b> ${order.post_number}</p>`;
        let sum=0;
        order.products.forEach(function(p){
            order.Element.innerHTML+=`
            <p><img height="50" src="${p.photo_url}"> ${p.name} | ${p.price}$</p>
            `;
            sum+= +p.price;

        });
        orderElement.innerHTML+=`
        <p>SUMA: ${sum}$</p>
        <button onclick="complete('${order._id}')">#</button>`;
        orders.append(orderElement);
        
    })
}

xhr.send();

function complete(id){
    var data=JSON.stringify({
        "status":"Complated"
    });
    let xhr = new XMLHttpRequest();
    xhr.withCredentials=false;

    xhr.onload=function(){
        if(xhr.status==200){
            location.reload();
        }else{
            alert('Server error. Try again later');
        }
    }
      xhr.open("PUT","https://pespatron-3881.restdb.io/rest/product");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "68a067b54a80e51e65677186");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}
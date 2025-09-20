let productForm=document.getElementById('add_product_form');

productForm.addEventListener('submit',function(event){
    event.preventDefault();
    let data=JSON.stringify({
        "name": event.target['name'].value,
        "description": event.target['description'].value,
        "price": event.target['price'].value,
        "photo_url": event.target['photo_url'].value
    });
    let xhr=newXMLHttpREquest();
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

const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
const compraFinal= document.getElementById('cart-buy')
const scrollToProduct = document.getElementById('scrollToProduct')
let cartItemID = 1;




function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });
    document.querySelector('.navbar-toggler').addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
    });

    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    productList.addEventListener('click', purchaseProduct);

    cartList.addEventListener('click', deleteProduct);

    compraFinal.addEventListener('click', ()=>{
            let resolution = document.createElement('div');
            resolution.innerHTML = `    
                <div>
                    <h3>¬°Felicitaciones por la compra! </h3>
                </div>
            `;
            cartList.appendChild(resolution);
    })
}   
eventListeners();


function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

function loadJSON(){
    fetch('./js/games.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += `
                <div class = "product-item">
                    <div class = "product-img">
                        <img src = "${product.imgSrc}" alt = "product image">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Agregar
                        </button>
                    </div>
                    <div class = "product-content">
                        <h3 class = "product-name">${product.name}</h3>
                        <span class = "product-category">${product.category}</span>
                        <p class = "product-price">$${product.price}</p>
                    </div>
                </div>
            `;
        });
        productList.innerHTML = html;
    })
    .catch(error => {
        alert(`utilizar live server o servidor local`);
        // Para que la API fetch pueda andar, se necesita un servidor local o el live server, o el sitio web hospedado en algun lugar.
    })
}


function purchaseProduct(e){
    if(e.target.classList.contains('add-to-cart-btn')){
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

function getProductInfo(product){
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

function addToCartList(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-category">${product.category}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>
        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}

function saveProductInStorage(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}


function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

}

function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1; 
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        
    }
    products.forEach(product => addToCartList(product));
 
    updateCartInfo();
}


function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1));
        return acc += price;
    }, 0); // suma de los precios

    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}


function deleteProduct(e){
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.remove();
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove();
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    updateCartInfo();
}



//jquery 

$(document).ready(function () {

    var request = $.ajax({
        url: "https://swapi.dev/api/people/1/",
        method: "GET"
    });
    request.done(function( data ) {
        console.log(data.name);
        const final = data.name
        $('#nombre').text('Hola, '+ final)
        $('#nombre').css({'text-align': 'end'})
    })
      
    request.fail(function( error ) {
        console.log( 'Error: ' , error );
    });
    
  
    $('.textoPrincipal').html('Tenemos los mejores juegos, diferentes mundos con diferentes temas y estilos de juego. ¬°Elige tu aventura!')
    //$('.banner-content p:first').html('Las mejores promociones estan ac√°')
    

    $('#buttonPrincipal').click(function(){
        $('.banner-content').prepend('<p id="color01">¬°Farcry 4, fracry 5, com precios muy bajos! </p>')
        $('#color01').css({color: 'gray'});
        $("#color01").fadeOut("slow", function(){
            $('#color01').fadeIn(1000)
        })
    })
    $('#load').slideUp(0, function(){
        $('#load').slideDown(2000)
    })
    $('.navbar-brand').fadeOut(0, function(){
        $('.navbar-brand').fadeIn(2000)
    })

    $("button").click(function() {
        $('html,body').animate({
            scrollTop: $(".second").offset().top},
            'slow');
    });

})








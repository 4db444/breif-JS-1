const cart_container = document.querySelector(".cart-container")
const cart_list = document.querySelector(".cart-list")
const cart_btn = document.querySelector(".cart-btn")
let cart_items = JSON.parse(localStorage.getItem("cart"));
let time_out = null;

cart_btn.addEventListener("click", e => {
    cart_items = JSON.parse(localStorage.getItem("cart"))

    cart_container.classList.toggle("translate-x-[100%]")

    if(!cart_items.length){
        clearTimeout(time_out);
        time_out = setTimeout(() => {
            cart_container.classList.add("translate-x-[100%]")
        }, 1000);
    }
})

cart_container.addEventListener("blur", ()=> {
    cart_container.classList.add("translate-x-[100%]")
})

window.addEventListener("scroll", (e) => {
    cart_container.classList.add("translate-x-[100%]")
})

function increase_quantity (id){
    const cart_item = cart_items.find(elem => elem.id === id);
    cart_item.quantity += 1;

    document.getElementById(`span-quantity-${id}`).textContent = cart_item.quantity;
    document.getElementById(`total-${id}`).textContent = `total : ${cart_item.quantity * cart_item.price}$`;

    localStorage.setItem("cart", JSON.stringify(cart_items))
}

function decrease_quantity (id){
    const cart_item = cart_items.find(elem => elem.id === id);
    cart_item.quantity -= 1;

    if(cart_item.quantity){
        document.getElementById(`span-quantity-${id}`).textContent = cart_item.quantity;
        document.getElementById(`total-${id}`).textContent = `total : ${cart_item.quantity * cart_item.price}$`;
    }else {
        cart_items = cart_items.filter(elem => elem.id !== id)
        cards.find(elem => elem.id === id).in_cart = false;
        render_cart(cart_items)
        
        document.getElementById(`btn-cart-${id}`).innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
        
        clearTimeout(time_out);
        time_out = setTimeout(() => {
            cart_container.classList.add("translate-x-[100%]")
        }, 1000);
        
        localStorage.setItem("cards", JSON.stringify(cards))
    }
    
    localStorage.setItem("cart", JSON.stringify(cart_items))
}

function render_cart (arr) {
    cart_list.innerHTML = ""

    if(arr.length){
        arr.forEach(elem => {
            cart_list.innerHTML += `<div class="flex h-[200px] gap-2">
                <img src="${elem.img}" />
                <div>
                    <h3 class="font-bold">${elem.name}</h3>
                    <p>${elem.price}$</p>
                    <div class="flex items-center justify-between w-[100px]">
                        <button class="bg-red-900 text-white flex justify-center items-center w-[20px] font-mono rounded-full h-[20px]" onclick="decrease_quantity(${elem.id})">-</button>
                        <span  id="span-quantity-${elem.id}">${elem.quantity}</span>
                        <button class="bg-red-900 text-white flex justify-center items-center w-[20px] font-mono rounded-full h-[20px]" onclick="increase_quantity(${elem.id})">+</button>
                    </div>
                    <p id="total-${elem.id}">Total : ${elem.price * elem.quantity}$</p>
                </div>
            </div>` 
        });
    }else {
        cart_list.innerHTML = `<img src="./img/sleeping_zoro.png" alt="hi" class="grayscale-100"/>`
    }
}

render_cart(cart_items)
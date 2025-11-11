let cards = JSON.parse(localStorage.getItem("cards"))
const menu = document.querySelector("nav>ul")

let page_items = 9;
let page_number = 1;
let filtered_cards = [...cards]

let cards_container = document.querySelector(".cards-container");
let pagination_container = document.querySelector(".pagination-container")

function update_page(page_num){
    if(page_num !== page_number){
        page_number = page_num;
        renderCards(filtered_cards)
    }
}

function toggleLike (id){
    const card_to_update = filtered_cards.find(elem => elem.id === id)

    card_to_update.is_liked = !card_to_update.is_liked

    document.getElementById(`btn-like-${id}`).innerHTML = `
        <svg viewBox="0 0 24 24" fill="${card_to_update.is_liked ? "white" : "none"}" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    `

    localStorage.setItem("cards", JSON.stringify(cards))
}

function toggleCart (id) {
    cards = JSON.parse(localStorage.getItem("cards"))
    const card_to_update = cards.find(elem => elem.id === id)

    // cart_items = JSON.parse(localStorage.getItem("cart"))
    if(card_to_update.in_cart){
        cart_items = cart_items.filter(elem => elem.id !== id)
        console.log(card_to_update)
    }else {
        console.log("push")
        cart_items.push({
            ...card_to_update,
            quantity : 1
        })
    }
    
    render_cart(cart_items)
    card_to_update.in_cart = !card_to_update.in_cart;

    document.getElementById(`btn-cart-${id}`).innerHTML = card_to_update.in_cart ? 
                                `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
                            :
                            `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`

    localStorage.setItem("cards", JSON.stringify(cards))
    localStorage.setItem("cart", JSON.stringify(cart_items))
}

function renderCards (arr) {
    let total_pages = Math.ceil(arr.length / page_items)
    cards_container.innerHTML = "";
    pagination_container.innerHTML = "";

    if(!arr.length){
        cards_container.innerHTML = `<img src="./img/not_found.png" alt="not_found" class="grayscale-100">`
    }else {
        for(let i = page_items * (page_number - 1); i < page_items * page_number && i < arr.length; i++){
            cards_container.innerHTML += `
                <div class="card group relative overflow-hidden">
                    <img src="${arr[i].img}" alt="" class="card-img border-[20px]  border-(--${arr[i].rarity}-card-color) group-hover:brightness-70 transition">
                    <div class="card-rarity-container bg-(--${arr[i].rarity}-card-color)">
                        <img src="./img/rarity/${arr[i].rarity} tag.png" alt="" class="card-rarity">
                    </div>

                    <button class="text-white p-5 w-[100px] h-[100px] bg-(--${arr[i].rarity}-card-color) rounded-full absolute top-[50%] left-0 ml-[20px] translate-y-[-50%] translate-x-[calc(-100%-20px)] group-hover:translate-x-0 transition " id="btn-like-${arr[i].id}" onclick="toggleLike(${arr[i].id})">
                        <svg viewBox="0 0 24 24" fill="${filtered_cards[i].is_liked ? "white" : "none"}" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>


                    <button id="btn-cart-${arr[i].id}" class="p-5 text-white w-[100px] h-[100px] bg-(--${arr[i].rarity}-card-color) rounded-full absolute top-[50%] right-0 mr-[20px] translate-y-[-50%] translate-x-[calc(100%+20px)] group-hover:translate-x-0 transition" onclick="toggleCart(${arr[i].id})">
                        ${
                            arr[i].in_cart ? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M11 3L13.5 5.5M13.5 5.5L16 8M13.5 5.5L16 3M13.5 5.5L11 8M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
                            :
                            `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
                        }
                        
                    </button>
                    
                    <div class="w-full h-[150px] bg-(--${arr[i].rarity}-card-color) absolute bottom-0 translate-y-[100%] group-hover:translate-y-0 transition p-5 flex flex-col justify-between">
                        <div class="flex justify-between items-center">
                            <h3 class="text-white text-3xl">${arr[i].name}</h3>
                            <p class="font-bold text-4xl text-white">${arr[i].price}$</p>
                        </div>
                        <p class="p-2 text-sm text-center text-white">${arr[i].description}</p>
                    </div>
                </div>
            `
        }

        for(let i = 1; i <= total_pages; i++){
            pagination_container.innerHTML += `
                <button onclick="update_page(${i})" class="w-[50px] h-[50px] border-3 border-(--main-red) text-(--main-red) text-xl font-bold rounded-[10px] ${i == page_number ? "bg-(--main-red) text-white" : ""} transition">${i}</button>
            `
        }
    }
}

document.querySelector("form").addEventListener("change", (e)=> {
    let filter_by = e.target.id
    page_number = 1;
    
    if (filter_by === "all"){
        filtered_cards = [...cards]
        renderCards(filtered_cards)
    }else {
        filtered_cards = cards.filter(elem => elem.rarity === filter_by)
        renderCards(filtered_cards)
    }
    
})

document.getElementById("menu-toggle").addEventListener("click", () => {
    menu.classList.toggle("max-lg:translate-x-[100%]")
})

renderCards(cards)
let cards = [
    {
        name : "Roger",
        img : "./img/cards/roger.png",
        rarity : "pirate-king",
        is_liked : false
    },
    {
        name : "Nika",
        img : "./img/cards/nika.png",
        rarity : "yonko",
        is_liked : false
    },
    {
        name : "White beard",
        img : "./img/cards/oyaji.png",
        rarity : "pirate-king",
        is_liked : false
    },
    {
        name : "Shanks",
        img : "./img/cards/shanks.png",
        rarity : "yonko",
        is_liked : false
    },
    {
        name : "Choper",
        img : "./img/cards/choper.png",
        rarity : "marin",
        is_liked : false
    },
    {
        name : "Zoro",
        img : "./img/cards/zoro.png",
        rarity : "pirate",
        is_liked : false
    },
    {
        name : "Kizaru",
        img : "./img/cards/Kizaru.png",
        rarity : "yonko",
        is_liked : false
    },
    {
        name : "Luffy",
        img : "./img/cards/luffy.png",
        rarity : "pirate",
        is_liked : false
    },
    {
        name : "Law",
        img : "./img/cards/law.png",
        rarity : "pirate",
        is_liked : false
    },
    {
        name : "Bepo",
        img : "./img/cards/bepo.png",
        rarity : "marin",
        is_liked : false
    },
]

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

function toggleLike (){
    return
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
                <div class="card group">
                    <img src="${arr[i].img}" alt="" class="card-img border-[20px]  border-(--${arr[i].rarity}-card-color) hover:brightness-70 transition">
                    <div class="card-rarity-container bg-(--${arr[i].rarity}-card-color)">
                        <img src="./img/rarity/${arr[i].rarity} tag.png" alt="" class="card-rarity">
                    </div>

                    <button class="text-white w-[100px] h-[100px] bg-(--${arr[i].rarity}-card-color) rounded-full absolute top-[50%] left-0 ml-[20px] translate-y-[-50%] translate-x-[calc(-100%-20px)] group-hover:translate-x-0 transition" onclick="toggleLike()">like</button>
                    <button class="text-white w-[100px] h-[100px] bg-(--${arr[i].rarity}-card-color) rounded-full absolute top-[50%] right-0 mr-[20px] translate-y-[-50%] translate-x-[calc(100%+20px)] group-hover:translate-x-0 transition">cart</button>
                    <div ></div>
                    <div class="w-full h-[100px] bg-(--${arr[i].rarity}-card-color) absolute bottom-0 translate-y-[100%] group-hover:translate-y-0 transition"></div>
                </div>
            `
        }

        for(let i = 1; i <= total_pages; i++){
            pagination_container.innerHTML += `
                <button onclick="update_page(${i})" class="w-[50px] h-[50px] border-3 border-(--main-red) text-(--main-red) text-xl font-bold rounded-[10px] ${i == page_number ? "bg-(--main-red) text-white" : ""}">${i}</button>
            `
        }
    }
}

renderCards(cards)


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
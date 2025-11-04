let cards = [
    {
        name : "Roger",
        img : "./img/cards/roger.png",
        rarity : "pirate-king"
    },
    {
        name : "Nika",
        img : "./img/cards/nika.png",
        rarity : "yonko"
    },
    {
        name : "White beard",
        img : "./img/cards/oyaji.png",
        rarity : "pirate-king"
    },
    {
        name : "Shanks",
        img : "./img/cards/shanks.png",
        rarity : "yonko"
    },
    {
        name : "Choper",
        img : "./img/cards/choper.png",
        rarity : "marin"
    },
    {
        name : "Zoro",
        img : "./img/cards/zoro.png",
        rarity : "pirate"
    },
    {
        name : "Kizaru",
        img : "./img/cards/Kizaru.png",
        rarity : "yonko"
    },
    {
        name : "Luffy",
        img : "./img/cards/luffy.png",
        rarity : "pirate"
    },
    {
        name : "Law",
        img : "./img/cards/law.png",
        rarity : "pirate"
    },
    {
        name : "Bepo",
        img : "./img/cards/bepo.png",
        rarity : "marin"
    },
]

let cards_container = document.querySelector(".cards-container");

function renderCards (arr) {
    cards_container.innerHTML = ""

    if(!arr.length){
        cards_container.innerHTML = `<img src="./img/not_found.png" alt="not_found" class="grayscale-100">`
    }else {
        arr.forEach(elem => {
            cards_container.innerHTML += `
            <div class="card">
               <div class="card-rarity-container bg-(--${elem.rarity}-card-color)">
                    <img src="./img/rarity/${elem.rarity} tag.png" alt="" class="card-rarity">
                </div>
                <img src="${elem.img}" alt="" class="card-img border-[20px]  border-(--${elem.rarity}-card-color)">
            </div>
            `
        });
    }
}

renderCards(cards)


document.querySelector("form").addEventListener("change", (e)=> {
    let filter_by = e.target.id

    if (filter_by === "all"){
        renderCards(cards)
    }else {
        renderCards(cards.filter(elem => elem.rarity === filter_by))
    }

})
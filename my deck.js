let myDeck = JSON.parse(localStorage.getItem("myDeck"))
let cards_container = document.querySelector(".cards-container");
const menu = document.querySelector("nav>ul")

document.getElementById("menu-toggle").addEventListener("click", () => {
    menu.classList.toggle("max-lg:translate-x-[100%]")
})


function renderCards (arr) {
    cards_container.innerHTML = "";

    if(!arr.length){
        cards_container.innerHTML = `<img src="./img/not_found.png" alt="not_found" class="grayscale-100">`
    }else {
        arr.forEach(elem => 

            cards_container.innerHTML += `
                <div class="card group">
                    <img src="${elem.img}" alt="" class="card-img border-[20px]  border-(--${elem.rarity}-card-color) group-hover:brightness-70 transition">
                    <div class="card-rarity-container bg-(--${elem.rarity}-card-color)">
                        <img src="./img/rarity/${elem.rarity} tag.png" alt="" class="card-rarity">
                    </div>
                    <div class="bg-(--${elem.rarity}-card-color) absolute right-0 top-0 w-[100px] h-[100px] rounded-es-[40px] text-white flex justify-center items-center text-5xl">
                        ${elem.quantity}
                    </div>

                    <div class="w-full h-[100px] bg-(--${elem.rarity}-card-color) absolute bottom-0 translate-y-[100%] group-hover:translate-y-0 transition"></div>
                </div>
            `
        )
    }
}

renderCards(myDeck)
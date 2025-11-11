const left_side_bar = document.querySelector(".left-side-bar")
const hand = document.querySelector(".hand");
const playerArena = document.querySelector(".player-arena")

const my_deck = JSON.parse(localStorage.getItem("myDeck"))

const cardsToPlay = [];

my_deck.forEach(elem => {
    for(let i = 0; i < elem.quantity; i++){
        const {quantity, ...newCardObj} = elem;
        cardsToPlay.push(newCardObj);
    }
});

function shuffle (arr){
    arr.forEach((elem, index) => {
        if(index === 0) return;

        const randomIndex = Math.floor(Math.random() * index);

        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    })
}

shuffle(cardsToPlay)

cardsToPlay.forEach(elem => {
    left_side_bar.innerHTML += `
        <div class="card deck-card draggable absolute top-0 left-0 w-full perspective-midrange transition" draggable="true">
            <div class="wrapper transform-3d transition-transform duration-500 rotate-y-180 relative w-full h-full">
                <div class="front absolute top-0 left-0 w-full h-full backface-hidden">
                    <img src="${elem.img}" alt="" class="card-img border-[10px] border-(--${elem.rarity}-card-color) w-full h-full">
                    <div class="card-rarity-container bg-(--${elem.rarity}-card-color)">
                        <img src="./img/rarity/${elem.rarity} tag.png" alt="" class="card-rarity">
                    </div>
                </div>
                <div class="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center backface-hidden rotate-y-180 border-[gray] border-[10px] rounded-[40px]">
                    <img src="./img/logo.png" class="w-[60%] grayscale-100"/>
                </div>
            </div>
        </div> 
    `
})

// cards to hand 
document.querySelectorAll(".draggable").forEach(elem => {
    elem.addEventListener("dragstart", (e) => {
        if(hand.children.length >= 5 && !elem.classList.contains("hand-card")){
            e.preventDefault()
            console.log("you can not start dragging")
            return
        }
        console.log("dragstart")
        elem.classList.add("opacity-[.5]", "dragging")
    })
    elem.addEventListener("dragend", () => {
        elem.classList.remove("opacity-[.5]", "dragging")
    })
})

hand.addEventListener("dragover", (e) => {
    e.preventDefault()
    const draggalbeElement = document.querySelector(".dragging")
    if(hand.children.length >= 5 && !draggalbeElement.classList.contains("hand-card")) return ;
    
    
    const afterElement = getAfterElement(hand, e.clientX)
    draggalbeElement.classList.remove("absolute", "w-full")
    draggalbeElement.classList.add("h-full")

    if(afterElement){
        hand.insertBefore(draggalbeElement, afterElement)
    }else{
        hand.appendChild(draggalbeElement)
    }

    setTimeout(() => {
    }, 300);
})

hand.addEventListener("drop", (e) => {
    const draggableElement = document.querySelector(".dragging");
    if(draggableElement.classList.contains("hand-card")) return;
        draggableElement.classList.add("hand-card")
        cardWrapper = draggableElement.querySelector(".wrapper")
        cardWrapper.classList.remove("rotate-y-180")
})

function getAfterElement (container, x){
    const containerCards = Array.from(container.querySelectorAll(".card"))

    return containerCards.reduce((closest, elem) => {
        const elemBox = elem.getBoundingClientRect();

        const x_position = x - elemBox.left - elemBox.width / 2;

        if(x_position < 0 && x_position > closest.x_position){
            return {
                x_position,
                element : elem
            }
        }   

        return closest;
    }, {x_position : -Infinity}).element
}

// arena slots
playerArena.querySelectorAll(".slot").forEach(elem => {
    elem.addEventListener("dragover", (e) => {
        const draggable = document.querySelector(".dragging")
        if(draggable.classList.contains("hand-card") && !elem.children.length){
            e.preventDefault();
            elem.classList.add("scale-[1.1]")
        }
    })

    elem.addEventListener("dragleave", e => {
        elem.classList.remove("scale-[1.1]")    
    })
    
    elem.addEventListener("drop", e => {
        const draggable = document.querySelector(".dragging")
        if(draggable.classList.contains("hand-card") && !elem.children.length){
            elem.appendChild(draggable)
            draggable.classList.add("w-full")
        }
        elem.classList.remove("scale-[1.1]")
    })
})
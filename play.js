const left_side_bar = document.querySelector(".left-side-bar")

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

    console.log(arr)
}

shuffle(cardsToPlay)

cardsToPlay.forEach(elem => {
    left_side_bar.innerHTML += `
        <div class="card draggable absolute top-0 left-0 w-full" draggable="true">
            <div class="wrapper transform-3d transition-transform duration-500 rotate-y-180 relative w-full h-full">
                <div class="front absolute top-0 left-0 w-full h-full backface-hidden">
                    <img src="${elem.img}" alt="" class="card-img border-[15px] border-(--${elem.rarity}-card-color)">
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


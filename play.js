const left_side_bar = document.querySelector(".left-side-bar")
const hand = document.querySelector(".hand");
const playerArena = document.querySelector(".player-arena")
const oponentArena = document.querySelector(".oponent")
const robotMessages = document.querySelector(".robot-messages")
const playerHealth = document.getElementById("player-health")
const robotHealth = document.getElementById("robot-health")

const my_deck = JSON.parse(localStorage.getItem("myDeck"))
const cardsToPlay = [];

let currentTurn = "player";
let totalAttempts = 3;
let gameplayLocked = false;

let market = JSON.parse(localStorage.getItem("cards"))

let robotHand = []
let robotDeck = []

for(let i = 0; i < 10; i ++){
    robotDeck.push(market[Math.floor(Math.random() * 10)])
}



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
        <div class="card deck-card draggable absolute top-0 left-0 w-full perspective-midrange transition overflow-hidden" draggable="true">
            <div class="wrapper transform-3d transition-transform duration-500 relative w-full h-full rotate-y-180 ">
                <div class="front absolute top-0 left-0 w-full h-full backface-hidden overflow-hidden">
                    <img src="${elem.img}" alt="" class="card-img border-[10px] border-(--${elem.rarity}-card-color) w-full h-full">
                    <div class="card-rarity-container bg-(--${elem.rarity}-card-color)">
                        <img src="./img/rarity/${elem.rarity} tag.png" alt="" class="card-rarity">
                    </div>
                    <div class="absolute bottom-0 w-full h-[60px] flex justify-around items-center p-2 text-white bg-(--${elem.rarity}-card-color)">
                        <h3 class="shield">${elem.shield} <i class="fa-solid fa-shield-halved"></i></h3>
                        <h3 class="attack">${elem.attack} <i class="fa-solid fa-fire"></i></h3>
                    </div>
                </div>
                <div class="absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center backface-hidden rotate-y-180 border-[gray] border-[10px] rounded-[30px]">
                    <img src="./img/logo.png" class="w-[60%] grayscale-100"/>
                </div>
            </div>
        </div> 
    `
})

// cards to hand 
document.querySelectorAll(".draggable").forEach(elem => {
    elem.addEventListener("dragstart", (e) => {
        if((hand.children.length >= 5 && !elem.classList.contains("hand-card")) || currentTurn !== "player" || totalAttempts <= 0 || gameplayLocked){
            e.preventDefault()
            return
        }
        elem.classList.add("opacity-[.5]", "dragging")
    })

    elem.addEventListener("dragend", () => {
        elem.classList.remove("opacity-[.5]", "dragging")
    })
})

hand.addEventListener("dragover", (e) => {
    e.preventDefault()
    const draggalbeElement = document.querySelector(".dragging")
    if((hand.children.length >= 5 && !draggalbeElement.classList.contains("hand-card")) || draggalbeElement.classList.contains("arena-card") || gameplayLocked) return ;
    
    const afterElement = getAfterElement(hand, e.clientX)
    draggalbeElement.classList.remove("absolute", "w-full")
    draggalbeElement.classList.add("h-full")

    if(afterElement){
        hand.insertBefore(draggalbeElement, afterElement)
    }else{
        hand.appendChild(draggalbeElement)
    }
})

hand.addEventListener("drop", (e) => {
    const draggableElement = document.querySelector(".dragging");
    if(draggableElement.classList.contains("hand-card")) return;

    draggableElement.classList.add("hand-card")
    cardWrapper = draggableElement.querySelector(".wrapper")
    cardWrapper.classList.remove("rotate-y-180")

    if(--totalAttempts <= 0){
        currentTurn = "robot";
        robotLogic()

    }
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
        if((draggable.classList.contains("hand-card") || draggable.classList.contains("arena-card")) && !elem.children.length){
            e.preventDefault();
            elem.classList.add("scale-[1.1]")
        }
    })

    elem.addEventListener("dragleave", e => {
        elem.classList.remove("scale-[1.1]")    
    })
    
    elem.addEventListener("drop", e => {
        const draggable = document.querySelector(".dragging")
        if((draggable.classList.contains("hand-card") || draggable.classList.contains("arena-card")) && !elem.children.length){
            if(--totalAttempts <= 0){
                currentTurn = "robot";
                robotLogic()
            }
            elem.appendChild(draggable)
            draggable.classList.add("w-full", "arena-card", "group")
            
            if(draggable.classList.contains("hand-card")) {
                draggable.classList.remove("hand-card")
                
                const position_form = document.createElement("form")
                position_form.className = "fixed w-full h-full top-0 left-0 bg-black flex flex-col gap-5 justify-center items-center";
                position_form.addEventListener("submit", e => e.preventDefault())

                const card_clone = draggable.cloneNode(true)
                card_clone.classList.remove("opacity-[.5]", "h-full")

                position_form.appendChild(card_clone);

                position_form.innerHTML += `
                    <div class="flex gap-5">
                        <button class="defence text-white p-2 rounded-[10px] bg-green-500 hover:[transform:scale(1.1)] transition"> <i class="fa-solid fa-shield-halved"></i> Defence</button>
                        <button class="attack text-white p-2 rounded-[10px] bg-red-500  hover:[transform:scale(1.1)] transition"> <i class="fa-solid fa-fire"></i> Attack</button>
                    </div>
                `

                position_form.querySelector("button.defence").addEventListener("click", e => {
                    draggable.querySelector("h3.attack").remove();
                    draggable.classList.add("defence")
                    position_form.remove();

                })
                
                position_form.querySelector("button.attack").addEventListener("click", e => {
                    draggable.classList.add("attack")
                    draggable.querySelector("h3.shield").remove();
                    const attackBtn = document.createElement("button")

                    attackBtn.className = `attack-btn absolute top-[50%] left-[50%] bg-red-600 opacity-0 group-hover:opacity-100 text-2xl py-2 px-4 rounded-[10px] group-hover:translate-y-[-50%] translate-x-[-50%] text-white transition`

                    attackBtn.textContent = 'Attack'

                    attackBtn.addEventListener("click", async e => {
                        if(currentTurn === "player" && totalAttempts > 0){
                            const attackableSlots = oponentArena.querySelectorAll(".slot:not(.slot:empty)");
                            if(attackableSlots.length){
                                const target = await showAttackableSlots(attackableSlots);
                                if(target.querySelector(".card.defence")){
                                    let targetShieldPoints = +target.querySelector(".card.defence .shield").textContent
                                    let playerAttackPoints = +draggable.querySelector(".attack").textContent
                                    if(targetShieldPoints > playerAttackPoints){
                                        draggable.remove();
                                        target.querySelector(".card.defence .shield").innerHTML = `<h3 class="shield">${targetShieldPoints - playerAttackPoints} <i class="fa-solid fa-shield-halved"></i></h3>`
                                    }else if(targetShieldPoints === playerAttackPoints){
                                        draggable.remove();
                                        target.innerHTML = "";
                                    }else{
                                        target.innerHTML = "";
                                        draggable.querySelector(".attack").innerHTML = `<h3 class="attack">${playerAttackPoints - targetShieldPoints} <i class="fa-solid fa-fire"></i></h3>`;
                                        robotHealth.textContent = +robotHealth.textContent - (playerAttackPoints - targetShieldPoints)
                                    }
                                }else {
                                    robotHealth.textContent = +robotHealth.textContent - (+draggable.querySelector(".attack").textContent)
                                }
                            }


                            if(--totalAttempts <= 0){
                                currentTurn = "robot"
                                robotLogic();
                            }
                        }
                    });

                    draggable.appendChild(attackBtn);

                    position_form.remove();
                })

                document.body.appendChild(position_form)
            };
        }
        elem.classList.remove("scale-[1.1]")
    })
})

function showAttackableSlots (attackables){
    gameplayLocked = true;
    return new Promise (resolve => {
        attackables.forEach (attackable => {
            attackable.classList.add("scale-110")

            attackable.onclick = () => {

                attackables.forEach(att => {
                    att.classList.remove("scale-110")
                    att.onclick = null;
                })

                gameplayLocked = false;
                resolve(attackable)
            }
        })
    })
}

function delay (time_ms){
    return new Promise(resolve => setTimeout(() => {
        resolve()
    }, time_ms))
}

function robotDrawCard () {
    if(robotHand.length >= 5){
        robotPutInArena()
    }else{
        robotMessage("I will just draw a card !")
        robotHand.push(robotDeck.pop());
        totalAttempts--
    }
}

function robotPutInArena (){
    if(robotHand.length){
        let emptySlots = oponentArena.querySelectorAll(".slot:empty")
        if(emptySlots.length && robotDeck.length){
            robotMessage("I will put a card in the arena !");
            let putedCard = robotHand.pop()
            let position = Math.floor(Math.random() * 2) ? "attack" : "defence";
            emptySlots[Math.floor(Math.random() * emptySlots.length)].innerHTML = `
                <div class="card ${position} deck-card draggable w-full h-full perspective-midrange transition overflow-hidden" draggable="true">
                    <div class="wrapper transform-3d transition-transform duration-500 relative w-full h-full ">
                        <div class="front absolute top-0 left-0 w-full h-full backface-hidden overflow-hidden">
                            <img src="${putedCard.img}" alt="" class="card-img border-[10px] border-(--${putedCard.rarity}-card-color) w-full h-full">
                            <div class="card-rarity-container bg-(--${putedCard.rarity}-card-color)">
                                <img src="./img/rarity/${putedCard.rarity} tag.png" alt="" class="card-rarity">
                            </div>
                            <div class="absolute bottom-0 w-full h-[60px] flex justify-around items-center p-2 text-white bg-(--${putedCard.rarity}-card-color)">
                                ${
                                    position === "attack" ? 
                                    `<h3 class="attack">${putedCard.attack} <i class="fa-solid fa-fire"></i></h3>`
                                    :
                                    `<h3 class="shield">${putedCard.shield} <i class="fa-solid fa-shield-halved"></i></h3>`
                                }
                            </div>
                        </div>
                    </div>
                </div>         
            
            `;
            totalAttempts--
        }else{
            robotAttack()
        }
    }else {
        robotDrawCard();
    }
}

function robotAttack() {
    let attackingCards = oponentArena.querySelectorAll(".slot .card.attack");

    if(attackingCards.length){
        let attackSlots = playerArena.querySelectorAll(".slot:not(.slot:empty)")
        
        if(attackSlots.length){
            const targetSlot = attackSlots[Math.floor(Math.random() * attackSlots.length)];
            const attackerSlot = attackingCards[Math.floor(Math.random() * attackingCards.length)];

            targetSlot.classList.add("shadow-red-700", "scale-110")

            
            setTimeout(() => {
                targetSlot.classList.remove("shadow-red-700", "scale-110")
                
            }, 1000);

            if(targetSlot.querySelector(".card.defence")){
                let targetShieldPoints = +targetSlot.querySelector(".card.defence .shield").textContent
                let playerAttackPoints = +attackerSlot.querySelector("h3.attack").textContent
                console.log(attackerSlot.querySelector("h3.attack"))

                if(targetShieldPoints > playerAttackPoints){
                    attackSlots.innerHTML = "";
                    targetSlot.querySelector(".card.defence .shield").innerHTML = `${targetShieldPoints - playerAttackPoints} <i class="fa-solid fa-shield-halved"></i>`
                }else if(targetShieldPoints === playerAttackPoints){
                    attackerSlot.innerHTML = "";
                    targetSlot.innerHTML = "";
                }else{
                    targetSlot.innerHTML = "";
                    attackerSlot.querySelector("h3.attack").innerHTML = `${playerAttackPoints - targetShieldPoints} <i class="fa-solid fa-fire"></i>`;
                    playerHealth.textContent = +playerHealth.textContent - (playerAttackPoints - targetShieldPoints)
                }
            }else {
                playerHealth.textContent = +playerHealth.textContent - (+attackerSlot.querySelector("h3.attack").textContent)
            }
        }else {
            
            attackSlots = playerArena.querySelectorAll(".slot")
            const targetSlot = attackSlots[Math.floor(Math.random() * attackSlots.length)]
            
            playerHealth.textContent = +playerHealth.textContent - (+targetSlot.querySelector(".attack").textContent)

            targetSlot.classList.add("shadow-red-700", "scale-110")
            
            setTimeout(() => {
                targetSlot.classList.remove("shadow-red-700", "scale-110")
                
            }, 1000);
        }
        robotMessage("I am attacking you ;)")
        totalAttempts--;
    }else {
        robotDrawCard();
    }
}

function robotMessage (msg){
    let message = document.createElement("p")

    message.textContent = msg;
    robotMessages.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 10000);
}

async function robotLogic () {
    totalAttempts = 3;
    let actions = ["draw", "put in arena", "attack"]
    while(totalAttempts > 0 && currentTurn === "robot"){
        let action = actions[Math.floor(Math.random() * 3)];

        // await delay(1500)

        switch (action){
            case "draw":
                robotDrawCard();
                break;
            case "put in arena":
                robotPutInArena();
                break;
            case "attack":
                robotAttack();
                break;
            default:
        }
    }
    totalAttempts = 3;
    currentTurn = "player"
}
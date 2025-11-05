const initialData = [
    {
        id: 1,
        name: "Roger",
        img: "./img/cards/roger.png",
        rarity: "pirate-king",
        is_liked: false,
        in_cart: false
    },
    {
        id: 2,
        name: "Nika",
        img: "./img/cards/nika.png",
        rarity: "yonko",
        is_liked: false,
        in_cart: false
    },
    {
        id: 3,
        name: "White beard",
        img: "./img/cards/oyaji.png",
        rarity: "pirate-king",
        is_liked: false,
        in_cart: false
    },
    {
        id: 4,
        name: "Shanks",
        img: "./img/cards/shanks.png",
        rarity: "yonko",
        is_liked: false,
        in_cart: false
    },
    {
        id: 5,
        name: "Choper",
        img: "./img/cards/choper.png",
        rarity: "marin",
        is_liked: false,
        in_cart: false
    },
    {
        id: 6,
        name: "Zoro",
        img: "./img/cards/zoro.png",
        rarity: "pirate",
        is_liked: false,
        in_cart: false
    },
    {
        id: 7,
        name: "Kizaru",
        img: "./img/cards/Kizaru.png",
        rarity: "yonko",
        is_liked: false,
        in_cart: false
    },
    {
        id: 8,
        name: "Luffy",
        img: "./img/cards/luffy.png",
        rarity: "pirate",
        is_liked: false,
        in_cart: false
    },
    {
        id: 9,
        name: "Law",
        img: "./img/cards/law.png",
        rarity: "pirate",
        is_liked: false,
        in_cart: false
    },
    {
        id: 10,
        name: "Bepo",
        img: "./img/cards/bepo.png",
        rarity: "marin",
        is_liked: false,
        in_cart: false
    },
];

if(!localStorage.getItem("cards")){
    localStorage.setItem("cards", JSON.stringify(initialData))
    console.log("hi from localstorage")
}
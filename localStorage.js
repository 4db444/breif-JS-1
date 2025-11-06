const initialData = [
    {
        id: 1,
        name: "Roger",
        img: "./img/cards/roger.png",
        rarity: "pirate-king",
        is_liked: false,
        in_cart: false,
        price: 138,
        description: "Legendary Pirate King who discovered the One Piece and inspired a new era of pirates."
    },
    {
        id: 2,
        name: "Nika",
        img: "./img/cards/nika.png",
        rarity: "yonko",
        is_liked: false,
        in_cart: false,
        price: 120,
        description: "Mythical Sun God of freedom, symbolizing joy and liberation for all oppressed people."
    },
    {
        id: 3,
        name: "White beard",
        img: "./img/cards/oyaji.png",
        rarity: "pirate-king",
        is_liked: false,
        in_cart: false,
        price: 144,
        description: "Mighty pirate known as the Strongest Man Alive and protector of his vast family."
    },
    {
        id: 4,
        name: "Shanks",
        img: "./img/cards/shanks.png",
        rarity: "yonko",
        is_liked: false,
        in_cart: false,
        price: 110,
        description: "Charismatic Yonko who values peace, respect, and the balance of the seas."
    },
    {
        id: 5,
        name: "Choper",
        img: "./img/cards/choper.png",
        rarity: "marin",
        is_liked: false,
        in_cart: false,
        price: 56,
        description: "Adorable reindeer doctor with a big heart and a love for his crew."
    },
    {
        id: 6,
        name: "Zoro",
        img: "./img/cards/zoro.png",
        rarity: "pirate",
        is_liked: false,
        in_cart: false,
        price: 98,
        description: "Fearless swordsman striving to become the world’s greatest master of the blade."
    },
    {
        id: 7,
        name: "Kizaru",
        img: "./img/cards/Kizaru.png",
        rarity: "yonko",
        is_liked: false,
        in_cart: false,
        price: 85,
        description: "Laid-back admiral with the power of light, moving at the speed of brilliance."
    },
    {
        id: 8,
        name: "Luffy",
        img: "./img/cards/luffy.png",
        rarity: "pirate",
        is_liked: false,
        in_cart: false,
        price: 130,
        description: "Cheerful pirate captain dreaming of freedom and adventure as the next Pirate King."
    },
    {
        id: 9,
        name: "Law",
        img: "./img/cards/law.png",
        rarity: "pirate",
        is_liked: false,
        in_cart: false,
        price: 77,
        description: "Tactical pirate surgeon with the power to manipulate space through the Ope Ope no Mi."
    },
    {
        id: 10,
        name: "Bepo",
        img: "./img/cards/bepo.png",
        rarity: "marin",
        is_liked: false,
        in_cart: false,
        price: 49,
        description: "Loyal polar bear mink and crewmate of Law, known for his courage and kindness."
    },
];

if(!localStorage.getItem("cards")) localStorage.setItem("cards", JSON.stringify(initialData));

if(!localStorage.getItem("cart")) localStorage.setItem("cart", JSON.stringify([]));
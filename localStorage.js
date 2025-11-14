const initialData = [
  {
    id: 1,
    name: "Roger",
    img: "./img/cards/roger.png",
    rarity: "pirate-king",
    is_liked: false,
    in_cart: false,
    price: 138,
    description: "Legendary Pirate King who discovered the One Piece and inspired a new era of pirates.",
    attack: 9500,
    shield: 8800
  },
  {
    id: 2,
    name: "Nika",
    img: "./img/cards/nika.png",
    rarity: "yonko",
    is_liked: false,
    in_cart: false,
    price: 120,
    description: "Mythical Sun God of freedom, symbolizing joy and liberation for all oppressed people.",
    attack: 9700,
    shield: 8600
  },
  {
    id: 3,
    name: "White beard",
    img: "./img/cards/oyaji.png",
    rarity: "pirate-king",
    is_liked: false,
    in_cart: false,
    price: 144,
    description: "Mighty pirate known as the Strongest Man Alive and protector of his vast family.",
    attack: 9800,
    shield: 9000
  },
  {
    id: 4,
    name: "Shanks",
    img: "./img/cards/shanks.png",
    rarity: "yonko",
    is_liked: false,
    in_cart: false,
    price: 110,
    description: "Charismatic Yonko who values peace, respect, and the balance of the seas.",
    attack: 9000,
    shield: 8900
  },
  {
    id: 5,
    name: "Choper",
    img: "./img/cards/choper.png",
    rarity: "marin",
    is_liked: false,
    in_cart: false,
    price: 56,
    description: "Adorable reindeer doctor with a big heart and a love for his crew.",
    attack: 3100,
    shield: 5000
  },
  {
    id: 6,
    name: "Zoro",
    img: "./img/cards/zoro.png",
    rarity: "pirate",
    is_liked: false,
    in_cart: false,
    price: 98,
    description: "Fearless swordsman striving to become the world’s greatest master of the blade.",
    attack: 8800,
    shield: 8200
  },
  {
    id: 7,
    name: "Kizaru",
    img: "./img/cards/kizaru.png",
    rarity: "yonko",
    is_liked: false,
    in_cart: false,
    price: 85,
    description: "Laid-back admiral with the power of light, moving at the speed of brilliance.",
    attack: 8900,
    shield: 8700
  },
  {
    id: 8,
    name: "Luffy",
    img: "./img/cards/luffy.png",
    rarity: "pirate",
    is_liked: false,
    in_cart: false,
    price: 130,
    description: "Cheerful pirate captain dreaming of freedom and adventure as the next Pirate King.",
    attack: 9300,
    shield: 8500
  },
  {
    id: 9,
    name: "Law",
    img: "./img/cards/law.png",
    rarity: "pirate",
    is_liked: false,
    in_cart: false,
    price: 77,
    description: "Tactical pirate surgeon with the power to manipulate space through the Ope Ope no Mi.",
    attack: 8400,
    shield: 8100
  },
  {
    id: 10,
    name: "Bepo",
    img: "./img/cards/bepo.png",
    rarity: "marin",
    is_liked: false,
    in_cart: false,
    price: 49,
    description: "Loyal polar bear mink and crewmate of Law, known for his courage and kindness.",
    attack: 4200,
    shield: 5800
  }
];

if(!localStorage.getItem("cards")) localStorage.setItem("cards", JSON.stringify(initialData));

if(!localStorage.getItem("cart")) localStorage.setItem("cart", JSON.stringify([]));

if(!localStorage.getItem("myDeck")) localStorage.setItem("myDeck", JSON.stringify([]));
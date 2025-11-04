const slides = document.querySelectorAll(".slide")
let current_slide = 1;

const hero_interval = setInterval(() => {
    slides.forEach((slide, index) => {

        if(index === current_slide) {
            slide.classList.remove("opacity-0")
            slide.classList.add("opacity-100")
        }else {
            slide.classList.add("opacity-0")
            slide.classList.remove("opacity-100")
        }
    })
    current_slide = (current_slide + 1) % 4
}, 7000);
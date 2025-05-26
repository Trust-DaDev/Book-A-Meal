const discountImg = document.getElementById("discount-img");
let length = "1200"
const discountShop = document.getElementById("discount-shop")
window.addEventListener("scroll", event =>{
    if(`${window.scrollTop} = length`){
        discountImg.style.transition="2.5s"
        discountShop.style.opacity="1";
        discountShop.style.transition="2.5s"
        discountImg.style.opacity="1";
    }
}, { passive: true })
    

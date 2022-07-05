/*Variables*/
const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productDOM = document.querySelector(".product-center");

let cart = [];

const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".cart-content");
/*imports*/
import { productsData } from "./products.js";

/*Classes*/
/**get Product**/
class Products {
  getProducts() {
    return productsData;
  }
}
/**display Product **/
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `<div class="product">
          <div class="product-image">
            <img src=${item.imageUrl} alt="desk" />
          </div>
          <div class="product-desc">
            <div class="product-price">${item.price}$</div>
            <div class="product-title">
              <span>${item.title}</span>
            </div>
          </div>
          <div class="product-btn">
            <button class="btn btn-cart" data-id="${item.id}">add To Cart</button>
          </div>
        </div> `;
      productDOM.innerHTML = result;
    });
  }
  getAddToCart() {
    const addToCartsBtns = document.querySelectorAll(".btn-cart");
    const buttons = [...addToCartsBtns];
    buttons.forEach((btn) => {
      const id = btn.dataset.id;
         const isInCart = cart.find((p) => p.id === parseInt(id));
         if (isInCart) {
           btn.innerText = "In Cart";
           console.log(btn.innerText);
           btn.disable = true;
         }
      btn.addEventListener("click", (event) => {
        event.target.innerText = "In Cart";
        event.target.disable = true;
        console.log(event.target);
        const addedProduct = { ...Storage.getProduct(id), quantity: 1 };
        cart = [...cart, addedProduct];
        Storage.saveCart(cart);
        this.setCartValue(cart);
        this.addCartItem(addedProduct);
      });
   
    });
  }
  setCartValue(cart) {
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.quantity;
      return acc + curr.quantity * curr.price;
    }, 0);
    cartTotal.innerText = `total price : ${totalPrice.toFixed(2)} $`;
    cartItems.innerText = tempCartItems;
  }
  addCartItem(cartItem) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = ` <img class="cart-item-img" src="${cartItem.imageUrl}"/>
            <div class="cart-item-desc">
              <h4>${cartItem.title}</h4>
              <h5>$ ${cartItem.price}</h5>
            </div>
            <div class="cart-item-conteoller">
              <i class="fas fa-chevron-up"></i>
              <p>${cartItem.quantity}</p>
              <i class="fas fa-chevron-down"></i>
            </div>
            <i class="fa-solid fa-trash"></i>`;
    cartContent.appendChild(div);
  }
  setUpApp() {
    cart = Storage.getCart() || [];
    cart.forEach((cartItem) => this.addCartItem(cartItem));
    this.setCartValue(cart);
  }
}
/* *Storage **/
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === parseInt(id));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return JSON.parse(localStorage.getItem("cart"));
  }
}
/*Events*/
document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  ui.displayProducts(productsData);
  ui.setUpApp();
  ui.getAddToCart();
  Storage.saveProducts(productsData);
});
cartBtn.addEventListener("click", showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);

/*Functions*/
function showModalFunction() {
  cartModal.style.opacity = "1";
  backDrop.style.display = "block";
  cartModal.style.top = "20%";
}
function closeModalFunction() {
  cartModal.style.opacity = "0";
  backDrop.style.display = "none";
  cartModal.style.top = "-100%";
}

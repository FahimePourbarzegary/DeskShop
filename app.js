/*Variables*/
const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productDOM = document.querySelector(".product-center");
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
}
/* *Storage **/
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
/*Events*/
document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const productsData = products.getProducts();
  const ui = new UI();
  ui.displayProducts(productsData);
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

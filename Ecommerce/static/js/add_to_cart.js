document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".btn-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");

      fetch(`/cart/${productId}/`, {
        method: "GET",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Cart updated:", data.cart);
            alert("Product added to cart!");
          }
        })
        .catch((error) => console.error("Error:", error));
    });
  });
});

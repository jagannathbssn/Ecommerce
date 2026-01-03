const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
const qtyInput = document.getElementById("quantity");

const price = parseFloat(document.getElementById("price").innerText);
const total = document.getElementById("total");

const formQty = document.getElementById("form_quantity");
const formTotal = document.getElementById("form_total");

const MAX_QTY = 10;

function updateTotal() {
  let qty = parseInt(qtyInput.value);

  if (isNaN(qty) || qty < 1) qty = 1;
  if (qty > MAX_QTY) qty = MAX_QTY;

  qtyInput.value = qty;

  const totalPrice = price * qty;
  total.innerText = totalPrice;

  formQty.value = qty;
  formTotal.value = totalPrice;
}

minusBtn.addEventListener("click", () => {
  let qty = parseInt(qtyInput.value) || 1;
  if (qty > 1) {
    qtyInput.value = qty - 1;
    updateTotal();
  }
});

plusBtn.addEventListener("click", () => {
  let qty = parseInt(qtyInput.value) || 1;
  if (qty < MAX_QTY) {
    qtyInput.value = qty + 1;
    updateTotal();
  }
});

qtyInput.addEventListener("input", updateTotal);

updateTotal();

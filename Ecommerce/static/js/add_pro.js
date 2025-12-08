let s1 = document.getElementById("subtype");
let s2 = document.getElementById("o_pty");
let s3 = document.getElementById("stype");
let opt = document.getElementById("type");

document.addEventListener("DOMContentLoaded", () => {
  s1.style.display = "none";
  s2.style.display = "none";
});
opt.addEventListener("change", () => {
  s2.style.display = "none";
  let te = opt.value;
  for (let i of s3.options) {
    if (i.className === te) {
      i.style.display = "block";
    } else {
      i.style.display = "none";
    }
  }
  if (te === "") {
    s1.style.display = "none";
    s2.style.display = "none";
  } else if (te === "Others") {
    s1.style.display = "none";
    s2.style.display = "block";
  } else {
    s1.style.display = "block";
    s2.style.display = "none";
  }
});

s3.addEventListener("change", () => {
  if (s3.value === "Others") {
    s2.style.display = "block";
  } else {
    s2.style.display = "none";
  }
});

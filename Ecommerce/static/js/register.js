let di = document.getElementById("com_name");
di.style.display = "none";

let select = document.getElementById("type");
select.addEventListener("change", () => {
  let val = select.value;
  if (val === "Vendor") {
    di.style.display = "block";
  } else {
    di.style.display = "none";
  }
});

let re_enter = document.getElementById("repassword");
re_enter.addEventListener("input", () => {
  let p = document.getElementById("password").value;
  let rp = document.getElementById("repassword").value;
  let p_msg = document.getElementById("p_msg");
  let s_but = document.getElementById("sub");
  if (p !== rp) {
    p_msg.innerText = "the password should match with above one";
    p_msg.style.color = "red";
    s_but.disabled = true;
  } else if (p === rp) {
    p_msg.innerText = "the password matched";
    p_msg.style.color = "green";
    s_but.disabled = false;
  }
});

let rform = document.getElementById("rform");
rform.addEventListener("submit", (e) => {
  let name = document.getElementById("cname").value;
  let adr = document.getElementById("com_addr").value;
  let p = document.getElementById("mg");
  if (select.value === "vendor") {
    if (name.trim() === "" || adr.trim() === "") {
      e.preventDefault();
      alert("please check");
      p.innerText = "Please fill the details ";
      p.style.color = "red";
    }
  }
});

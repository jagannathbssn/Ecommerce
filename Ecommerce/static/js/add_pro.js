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

let relate = 0;
function add_key() {
  let a1 = document.getElementById("key_point");
  if (a1.value.trim() === "") {
    document.getElementById("err").innerText = "*please enter a key point";
  } else {
    document.getElementById("err").innerText = "";
    let a2 = document.getElementById("key_points");
    let li = document.createElement("li");
    let rel = 0;

    const inp = document.createElement("input");
    inp.value = a1.value;
    inp.readOnly = true;
    inp.className = "key_pt_cls";

    const save_edit = document.createElement("button");
    save_edit.textContent = "Edit";
    save_edit.addEventListener("click", () => {
      if (rel === 0) {
        rel++;
        save_edit.textContent = "Save";
        inp.readOnly = false;
        relate++;
      } else if (rel === 1) {
        rel--;
        save_edit.textContent = "Edit";
        inp.readOnly = true;
        relate--;
      }
    });

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      a2.removeChild(li);
      if (rel === 1) {
        relate--;
      }
    });

    li.appendChild(inp);
    li.appendChild(save_edit);
    li.appendChild(del);
    a2.appendChild(li);
    a1.value = "";
  }
}

document.querySelector("#key_point").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#ad_key_po").click();
  }
});

let bit_che = -1;
function add_spec() {
  let b1 = document.getElementById("spec_fea");
  let b2 = document.getElementById("spec_val");
  if (b1.value.trim() === "" || b2.value.trim() === "") {
    document.getElementById("spec_err").innerText =
      "* please fill both Feature and Value.";
  } else {
    bit_che = 0;
    document.getElementById("spec_err").innerText = "";
    let b3_list = document.getElementById("spec_lists");
    let b4_li = document.createElement("li");

    const feat = document.createElement("input");
    feat.value = b1.value.trim();
    feat.readOnly = true;

    const val = document.createElement("input");
    val.value = b2.value.trim();
    val.readOnly = true;

    let bit = 0;
    const spec_save_edit = document.createElement("button");
    spec_save_edit.textContent = "Edit";
    spec_save_edit.addEventListener("click", () => {
      if (bit === 0) {
        bit++;
        feat.readOnly = false;
        val.readOnly = false;
        spec_save_edit.textContent = "Save";
        bit_che++;
      } else if (bit === 1) {
        bit--;
        feat.readOnly = true;
        val.readOnly = true;
        spec_save_edit.textContent = "Edit";
        bit_che--;
      }
    });

    const spec_del = document.createElement("button");
    spec_del.textContent = "Delete";
    spec_del.addEventListener("click", () => {
      b3_list.removeChild(b4_li);
      if (bit === 1) {
        bit_che--;
      }
    });

    b4_li.appendChild(feat);
    b4_li.appendChild(document.createTextNode(" : "));
    b4_li.appendChild(val);
    b4_li.appendChild(spec_save_edit);
    b4_li.appendChild(spec_del);
    b3_list.appendChild(b4_li);

    b1.value = "";
    b2.value = "";
  }
}

document.getElementById("pho").addEventListener("change", function (e) {
  let img = document.getElementById("preview");
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
});

document.getElementById("prod_add").addEventListener("submit", function (e) {
  e.preventDefault();
  if (bit_che === -1) {
    document.getElementById("spec_err").innerText =
      "*Please enter atleast 1 Feature";
    return;
  } else if (bit_che === 0) {
  } else {
    document.getElementById("spec_err").innerText =
      "*Please save the Feature data";
    return;
  }

  if (relate !== 0) {
    document.getElementById("err").innerText =
      "* please save the data in key points";
    return;
  }

  let temp_spec_json = {};
  let sp_json = document.getElementById("specs");
  let sp_li = document.querySelectorAll("#spec_lists li");
  sp_li.forEach((item) => {
    let te = item.getElementsByTagName("input");
    let te1 = te[0].value.trim();
    let te2 = te[1].value.trim();
    temp_spec_json[te1] = te2;
  });
  sp_json.value = JSON.stringify(temp_spec_json);

  let keyp = [];
  let kp_arr = document.getElementById("keyp");
  let kp_li = document.querySelectorAll("#key_points li");
  kp_li.forEach((item) => {
    let te = item.getElementsByTagName("input");
    let te1 = te[0].value.trim();
    keyp.push(te1);
  });
  kp_arr.value = JSON.stringify(keyp);

  e.target.submit();
});

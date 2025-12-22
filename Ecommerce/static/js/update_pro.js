let ind = 0;
let up_sub = document.getElementById("sub_up");
let upmsg = document.getElementById("msg1");

document.addEventListener("DOMContentLoaded", () => {
  const sp_data = JSON.parse(document.getElementById("sp_json").textContent);
  const ke_data = JSON.parse(document.getElementById("ke_json").textContent);

  document.getElementById("editDiv").style.display = "none";

  let splist = document.getElementById("spec_lists");
  let sperr = document.getElementById("spec_err");

  Object.entries(sp_data).forEach(([i, j]) => {
    const li = document.createElement("li");
    let sp_ind = 0;

    const fe = document.createElement("input");
    fe.value = i;
    fe.readOnly = true;

    const va = document.createElement("input");
    va.value = j;
    va.readOnly = true;

    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => {
      if (sp_ind === 0) {
        sp_ind++;
        fe.readOnly = false;
        va.readOnly = false;
        edit.textContent = "Save";
        man_dis();
      } else {
        if (fe.value.trim() === "" || va.value.trim() === "") {
          sperr.innerText = "*please enter valid inputs";
          return;
        }
        sperr.innerText = "";
        sp_ind--;
        fe.readOnly = true;
        va.readOnly = true;
        edit.textContent = "Edit";
        man_en();
      }
    });

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      splist.removeChild(li);
      if (ind === 1) {
        man_dis();
      }
    });

    li.appendChild(fe);
    li.appendChild(document.createTextNode(" : "));
    li.appendChild(va);
    li.appendChild(edit);
    li.appendChild(del);
    splist.appendChild(li);
  });

  const kelist = document.getElementById("key_points");
  const keerr = document.getElementById("err");

  ke_data.forEach((i) => {
    const li = document.createElement("li");
    let ke_ind = 0;

    const ke = document.createElement("input");
    ke.value = i;
    ke.readOnly = true;

    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "Edit";
    edit.addEventListener("click", () => {
      if (ke_ind === 0) {
        ke_ind++;
        ke.readOnly = false;
        edit.textContent = "Save";
        man_dis();
      } else {
        if (ke.value.trim() === "") {
          keerr.innerText = "*please enter valid inputs";
          return;
        }
        keerr.innerText = "";
        ke_ind--;
        ke.readOnly = true;
        edit.textContent = "Edit";
        man_en();
      }
    });

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      kelist.removeChild(li);
      if (ind == 1) {
        man_en();
      }
    });

    li.appendChild(ke);
    li.appendChild(edit);
    li.appendChild(del);
    kelist.appendChild(li);
  });
});

function chan(but) {
  let inp = but.previousElementSibling;
  if (inp.readOnly) {
    inp.readOnly = false;
    but.value = "Save";
    inp.focus();
    man_dis();
  } else {
    const msg = but.nextElementSibling;
    if (inp.value.trim() === "") {
      msg.innerText = "*please enter appropriate value";
      return;
    }
    msg.innerText = "";
    inp.readOnly = true;
    but.value = "Edit";
    man_en();
  }
}

function man_dis() {
  ind++;
  up_sub.disabled = true;
  upmsg.innerText = "*please save all the update fields";
}

function man_en() {
  ind--;
  if (ind === 0) {
    up_sub.disabled = false;
    upmsg.innerText = "";
  }
}

const newPhotoInput = document.getElementById("new_photo");
const previewImage = document.getElementById("preview_image");

newPhotoInput.addEventListener("change", () => {
  const file = newPhotoInput.files[0];
  if (file) {
    previewImage.src = URL.createObjectURL(file);
    previewImage.style.display = "block";
  } else {
    previewImage.src = "";
    previewImage.style.display = "none";
  }
});

let dis = document.getElementById("displayDiv");
let edt = document.getElementById("editDiv");
let ty_ind = 0;

let typ_edit = document.getElementById("typeEditBtn");
typ_edit.addEventListener("click", () => {
  if (ty_ind === 0) {
    ty_ind++;
    dis.style.display = "none";
    edt.style.display = "block";
    document.getElementById("o_stype").value = "";
    if (document.getElementById("type").value.trim() === "Others") {
      document.getElementById("o_pty").style.display = "block";
      document.getElementById("subtype").style.display = "none";
    } else {
      document.getElementById("o_pty").style.display = "none";
      document.getElementById("subtype").style.display = "block";
    }
    typ_edit.value = "Save";
    man_dis();
  } else {
    let ty_va = document.getElementById("type").value.trim();
    let sty_va = document.getElementById("stype").value.trim();
    let o_va = document.getElementById("o_stype").value.trim();
    let ms = document.getElementById("msg2");
    console.log(ty_va);
    if (ty_va === "") {
      ms.innerText = "*please enter valid input";
      return;
    }
    if (ty_va === "Others" || sty_va === "Others") {
      if (o_va === "") {
        ms.innerText = "*please enter specific type of the product";
        return;
      }
    }
    if (ty_va !== "" && ty_va !== "Others" && sty_va === "") {
      ms.innerText = "*please enter valid input";
      return;
    }
    ms.innerText = "";
    ty_ind--;
    dis.style.display = "block";
    edt.style.display = "none";
    document.getElementById("dispType").value = ty_va;
    let te = document.getElementById("dispSubType");
    if (sty_va === "Others" || ty_va === "Others") {
      te.value = o_va;
    } else {
      te.value = sty_va;
    }
    typ_edit.value = "Edit";
    man_en();
  }
});

let type1 = document.getElementById("type").value.trim();
let otp = document.querySelectorAll("#stype option");
otp.forEach((element) => {
  if (element.className === type1) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
});

let ty = document.getElementById("type");
ty.addEventListener("change", () => {
  let type1 = document.getElementById("type").value.trim();
  let otp = document.querySelectorAll("#stype option");
  otp.forEach((element) => {
    if (element.className === type1) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
  let type = ty.value.trim();
  document.getElementById("stype").value = "";
  if (type !== "Others") {
    document.getElementById("o_pty").style.display = "none";
    document.getElementById("subtype").style.display = "block";
  } else {
    document.getElementById("o_pty").style.display = "block";
    document.getElementById("subtype").style.display = "none";
  }
});

let sty = document.getElementById("stype");
sty.addEventListener("change", () => {
  let stype = sty.value.trim();
  if (stype === "") {
    return;
  } else {
    if (stype === "Others") {
      let se = document.getElementById("o_pty");
      se.style.display = "block";
    }
  }
});

function add_spec() {
  let b1 = document.getElementById("spec_fea");
  let b2 = document.getElementById("spec_val");
  if (b1.value.trim() === "" || b2.value.trim() === "") {
    document.getElementById("spec_err").innerText =
      "* please fill both Feature and Value.";
  } else {
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
    spec_save_edit.type = "button";
    spec_save_edit.textContent = "Edit";
    spec_save_edit.addEventListener("click", () => {
      if (bit === 0) {
        bit++;
        feat.readOnly = false;
        val.readOnly = false;
        spec_save_edit.textContent = "Save";
        man_dis();
      } else if (bit === 1) {
        if (feat.value.trim() === "" || val.value.trim() === "") {
          document.getElementById("spec_err").innerText =
            "*Please check values shouldn't be empty";
          return;
        }
        document.getElementById("spec_err").innerText = "";
        bit--;
        feat.readOnly = true;
        val.readOnly = true;
        spec_save_edit.textContent = "Edit";
        man_en();
      }
    });

    const spec_del = document.createElement("button");
    spec_del.type = "button";
    spec_del.textContent = "Delete";
    spec_del.addEventListener("click", () => {
      b3_list.removeChild(b4_li);
      if (bit === 1) {
        bit_che--;
        man_en();
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

function fun(bt, id) {
  let ele = document.getElementById(id);
  if (ele.readOnly) {
    ele.readOnly = false;
    bt.value = "Save";
    man_dis();
  } else {
    ele.readOnly = true;
    bt.value = "Edit";
    man_en();
  }
}

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
    save_edit.type = "button";
    save_edit.textContent = "Edit";
    save_edit.addEventListener("click", () => {
      if (rel === 0) {
        rel++;
        save_edit.textContent = "Save";
        inp.readOnly = false;
        man_dis();
      } else if (rel === 1) {
        if (inp.value.trim() === "") {
          document.getElementById("err").innerText =
            "*please check the keypoint";
          return;
        }
        document.getElementById("err").innerText = "";
        rel--;
        save_edit.textContent = "Edit";
        inp.readOnly = true;
        man_en();
      }
    });

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      a2.removeChild(li);
      if (rel === 1) {
        man_en();
      }
    });

    li.appendChild(inp);
    li.appendChild(save_edit);
    li.appendChild(del);
    a2.appendChild(li);
    a1.value = "";
  }
}

let form = document.getElementById("upt_form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fieldsToCopy = [
    { re: "pname", hi: "pname1" },
    { re: "price", hi: "price1" },
    { re: "stock", hi: "stock1" },
    { re: "descp", hi: "descp1" },
    { re: "dispType", hi: "dispType1" },
    { re: "dispSubType", hi: "dispSubType1" },
  ];

  fieldsToCopy.forEach((f) => {
    const re_ele = document.getElementById(f.re);
    const hi_ele = document.getElementById(f.hi);
    hi_ele.value = re_ele.value.trim();
  });

  let sp = {};
  let sp_li = document.querySelectorAll("#spec_lists li");
  sp_li.forEach((element) => {
    let te = element.getElementsByTagName("input");
    let fe = te[0].value.trim();
    let va = te[1].value.trim();
    sp[fe] = va;
  });
  let spe = document.getElementById("specs");
  spe.value = JSON.stringify(sp);

  let ke = [];
  let ke_li = document.querySelectorAll("#key_points li");
  ke_li.forEach((element) => {
    let te = element.getElementsByTagName("input");
    let te1 = te[0].value.trim();
    ke.push(te1);
  });
  let kep = document.getElementById("keyp");
  kep.value = JSON.stringify(ke);

  form.submit();
});

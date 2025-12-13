let ind = 0;
let up_sub = document.getElementById("sub_up");
let upmsg = document.getElementById("msg1");

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("editDiv").style.display = "none";

  const sp_data = JSON.parse(document.getElementById("sp_json").textContent);
  const ke_data = JSON.parse(document.getElementById("ke_json").textContent);

  ke_data.forEach((element) => {
    let ke_ind = 0;
    let list = document.getElementById("key_points");

    let li = document.createElement("li");

    let inp = document.createElement("input");
    inp.value = element;
    inp.readOnly = true;

    let es_but = document.createElement("button");
    es_but.textContent = "Edit";
    es_but.addEventListener("click", () => {
      if (ke_ind === 0) {
        es_but.textContent = "Save";
        inp.readOnly = false;
        ke_ind++;
        man_dis();
      } else {
        if (inp.value.trim() === "") {
          document.getElementById("err ").innerText =
            "*please enter some value to save";
          return;
        }
        document.getElementById("err").innerText = "";
        es_but.textContent = "Edit";
        inp.readOnly = false;
        ke_ind--;
        man_en();
      }
    });

    let del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      list.removeChild(li);
      if (ke_ind == 1) man_en();
    });

    li.appendChild(inp);
    li.appendChild(es_but);
    li.appendChild(del);
    list.appendChild(li);
  });

  Object.entries(sp_data).forEach(([i, j]) => {
    let sp_ind = 0;
    let splist = document.getElementById("spec_lists");
    let sperr = document.getElementById("spec_err");

    let li = document.createElement("li");

    let fe_inp = document.createElement("input");
    fe_inp.value = i;
    fe_inp.readOnly = true;

    let val_inp = document.createElement("input");
    val_inp.value = j;
    val_inp.readOnly = true;

    let se_but = document.createElement("button");
    se_but.textContent = "Edit";
    se_but.addEventListener("click", () => {
      if (sp_ind === 0) {
        se_but.textContent = "Save";
        fe_inp.readOnly = false;
        val_inp.readOnly = false;
        sp_ind++;
        man_dis();
      } else {
        if (fe_inp.value.trim() === "" || val_inp.value.trim() === "") {
          sperr.innerText = "*please enter the value to save";
          return;
        }
        sperr.innerText = "";
        se_but.textContent = "Edit";
        fe_inp.readOnly = true;
        val_inp.readOnly = true;
        sp_ind--;
        man_en();
      }
    });

    let del = document.createElement("button");
    del.textContent = "delete";
    del.addEventListener("click", () => {
      splist.removeChild(li);
      if (sp_ind === 1) man_en();
    });

    li.appendChild(fe_inp);
    li.appendChild(document.createTextNode(" : "));
    li.appendChild(val_inp);
    li.appendChild(se_but);
    li.appendChild(del);
    splist.appendChild(li);
  });
});

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

function handleKeyPress(event, input) {
  if (event.key == "Enter") {
    const btn = input.nextElementSibling;
    btn.click();
  }
}

function fun(but, id) {
  let inp = document.getElementById(id);
  if (inp.readOnly == true) {
    inp.readOnly = false;
    but.value = "Save";
    inp.focus();
  } else {
    inp.readOnly = true;
    but.value = "Edit";
  }
}

let ty_but = document.getElementById("typeEditBtn");
ty_but.addEventListener("click", () => {
  let eddiv = document.getElementById("editDiv");
  let disdiv = document.getElementById("displayDiv");
  let typeSelect = document.getElementById("type");
  let subTypeSelect = document.getElementById("stype");
  let o_pty = document.getElementById("o_pty");

  let dispType = document.getElementById("dispType");
  let dispSubType = document.getElementById("dispSubType");

  let selectedType = typeSelect.value;

  for (let i of subTypeSelect.options) {
    i.style.display =
      i.className === selectedType || i.value === "" ? "block" : "none";
  }

  if (subTypeSelect.value === "") {
    subTypeSelect.value = "Others";
  }

  if (ty_but.value === "Edit") {
    eddiv.style.display = "block";
    disdiv.style.display = "none";
    ty_but.value = "Save";
    man_dis();
  } else {
    if (typeSelect.value === "Others" || subTypeSelect.value === "Others") {
      o_pty.style.display = "block";
      eddiv.style.display = "block";
      disdiv.style.display = "none";
    } else {
      o_pty.style.display = "none";
      eddiv.style.display = "none";
      disdiv.style.display = "block";

      dispType.value = typeSelect.value;
      dispSubType.value = subTypeSelect.value;
    }
    ty_but.value = "Edit";
    man_en();
  }
});

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

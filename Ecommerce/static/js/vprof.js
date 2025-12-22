const editBtn = document.getElementById("ed_but");
const saveBtn = document.getElementById("sv_but");
const newPhotoDiv = document.getElementById("new_photo");

editBtn.addEventListener("click", () => {
  const fields = document.querySelectorAll("input, textarea");
  fields.forEach((field) => {
    if (field.type !== "button" && field.type !== "submit") {
      field.removeAttribute("readonly");
    }
  });

  editBtn.style.display = "none";
  saveBtn.style.display = "block";
  newPhotoDiv.style.display = "block";
});

document.getElementById("photo_input").addEventListener("change", function (e) {
  let img = document.getElementById("preview");
  if (e.target.files && e.target.files[0]) {
    img.src = URL.createObjectURL(e.target.files[0]);
    img.style.display = "block";
  }
});

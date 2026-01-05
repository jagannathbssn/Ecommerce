document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("ed_but");
  const saveBtn = document.getElementById("sv_but");
  const newPhotoDiv = document.getElementById("new_photo");
  const photoInput = document.getElementById("photo_input");
  const preview = document.getElementById("preview");

  const editableFields = ["email", "ph_no", "location", "addr"];

  // Enable edit mode
  editBtn.addEventListener("click", function () {
    editableFields.forEach((id) => {
      const field = document.getElementById(id);
      if (field) field.removeAttribute("readonly");
    });

    newPhotoDiv.style.display = "block";
    saveBtn.style.display = "inline-block";
    editBtn.style.display = "none";
  });

  // Image preview
  if (photoInput) {
    photoInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

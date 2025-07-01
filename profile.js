
if (localStorage.getItem("user") === null) {
  window.location.href = './login.html';
}
document.getElementById("displayName").innerText = localStorage.getItem("name") ;
document.getElementById("image1212").src = localStorage.getItem("image") || "";
document.getElementById("image12").src = localStorage.getItem("image") || "";

document.getElementById("fileInput").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;


      document.getElementById("image1212").src = imageData;
      document.getElementById("image12").src = imageData;

      localStorage.setItem("image", imageData);
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const newName = prompt("Enter new name:", document.getElementById("name").value);
  const newEmail = prompt("Enter new email:", document.getElementById("email").value);
  const newId = prompt("Enter new ID:", document.getElementById("idNumber").value);

  if (newName) {
    document.getElementById("name").value = newName;
    localStorage.setItem("name", newName);
    document.getElementById("name").innerText = newName; // update top name too
  }

  if (newEmail) {
    document.getElementById("email").value = newEmail;
    localStorage.setItem("email", newEmail);
  }

  if (newId) {
    document.getElementById("idNumber").value = newId;
    localStorage.setItem("idNumber", newId);
  }

  alert("Profile updated successfully!");
});


document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("user");
  localStorage.clear();
  alert("✅ Logged out");
  window.location.href = "./login.html";
});
const nameElement = document.getElementById("name");
if (nameElement) {
  nameElement.textContent = localStorage.getItem("name") || "User";
}
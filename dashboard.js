if (localStorage.getItem("user") === null) {
  window.location.href = './login.html';
} else {
  document.getElementById("name").innerText = localStorage.getItem("name");
  document.getElementById("image").src = localStorage.getItem("image");
  console.log("image")
}
// ✅ Supabase Setup
const supabaseClient = supabase.createClient(
  "https://vxqbevfrmosblmrnjkfb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cWJldmZybW9zYmxtcm5qa2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjI2ODAsImV4cCI6MjA2NjkzODY4MH0.S1FZdmlOy5CuyI377URl8oXVw21xqaBSgRzTIxcCEZU"
);

// ✅ DOM Elements
const addBtn = document.querySelector("button");
const taskInput = document.querySelector("#task");
const descInput = document.querySelector("#description");
const tableBody = document.getElementById("tasks");
const progressCircle = document.querySelector(".circle");

// ✅ Progress Update
function updateProgress() {
  const checkboxes = document.querySelectorAll("tbody input[type='checkbox']");
  const total = checkboxes.length;
  const checked = [...checkboxes].filter(cb => cb.checked).length;
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  progressCircle.textContent = percent + "%";
}

// ✅ Fetch Data from Supabase
async function fetchData() {
  const { data, error } = await supabaseClient
    .from('crud-opreation')
    .select();

  if (error) {
    console.error("❌ Fetch error:", error.message);
    return;
  }

  tableBody.innerHTML = ""; // clear existing

  data.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td><input type="checkbox" /></td>
    `;

    // ✅ Bind checkbox event
    const checkbox = row.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", updateProgress);

    tableBody.appendChild(row);
  });

  updateProgress(); // update circle
}

// ✅ Add Task Button
addBtn.addEventListener("click", async () => {
  const title = taskInput.value.trim();
  const desc = descInput.value.trim();

  if (!title || !desc) {
    alert("⚠️ Please enter both title and description.");
    return;
  }

  const { error } = await supabaseClient
    .from("crud-opreation")
    .insert([{ name: title, description: desc }]);

  if (error) {
    alert("❌ Failed to save: " + error.message);
    return;
  }

  taskInput.value = "";
  descInput.value = "";
  fetchData(); // reload table without refresh
});

// ✅ On Load


document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("user");
  window.location.href = "./index.html";
  localStorage.clear()
  alert("✅Logged out")
  
  window.location.href = "./login.html";
});

const userData = JSON.parse(localStorage.getItem("userData")) || {};

// Show image
const imageElement = document.getElementById("image");
if (userData.image && imageElement) {
  imageElement.src = userData.image;
}

// Show name (optional)
const nameElement = document.getElementById("name");
if (userData.username && nameElement) {
  nameElement.textContent = userData.username;
}

fetchData();

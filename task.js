// ✅ Redirect if user not logged in
if (localStorage.getItem("user") === null) {
  window.location.href = "../../login.html";
} else {
  document.getElementById("name").innerText = localStorage.getItem("name");
  document.getElementById("image").src = localStorage.getItem("image");
}

// ✅ Supabase Init
const supabaseClient = supabase.createClient(
  "https://vxqbevfrmosblmrnjkfb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cWJldmZybW9zYmxtcm5qa2ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjI2ODAsImV4cCI6MjA2NjkzODY4MH0.S1FZdmlOy5CuyI377URl8oXVw21xqaBSgRzTIxcCEZU"
);

const tableBody = document.getElementById("tasks");

// ✅ Modal helper variables/functions
let currentTaskId = null;

function openUpdateModal(id, title, description) {
  currentTaskId = id;
  document.getElementById("updateTitle").value = title;
  document.getElementById("updateDescription").value = description;
  document.getElementById("updateModal").style.display = "flex";
}

function closeUpdateModal() {
  document.getElementById("updateModal").style.display = "none";
}

function updateTodo() {
  const updatedTitle = document.getElementById("updateTitle").value.trim();
  const updatedDescription = document.getElementById("updateDescription").value.trim();

  if (!updatedTitle || !updatedDescription) {
    alert("Please enter both title and description.");
    return;
  }

  supabaseClient
    .from("crud-opreation")
    .update({
      name: updatedTitle,
      description: updatedDescription,
    })
    .eq("id", currentTaskId)
    .then(() => {
      closeUpdateModal();
      fetchData();
    });
}

// ✅ Fetch and show tasks
async function fetchData() {
  const { data, error } = await supabaseClient.from('crud-opreation').select();

  if (error) {
    console.error("Error fetching data:", error.message);
    return;
  }

  tableBody.innerHTML = "";

  data.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.id}</td>
      <td>${task.name}</td>
      <td>${task.description}</td>
      <td>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </td>
    `;

    // ✅ Modal-based edit
    row.querySelector(".edit-btn").addEventListener("click", () => {
      openUpdateModal(task.id, task.name, task.description);
    });

    // ❌ Delete (same as before)
    row.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("Are you sure to delete this task?")) {
        supabaseClient
          .from("crud-opreation")
          .delete()
          .eq("id", task.id)
          .then(() => fetchData());
      }
    });

    tableBody.appendChild(row);
  });
}

// ✅ Logout
document.getElementById("logout").addEventListener("click", function () {
  localStorage.clear();
  alert("✅Logged out");
  window.location.href = "../../login.html";
});

// ✅ Run on page load
fetchData();

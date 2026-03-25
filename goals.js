const user = JSON.parse(localStorage.getItem("fittrackCurrentUser"));

if (!user || !user.isLoggedIn) {
  window.location.href = "index.html";
}
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// DATA (OBJECTS)
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// DISPLAY
function displayGoals() {
  const list = document.getElementById("goalList");
  list.innerHTML = "";

  goals.forEach((goal, index) => {
    list.innerHTML += `
      <li class="${goal.completed ? "completed" : ""}">
        ${goal.text}
        <div class="btns">
          <button class="complete-btn" onclick="toggleComplete(${index})">✔</button>
          <button class="delete-btn" onclick="deleteGoal(${index})">X</button>
        </div>
      </li>
    `;
  });
}

// ADD
function addGoal() {
  const input = document.getElementById("goalInput");

  if (input.value.trim() === "") return;

  const goal = {
    text: input.value,
    completed: false
  };

  goals.push(goal);
  localStorage.setItem("goals", JSON.stringify(goals));

  input.value = "";
  displayGoals();
}

// COMPLETE
function toggleComplete(index) {
  goals[index].completed = !goals[index].completed;
  localStorage.setItem("goals", JSON.stringify(goals));
  displayGoals();
}

// DELETE
function deleteGoal(index) {
  goals.splice(index, 1);
  localStorage.setItem("goals", JSON.stringify(goals));
  displayGoals();
}

// INIT
displayGoals();

function logout() {
  localStorage.removeItem("fittrackCurrentUser");
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
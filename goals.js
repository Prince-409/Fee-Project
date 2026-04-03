const user = JSON.parse(localStorage.getItem("fittrackCurrentUser"));

if (!user || !user.isLoggedIn) {
  window.location.href = "index.html";
}
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

// DATA (OBJECTS)
let goals = JSON.parse(localStorage.getItem("goals")) || [];

// DISPLAY
function displayGoals() {
  const list = document.getElementById("goalList");
  list.innerHTML = "";

  goals.forEach((goal, index) => {
    list.innerHTML += `
      <li class="${goal.completed ? "completed" : ""}">
        <span class="goal-text">${goal.text}</span>
        <div class="btns">
          <button class="action-btn complete-btn" onclick="toggleComplete(${index})" title="Mark Complete">✔</button>
          <button class="action-btn delete-btn" onclick="deleteGoal(${index})" title="Delete Goal">✕</button>
        </div>
      </li>
    `;
  });

  // UPDATE PROGRESS UI
  const completedCount = goals.filter(g => g.completed).length;
  const totalCount = goals.length;
  const progressBar = document.getElementById("goalProgressBar");
  const progressText = document.getElementById("progressText");
  const badge = document.getElementById("activeGoalsBadge");
  
  if (progressBar) {
    const percent = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;
    progressBar.style.width = `${percent}%`;
  }
  if (progressText) {
    progressText.innerText = `${completedCount} / ${totalCount} Completed`;
  }
  if (badge) {
    badge.innerText = `${totalCount} Goal${totalCount !== 1 ? 's' : ''}`;
  }
}

// CUSTOM GOAL TOGGLE
function toggleCustomGoal() {
  const select = document.getElementById("goalSelect");
  const input = document.getElementById("goalInput");
  if (select.value === "Other") {
    input.style.display = "inline-block";
    input.focus();
  } else {
    input.style.display = "none";
    input.value = "";
  }
}

// ADD
function addGoal() {
  const select = document.getElementById("goalSelect");
  const input = document.getElementById("goalInput");

  let val = select.value === "Other" ? input.value : select.value;

  if (val.trim() === "") return;

  const goal = {
    text: val.trim(),
    completed: false
  };

  goals.push(goal);
  localStorage.setItem("goals", JSON.stringify(goals));

  input.value = "";
  select.selectedIndex = 0;
  input.style.display = "none";
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
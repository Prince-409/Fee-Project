  const user = JSON.parse(localStorage.getItem("fittrackCurrentUser"));

if (!user || !user.isLoggedIn) {
  window.location.href = "index.html";
}
  const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// USER DATA
const user = JSON.parse(localStorage.getItem("fittrackCurrentUser"));

if (user) {
  document.getElementById("welcomeText").innerText = `Welcome, ${user.fullName}`;
}

// COUNTS
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let goals = JSON.parse(localStorage.getItem("goals")) || [];

document.getElementById("workoutCount").innerText = workouts.length;
document.getElementById("goalCount").innerText = goals.length;

// ACTIVITY
const activityList = document.getElementById("activityList");

workouts.slice(-3).forEach(w => {
  activityList.innerHTML += `<li>Workout: ${w}</li>`;
});

goals.slice(-3).forEach(g => {
  activityList.innerHTML += `<li>Goal: ${g}</li>`;
});

// NAVIGATION
function goTo(page) {
  window.location.href = page;
}

function logout() {
  localStorage.removeItem("fittrackCurrentUser");
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
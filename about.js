const user = JSON.parse(localStorage.getItem("fittrackCurrentUser"));

if (!user || !user.isLoggedIn) {
  window.location.href = "index.html";
}

const toggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

function logout() {
  localStorage.removeItem("fittrackCurrentUser");
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
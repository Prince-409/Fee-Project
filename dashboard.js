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

// SETUP PROFILE
if (user) {
  document.getElementById("welcomeText").innerText = `Welcome Back, ${user.fullName.split(' ')[0]} 👋`;
  
  // Update SK Initial
  const profileCircle = document.querySelector(".profile-circle");
  if (profileCircle) {
      const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
      profileCircle.innerText = initials;
  }
}

// COUNTS & ACTIVITY
const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
const goals = JSON.parse(localStorage.getItem("goals")) || [];

document.getElementById("workoutCount").innerText = workouts.length;
document.getElementById("goalCount").innerText = goals.length;

const activityList = document.getElementById("activityList");

function renderActivity() {
  activityList.innerHTML = "";
  
  const allActivity = [
      ...workouts.map(w => ({ type: 'workout', name: w, icon: '🏋️', time: 'Recently' })),
      ...goals.map(g => ({ type: 'goal', name: typeof g === 'string' ? g : g.text, icon: '🎯', time: 'Recently' }))
  ].reverse().slice(0, 5); // Show last 5

  if (allActivity.length === 0) {
      activityList.innerHTML = `<p style="color: #94a3b8; font-size: 14px; text-align: center; padding: 20px;">No recent activity yet. Start moving!</p>`;
      return;
  }

  allActivity.forEach(act => {
      activityList.innerHTML += `
        <li class="activity-item">
           <div class="activity-icon">${act.icon}</div>
           <div class="activity-content">
              <h5>${act.name}</h5>
              <p>${act.type === 'workout' ? 'Completed Workout' : 'Added New Goal'} • ${act.time}</p>
           </div>
        </li>
      `;
  });
}

renderActivity();

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
  logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
  });
}
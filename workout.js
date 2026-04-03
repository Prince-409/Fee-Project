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

// LOCAL STORAGE
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

// DISPLAY
function displayWorkouts() {
  const list = document.getElementById("workoutList");
  const empty = document.getElementById("emptyState");
  const badge = document.getElementById("workoutCountBadge");

  list.innerHTML = "";

  workouts.forEach((workout, index) => {
    list.innerHTML += `
      <li class="workout-li">
        <span class="workout-item-text">${workout}</span>
        <div class="btns">
           <button class="action-btn delete-btn" onclick="deleteWorkout(${index})" title="Delete Workout">✕</button>
        </div>
      </li>
    `;
  });

  // ✅ COUNT BADGE UPDATE
  if (badge) {
    badge.innerText =
      workouts.length === 1
        ? "1 session"
        : `${workouts.length} sessions`;
  }

  // ✅ EMPTY STATE
  if (empty) {
    if (workouts.length === 0) {
      empty.style.display = "block";
    } else {
      empty.style.display = "none";
    }
  }
}

// TOGGLE CUSTOM WORKOUT
function toggleCustomWorkout() {
  const select = document.getElementById("workoutSelect");
  const input = document.getElementById("workoutInput");
  if (select.value === "Other") {
    input.style.display = "block";
    input.focus();
  } else {
    input.style.display = "none";
    input.value = "";
  }
}

// ADD
function addWorkout() {
  const select = document.getElementById("workoutSelect");
  const input = document.getElementById("workoutInput");
  
  let val = select.value === "Other" ? input.value : select.value;

  if (val.trim() === "") {
    if (typeof showToast === "function") {
      showToast("Please enter a workout");
    }
    return;
  }

  workouts.push(val.trim());
  localStorage.setItem("workouts", JSON.stringify(workouts));

  // Reset form
  input.value = "";
  select.selectedIndex = 0;
  input.style.display = "none";
  
  displayWorkouts();
}

// DELETE
function deleteWorkout(index) {
  workouts.splice(index, 1);
  localStorage.setItem("workouts", JSON.stringify(workouts));
  displayWorkouts();
}

// INIT
displayWorkouts();

function logout() {
  localStorage.removeItem("fittrackCurrentUser");
  window.location.href = "index.html";
}
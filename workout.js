const user = JSON.parse(localStorage.getItem("fittrackCurrentUser"));

if (!user || !user.isLoggedIn) {
  window.location.href = "index.html";
}
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// LOCAL STORAGE
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

// DISPLAY
function displayWorkouts() {
  const list = document.getElementById("workoutList");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("workoutCount");

  list.innerHTML = "";

  workouts.forEach((workout, index) => {
    list.innerHTML += `
      <li>
        ${workout}
        <button class="delete-btn" onclick="deleteWorkout(${index})">X</button>
      </li>
    `;
  });

  // ✅ COUNT UPDATE
  if (count) {
    count.innerText =
      workouts.length === 1
        ? "1 workout"
        : `${workouts.length} workouts`;
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

// ADD
function addWorkout() {
  const input = document.getElementById("workoutInput");

  if (input.value.trim() === "") {
    if (typeof showToast === "function") {
      showToast("Please enter a workout");
    }
    return;
  }

  workouts.push(input.value);
  localStorage.setItem("workouts", JSON.stringify(workouts));

  input.value = "";
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

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
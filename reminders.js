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

// DATA
let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

// DISPLAY
function displayReminders() {
  const list = document.getElementById("reminderList");
  const empty = document.getElementById("reminderEmptyState");
  const badge = document.getElementById("reminderCountBadge");

  list.innerHTML = "";

  reminders.sort((a, b) => a.totalSeconds - b.totalSeconds);

  reminders.forEach((rem, index) => {
    const hours = Math.floor(rem.totalSeconds / 3600);
    const mins = Math.floor((rem.totalSeconds % 3600) / 60);
    const secs = rem.totalSeconds % 60;

    const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    list.innerHTML += `
      <li id="rem-${index}" class="${rem.totalSeconds === 0 ? "ringing" : ""}">
        <div class="reminder-item-info">
          <span class="reminder-text">${rem.text}</span>
          <span class="reminder-time">${timeString}</span>
        </div>
        <div class="btns">
           <button class="action-btn delete-btn" onclick="deleteReminder(${index})" title="Delete Reminder">✕</button>
        </div>
      </li>
    `;
  });

  // UPDATE BADGE
  if (badge) {
    badge.innerText = reminders.length === 1 ? "1 alert" : `${reminders.length} alerts`;
  }

  // EMPTY STATE
  if (empty) {
    empty.style.display = reminders.length === 0 ? "block" : "none";
  }
}

// ADD
function addReminder() {
  const text = document.getElementById("reminderText").value;
  const hh = parseInt(document.getElementById("hours").value) || 0;
  const mm = parseInt(document.getElementById("minutes").value) || 0;
  const ss = parseInt(document.getElementById("seconds").value) || 0;

  const total = hh * 3600 + mm * 60 + ss;

  if (text.trim() === "" || total <= 0) {
    alert("Please enter a label and time!");
    return;
  }

  reminders.push({
    text: text,
    totalSeconds: total,
    originalSeconds: total
  });

  localStorage.setItem("reminders", JSON.stringify(reminders));

  // Reset inputs
  document.getElementById("reminderText").value = "";
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";

  displayReminders();
}

// DELETE
function deleteReminder(index) {
  reminders.splice(index, 1);
  localStorage.setItem("reminders", JSON.stringify(reminders));
  
  // Stop audio if no one is ringing
  if (!reminders.some(r => r.totalSeconds === 0)) {
    const ringtone = document.getElementById("ringtone");
    ringtone.pause();
    ringtone.currentTime = 0;
  }
  
  displayReminders();
}

// TIMER ENGINE
setInterval(() => {
  let changed = false;
  let anyRinging = false;

  reminders.forEach((rem) => {
    if (rem.totalSeconds > 0) {
      rem.totalSeconds--;
      changed = true;
    }
    if (rem.totalSeconds === 0) {
      anyRinging = true;
    }
  });

  if (changed) {
    localStorage.setItem("reminders", JSON.stringify(reminders));
    displayReminders();
  }

  const ringtone = document.getElementById("ringtone");
  if (anyRinging) {
    if (ringtone.paused) {
      ringtone.play().catch(e => console.log("Audio play blocked", e));
    }
  } else {
    if (!ringtone.paused) {
      ringtone.pause();
      ringtone.currentTime = 0;
    }
  }
}, 1000);

// INIT
displayReminders();

function logout() {
  localStorage.removeItem("fittrackCurrentUser");
  window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}
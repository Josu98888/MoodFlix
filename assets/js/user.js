document.addEventListener("DOMContentLoaded", () => {
  const profileHeader = document.querySelector(".profile__header");
  const buttons = document.querySelectorAll(".mood-btn");
  const moodTitle = document.getElementById("mood-title");
  const profilePic = document.getElementById("profile-pic");
  const historyList = document.getElementById("mood-history");
  const announcement = document.getElementById("mood-announcement");

  const moods = {
    feliz: {
      label: "Feliz",
      color: "#f59e0b",
      glow: "#f59e0b55",
      emoji: "😊",
      message: "Estado actual: Feliz"
    },
    melancolico: {
      label: "Melancólico",
      color: "#7b9fd4",
      glow: "#7b9fd455",
      emoji: "🌧️",
      message: "Estado actual: Melancólico"
    },
    energetico: {
      label: "Energético",
      color: "#ff1a1a",
      glow: "#ff1a1a66",
      emoji: "⚡",
      message: "Estado actual: Energético"
    },
    relajado: {
      label: "Relajado",
      color: "#34d399",
      glow: "#34d39955",
      emoji: "🌙",
      message: "Estado actual: Relajado"
    },
    inspirado: {
      label: "Inspirado",
      color: "#7c3aed",
      glow: "#7c3aed55",
      emoji: "✨",
      message: "Estado actual: Inspirado"
    },
    nostalgico: {
      label: "Nostálgico",
      color: "#cd9450",
      glow: "#cd945055",
      emoji: "🎞️",
      message: "Estado actual: Nostálgico"
    }
  };

  const moodAliases = {
    Alegre: "feliz",
    Triste: "melancolico",
    Neutro: "feliz",
    Enojado: "energetico",
    Ansioso: "energetico",
    alegre: "feliz",
    triste: "melancolico",
    neutro: "feliz",
    enojado: "energetico",
    ansioso: "energetico"
  };

  let moodHistory = getSavedHistory();

  function getSavedHistory() {
    try {
      return JSON.parse(localStorage.getItem("moodHistory")) || [];
    } catch {
      return [];
    }
  }

  function getMoodKey(savedMood) {
    if (!savedMood) return undefined;
    if (moods[savedMood]) return savedMood;
    if (moodAliases[savedMood]) return moodAliases[savedMood];

    return Object.keys(moods).find((key) => moods[key].label === savedMood);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    if (Number.isNaN(date.getTime())) return "Fecha no disponible";

    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (date.toDateString() === now.toDateString()) {
      return `Hoy ${time}`;
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === yesterday.toDateString()) {
      return `Ayer ${time}`;
    }

    return `${date.toLocaleDateString()} ${time}`;
  }

  function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getStartOfStreakWindow(date) {
    const start = new Date(date);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    return start;
  }

  function calculateWeeklyStreak(history) {
    const today = new Date();
    const startOfStreakWindow = getStartOfStreakWindow(today);
    const moodDays = new Set(
      history
        .map((entry) => new Date(entry.date))
        .filter((date) => !Number.isNaN(date.getTime()))
        .filter((date) => date >= startOfStreakWindow && date <= today)
        .map((date) => getDateKey(date))
    );

    let streak = 0;
    const currentDate = new Date(today);

    while (currentDate >= startOfStreakWindow) {
      if (!moodDays.has(getDateKey(currentDate))) break;

      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  }

  function renderWeeklyStreak() {
    const streakTarget = document.querySelector(".profile__eyebrow");
    if (!streakTarget) return;

    const weeklyStreak = calculateWeeklyStreak(moodHistory);

    if (weeklyStreak >= 2) {
      streakTarget.classList.add("weekly-streak");
      streakTarget.textContent = `🔥 Racha semanal: ${weeklyStreak} días seguidos`;
      return;
    }

    streakTarget.classList.remove("weekly-streak");
    streakTarget.textContent = "";
  }

  function renderHistory() {
    if (!historyList) return;

    historyList.innerHTML = "";

    if (moodHistory.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.classList.add("history-list__empty");
      emptyItem.textContent = "Todavía no registraste estados de ánimo.";
      historyList.appendChild(emptyItem);
      return;
    }

    moodHistory.slice(-5).reverse().forEach((entry) => {
      const moodKey = getMoodKey(entry.mood);
      const mood = moods[moodKey];
      const li = document.createElement("li");
      const moodSpan = document.createElement("span");
      const dateSpan = document.createElement("span");

      li.style.setProperty("--history-color", mood?.color || "var(--mood-color)");
      moodSpan.classList.add("history-list__mood");
      moodSpan.textContent = mood ? `${mood.emoji} ${mood.label}` : entry.mood;
      dateSpan.classList.add("history-list__date");
      dateSpan.textContent = formatDate(entry.date);

      li.append(moodSpan, dateSpan);
      historyList.appendChild(li);
    });
  }

  function updateMoodStyles(mood) {
    document.documentElement.style.setProperty("--mood-color", mood.color);
    document.documentElement.style.setProperty("--mood-glow", mood.glow);
    profileHeader.style.borderColor = mood.color;
    profilePic.textContent = mood.emoji;
    profilePic.style.borderColor = mood.color;
    profilePic.classList.add("is-changing");

    setTimeout(() => {
      profilePic.classList.remove("is-changing");
    }, 250);
  }

  function setActiveMood(moodKey, shouldSaveHistory = true) {
    const normalizedMoodKey = getMoodKey(moodKey);
    const mood = moods[normalizedMoodKey];
    if (!mood) return;

    moodTitle.textContent = mood.message;
    updateMoodStyles(mood);

    buttons.forEach((button) => {
      const isActive = button.dataset.mood === normalizedMoodKey;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("mood-btn--active", isActive);
    });

    localStorage.setItem("mood", normalizedMoodKey);
    localStorage.setItem("moodColor", mood.color);

    if (announcement) {
      announcement.textContent = `Estado de ánimo cambiado a ${mood.label}`;
    }

    if (shouldSaveHistory) {
      moodHistory.push({
        mood: normalizedMoodKey,
        date: new Date().toISOString()
      });

      localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
      renderHistory();
      renderWeeklyStreak();
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveMood(button.dataset.mood);
    });
  });

  const savedMood = getMoodKey(localStorage.getItem("mood"));

  if (savedMood) {
    setActiveMood(savedMood, false);
  }

  renderHistory();
  renderWeeklyStreak();
});

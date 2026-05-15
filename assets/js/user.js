document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const buttons = document.querySelectorAll("main ul button");
  const moodTitle = document.getElementById("mood-title");
  const profilePic = document.getElementById("profile-pic");
  const savedMood = localStorage.getItem("mood");
  const savedColor = localStorage.getItem("moodColor");

  if (savedMood && savedColor) {
    header.style.backgroundColor = savedColor;
    //profilePic.style.borderColor = savedColor; por ahora lo saco pero la idea es agregar un borde al perfil que tengo algun diseño segun el estado de animo
    moodTitle.textContent = `${savedMood}`;
  }

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const color = window.getComputedStyle(btn).backgroundColor;
      const moodText = btn.textContent;  

      header.style.backgroundColor = color;
      //profilePic.style.borderColor = color;
      moodTitle.textContent = `${moodText}`;
      
      localStorage.setItem("mood", moodText);
      localStorage.setItem("moodColor", color);
    });
  });
});


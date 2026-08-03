// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Popup logic
const playButton = document.getElementById("playButton");
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-btn");
const saveSettings = document.getElementById("saveSettings");

playButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent navigating to choice.html
    popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

saveSettings.addEventListener("click", () => {
    popup.style.display = "none";
    // Add logic to save settings (e.g., localStorage)
    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    const soundEnabled = document.getElementById("sound").checked;
    console.log("Difficulty:", selectedDifficulty, "Sound:", soundEnabled);
    alert("Settings saved!");
});
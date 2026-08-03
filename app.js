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
function selectQuiz(selected) {
    const numquestions = "all";
    const direction = "names";
    
    window.location.href = "question.html";

}

function selectAnswer(selected, correct) {
    const buttons = document.querySelectorAll(".choice-btn");
    const consBut = document.getElementById("continuebtn");

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.style.backgroundColor = "#2ecc71"; // Green for correct
        } else if (btn.textContent === selected) {
            btn.style.backgroundColor = "#e74c3c"; // Red for wrong
        }
    });

    consBut.removeAttribute("hidden")

}
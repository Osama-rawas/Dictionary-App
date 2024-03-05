const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.getElementById("sound");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  let inputWord = document.getElementById("input-word").value;
  fetch(`${apiUrl}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
        <div class="result">
          <div class="word">
            <h3>${inputWord}</h3>
            <button onclick="playSound()">
              <i class="fas fa-volume-up"></i>
            </button>
          </div>
          <div class="details"> 
            <p>${data[0]["meanings"][0]["partOfSpeech"]}</p>   
            <p>${
              data[0]["phonetics"][data[0]["phonetics"].length - 1]["text"]
            }</p>
          </div>
          <p class="word-meaning">
          
          ${data[0].meanings[0].definitions[0].definition}
          </p>
          <div class="example">
            <span>example:</span>
            <p class="word-example">
              ${data[0].meanings[0].definitions[0].example || ""}
            </p>
          </div>
        </div>`;
      sound.setAttribute("src", data[0].phonetics[0].audio);
    })
    .catch(() => {
      result.innerHTML = `<h3> Couldn't Find the word </h3>`;
      //   result.innerHTML = `<h3> ${data}`;
    });
});
function playSound() {
  sound.play();
}

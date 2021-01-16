"use script";

{
  const p = document.getElementById("text");
  const textLists = [
    "Hello World",
    "This is my App",
    "How are you?",
    "Hello Hello",
    "I love JavaScript!",
    "Good morning",
    "I am Japanese",
    "Let it be",
  ];
  let checkTexts = [];
  let checkCount = 0;
  let startTime;

  createText();

  function createText() {
    let rnd = Math.floor(Math.random() * textLists.length);
    checkTexts = textLists[rnd].split("").map((value) => {
      let span = document.createElement("span");

      span.textContent = value;
      p.appendChild(span);

      return span;
    });
  }

  document.addEventListener("keydown", (e) => {
    if (checkCount === 3) return;
    if (e.key === checkTexts[0].textContent) {
      if (checkCount === 0) {
        startTime = Date.now();
      }
      checkTexts[0].className = "add-blue";

      checkTexts.shift();
      if (!checkTexts.length) {
        console.log(checkCount);
        checkCount++;
        p.textContent = "";
        if (checkCount === 3) {
          const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
          p.textContent = "Game Finish!!";
          document.getElementById(
            "score"
          ).textContent = `${elapsedTime} Seconds!`;
          return;
        }
        createText();
      }
    }
  });

  function gameResult() {}
}

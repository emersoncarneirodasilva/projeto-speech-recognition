const textarea = document.querySelector("#textarea");
const btnGravar = document.querySelector("#btnGravar");
const btnParar = document.querySelector("#btnParar");
const btnBaixar = document.querySelector("#btnBaixar");
const btnLimpar = document.querySelector("#btnLimpar");

class SpeechApi {
  constructor() {
    const SpeechToText =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    this.speechApi = new SpeechToText();
    this.output = textarea.output;
    this.speechApi.continuous = true;
    this.speechApi.lang = "pt-BR";

    this.speechApi.onresult = (e) => {
      let resultIndex = e.resultIndex;
      let transcript = e.results[resultIndex][0].transcript;

      textarea.value += transcript;
    };
  }

  start() {
    this.speechApi.start();
  }

  stop() {
    this.speechApi.stop();
  }
}

let speech = new SpeechApi();

btnGravar.classList.add("btnGravar");

btnGravar.addEventListener("click", () => {
  btnGravar.disabled = true;
  btnParar.disabled = false;

  if (btnParar.disabled === false && btnGravar.disabled) {
    btnParar.classList.add("btnParar");
    btnGravar.classList.remove("btnGravar");
  }

  speech.start();
});

btnParar.addEventListener("click", () => {
  btnGravar.disabled = false;
  btnParar.disabled = true;

  if (btnParar.disabled && btnGravar.disabled === false) {
    btnParar.classList.remove("btnParar");
    btnGravar.classList.add("btnGravar");
  }

  speech.stop();
});

btnBaixar.addEventListener("click", () => {
  let text = textarea.value;
  let filename = "speech.txt";

  download(text, filename);
});

function download(text, filename) {
  let element = document.createElement("a");

  element.setAttribute(
    "href",
    "data:text/plaincharset=utf-8," + encodeURIComponent(text)
  );

  element.setAttribute("download", filename);

  element.style.display = "none";

  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

btnLimpar.addEventListener("click", () => {
  textarea.value = "";
  btnGravar.disabled = false;
  btnParar.disabled = true;
  speech.stop();
});

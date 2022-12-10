// PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => {});
}

let langs = [
  ['Afrikaans', 'af-ZA'],
  ['Bahasa Indonesia', 'id-ID'],
  ['Bahasa Melayu', 'ms-MY'],
  ['Català', 'ca-ES'],
  ['Čeština', 'cs-CZ'],
  ['Deutsch', 'de-DE'],
  ['English(UK)', 'en-GB'],
  ['English(US)', 'en-US'],
  ['Español', 'es-ES'],
  ['Euskara', 'eu-ES'],
  ['Français', 'fr-FR'],
  ['Galego', 'gl-ES'],
  ['Hrvatski', 'hr_HR'],
  ['IsiZulu', 'zu-ZA'],
  ['Íslenska', 'is-IS'],
  ['Italiano', 'it-IT'],
  ['Magyar', 'hu-HU'],
  ['Nederlands', 'nl-NL'],
  ['Norsk bokmål', 'nb-NO'],
  ['Polski', 'pl-PL'],
  ['Português', 'pt-PT'],
  ['Română', 'ro-RO'],
  ['Slovenčina', 'sk-SK'],
  ['Suomi', 'fi-FI'],
  ['Svenska', 'sv-SE'],
  ['Türkçe', 'tr-TR'],
  ['български', 'bg-BG'],
  ['Pусский', 'ru-RU'],
  ['Српски', 'sr-RS'],
  ['한국어', 'ko-KR'],
  ['普通话', 'cmn-Hans-CN'],
  ['中文 (台灣)', 'cmn-Hant-TW'],
  ['粵語 (香港)', 'yue-Hant-HK'],
  ['日本語', 'ja-JP'],
  ['latīna', 'la'],
];

const colorDim = '#9a9a9a';
const alertStr = `Caution: microphone permission required.
Please click on the red cross in address bar to allow it.`;
const recognizingStr = 'recognizing...';

localStorage.getItem('lang') || localStorage.setItem('lang', 'yue-Hant-HK');

let textBox = document.getElementById('textBox');

if (!('webkitSpeechRecognition' in window)) {
  textBox.innerText = 'Speech API not supported, need Chrome 25+';
  throw new Error();
}

let langSelect = document.getElementById('lang-select');
langSelect.onchange = changeLang;
let toggleBut = document.getElementById('toggleBut');
toggleBut.onclick = detect_mic_and_recognize;
let loadingIcon = document.getElementById('loading-icon');
loadingIcon.hidden = true;
let recognizing = false;

let recog = new webkitSpeechRecognition();
recog.continuous = true;
recog.interimResults = true;
recog.lang = localStorage.getItem('lang');

function detect_mic_and_recognize() {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(recognize)
    .catch(() => {
      alert(alertStr);
    });
}

function recognize() {
  if (recognizing) {
    recog.stop();
  } else {
    textBox.innerHTML = '';
    recog.start();
  }
}

function changeLang(e) {
  let lang = e.target.value;
  localStorage.setItem('lang', lang);
  recog.lang = lang;
}

recog.onstart = () => {
  textBox.innerHTML = '';
  recognizing = true;
  toggleBut.value = 'stop';
  textBox.style.color = colorDim;
  textBox.innerText = recognizingStr;
  loadingIcon.hidden = false;
};

recog.onend = () => {
  recognizing = false;
  toggleBut.value = 'start';
  loadingIcon.hidden = true;
  if (textBox.innerText == recognizingStr) {
    textBox.style.color = colorDim;
    textBox.innerText = 'idle';
  }
};

recog.onresult = (e) => {
  let idx = e.resultIndex;
  let result = e.results[idx];
  let pos = result.length - 1;
  let txt = result[pos].transcript;
  textBox.style.color = colorDim;
  textBox.innerHTML = txt;
  if (result.isFinal) {
    navigator.clipboard.writeText(txt);
    textBox.style.color = 'white';
  }
};

document.getElementsByTagName('body')[0].oncopy = () =>
  navigator.clipboard.writeText(textBox.innerText);

document.onkeyup = (e) => {
  if (e.code === 'Space') {
    recognize();
  }
};

window.onload = () => recognize();

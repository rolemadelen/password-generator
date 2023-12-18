const characterSet = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
const uppercaseRadio = document.getElementsByName('uppercase');
const lowercaseRadio = document.getElementsByName('lowercase');
const numberRadio = document.getElementsByName('number');
const specialRadio = document.getElementsByName('special');
const MIN = 5;
const MAX = 128;
let passwordLength = 14;

const passwordField = document.querySelector('.nes-container > .text');
const lengthInput = document.querySelector(
  "div[data-option='character'] > input"
);
const lengthProgress = document.querySelector(
  "div[data-option='character'] > progress"
);
const btnCopy = document.querySelector("button[data-action='copy']");
const btnGenerate = document.querySelector("button[data-action='generate']");

lengthInput.addEventListener('change', (e) => {
  let val = e.target.value || 5;
  if (val < MIN) {
    val = MIN;
    e.target.value = val;
  }
  if (val > MAX) {
    val = MAX;
    e.target.value = val;
  }
  lengthProgress.value = val;

  passwordLength = val;
  generatePassword();
});

btnCopy.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordField.innerText);
  btnCopy.innerHTML = `<i class="nes-icon heart"></i>`;
  setTimeout(() => {
    btnCopy.innerText = 'Copy';
  }, 500);
});
btnGenerate.addEventListener('click', () => generatePassword());

function generatePassword() {
  let includeUpper = uppercaseRadio[0].checked;
  const includeLower = lowercaseRadio[0].checked;
  const includeNumber = numberRadio[0].checked;
  const includeSpecial = specialRadio[0].checked;

  let chars = '';

  if (!includeUpper && !includeLower && !includeNumber && !includeSpecial) {
    uppercaseRadio[1].checked = false;
    uppercaseRadio[0].checked = true;
    includeUpper = true;
  }

  if (includeUpper) chars += characterSet.slice(0, 26);
  chars = chars.toUpperCase();
  if (includeLower) chars += characterSet.slice(0, 26);
  if (includeNumber) chars += characterSet.slice(26, 36);
  if (includeSpecial) chars += characterSet.slice(36);

  let password = '';

  for (let i = 0; i < passwordLength; ++i) {
    let i = Math.floor(Math.random() * chars.length);
    password += chars[i];
  }

  passwordField.innerText = password;

  const passwordList = document.querySelector('.passwordList');
  const li = document.createElement('li');
  li.innerText = `${password} (${password.length})`;
  passwordList.prepend(li);
}

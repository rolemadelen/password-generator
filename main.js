const PASSWORD_MIN = 5;
const PASSWORD_MAX = 128;
let currentPasswordLength = 14;

const progressBar = document.querySelector('progress');
const lengthInput = document.querySelector('.nes-input');

const [btnCopy, btnGenerate] = document.querySelectorAll('.buttons button');
const passwordField = document.querySelector('.nes-container .text');

btnCopy.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordField.innerText);
  btnCopy.innerHTML = `<i class="nes-icon heart"></i>`;
  setTimeout(() => {
    btnCopy.innerText = 'Copy';
  }, 500);
});

btnGenerate.addEventListener('click', () => {
  const uppercaseRadio = document.querySelector('input[name="uppercase"]');

  let isUpper = uppercaseRadio.checked;
  const isLower = document.querySelector('input[name="lowercase"]').checked;
  const isNumber = document.querySelector('input[name="number"]').checked;
  const isSymbol = document.querySelector('input[name="symbol"]').checked;

  if (!isUpper && !isLower && !isNumber && !isSymbol) {
    uppercaseRadio.checked = true;
    isUpper = true;
  }

  const characterSet = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let chars = '';

  if (isUpper) {
    chars += characterSet.slice(0, 26);
    chars = chars.toUpperCase();
  }

  if (isLower) {
    chars += characterSet.slice(0, 26);
  }

  if (isNumber) {
    chars += characterSet.slice(26, 36);
  }

  if (isSymbol) {
    chars += characterSet.slice(36);
  }

  let password = '';

  for (let i = 0; i < currentPasswordLength; ++i) {
    const index = Math.floor(Math.random() * chars.length);
    password += chars[index];
  }

  passwordField.innerText = password;

  const passwordList = document.querySelector('.password-list');
  const li = document.createElement('li');
  li.innerText = `${password} (${password.length})`;
  passwordList.prepend(li);
});

lengthInput.addEventListener('change', (e) => {
  let currentValue = e.target.value;

  if (currentValue < PASSWORD_MIN) {
    currentValue = e.target.value = PASSWORD_MIN;
  }

  if (currentValue > PASSWORD_MAX) {
    currentValue = e.target.value = PASSWORD_MAX;
  }
  progressBar.value = currentValue;
  currentPasswordLength = currentValue;
});

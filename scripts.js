// Very Weak < 5
// Weak < 8
// Good < 10
// Strong < 12
// else "Very Strong"


const NUMBERS = "1234567890";
const CHARS = "qwertyuiopasdfghjklzxcvbnm";
const SPECIAL = "#$&!";

const passwordLength = document.getElementById("passwordLengthInput");
const resultInput = document.getElementById("resultInput");
const statusView = document.getElementById("status");

function changeLength(add) {
    if (Number(passwordLength.value) <= 1 && !add) return;
    if (Number(passwordLength.value) >= 50 && add) return;
    passwordLength.value = add ? Number(passwordLength.value) + 1 : Number(passwordLength.value) - 1;
    regenerate();
}

function regenerate() {
    const uppercaseChecked = document.getElementById("uppercase").checked,
        lowercaseChecked = document.getElementById("lowercase").checked,
        numbersChecked = document.getElementById("numbers").checked,
        specialsChecked = document.getElementById("specials").checked;

    let values = "";
    if (uppercaseChecked) values += CHARS.toUpperCase();
    if (lowercaseChecked) values += CHARS;
    if (numbersChecked) values += NUMBERS;
    if (specialsChecked) values += SPECIAL;

    if (Number(passwordLength.value) <= 1) passwordLength.value = 1;
    if (Number(passwordLength.value) >= 50) passwordLength.value = 50;

    if (Number(passwordLength.value) >= 12) {
        statusView.textContent = "Very Strong";
        statusView.style.backgroundColor = "var(--very-strong)";
    } else if (Number(passwordLength.value) >= 10) {
        statusView.textContent = "Strong";
        statusView.style.backgroundColor = "var(--strong)";
    } else if (Number(passwordLength.value) >= 8) {
        statusView.textContent = "Good";
        statusView.style.backgroundColor = "var(--good)";
    } else if (Number(passwordLength.value) >= 5) {
        statusView.textContent = "Weak";
        statusView.style.backgroundColor = "var(--weak)";
    } else {
        statusView.textContent = "Very Weak";
        statusView.style.backgroundColor = "var(--very-weak)";
    }
    resultInput.value = Array.from({ length: Number(passwordLength.value) },
        () => values[Math.floor(Math.random() * values.length)]).join('');
}

function copy(btn) {
    btn.textContent = "Copied!";
    navigator.clipboard.writeText(resultInput.value);
    setTimeout(() => {
        btn.textContent = "copy!";
    }, 2000);
}

window.onload = () => regenerate();
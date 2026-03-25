function checkPassword() {
    let password = document.getElementById("password").value;
    let result = document.getElementById("result");
    let feedback = document.getElementById("feedback");
    let bar = document.getElementById("bar");

    feedback.innerHTML = "";
    let strength = 0;

    // Common insecure passwords
    const commonPasswords = ["123456", "password", "qwerty", "111111", "abc123"];
    if (commonPasswords.includes(password)) {
        result.innerText = "Very Weak - Common Password!";
        result.style.color = "darkred";
        bar.style.width = "20%";
        bar.style.background = "darkred";
        return;
    }

    // Length check
    if (password.length >= 8) strength++;
    else addFeedback("At least 8 characters.");

    // Upper + Lower case
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    else addFeedback("Use both uppercase and lowercase letters.");

    // Number check
    if (/[0-9]/.test(password)) strength++;
    else addFeedback("Include at least one number.");

    // Special character check
    if (/[@#$%^&+=!]/.test(password)) strength++;
    else addFeedback("Include at least one special character.");

    // Display result
    if (strength === 4) {
        result.innerText = "Strong Password";
        result.style.color = "#00ff00";
        bar.style.width = "100%";
        bar.style.background = "#00ff00";
    } else if (strength === 3) {
        result.innerText = "Moderate Password";
        result.style.color = "#ffa500";
        bar.style.width = "70%";
        bar.style.background = "#ffa500";
    } else {
        result.innerText = "Weak Password";
        result.style.color = "#ff0000";
        bar.style.width = "40%";
        bar.style.background = "#ff0000";
    }

    // Hash password and store securely
    const hashed = CryptoJS.SHA256(password).toString();
    localStorage.setItem("lastHashedPassword", hashed);
    console.log("Hashed password saved:", hashed);
}

function addFeedback(message) {
    let li = document.createElement("li");
    li.innerText = message;
    document.getElementById("feedback").appendChild(li);
}

function generateStrongPassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    let password = "";
    for(let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function generateAndShow() {
    const strongPass = generateStrongPassword();
    document.getElementById("strong-pass").innerText = strongPass;
}
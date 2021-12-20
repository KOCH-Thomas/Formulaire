const form = document.querySelector("form");
const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
const progressBar = document.getElementById("progress-bar");
let email, password, confirmPass;

const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = document.querySelector("." + tag + "-container > span");

    if (!valid) {
        container.classList.add("error");
        span.textContent = message;
    } else {
        container.classList.remove("error");
        span.textContent = message;
    }
};


const emailChecker = (value) => {
    if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
        errorDisplay("email", "L'Email n'est pas valide");
        email = null;
    } else {
        errorDisplay("email", " ", true);
        email = value;
    }
};



const passwordChecker = (value) => {
    progressBar.classList = "";

    if (
        !value.match(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
        )
    ) {
        errorDisplay(
            "password",
            "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial"
        );
        progressBar.classList.add("progressRed");
        password = null;
    } else if (value.length < 12) {
        progressBar.classList.add("progressBlue");
        errorDisplay("password", "", true);
        password = value;
    } else {
        progressBar.classList.add("progressGreen");
        errorDisplay("password", "", true);
        password = value;
    }
    if (confirmPass) confirmChecker(confirmPass);
};

const confirmChecker = (value) => {
    if (value !== password) {
        errorDisplay("confirm", "Les mots de passe ne correspondent pas");
        confirmPass = false;
    } else {
        errorDisplay("confirm", "", true);
        confirmPass = true;
    }
};

inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
        switch (e.target.id) {
            case "pseudo":
                pseudoChecker(e.target.value);
                break;
            case "email":
                emailChecker(e.target.value);
                break;
            case "password":
                passwordChecker(e.target.value);
                break;
            case "confirm":
                confirmChecker(e.target.value);
                break;
            default:
                nul;
        }
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (email && password && confirmPass) {
        const data = {
            email,
            password,
        };
        console.log(data);

        inputs.forEach((input) => (input.value = ""));
        progressBar.classList = "";
        email = null;
        password = null;
        confirmPass = null;
        alert("Inscription validée !");
    } else {
        alert("veuillez remplir correctement les champs");
    }
});

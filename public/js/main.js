const userButton = document.getElementById("userDropdown");
const questionButton = document.getElementById("questionBtn");

if (!userLoggedIn) {
    userButton.style.visibility = "hidden";
} else {
    userButton.style.visibility = "visible";
}

if (!userLoggedIn) {
    questionButton.style.visibility = "hidden";
} else {
    questionButton.style.visibility = "visible";
}
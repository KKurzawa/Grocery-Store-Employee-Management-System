const userButton = document.getElementById("userDropdown");
// const userButton = document.getElementById("userDropdown");


// userButton.style.visibility = "hidden";

if (!userLoggedIn) {
    userButton.style.visibility = "hidden";
} else {
    userButton.style.visibility = "visible";
}
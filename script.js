const input = document.getElementById('myInput');
const button = document.getElementById('submitBtn');

button.addEventListener('click', () => {
    const text = input.value; // get what the user typed
    alert("You typed: " + text);
});
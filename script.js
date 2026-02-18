const input = document.getElementById('myInput');
const button = document.getElementById('submitBtn');
const savedList = document.getElementById('savedList');

// Load saved items from localStorage
let items = JSON.parse(localStorage.getItem('items')) || [];

// Render items
function renderItems() {
    savedList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        savedList.appendChild(li);
    });
}

// Save new item
button.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== '') {
        items.push(text);                  // add to array
        localStorage.setItem('items', JSON.stringify(items)); // save array
        input.value = '';                   // clear input
        renderItems();                      // update display
    }
});

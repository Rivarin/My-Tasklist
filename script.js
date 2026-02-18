const input = document.getElementById('myInput');
const button = document.getElementById('submitBtn');
const savedList = document.getElementById('savedList');

// Load saved items from localStorage
let items = JSON.parse(localStorage.getItem('items')) || [];

// Function to render items
function renderItems() {
    savedList.innerHTML = ''; // clear the list
    items.forEach((item, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = item.text || item; // works for both strings or objects
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();
        });
        li.appendChild(deleteBtn);

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

renderItems();

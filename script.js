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

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';

        // Delete event
        deleteBtn.addEventListener('click', () => {
            items.splice(index, 1);              // Remove the item from the array
            localStorage.setItem('items', JSON.stringify(items)); // Update localStorage
            renderItems();                       // Re-render the list
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

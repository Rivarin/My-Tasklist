const input = document.getElementById('myInput');
const button = document.getElementById('submitBtn');
const savedList = document.getElementById('savedList');


let items = JSON.parse(localStorage.getItem('items')) || [];

function renderItems() {
    savedList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = item.text || item;
        li.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
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
        items.push(text);                  
        localStorage.setItem('items', JSON.stringify(items)); 
        input.value = '';                   
        renderItems();                
    }
});

renderItems();

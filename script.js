const input = document.getElementById('taskInput');
//const button = document.getElementById('submitBtn');
const savedList = document.getElementById('savedTaskList');


let items = JSON.parse(localStorage.getItem('items')) || [];

function renderItems() {
    savedList.innerHTML = '';

    items.forEach((item, index) => {

        // Create container for each task
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.alignItems = 'left';
        row.style.justifyContent = 'left';
        row.style.margin = '5px 0';

        // Delete button (on the left)
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.style.marginRight = '10px';

        deleteBtn.addEventListener('click', () => {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            renderItems();
        });

        // Editable text field
        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.value = item;
        taskInput.style.width = '200px';
        taskInput.style.textAlign = 'left';

        // When user edits the text
        taskInput.addEventListener('change', () => {
            items[index] = taskInput.value;
            localStorage.setItem('items', JSON.stringify(items));
        });

        // Add both to the row
        row.appendChild(deleteBtn);
        row.appendChild(taskInput);

        // Add row to list
        savedList.appendChild(row);
    });
}

//function addTask() {
//   const text = input.value.trim();
//   if (text !== '') {
//        items.push(text);
//        localStorage.setItem('items', JSON.stringify(items));
//        input.value = '';
//        renderItems();
//    }
//}

// Save new item
//button.addEventListener('click', addTask);

input.addEventListener('keydown', (event) =>
{
    if (event.key === 'Enter')
    {
        const text = input.value.trim();
        if (text !== '') {
            items.push(text);
            localStorage.setItem('items', JSON.stringify(items));
            input.value = '';
            renderItems();
        }
    }
});

renderItems();

const input = document.getElementById('taskInput');
//const button = document.getElementById('submitBtn');
const savedList = document.getElementById('savedTaskList');


let items = JSON.parse(localStorage.getItem('items')) || [];

function renderItems() {
    savedList.innerHTML = '';

    items.forEach((item, index) => {

        const row = document.createElement('div');
        row.className = 'task-row';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete-btn';

        deleteBtn.addEventListener('click', () => {

            // Add removing class
            row.classList.add('removing');

            // Wait for animation to finish
            setTimeout(() => {
                items.splice(index, 1);
                localStorage.setItem('items', JSON.stringify(items));
                renderItems();
            }, 300); // must match CSS transition time
        });

        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.value = item;
        taskInput.className = 'task-input';

        taskInput.addEventListener('input', () => {
            items[index] = taskInput.value;
            localStorage.setItem('items', JSON.stringify(items));
        });

        row.appendChild(deleteBtn);
        row.appendChild(taskInput);
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

const input = document.getElementById('taskInput');
//const button = document.getElementById('submitBtn');
const savedList = document.getElementById('savedTaskList');


let items = JSON.parse(localStorage.getItem('items')) || [];

function renderItems() {
    savedList.innerHTML = ''; // clear the list

    items.forEach((item, index) => {
        // Create a button for each task
        const taskField = document.createElement('input');
        taskField.textContent = item;  // the text of the task
        taskField.style.display = 'block'; // so each button is on its own line
        taskField.style.margin = '5px'; // center horizontally
        taskField.style.width = '200px'; // optional width

        // Add click event (here it deletes itself)
        taskField.addEventListener('click', () => {
            items.splice(index, 1); // remove task from array
            localStorage.setItem('items', JSON.stringify(items)); // save
            renderItems(); // re-render list
        });

        savedList.appendChild(taskField); // add button to list
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

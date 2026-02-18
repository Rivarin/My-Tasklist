const input = document.getElementById('myInput');
//const button = document.getElementById('submitBtn');
const savedList = document.getElementById('savedList');


let items = JSON.parse(localStorage.getItem('items')) || [];

function renderItems() {
    savedList.innerHTML = ''; // clear the list

    items.forEach((item, index) => {
        // Create a button for each task
        const taskBtn = document.createElement('button');
        taskBtn.textContent = item;  // the text of the task
        taskBtn.style.display = 'block'; // so each button is on its own line
        taskBtn.style.margin = '5px auto'; // center horizontally
        taskBtn.style.width = '200px'; // optional width

        // Add click event (here it deletes itself)
        taskBtn.addEventListener('click', () => {
            items.splice(index, 1); // remove task from array
            localStorage.setItem('items', JSON.stringify(items)); // save
            renderItems(); // re-render list
        });

        savedList.appendChild(taskBtn); // add button to list
    });
}

function addTask() {
    const text = input.value.trim();
    if (text !== '') {
        items.push(text);
        localStorage.setItem('items', JSON.stringify(items));
        input.value = '';
        renderItems();
    }
}

// Save new item
//button.addEventListener('click', addTask);

input.addEventListener('keydown', (event) =>
{
    if (event.key === 'Enter')
    {
        addTask();
    }
});

renderItems();

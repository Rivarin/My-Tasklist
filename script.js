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

function generateCalendar() {
    const calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);

    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();

    // Convert Sunday (0) to 6, and shift others back by 1
    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    let row = document.createElement("tr");

    // Empty cells before month starts
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("td");
        row.appendChild(emptyCell);
    }

    // Add actual days
    for (let day = 1; day <= totalDays; day++) {
        if ((startDay + day - 1) % 7 === 0) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }

        const cell = document.createElement("td");
        cell.textContent = day;

        row.appendChild(cell);

        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.style.backgroundColor = "#cf7163";
        }
    }

    calendarBody.appendChild(row);
}

generateCalendar();
renderItems();

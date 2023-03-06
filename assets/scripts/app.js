const overlay = document.getElementById('overlay');
const addTask = document.getElementById('addTask');
const editTask = document.getElementById('editTask');
const info = document.getElementById('info');
const cancelBtn = document.querySelectorAll('.cancelBtn');
const inputHeading = document.getElementById('inputHeading');
const EditInput = document.getElementById('EditInput');
const confirmBtn = document.getElementById('confirmBtn');
const select = document.getElementById('select');
const addBtns = document.querySelectorAll('.addBtn');
const taskLists = document.querySelectorAll('.taskList');
const taskItems = document.querySelectorAll('.taskItem');
const headingText = document.getElementById('headingText');
const editIcon = document.getElementById('editIcon');
const editBtn = document.getElementById('ConfirmUpdate');

function overLayHandler(over) {
  over.classList.add('visible');
}

function addBtnHandler() {
  overLayHandler(overlay);
  addTask.classList.add('visible');
}

function editTaskHandler() {
  overLayHandler(overlay);
  editTask.classList.add('visible');
}

function infoPopup() {
  overLayHandler(overlay);
  info.classList.add('visible');
}

function closeInfo() {
  info.classList.remove('visible');
  overlay.classList.remove('visible');
  editTask.classList.remove('visible');
}

function backdropHandler() {
  overlay.classList.remove('visible');
  addTask.classList.remove('visible');
  closeInfo();
}

function inputHandler() {
  let inputVal = inputHeading.value;
  function listContent(num) {
    taskLists[num].innerHTML += `
    <li draggable="true" class="taskItem">
    <div>
    <p class="text" id='text'>${inputVal}</p>
    </div>
    <div class="icons">
    <button class="BtnIcon editIcon">
    <ion-icon name="create"></ion-icon>
    </button>
    <button class="BtnIcon trashIcon" >
    <ion-icon name="trash"></ion-icon>
    </button>
    </div>
    </li>
    `;
  }
  if (inputVal == '') {
    alert('Enter Task');
    return;
  }
  if (select.value == 'notStarted') {
    listContent(0);
  } else if (select.value == 'inProgress') {
    listContent(1);
  } else {
    listContent(2);
  }

  backdropHandler();
}

function dragItem() {
  let items = taskItems;
  items.forEach((task) => {
    task.addEventListener('dragstart', function () {
      console.log('dsfa');
    });
  });
}

// event listeners
addBtns.forEach((btn) => {
  btn.addEventListener('click', addBtnHandler);
});

overlay.addEventListener('click', backdropHandler);

cancelBtn.forEach((btn) => btn.addEventListener('click', backdropHandler));

confirmBtn.addEventListener('click', inputHandler);

taskLists.forEach((item) => {
  item.addEventListener('click', (event) => {
    const p = event.target.closest('p');
    if (p) {
      headingText.textContent = p.textContent;
      infoPopup();
    }
  });
});

taskLists.forEach((taskList) => {
  taskList.addEventListener('click', (event) => {
    if (event.target.tagName === 'ION-ICON') {
      const icon = event.target;
      const button = icon.parentNode;
      const div = button.parentNode;
      const li = div.parentNode;
      const ul = li.parentNode;
      if (icon.name === 'trash') {
        ul.removeChild(li);
      } else if (icon.name === 'create') {
        editTaskHandler();
        editBtn.addEventListener('click', function () {
          const div = li.firstElementChild;
          let p = div.firstElementChild;
          inputVal = EditInput.value;
          if (inputVal == '') {
            alert('please enter task');
            return;
          } else {
            p.textContent = inputVal;
            inputVal = '';
            closeInfo();
          }
        });
      }
    }
  });
});

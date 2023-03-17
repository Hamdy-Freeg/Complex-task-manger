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
const notStarted = document.getElementById('notStartedContainer');
const inProgress = document.getElementById('inProgressContainer');
const completed = document.getElementById('CompletedContainer');
let drag;
let notStartedArr = [];
let inProgressArr = [];
let completedArr = [];

chekingTasks(notStartedArr);
chekingTasks(inProgressArr);
chekingTasks(completedArr);
getDataFormLocalStorage();

function chekingTasks(array) {
  if (array === notStartedArr) {
    if (localStorage.getItem('notStarted')) {
      notStartedArr = JSON.parse(localStorage.getItem('notStarted'));
    }
  }
  if (array === inProgressArr) {
    if (localStorage.getItem('inProgress')) {
      inProgressArr = JSON.parse(localStorage.getItem('inProgress'));
    }
  }
  if (array === completedArr) {
    if (localStorage.getItem('completed')) {
      completedArr = JSON.parse(localStorage.getItem('completed'));
    }
  }
}

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
    <li  draggable="true" class="taskItem">
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
  } else if (select.value == 'notStarted') {
    listContent(0);
    addToArray(inputVal, 'notStarted');
    inputVal === '';
  } else if (select.value == 'inProgress') {
    listContent(1);
    addToArray(inputVal, 'inProgress');
    inputVal === '';
  } else {
    listContent(2);
    addToArray(inputVal, 'completed');
    inputVal === '';
  }
  backdropHandler();
}

function addToArray(taskText, status) {
  const task = {
    id: Date.now(),
    title: taskText,
    status: status,
  };
  if (task.status === 'notStarted') {
    notStartedArr.push(task);
    addDataToLocalStorageFrom(notStartedArr, task.status);
  } else if (task.status === 'inProgress') {
    inProgressArr.push(task);
    addDataToLocalStorageFrom(inProgressArr, task.status);
  } else {
    completedArr.push(task);
    addDataToLocalStorageFrom(completedArr, task.status);
  }
  getDataFormLocalStorage(status);
}

function addDataToLocalStorageFrom(arr, task) {
  window.localStorage.setItem(task, JSON.stringify(arr));
}

function getDataFormLocalStorage() {
  let data = window.localStorage.getItem('notStarted');
  let data2 = window.localStorage.getItem('inProgress');
  let data3 = window.localStorage.getItem('completed');
  if (data) {
    let task = JSON.parse(data);
    console.log(task);
  }
  if (data2) {
    let task = JSON.parse(data2);
    console.log(task);
  }
  if (data3) {
    let task = JSON.parse(data3);
    console.log(task);
  }
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

taskLists.forEach((list) => {
  list.addEventListener('dragstart', (event) => {
    if (event.target.tagName === 'LI') {
      li = event.target;
      drag = li;
      li.style.opacity = '0.5';
    }
  });

  list.addEventListener('dragend', (event) => {
    if (event.target.tagName === 'LI') {
      li = event.target;
      drag = null;
      li.style.opacity = '1';
    }
  });
  taskLists.forEach((listBox) => {
    listBox.addEventListener('dragover', function (event) {
      event.preventDefault();
      listBox.style.backgroundColor = '#01876f';
    });
    listBox.addEventListener('dragleave', function () {
      listBox.style.backgroundColor = '#009578';
    });
    listBox.addEventListener('drop', function () {
      listBox.append(drag);
      listBox.style.backgroundColor = '#009578';
    });
  });
});

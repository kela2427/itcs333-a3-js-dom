document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#todo-form');
  const input = document.querySelector('#todo-input');
  const errorMsg = document.querySelector('#error-msg');
  const todoList = document.querySelector('#todo-list');
  const counter = document.querySelector('#counter');

  const filterAll = document.querySelector('#filter-all');
  const filterActive = document.querySelector('#filter-active');
  const filterDone = document.querySelector('#filter-done');

  let currentFilter = 'all';

  function updateUI() {
    const items = todoList.querySelectorAll('li');
    let activeCount = 0;

    for (let i = 0; i < items.length; i++) {
      const li = items[i];
      const isCompleted = li.classList.contains('completed');

      if (!isCompleted) {
        activeCount++;
      }

      if (currentFilter === 'all') {
        li.style.display = 'flex'; 
      } else if (currentFilter === 'active') {
        li.style.display = isCompleted ? 'none' : 'flex';
      } else if (currentFilter === 'done') {
        li.style.display = isCompleted ? 'flex' : 'none';
      }
    }

    if (activeCount === 1) {
      counter.textContent = '1 item left';
    } else {
      counter.textContent = activeCount + ' items left';
    }
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const textValue = input.value.trim();

    if (textValue === '') {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = textValue;
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    input.value = '';
    updateUI(); 
  });

  input.addEventListener('input', function() {
    if (input.value.trim() !== '') {
      errorMsg.classList.add('hidden');
    }
  });

  todoList.addEventListener('click', function(e) {
    const target = e.target;
    const li = target.closest('li');

    if (!li) return;

    if (target.classList.contains('delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }
    updateUI(); 
  });

  filterAll.addEventListener('click', function() {
    currentFilter = 'all';
    filterAll.classList.add('active');
    filterActive.classList.remove('active');
    filterDone.classList.remove('active');
    updateUI();
  });

  filterActive.addEventListener('click', function() {
    currentFilter = 'active';
    filterAll.classList.remove('active');
    filterActive.classList.add('active');
    filterDone.classList.remove('active');
    updateUI();
  });

  filterDone.addEventListener('click', function() {
    currentFilter = 'done';
    filterAll.classList.remove('active');
    filterActive.classList.remove('active');
    filterDone.classList.add('active');
    updateUI();
  });

  filterAll.classList.add('active');
  updateUI();
});
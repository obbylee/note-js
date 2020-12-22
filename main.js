const addBtn = document.querySelector('#add');

const getNoteLocal = JSON.parse(localStorage.getItem('notes'));

if (getNoteLocal) {
    getNoteLocal.forEach( note => {
        addNewNote(note);
    });
}

addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(text = "") {

    const item = document.createElement('div');
    item.classList.add('note');
    item.innerHTML = `
        <div class="notes">
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ?  '':'hidden'}"></div>
        <textarea class="${text ?  'hidden':''}"></textarea>
        </div>
    `;

    const editBtn = item.querySelector('.edit');
    const deleteBtn= item.querySelector('.delete');
    const main = item.querySelector('.main');
    const textArea = item.querySelector('textarea');
    const editNav = item.querySelector('span');
    textArea.value = text;
    main.innerHTML = marked(text);

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        item.remove();
        updateLocalStorage();
    });

    textArea.addEventListener('input', (e) => {
        const {value} = e.target;
        main.innerHTML = marked(value);
        updateLocalStorage();
    });

    document.body.appendChild(item);
}

function updateLocalStorage() {
    const noteText = document.querySelectorAll('textarea');
    const arr = [];

    noteText.forEach( text => {
        arr.push(text.value);
    });

    localStorage.setItem('notes', JSON.stringify(arr));
}
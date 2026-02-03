document.addEventListener('DOMContentLoaded', () => {
    const memoInput = document.getElementById('memoInput');
    const addBtn = document.getElementById('addBtn');
    const memoList = document.getElementById('memoList');

    // Load memos from local storage
    let memos = JSON.parse(localStorage.getItem('memos')) || [];

    function saveMemos() {
        localStorage.setItem('memos', JSON.stringify(memos));
    }

    function renderMemos() {
        memoList.innerHTML = '';
        memos.forEach((memo, index) => {
            const li = document.createElement('li');
            li.className = 'memo-item';
            
            const content = document.createElement('div');
            content.className = 'memo-content';
            content.textContent = memo.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.ariaLabel = 'Delete memo';
            deleteBtn.onclick = () => deleteMemo(index);

            li.appendChild(content);
            li.appendChild(deleteBtn);
            memoList.prepend(li); // Newest first
        });
    }

    function addMemo() {
        const text = memoInput.value.trim();
        if (text) {
            const newMemo = {
                id: Date.now(),
                text: text,
                date: new Date().toISOString()
            };
            memos.push(newMemo);
            saveMemos();
            renderMemos();
            memoInput.value = '';
            memoInput.focus();
        }
    }

    function deleteMemo(index) {
        if (confirm('Delete this note?')) {
            memos.splice(index, 1);
            saveMemos();
            renderMemos();
        }
    }

    addBtn.addEventListener('click', addMemo);

    memoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addMemo();
        }
    });

    // Initial render
    renderMemos();
});

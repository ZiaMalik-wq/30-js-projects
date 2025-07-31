class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.initEventListeners();
        this.render();
    }

    initEventListeners() {
        const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const clearCompletedBtn = document.getElementById('clearCompleted');
        const taskList = document.getElementById('taskList');
        const filterButtons = document.querySelector('.filter-buttons');

        // Add task
        addBtn.addEventListener('click', () => this.addTask());
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Clear completed
        clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        // Event Delegation for task actions (toggle and delete)
        taskList.addEventListener('click', (e) => {
            const target = e.target;
            const taskItem = target.closest('.task-item');
            if (!taskItem) return;

            const taskId = Number(taskItem.dataset.id);

            if (target.closest('.delete-btn')) {
                this.deleteTask(taskId);
            } else { // Click on checkbox or text
                this.toggleTask(taskId);
            }
        });

        // Filter buttons
        filterButtons.addEventListener('click', (e) => {
            if (e.target.matches('.filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            }
        });
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const text = taskInput.value.trim();

        if (!text) {
            this.showNotification('Please enter a task!', 'error');
            taskInput.focus();
            return;
        }

        const task = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
        };

        this.tasks.unshift(task);
        taskInput.value = '';
        this.saveTasks();
        this.render();
        this.showNotification('Task added successfully!', 'success');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.render();
            this.showNotification('Task deleted!', 'info');
        }
    }

    clearCompleted() {
        const completedCount = this.tasks.filter(t => t.completed).length;
        if (completedCount === 0) return;

        if (confirm(`Are you sure you want to clear ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.render();
            this.showNotification(`${completedCount} completed tasks cleared!`, 'info');
        }
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(t => !t.completed);
            case 'completed':
                return this.tasks.filter(t => t.completed);
            default: // 'all'
                return this.tasks;
        }
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const active = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('activeTasks').textContent = active;
        document.getElementById('completedTasks').textContent = completed;

        const clearBtn = document.getElementById('clearCompleted');
        clearBtn.disabled = completed === 0;
    }

    render() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            const emptyMessage = {
                all: { title: 'No tasks yet', text: 'Add a new task to get started!' },
                active: { title: 'No active tasks', text: 'Great job!' },
                completed: { title: 'No completed tasks yet', text: 'Keep going!' }
            };
            const { title, text } = emptyMessage[this.currentFilter];

            taskList.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 100 100" fill="currentColor">
                        <path d="M50 10 L60 40 L90 40 L68 58 L78 88 L50 70 L22 88 L32 58 L10 40 L40 40 Z"/>
                    </svg>
                    <h3>${title}</h3>
                    <p>${text}</p>
                </div>
            `;
        } else {
            taskList.innerHTML = filteredTasks.map(task => `
                <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <input type="checkbox" id="task-${task.id}" class="visually-hidden" ${task.completed ? 'checked' : ''}>
                    <label for="task-${task.id}" class="task-checkbox-label" aria-label="Toggle task completion"></label>
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-date">${task.createdAt}</div>
                    <button class="delete-btn" aria-label="Delete task: ${this.escapeHtml(task.text)}">×</button>
                </div>
            `).join('');
        }

        this.updateStats();
    }

    escapeHtml(text) {
        return text
            .replace(/&/g, "&") 
            .replace(/</g, "<")
            .replace(/>/g, ">")
            .replace(/"/g, "\"")
            .replace(/'/g, "'");
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = `notification ${type}`; // Use classes for styling

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('slide-out');
            notification.addEventListener('animationend', () => {
                document.body.removeChild(notification);
            });
        }, 2500);
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasksJSON = localStorage.getItem('todoTasks');
        if (!tasksJSON) return [];
        try {
            return JSON.parse(tasksJSON);
        } catch (e) {
            console.error("Error parsing tasks from localStorage", e);
            return []; // Return empty array if data is corrupted
        }
    }
}

// Initialize the app
const todoApp = new TodoApp();
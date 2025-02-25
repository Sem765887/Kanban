new Vue({
    el: '#app',
    data: {
        showForm: false,
        showReturnForm: false,
        returnReason: '',
        editIndex: null,
        currentArray: null,
        newTask: {
            title: '',
            description: '',
            deadline: ''
        },
        tasks: [], // Задачи
        plannedTasks: [], // Запланированные задачи
        inProgressTasks: [], // Задачи в работе
        testingTasks: [], // Тестирование
        completedTasks: [] // Выполненные задачи
    },
          }
            }
            this.cancelEdit();
            this.saveData();
        },
        cancelEdit() {
            this.editIndex = null;
            this.currentArray = null;
            this.newTask = { title: '', description: '', deadline: '' };
        },
        openReturnForm(index) {
            this.returnIndex = index;
            this.showReturnForm = true;
        },
        closeReturnForm() {
            this.showReturnForm = false;
            this.returnReason = '';
        },
        returnTaskToInProgress() {
            const task = this.testingTasks[this.returnIndex];
            if (task) {
                task.returnReason = this.returnReason;
                task.status = 'Возвращено в работу';
                task.lastEditedAt = new Date().toLocaleString();
                this.inProgressTasks.push(task);
                this.testingTasks.splice(this.returnIndex, 1);
            }
            this.closeReturnForm();
            this.saveData();
        },
        moveToPlanned(index) {
            const task = this.tasks.splice(index, 1)[0];
            this.plannedTasks.push(task);
            this.saveData();
        },
        moveToInProgress(index) {
            const task = this.plannedTasks.splice(index, 1)[0];
            this.inProgressTasks.push(task);
            this.saveData();
        },
        moveToTesting(index) {
            const task = this.inProgressTasks.splice(index, 1)[0];
            this.testingTasks.push(task);
            this.saveData();
        },
        moveToCompleted(index) {
            const task = this.testingTasks.splice(index, 1)[0];
            task.status = 'Выполнено';
            this.completedTasks.push(task);
            this.saveData();
        },
        saveData() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            localStorage.setItem('plannedTasks', JSON.stringify(this.plannedTasks));
            localStorage.setItem('inProgressTasks', JSON.stringify(this.inProgressTasks));
            localStorage.setItem('testingTasks', JSON.stringify(this.testingTasks));
            localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
        },
        loadData() {
            this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            this.plannedTasks = JSON.parse(localStorage.getItem('plannedTasks')) || [];
            this.inProgressTasks = JSON.parse(localStorage.getItem('inProgressTasks')) || [];
            this.testingTasks = JSON.parse(localStorage.getItem('testingTasks')) || [];
            this.completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        }
    },
    created() {
        this.loadData();
    }
});
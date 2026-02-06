// Основные функции для работы платформы

// Инициализация данных при первом запуске
function initializeData() {
    // Проверяем, инициализированы ли данные
    if (!localStorage.getItem('dataInitialized')) {
        console.log('Инициализация данных...');
        
        // Инициализируем данные из data.js
        initializeTasks();
        initializeShopItems();
        initializeHistory();
        initializeRatingData();
        
        // Устанавливаем флаг инициализации
        localStorage.setItem('dataInitialized', 'true');
        
        // Создаем тестового пользователя
        const testUser = {
            username: 'testuser',
            password: 'test123',
            fullName: 'Иван Петров',
            class: '10А',
            role: 'student',
            balance: 500,
            isLoggedIn: false,
            registrationDate: '2026-01-01'
        };
        
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(testUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        console.log('Данные успешно инициализированы');
    }
}

// Загрузка данных пользователя
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        // Обновляем имя пользователя на странице
        const userNameElements = document.querySelectorAll('#userName');
        userNameElements.forEach(element => {
            if (element) element.textContent = user.fullName;
        });
        
        // Обновляем баланс на странице
        const balanceElements = document.querySelectorAll('#userBalance');
        balanceElements.forEach(element => {
            if (element) element.textContent = user.balance;
        });
        
        return user;
    }
    return null;
}

// Обновление статистики
function updateStats() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const activeTasks = tasks.filter(task => task.status === 'active').length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    
    // Обновляем счетчики на главной странице
    const activeTasksElement = document.getElementById('activeTasks');
    const completedTasksElement = document.getElementById('completedTasks');
    
    if (activeTasksElement) activeTasksElement.textContent = activeTasks;
    if (completedTasksElement) completedTasksElement.textContent = completedTasks;
    
    // Обновляем общее количество монет (можно расширить для расчета из истории)
    const user = loadUserData();
    if (user) {
        const totalCoinsElement = document.getElementById('totalCoins');
        if (totalCoinsElement) totalCoinsElement.textContent = user.balance;
    }
}

// Загрузка активных задач на главной странице
function loadActiveTasksForHome() {
    const tasksList = document.getElementById('activeTasksList');
    if (!tasksList) return;
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const activeTasks = tasks.filter(task => task.status === 'active').slice(0, 3);
    
    tasksList.innerHTML = '';
    
    activeTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';
        taskElement.innerHTML = `
            <div class="task-info">
                <div class="task-subject">${task.subject}</div>
                <div class="task-description">${task.description}</div>
                <div class="task-meta">
                    <span>Награда: <strong>${task.reward} <i class="fas fa-coins"></i></strong></span>
                    <span>Добавлено: ${task.dateAdded}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-primary" onclick="completeTask('${task.id}')">Выполнить</button>
                <button class="btn-secondary">Подробнее</button>
            </div>
        `;
        tasksList.appendChild(taskElement);
    });
}

// Загрузка всех задач
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const activeTasks = tasks.filter(task => task.status === 'active');
    const completedTasks = tasks.filter(task => task.status === 'completed');
    
    // Загружаем активные задачи
    const activeTasksGrid = document.getElementById('activeTasksGrid');
    if (activeTasksGrid) {
        activeTasksGrid.innerHTML = '';
        
        activeTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-card';
            taskElement.innerHTML = `
                <div class="task-card-header">
                    <div class="task-card-subject">${task.subject}</div>
                    <div class="task-card-reward">${task.reward} <i class="fas fa-coins"></i></div>
                </div>
                <div class="task-card-description">${task.description}</div>
                <div class="task-card-footer">
                    <div class="task-card-date">Добавлено: ${task.dateAdded}</div>
                    <div class="task-actions">
                        <button class="btn-primary" onclick="completeTask('${task.id}')">Выполнить</button>
                    </div>
                </div>
            `;
            activeTasksGrid.appendChild(taskElement);
        });
    }
    
    // Загружаем выполненные задачи
    const completedTasksGrid = document.getElementById('completedTasksGrid');
    if (completedTasksGrid) {
        completedTasksGrid.innerHTML = '';
        
        completedTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-card completed';
            taskElement.innerHTML = `
                <div class="task-card-header">
                    <div class="task-card-subject">${task.subject}</div>
                    <div class="task-card-reward">${task.reward} <i class="fas fa-coins"></i></div>
                </div>
                <div class="task-card-description">${task.description}</div>
                <div class="task-card-footer">
                    <div class="task-card-date">Выполнено: ${task.completedDate || task.dateAdded}</div>
                    <div class="task-actions">
                        <button class="btn-secondary" disabled>Выполнено</button>
                    </div>
                </div>
            `;
            completedTasksGrid.appendChild(taskElement);
        });
    }
}

// Загрузка товаров магазина
function loadShopItems() {
    const shopGrid = document.getElementById('shopGrid');
    if (!shopGrid) return;
    
    const shopItems = JSON.parse(localStorage.getItem('shopItems')) || defaultShopItems;
    
    shopGrid.innerHTML = '';
    
    shopItems.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = `product-card ${item.featured ? 'featured' : ''}`;
        productElement.setAttribute('data-category', item.category);
        
        let badgeHTML = '';
        if (item.badge) {
            badgeHTML = `<div class="product-badge">${item.badge}</div>`;
        }
        
        productElement.innerHTML = `
            ${badgeHTML}
            <div class="product-category">${item.category}</div>
            <div class="product-title">${item.title}</div>
            <div class="product-description">${item.description}</div>
            <div class="product-price">${item.price} <i class="fas fa-coins"></i></div>
            <div class="product-actions">
                <button class="btn-primary" onclick="openPurchaseModal('${item.id}')">Купить</button>
                <button class="btn-secondary">Подробнее</button>
            </div>
        `;
        
        shopGrid.appendChild(productElement);
    });
}

// Загрузка истории активности
function loadHistory() {
    const historyItems = JSON.parse(localStorage.getItem('history')) || defaultHistory;
    
    // Загружаем зачисления
    const enrollmentsList = document.getElementById('enrollmentsList');
    if (enrollmentsList) {
        const enrollments = historyItems.filter(item => item.type === 'income');
        enrollmentsList.innerHTML = '';
        
        enrollments.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = 'history-item';
            historyElement.innerHTML = `
                <div class="history-info">
                    <div class="history-title">${item.title}</div>
                    <div class="history-date">${item.date}</div>
                </div>
                <div class="history-amount income">+${item.amount} <i class="fas fa-coins"></i></div>
            `;
            enrollmentsList.appendChild(historyElement);
        });
    }
    
    // Загружаем траты
    const expensesList = document.getElementById('expensesList');
    if (expensesList) {
        const expenses = historyItems.filter(item => item.type === 'expense');
        expensesList.innerHTML = '';
        
        expenses.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = 'history-item';
            historyElement.innerHTML = `
                <div class="history-info">
                    <div class="history-title">${item.title}</div>
                    <div class="history-date">${item.date}</div>
                </div>
                <div class="history-amount expense">-${item.amount} <i class="fas fa-coins"></i></div>
            `;
            expensesList.appendChild(historyElement);
        });
    }
    
    // Загружаем всю историю
    const allHistoryList = document.getElementById('allHistoryList');
    if (allHistoryList) {
        allHistoryList.innerHTML = '';
        
        historyItems.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = 'history-item';
            historyElement.innerHTML = `
                <div class="history-info">
                    <div class="history-title">${item.title}</div>
                    <div class="history-date">${item.date}</div>
                </div>
                <div class="history-amount ${item.type}">${item.type === 'income' ? '+' : '-'}${item.amount} <i class="fas fa-coins"></i></div>
            `;
            allHistoryList.appendChild(historyElement);
        });
    }
}

// Загрузка рейтингов
function loadRatingData() {
    // Загружаем рейтинг классов
    const classRatingBody = document.getElementById('classRatingBody');
    if (classRatingBody) {
        const classRating = JSON.parse(localStorage.getItem('classRating')) || defaultClassRating;
        classRatingBody.innerHTML = '';
        
        classRating.forEach((classItem, index) => {
            const rowElement = document.createElement('div');
            rowElement.className = 'rating-row';
            rowElement.innerHTML = `
                <div class="rating-position">${index + 1}</div>
                <div class="rating-class">${classItem.class}</div>
                <div class="rating-coins">${classItem.coins} <i class="fas fa-coins"></i></div>
                <div class="rating-tasks">${classItem.tasksCompleted}</div>
                <div class="rating-volunteers">${classItem.volunteers}</div>
            `;
            classRatingBody.appendChild(rowElement);
        });
    }
    
    // Загружаем рейтинг учеников
    const studentRatingBody = document.getElementById('studentRatingBody');
    if (studentRatingBody) {
        const studentRating = JSON.parse(localStorage.getItem('studentRating')) || defaultStudentRating;
        studentRatingBody.innerHTML = '';
        
        studentRating.forEach((student, index) => {
            const rowElement = document.createElement('div');
            rowElement.className = 'rating-row';
            rowElement.innerHTML = `
                <div class="rating-position">${index + 1}</div>
                <div class="rating-name">${student.name}</div>
                <div class="rating-class">${student.class}</div>
                <div class="rating-coins">${student.coins} <i class="fas fa-coins"></i></div>
                <div class="rating-tasks">${student.tasksCompleted}</div>
            `;
            studentRatingBody.appendChild(rowElement);
        });
    }
    
    // Загружаем рейтинг волонтеров
    const volunteerRatingBody = document.getElementById('volunteerRatingBody');
    if (volunteerRatingBody) {
        const volunteerRating = JSON.parse(localStorage.getItem('volunteerRating')) || defaultVolunteerRating;
        volunteerRatingBody.innerHTML = '';
        
        volunteerRating.forEach((volunteer, index) => {
            const rowElement = document.createElement('div');
            rowElement.className = 'rating-row';
            rowElement.innerHTML = `
                <div class="rating-position">${index + 1}</div>
                <div class="rating-name">${volunteer.name}</div>
                <div class="rating-class">${volunteer.class}</div>
                <div class="rating-hours">${volunteer.hours}</div>
                <div class="rating-projects">${volunteer.projects}</div>
            `;
            volunteerRatingBody.appendChild(rowElement);
        });
    }
}

// Инициализация вкладок
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех кнопок
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Скрываем все вкладки
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Показываем выбранную вкладку
            const activeTab = document.getElementById(tabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

// Инициализация фильтров магазина
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Убираем активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Фильтруем товары
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Инициализация модального окна покупки
function initPurchaseModal() {
    const modal = document.getElementById('purchaseModal');
    const closeBtn = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelPurchaseBtn');
    
    if (!modal) return;
    
    let currentProductId = null;
    
    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Подтверждение покупки
    const confirmBtn = document.getElementById('confirmPurchaseBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            if (currentProductId) {
                purchaseProduct(currentProductId);
                modal.style.display = 'none';
            }
        });
    }
}

// Открытие модального окна покупки
function openPurchaseModal(productId) {
    const modal = document.getElementById('purchaseModal');
    const shopItems = JSON.parse(localStorage.getItem('shopItems')) || defaultShopItems;
    const product = shopItems.find(item => item.id === productId);
    
    if (!product || !modal) return;
    
    // Устанавливаем текущий товар
    window.currentProductId = productId;
    
    // Заполняем данные в модальном окне
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = product.price;
    
    // Получаем баланс пользователя
    const user = loadUserData();
    if (user) {
        document.getElementById('modalBalance').textContent = user.balance;
    }
    
    // Показываем модальное окно
    modal.style.display = 'flex';
}

// Покупка товара
function purchaseProduct(productId) {
    const shopItems = JSON.parse(localStorage.getItem('shopItems')) || defaultShopItems;
    const product = shopItems.find(item => item.id === productId);
    
    if (!product) {
        alert('Товар не найден!');
        return;
    }
    
    // Получаем данные пользователя
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert('Пожалуйста, войдите в систему!');
        return;
    }
    
    // Проверяем баланс
    if (user.balance < product.price) {
        alert('Недостаточно монет для покупки!');
        return;
    }
    
    // Вычитаем стоимость товара
    user.balance -= product.price;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Обновляем баланс на странице
    const balanceElements = document.querySelectorAll('#userBalance');
    balanceElements.forEach(element => {
        if (element) element.textContent = user.balance;
    });
    
    // Добавляем запись в историю
    const historyItems = JSON.parse(localStorage.getItem('history')) || defaultHistory;
    const newHistoryItem = {
        id: 'hist_' + Date.now(),
        title: `Покупка: ${product.title}`,
        type: 'expense',
        amount: product.price,
        date: new Date().toISOString().split('T')[0]
    };
    
    historyItems.unshift(newHistoryItem);
    localStorage.setItem('history', JSON.stringify(historyItems));
    
    // Обновляем историю на странице, если она открыта
    if (window.location.pathname.includes('history.html')) {
        loadHistory();
    }
    
    alert(`Вы успешно купили "${product.title}" за ${product.price} монет!`);
}

// Выполнение задачи
function completeTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
        alert('Задача не найдена!');
        return;
    }
    
    const task = tasks[taskIndex];
    
    // Помечаем задачу как выполненную
    tasks[taskIndex].status = 'completed';
    tasks[taskIndex].completedDate = new Date().toISOString().split('T')[0];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Начисляем монеты пользователю
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        user.balance += task.reward;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Обновляем баланс на странице
        const balanceElements = document.querySelectorAll('#userBalance');
        balanceElements.forEach(element => {
            if (element) element.textContent = user.balance;
        });
    }
    
    // Добавляем запись в историю
    const historyItems = JSON.parse(localStorage.getItem('history')) || defaultHistory;
    const newHistoryItem = {
        id: 'hist_' + Date.now(),
        title: `Задание: ${task.subject}`,
        type: 'income',
        amount: task.reward,
        date: new Date().toISOString().split('T')[0]
    };
    
    historyItems.unshift(newHistoryItem);
    localStorage.setItem('history', JSON.stringify(historyItems));
    
    // Обновляем статистику
    updateStats();
    
    // Обновляем список задач
    if (window.location.pathname.includes('index.html')) {
        loadActiveTasksForHome();
    } else if (window.location.pathname.includes('tasks.html')) {
        loadTasks();
    }
    
    alert(`Задание "${task.subject}" выполнено! Вы получили ${task.reward} монет.`);
}

// Функция выхода из системы
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем данные пользователя, если пользователь авторизован
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const isAuthPage = window.location.pathname.includes('login.html') || 
                      window.location.pathname.includes('register.html');
    
    if (!user && !isAuthPage) {
        // Если пользователь не авторизован и это не страница авторизации, перенаправляем на страницу входа
        window.location.href = 'login.html';
    } else if (user) {
        // Если пользователь авторизован, загружаем его данные
        loadUserData();
        
        // Если это страница авторизации, перенаправляем на главную
        if (isAuthPage) {
            window.location.href = 'index.html';
        }
    }
    
    // Добавляем обработчик кнопки выхода
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        if (!btn.hasAttribute('href')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
        }
    });
});
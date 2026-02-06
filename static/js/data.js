// Данные для инициализации приложения

// Список задач по умолчанию
const defaultTasks = [
    {
        id: 'task_1',
        subject: 'Волонтерство в библиотеке',
        description: 'Помочь в организации книг в школьной библиотеке',
        reward: 50,
        status: 'active',
        dateAdded: '2026-01-03'
    },
    {
        id: 'task_2',
        subject: 'Экологический десант',
        description: 'Уборка территории школы и прилегающей площади',
        reward: 80,
        status: 'active',
        dateAdded: '2026-01-04'
    },
    {
        id: 'task_3',
        subject: 'Помощь в организации мероприятия',
        description: 'Помощь в подготовке и проведении школьного концерта',
        reward: 100,
        status: 'active',
        dateAdded: '2026-01-05'
    },
    {
        id: 'task_4',
        subject: 'Учебное волонтерство',
        description: 'Помощь отстающим ученикам по математике',
        reward: 70,
        status: 'active',
        dateAdded: '2026-01-05'
    },
    {
        id: 'task_5',
        subject: 'Спортивное волонтерство',
        description: 'Помощь в организации школьных соревнований',
        reward: 60,
        status: 'completed',
        dateAdded: '2026-01-02',
        completedDate: '2026-01-03'
    },
    {
        id: 'task_6',
        subject: 'Творческое волонтерство',
        description: 'Изготовление декораций для школьного театра',
        reward: 90,
        status: 'completed',
        dateAdded: '2026-01-01',
        completedDate: '2026-01-04'
    }
];

// Товары для магазина
const defaultShopItems = [
    {
        id: 'item_1',
        title: 'НАБОР РУЧЕК',
        description: 'Набор из 10 цветных гелевых ручек',
        price: 50,
        category: 'school',
        featured: true
    },
    {
        id: 'item_2',
        title: 'БЛОКНОТ ПРЕМИУМ',
        description: 'Качественный блокнот в твердой обложке',
        price: 120,
        category: 'school',
        badge: 'Хит'
    },
    {
        id: 'item_3',
        title: 'ПРОПУСК ОЧЕРЕДИ',
        description: 'Возможность пройти в столовую без очереди на неделю',
        price: 200,
        category: 'privileges'
    },
    {
        id: 'item_4',
        title: 'БЕСПЛАТНЫЙ ОБЕД',
        description: 'Обед в столовой за счет школы',
        price: 150,
        category: 'services',
        featured: true
    },
    {
        id: 'item_5',
        title: 'ЭКСКУРСИЯ В МУЗЕЙ',
        description: 'Билет на школьную экскурсию в городской музей',
        price: 300,
        category: 'services'
    },
    {
        id: 'item_6',
        title: 'МЕСТО НА ПАРКОВКЕ',
        description: 'Закрепленное место на школьной парковке на месяц',
        price: 500,
        category: 'privileges',
        badge: 'VIP'
    },
    {
        id: 'item_7',
        title: 'ПОМОЩЬ РЕПЕТИТОРА',
        description: 'Индивидуальное занятие с репетитором по выбранному предмету',
        price: 400,
        category: 'services'
    },
    {
        id: 'item_8',
        title: 'ШКОЛЬНАЯ ФУТБОЛКА',
        description: 'Футболка с логотипом школы',
        price: 250,
        category: 'other'
    },
    {
        id: 'item_9',
        title: 'БИЛЕТ В КИНО',
        description: 'Билет в кинотеатр на премьеру фильма',
        price: 350,
        category: 'other',
        featured: true
    },
    {
        id: 'item_10',
        title: 'МАСТЕР-КЛАСС',
        description: 'Участие в мастер-классе от приглашенного специалиста',
        price: 450,
        category: 'services'
    },
    {
        id: 'item_11',
        title: 'КНИГА С АВТОГРАФОМ',
        description: 'Книга от писателя с личным автографом',
        price: 600,
        category: 'other'
    },
    {
        id: 'item_12',
        title: 'СЕРТИФИКАТ В КАФЕ',
        description: 'Сертификат на посещение кафе на 500 рублей',
        price: 400,
        category: 'other'
    }
];

// История активности по умолчанию
const defaultHistory = [
    {
        id: 'hist_1',
        title: 'ТЕСТ: МАТЕМАТИКА',
        type: 'income',
        amount: 30,
        date: '2026-01-05'
    },
    {
        id: 'hist_2',
        title: 'ЗАДАНИЕ: ИСТОРИЯ',
        type: 'income',
        amount: 80,
        date: '2026-01-04'
    },
    {
        id: 'hist_3',
        title: 'ПРЕЗЕНТАЦИЯ',
        type: 'income',
        amount: 70,
        date: '2026-01-04'
    },
    {
        id: 'hist_4',
        title: 'ЗАДАНИЕ: ИСТОРИЯ',
        type: 'income',
        amount: 40,
        date: '2026-01-03'
    },
    {
        id: 'hist_5',
        title: 'ОБЕД В СТОЛОВОЙ',
        type: 'expense',
        amount: 30,
        date: '2026-01-05'
    },
    {
        id: 'hist_6',
        title: 'ОБЕД В СТОЛОВОЙ',
        type: 'expense',
        amount: 30,
        date: '2026-01-04'
    },
    {
        id: 'hist_7',
        title: 'ОБЕД В СТОЛОВОЙ',
        type: 'expense',
        amount: 30,
        date: '2026-01-03'
    },
    {
        id: 'hist_8',
        title: 'ОБЕД В СТОЛОВОЙ',
        type: 'expense',
        amount: 30,
        date: '2026-01-02'
    }
];

// Рейтинг классов по умолчанию
const defaultClassRating = [
    {
        class: '11А',
        coins: 2450,
        tasksCompleted: 42,
        volunteers: 15
    },
    {
        class: '10Б',
        coins: 2180,
        tasksCompleted: 38,
        volunteers: 12
    },
    {
        class: '9В',
        coins: 1950,
        tasksCompleted: 35,
        volunteers: 10
    },
    {
        class: '8А',
        coins: 1670,
        tasksCompleted: 29,
        volunteers: 8
    },
    {
        class: '7Б',
        coins: 1420,
        tasksCompleted: 25,
        volunteers: 7
    }
];

// Рейтинг учеников по умолчанию
const defaultStudentRating = [
    {
        name: 'Анна Смирнова',
        class: '11А',
        coins: 520,
        tasksCompleted: 12
    },
    {
        name: 'Иван Петров',
        class: '10Б',
        coins: 500,
        tasksCompleted: 10
    },
    {
        name: 'Мария Иванова',
        class: '9В',
        coins: 480,
        tasksCompleted: 9
    },
    {
        name: 'Алексей Козлов',
        class: '11А',
        coins: 450,
        tasksCompleted: 8
    },
    {
        name: 'Елена Сидорова',
        class: '10Б',
        coins: 420,
        tasksCompleted: 8
    }
];

// Рейтинг волонтеров по умолчанию
const defaultVolunteerRating = [
    {
        name: 'Дмитрий Волков',
        class: '11А',
        hours: 45,
        projects: 8
    },
    {
        name: 'Ольга Новикова',
        class: '10Б',
        hours: 38,
        projects: 7
    },
    {
        name: 'Сергей Михайлов',
        class: '9В',
        hours: 32,
        projects: 6
    },
    {
        name: 'Татьяна Федорова',
        class: '11А',
        hours: 28,
        projects: 5
    },
    {
        name: 'Павел Соколов',
        class: '8А',
        hours: 25,
        projects: 4
    }
];

// Функции инициализации данных
function initializeTasks() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(defaultTasks));
    }
}

function initializeShopItems() {
    if (!localStorage.getItem('shopItems')) {
        localStorage.setItem('shopItems', JSON.stringify(defaultShopItems));
    }
}

function initializeHistory() {
    if (!localStorage.getItem('history')) {
        localStorage.setItem('history', JSON.stringify(defaultHistory));
    }
}

function initializeRatingData() {
    if (!localStorage.getItem('classRating')) {
        localStorage.setItem('classRating', JSON.stringify(defaultClassRating));
    }
    
    if (!localStorage.getItem('studentRating')) {
        localStorage.setItem('studentRating', JSON.stringify(defaultStudentRating));
    }
    
    if (!localStorage.getItem('volunteerRating')) {
        localStorage.setItem('volunteerRating', JSON.stringify(defaultVolunteerRating));
    }
}
import sqlite3

DB_NAME = 'dattabase.db'

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

# --- АВТОРИЗАЦИЯ (И для админов, и для юзеров) ---

def login(username, password):
    """Проверка входа: возвращает роль пользователя или None"""
    conn = get_db_connection()
    user = conn.execute(
        "SELECT id, role, coins FROM users WHERE username = ? AND password_hash = ?", 
        (username, password)
    ).fetchone()
    conn.close()
    return user # Вернет данные пользователя, если логин/пароль верны

# --- РЕЙТИНГ ---

def get_leaderboard():
    """Показывает ТОП-10 игроков"""
    conn = get_db_connection()
    users = conn.execute(
        "SELECT username, coins FROM users WHERE role = 'user' ORDER BY coins DESC LIMIT 10"
    ).fetchall()
    conn.close()
    print("\n🏆 РЕЙТИНГ ИГРОКОВ:")
    for i, u in enumerate(users, 1):
        print(f"{i}. {u['username']} — {u['coins']} коинов")

# --- АДМИН-ПАНЕЛЬ: УПРАВЛЕНИЕ ЗАДАНИЯМИ ---

def add_task(title, reward):
    conn = get_db_connection()
    conn.execute("INSERT INTO tasks (title, reward) VALUES (?, ?)", (title, reward))
    conn.commit()
    conn.close()
    print(f"\n✅ Задание '{title}' добавлено!")

def show_all_tasks():
    conn = get_db_connection()
    tasks = conn.execute("SELECT * FROM tasks").fetchall()
    conn.close()
    print("\n📋 ВСЕ ЗАДАНИЯ В БАЗЕ:")
    for t in tasks:
        print(f"ID: {t['id']} | {t['title']} — {t['reward']} коинов")

# --- СИСТЕМА ПРОВЕРКИ ---

def show_pending_tasks():
    conn = get_db_connection()
    query = '''
        SELECT ct.id, u.username, t.title, t.reward 
        FROM completed_tasks ct
        JOIN users u ON ct.user_id = u.id
        JOIN tasks t ON ct.task_id = t.id
        WHERE ct.status = 'pending'
    '''
    pending = conn.execute(query).fetchall()
    conn.close()
    if not pending:
        print("\n📭 Заявок на проверку нет.")
        return False
    
    for p in pending:
        print(f"ID: {p['id']} | {p['username']} выполнил '{p['title']}'")
    return True

def approve_task(completion_id):
    conn = get_db_connection()
    data = conn.execute('''
        SELECT ct.user_id, t.reward FROM completed_tasks ct 
        JOIN tasks t ON ct.task_id = t.id WHERE ct.id = ?
    ''', (completion_id,)).fetchone()
    
    if data:
        conn.execute("UPDATE users SET coins = coins + ? WHERE id = ?", (data['reward'], data['user_id']))
        conn.execute("UPDATE completed_tasks SET status = 'approved' WHERE id = ?", (completion_id,))
        conn.commit()
        print("💰 Начислено!")
    conn.close()

# --- ГЛАВНЫЙ ИНТЕРФЕЙС ---

def main():
    print("--- ДОБРО ПОЖАЛОВАТЬ ---")
    user_nm = input("Логин: ")
    user_ps = input("Пароль: ")
    
    user = login(user_nm, user_ps)
    
    if user:
        if user['role'] == 'admin':
            print(f"\n⭐ Вход выполнен (АДМИН)")
            while True:
                print("\n1. Проверить задания\n2. Управление задачами\n3. Рейтинг\n0. Выход")
                ch = input("-> ")
                if ch == '1':
                    if show_pending_tasks():
                        cid = input("ID для одобрения: ")
                        approve_task(cid)
                elif ch == '2':
                    show_all_tasks()
                    # Тут можно добавить вызов add_task
                elif ch == '3':
                    get_leaderboard()
                elif ch == '0': break
        else:
            print(f"\n👤 Вход выполнен (ПОЛЬЗОВАТЕЛЬ)")
            print(f"Ваш баланс: {user['coins']} коинов")
            get_leaderboard()
    else:
        print("❌ Ошибка входа")

if __name__ == "__main__":
    main()
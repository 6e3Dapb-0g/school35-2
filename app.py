from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'school35_key'

# Подключаемся к твоей базе dattabase.db
def get_db_connection():
    conn = sqlite3.connect('dattabase.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/rating')
def rating():
    conn = get_db_connection()
    users = conn.execute('SELECT username, coins FROM users WHERE role = "user" ORDER BY coins DESC LIMIT 10').fetchall()
    conn.close()
    return render_template('rating.html', users=users)

@app.route('/signin', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE username = ? AND password = ?', (username, password)).fetchone()
        conn.close()
        if user:
            session['user_id'] = user['id']
            session['username'] = user['username']
            return redirect(url_for('index'))
        return "Ошибка входа!"
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
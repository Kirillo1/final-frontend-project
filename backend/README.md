# Backend - FastAPI Server

## Требования

Перед запуском серверной части проекта необходимо выполнить несколько шагов по установке зависимостей и настройки окружения.

### 1. Установка Python

Для работы с проектом необходимо установить Python версии 3.11. Убедитесь, что у вас установлена эта версия Python, можно проверить командой:

```bash
python --version
```

Если у вас еще не установлен Python 3.11, установите его, следуя официальной инструкции:  
[Установка Python](https://www.python.org/downloads/release/python-311/)

### 2. Установка PostgreSQL

Проект использует PostgreSQL для работы с базой данных. Для установки PostgreSQL следуйте инструкции по ссылке в зависимости от вашей операционной системы:

- [Установка PostgreSQL для Windows](https://www.postgresql.org/download/windows/)
- [Установка PostgreSQL для macOS](https://www.postgresql.org/download/macosx/)
- [Установка PostgreSQL для Linux](https://www.postgresql.org/download/linux/)

После установки PostgreSQL не забудьте создать базу данных, используя следующую команду (замените `your_database_name` на желаемое имя):

```bash
psql -U postgres
CREATE DATABASE your_database_name;
```

### 3. Создание виртуального окружения

Для изоляции зависимостей рекомендуется создать виртуальное окружение. В корневой папке проекта выполните следующие шаги:

```bash
# Создание виртуального окружения
python3 -m venv venv

# Активация виртуального окружения
# Для Windows:
venv\Scripts\activate
# Для macOS/Linux:
source venv/bin/activate
```

### 4. Установка зависимостей

После активации виртуального окружения установите все необходимые зависимости с помощью файла `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 5. Настройка переменных окружения

Для работы с базой данных и другими настройками вам нужно создать файл `.env` в папке `backend/` (есть пример `.env.example`) с такими переменными:

```
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASS=
SECRET_AUTH=''
```

Замените `<username>`, `<password>`, `<database_name>` и `<your_secret_key>` на актуальные значения для вашего проекта.

### 6. Миграции с Alembic

Для управления миграциями базы данных используется Alembic. Следующие шаги помогут вам настроить Alembic и выполнить миграции:

1. Инициализируйте Alembic (если это еще не сделано):

```bash
alembic init alembic
```

2. Настройте файл `alembic.ini`, указав строку подключения к базе данных:

```ini
sqlalchemy.url = postgresql://<username>:<password>@localhost/<database_name>
```

3. Создайте и примените миграции:

```bash
# Создание миграции
alembic revision --autogenerate -m "Initial migration"

# Применение миграции
alembic upgrade head
```

### 7. Запуск серверной части с Uvicorn

После того как все зависимости установлены и миграции выполнены, можно запустить серверную часть с помощью Uvicorn:

```bash
uvicorn app.main:app --reload
```

- `app.main:app` указывает на главный файл с FastAPI приложением.
- Флаг `--reload` используется для автоматической перезагрузки при изменениях в коде (удобно в процессе разработки).

Теперь серверная часть должна быть доступна по адресу [http://localhost:8000](http://localhost:8000).

---

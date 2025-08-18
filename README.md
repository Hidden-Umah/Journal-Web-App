# 📓 Journal Web App

A simple web application where users can sign up, log in, and manage personal journal entries (create, edit, delete, view). Built with Django (backend) and HTML/CSS/JavaScript (frontend).

## 🚀 Features

User authentication (sign up, login, logout)
Dashboard for each user
Create, edit, and delete journal entries
Store entries securely in a database
Simple, responsive frontend
🛠️ Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Django (Python)
Database: SQLite (default)
Version Control: Git + GitHub


## The structure 


 journal_app/
│
├── manage.py
│
└── journal_app/
    ├── __init__.py
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py 


1. ### manage.py
manage.py

This is the project’s control center.
We use it to run commands such as:
python manage.py runserver → start the development server.
python manage.py migrate → apply database changes.
python manage.py createsuperuser → create an admin user.
We will use this file a lot whenever we want to interact with our project.

We will use this file a lot whenever we want to interact with our project.

### journal_app/ (the inner folder with the same name as the project)
This folder contains all the main project configuration files.


### init.py
An empty file that just tells Python this folder is a package.
We normally don’t edit this file.

### settings.py
The heart of the project.
Contains all the configuration settings for the project, such as:
Installed apps
Database connection
Templates and static files (HTML, CSS, JavaScript)
Security and authentication settings
We will be editing this file often as we build our journal app.

### urls.py
Acts like a roadmap for the website.
It decides which page or function should respond to a specific URL.
Example: /login/ goes to the login page, /dashboard/ goes to the dashboard.

### wsgi.py
WSGI means Web Server Gateway Interface.
It is used when we want to deploy our project to a traditional web server such as Apache or Gunicorn.
Not something we use much during development, but very important when hosting the app online.

### asgi.py
ASGI means Asynchronous Server Gateway Interface.
Similar to wsgi.py but more modern and supports real-time features such as chat or WebSockets.
Again, we do not use this much during development, but it is required for deployment.

## Summary:

manage.py: used to run commands and control the project.
settings.py: the configuration file for the entire project.
urls.py: the URL routing system, deciding which view handles which link.
wsgi.py and asgi.py: used for deploying the project to servers.
init.py: marks the folder as a Python package.
With this setup in place, we are ready to start adding our own apps (such as authentication, journal entries, dashboard) and begin building the actual Journal App.
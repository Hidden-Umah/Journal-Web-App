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


journal_app/
│
├── static/                # Holds static assets (CSS, JS, Images)
│   ├── css/               # Stylesheets
│   │   └── style.css
│   ├── js/                # JavaScript files
│   │   └── script.js
│   └── images/            # Images & icons
│       └── logo.png
│
└── templates/             # HTML templates
    ├── base.html          # Base template (layout)
    └── home.html          # Example page





## 📂 templates/

The templates/ folder stores all the HTML files that define the structure of web pages. Django uses its template engine to combine these files with data from views and models, allowing you to generate dynamic content.
Each file inside templates/ is a standard HTML file but may also contain Django Template Language (DTL) tags like {% block %}, {% extends %}, and {{ variable }} for rendering dynamic values.
Templates encourage reusability through template inheritance (e.g., base.html can define the general layout, and other pages like home.html or about.html can extend it).
Example usage:
base.html → main layout (navigation, footer, CSS/JS links).
home.html → content section for the homepage.
contact.html → page for a contact form.
This separation keeps HTML files organized and ensures consistency across the entire site.

## 📂 static/

The static/ folder contains all the static assets that are not generated dynamically but are essential for the frontend. These include:
CSS → Stylesheets that control the look and feel of the website.
JavaScript → Client-side scripts that add interactivity (e.g., form validation, animations).
Images → Graphics, icons, and logos used across the site.

Django serves these files using its built-in static files app during development and collects them into a single location for production (via the collectstatic command).

## 📂 style-guide/

This folder contains the UI/UX design resources, including the recommended fonts and color palette. Please ensure that any styling changes align with these guidelines to maintain design consistency.

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
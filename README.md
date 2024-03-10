## Notekraft

Welcome to Notekraft, a collaborative note-taking web application that revolutionizes how teams work together on notes!

## UI

- Nextjs Framework + Reactjs
- Redux store
- Shadcn components library

### Framework Nextjs

Next.js is a powerful React framework that simplifies the process of building modern web applications by providing a wide range of features and optimizations out of the box. Some features include SSR, auto code splitting, SSG, API routes, etc.

- Run nextjs Project
  $ cd note-kart \n
  $ yarn \n
  $ yarn dev \n

### Shadcn

Shadcn is a powerful UI library designed to streamline the development of web applications by providing a comprehensive set of reusable components and styles.

- Dynamic class generator
  ./src/utils.ts generate class dynamically for Shadcn

### Shadcn Components

All Shadcn components are in /src/components/ui folder

-Dropdown
-Button
-Themeswitcher
-Toast
-Input
-Label

### Notes Editor Quilljs

Quill.js is a modern WYSIWYG (What You See Is What You Get) editor designed for rich text editing in web applications.

## Docker

docker compose up --build

### Auth - NextAuth

Since we are using Nextjs, NextAuth comes with tones of feature which can handle our routes for both server side and client side.
Link- https://next-auth.js.org

-Public Routes
/
/login

-Protected routes
/notes

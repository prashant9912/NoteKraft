## Notekraft

![Notekraft](https://i.imgur.com/4qmGwzN.png)

Welcome to Notekraft, a collaborative note-taking web application that revolutionizes how teams work together on notes!

### Tech Stack
- Nextjs
- Nodejs
- Docker
- AWS S3

### Features

- **Login/Register:** Users can sign up or log in to access their notes.
- **Notes Management:** Create, edit, and delete notes with ease.
- **Notes History:** Access a full history of changes made to each note.
- **Share Notes:** Collaborate by sharing notes with other users via email.
- **Upload File/Image (up to 10MB):** Share files and images along with notes, and uploads to S3.

### Notes Entitlements

- **Owner:** Can edit, delete, share, and revert notes.
- **Editor:** Can edit, delete, and revert notes.
- **Viewer:** Has read-only access to notes.

### UI

#### Framework - Next.js

Next.js is a powerful React framework that simplifies the process of building modern web applications by providing a wide range of features and optimizations out of the box. Some features include server-side rendering (SSR), automatic code splitting, static site generation (SSG), and API routes.

To run the Next.js project:

```bash
cd note-kart
yarn
yarn dev
```

#### Shadcn UI Library

Shadcn is a robust UI library designed to streamline web application development by offering a comprehensive set of reusable components and styles.

- **Dynamic Class Generator:** `./src/utils.ts` dynamically generates classes for Shadcn.

#### Shadcn Components

All Shadcn components are located in the `/src/components/ui` folder and include:

- Dropdown
- Button
- Theme Switcher
- Toast
- Input
- Label
- & More

#### Notes Editor - Quill.js

Quill.js is a modern WYSIWYG (What You See Is What You Get) editor designed for rich text editing in web applications.

### Docker

Run the following command to build and start the Docker container:

```bash
docker-compose up --build
```

### Authentication - NextAuth

NextAuth provides robust authentication capabilities for Next.js projects, handling both server-side and client-side routes seamlessly.

- **Public Routes:**

  - `/`
  - `/auth/login`
  - `/auth/signup`

- **Protected Routes:**
  - `/notes`

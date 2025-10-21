# My Enterprise App

Progressive Web App (PWA) para gestión de proyectos y reportes.  
Desarrollada con **React, TypeScript y Vite**, incluye dashboard, gráficos, exportación de reportes, autenticación y pruebas automatizadas.

---

## 🔧 Tecnologías

| Categoría       | Tecnologías                                    |
|-----------------|-----------------------------------------------|
| Frontend        | React, TypeScript, Vite, React Router, TailwindCSS |
| PWA             | vite-plugin-pwa, Workbox, manifest.json      |
| API / Datos     | Axios, Day.js                                |
| Visualización   | Recharts                                     |
| Exportación     | jsPDF (PDF), XLSX (Excel)                    |
| Autenticación   | JWT, bcrypt, cookies HttpOnly                |
| Estado / Context| React Context (Auth, Theme), optional store  |
| Testing         | Vitest, Testing Library, Cypress (E2E)       |
| Calidad         | ESLint, Prettier                             |

---

## ⚡ Funcionalidades principales

- Dashboard interactivo de proyectos
- Gestión de tareas y progreso
- Gráficos de avance por proyecto
- Exportación de reportes a PDF y Excel
- Autenticación segura con JWT y refresh tokens
- Soporte PWA (instalable en móviles y escritorio)
- Tema oscuro / claro dinámico

---

## 🚀 Instalación

```bash
git clone <repo-url>
cd my-enterprise-app
npm install
npm run dev

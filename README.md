# Task Manager

Kanban-доска для управления задачами.

**Демо:** https://tasks-seven-nu.vercel.app

## Стек

React · TypeScript · Vite · TanStack Query · Tailwind CSS · Mokky.dev

## Запуск

Нужен Node.js 20.19+ или 22.12+.

```bash
git clone https://github.com/abdulshamilov/tasks.git
cd tasks
npm install
cp .env.example .env
```

В `.env` укажите адрес API:

```
VITE_API_URL=
```

Запустите проект:

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Сборка

```bash
npm run build
npm run preview
```
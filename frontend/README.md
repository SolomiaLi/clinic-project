# Clinic System - Single Page Application (Lab 3)

Проєкт складається з React-фронтенду та FastAPI-бекенду.

## Вимоги (Prerequisites)
- Node.js (для фронтенду)
- Python 3.8+ (для бекенду)

## Крок 1. Запуск Бекенду (Python)
1. Відкрийте термінал у папці бекенду.
2. Встановіть залежності:
   pip install fastapi uvicorn pydantic
3. Запустіть сервер:
   uvicorn main:app --reload --port 8080

Бекенд працюватиме на http://localhost:8080

## Крок 2. Запуск Фронтенду (React)
1. Відкрийте новий термінал у папці фронтенду.
2. Встановіть залежності:
   npm install
3. Запустіть додаток:
   npm run dev

Фронтенд буде доступний за адресою http://localhost:8000

## Тестові дані для входу:
- Роль Адміна: `admin@gmail.com` / `1111`
- Роль Юзера: `olesya@mail.com` / `111`



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

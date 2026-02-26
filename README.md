# Todo Application (Next.js + Tailwind CSS)

A clean, responsive Todo application built with Next.js (App Router), React hooks, and Tailwind CSS. Features localStorage persistence, live statistics, and a unique constraint: only one todo can be marked as completed at a time.

## Features
- Add, delete, and toggle completion of todos
- Only one todo can be completed at a time (constraint)
- Live counts: total, completed, pending
- localStorage persistence across page reloads
- Keyboard support: press Enter to add a todo
- Unique IDs for todos using Date.now()
- Minimal, responsive UI with Tailwind CSS

## Tech Stack
- Next.js (App Router)
- React (useState, useEffect)
- Tailwind CSS
- localStorage (client-side persistence)
- JavaScript (no TypeScript)

## Getting Started

Prerequisites:
- Node.js 18+ (recommended)
- npm

Clone and run locally:
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev
```
Open http://localhost:3000 in your browser.

Build and run production:
```bash
npm run build
npm run start
```

## Scripts
- npm run dev — Start development server
- npm run build — Build for production
- npm run start — Start production server
- npm run lint — Run ESLint

## Project Structure
```
app/
  layout.js        # Root layout (default)
  page.js          # Main Todo app (client component)
  globals.css      # Global styles (Tailwind + base styles)
public/
  # assets (optional screenshots)
tailwind.config.js
postcss.config.js
package.json
```

## Core Logic Overview

Persistence (load and save todos):
```jsx
useEffect(() => {
  const saved = localStorage.getItem('todos');
  if (saved) setTodos(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);
```

Add todo:
```jsx
const addTodo = () => {
  if (inputValue.trim() === '') return alert('Please enter a todo');
  setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
  setInputValue('');
};
```

Delete todo:
```jsx
const deleteTodo = (id) => {
  setTodos(todos.filter(t => t.id !== id));
};
```

Enforce “only one completed at a time”:
```jsx
const toggleComplete = (id) => {
  const newTodos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    } else {
      const clickedWillBeCompleted = !todos.find(t => t.id === id)?.completed;
      return clickedWillBeCompleted ? { ...todo, completed: false } : todo;
    }
  });
  setTodos(newTodos);
};
```

Live counts:
```jsx
const totalCount = todos.length;
const completedCount = todos.filter(t => t.completed).length;
const pendingCount = totalCount - completedCount;
```

## Styling

Global styles (app/globals.css) include Tailwind and a gradient background:
```css
@import "tailwindcss";

body {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #f9fafb;
  font-family: system-ui, -apple-system, sans-serif;
}
```

## Usage
- Type a task and press Enter or click “Add Todo”
- Click the checkbox to mark a todo as completed
  - If you check a different todo, the previous one is automatically unchecked
- Click “Delete” to remove a todo
- Counts update automatically; data persists after refresh

## Known Limitations / Future Improvements
- Edit todo text inline
- Filters: All / Active / Completed
- Clear all todos
- Animate list transitions
- Tests (unit/integration)
- Drag-and-drop reordering

## Screenshots
Add your screenshots to public/ and link them here:
```
![App Screenshot](./public/screenshot.png)
```

## Deployment
- Optimized for deployment on Vercel or any Node.js host.
- After pushing to GitHub, connect the repo on Vercel and deploy with defaults.

## License
Add your preferred license (e.g., MIT) here.

## Contact
- Author: Divyansh Agrawal
- GitHub: https://github.com/MrDivyanshAgrawal
- Email: divyansh1001agrawal@gmail.com

---

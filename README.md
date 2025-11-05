# Calendar Component Assignment – Uzence Internship

This project is a custom calendar component developed using React, TypeScript, Tailwind CSS, and Storybook.  
All components were built from scratch without using any external UI libraries. The goal of the assignment was to create a clean, scalable, and accessible user interface.

---

## Live Demo

Deployed Storybook Link:  
https://calender-component-assignment.netlify.app/

---

## Features

- Month and Week view with smooth toggle functionality  
- Add and edit events using a modal interface  
- Events are saved in localStorage for persistence  
- Fully responsive design created with Tailwind CSS  
- Keyboard navigation support for accessibility  
- Focus trap inside modal for better usability  
- Event colors, hover effects, and layout improvements  
- Unit tests included for date utilities and calendar rendering  
- Storybook integration for component documentation and preview

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend Framework | React 18 with TypeScript |
| Styling | Tailwind CSS |
| Build Tool | Vite |
| Component Library | Storybook 10 |
| Testing | Jest and React Testing Library |
| State Management | React Hooks with LocalStorage |
| Deployment | Netlify (static Storybook build) |

---

## Setup and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/calendar-component-assignment.git
   cd calendar-component-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Then open [http://localhost:5173](http://localhost:5173) in your browser.

4. Run Storybook locally:
   ```bash
   npm run storybook
   ```
   Then open [http://localhost:6006](http://localhost:6006).

5. Run unit tests:
   ```bash
   npm test
   ```

---

## Project Structure

```
src/
 ├── components/
 │    └── Calendar/
 │         ├── CalendarView.tsx
 │         ├── MonthView.tsx
 │         ├── WeekView.tsx
 │         ├── CalendarCell.tsx
 │         └── EventModal.tsx
 ├── hooks/
 │    └── useCalendar.ts
 ├── utils/
 │    └── date.utils.ts
 └── styles/
      └── globals.css
```

---

## Accessibility

- Keyboard navigation is supported for moving between days and opening the modal.  
- The modal includes focus trapping and closes with the Escape key.  
- All interactive elements have appropriate ARIA roles and labels.

---

## Testing and Linting

Run unit tests and optional linting:
```bash
npm test
npx eslint src
```

---

## Build and Deployment

To build the optimized app:
```bash
npm run build
npm run preview
```

To build the static Storybook for deployment:
```bash
npm run build-storybook
```

The static files will be generated in the `storybook-static` directory.

---

## Submission Details

Assignment: Calendar Component UI – Uzence Internship  
Author: [Your Name]  
Deployed Link: https://calender-component-assignment.netlify.app/  
Framework: React, TypeScript, Tailwind CSS, Storybook  
Testing: Jest and React Testing Library

---

## Acknowledgment

Thank you to the Uzence team for providing this assignment.  
This project demonstrates my ability to build responsive, accessible, and maintainable React components using TypeScript and modern frontend practices.

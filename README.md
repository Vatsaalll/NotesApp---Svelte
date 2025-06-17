# Notes App - Svelte

A beautiful, responsive note-taking application built with **Svelte**, **TypeScript**, and **TailwindCSS**. Features full CRUD operations, dark/light theme toggle, and a modern design that rivals production applications.

## 🚀 Features

- **Complete CRUD Operations**: Create, read, update, and delete notes
- **Modern UI**: Clean, responsive design with custom components
- **Dark/Light Theme**: Toggle between themes with system preference support
- **Real-time Updates**: Optimistic updates with proper error handling
- **Mobile Responsive**: Works seamlessly on all device sizes
- **Confirmation Modals**: Safe deletion with confirmation dialogs
- **Form Validation**: Client-side validation for better UX
- **Loading States**: Visual feedback during API operations
- **Toast Notifications**: Success and error feedback
- **Smooth Animations**: Fade-in and slide-in animations for better UX

## 🛠️ Tech Stack

- **Svelte 4** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **Lucide Svelte** for icons
- **Mock API** for backend simulation

## 📱 API Setup

This app uses a mock API for demonstration. To set up your own:

1. Go to [mockapi.io](https://mockapi.io)
2. Create a new project
3. Add a resource named `notes` with the following schema:
   ```json
   {
     "id": "string",
     "title": "string", 
     "content": "string",
     "createdAt": "datetime"
   }
   ```
4. Update the `API_BASE_URL` in `src/lib/api.ts` with your endpoint

## 🏃‍♂️ Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

## 🎨 Design Decisions

- **Dark Theme by Default**: Modern applications benefit from darker themes
- **Card-based Layout**: Better visual hierarchy and content organization
- **Responsive Grid**: Adapts from 1 column on mobile to 4 columns on desktop
- **Hover Interactions**: Action buttons appear on hover for cleaner interface
- **Confirmation Dialogs**: Prevents accidental deletions
- **Optimistic Updates**: UI updates immediately for better perceived performance
- **Custom Components**: Reusable Svelte components following design system principles

## 🔧 Architecture

- **Component-based**: Modular Svelte components for maintainability
- **Store Management**: Svelte stores for global state management
- **TypeScript**: Full type safety throughout the application
- **Utility Functions**: Helper functions for common operations
- **Theme System**: Comprehensive dark/light theme implementation

## 🔧 Trade-offs & Assumptions

- **Mock API**: Using mockapi.io for simplicity - in production, you'd use a real backend
- **Client-side Only**: No authentication or user management implemented
- **Basic Error Handling**: Simple error messages - production apps would need more robust error handling
- **No Pagination**: All notes loaded at once - would need pagination for large datasets
- **No Search/Filter**: Not implemented in this version but would be essential for many notes

## ⏰ Future Enhancements

Given more time, I would add:

- **Search and Filter**: Search notes by title/content, filter by date
- **Categories/Tags**: Organize notes with categories
- **Rich Text Editor**: Support for formatting, images, etc.
- **Drag & Drop**: Reorder notes
- **Offline Support**: PWA capabilities with offline sync
- **Export Options**: Export notes as PDF, markdown, etc.
- **Keyboard Shortcuts**: Power user features
- **Auto-save**: Save drafts as user types
- **Note Sharing**: Share notes with others

## 📄 License

MIT License - feel free to use this project as a reference or starting point for your own applications.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TodoOccurrence = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  occurrence: TodoOccurrence;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, occurrence: TodoOccurrence) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text, occurrence) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false, occurrence }],
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
        })),
    }),
    {
      name: 'todo-storage',
    },
  ),
);

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TodoRecurrence = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  recurrence: TodoRecurrence;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, recurrence: TodoRecurrence) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text, recurrence) =>
        set((state) => ({
          todos: [...state.todos, { id: Date.now(), text, completed: false, recurrence }],
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

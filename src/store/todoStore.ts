import { createClient } from '@/lib/supabase/client';
import { create } from 'zustand';

export type TodoRecurrence = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Todo {
  id: string;
  title: string;
  is_completed: boolean;
  recurrence: TodoRecurrence;
}

interface TodoStore {
  todos: Todo[];
  userId: string;
  fetchTodos: () => Promise<void>;
  addTodo: (title: string, recurrence: TodoRecurrence) => Promise<string | null>;
  removeTodo: (id: string) => Promise<string | null>;
  toggleTodo: (id: string) => Promise<string | null>;
}

const supabase = createClient();

export const useTodoStore = create<TodoStore>()((set) => ({
  todos: [],
  userId: '',
  fetchTodos: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase.from('todos').select().eq('user_id', user?.id);

    set({ todos: data ?? [], userId: user?.id });
  },
  addTodo: async (title, recurrence): Promise<string | null> => {
    const userId = useTodoStore.getState().userId;
    const { data, error } = await supabase
      .from('todos')
      .insert({ user_id: userId, title, recurrence })
      .select()
      .single();
    if (error) {
      return error.message;
    }

    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: data.id,
          title,
          is_completed: false,
          recurrence: recurrence,
        },
      ],
    }));
    return null;
  },
  removeTodo: async (id): Promise<string | null> => {
    const userId = useTodoStore.getState().userId;
    const { error } = await supabase
      //
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
    if (error) {
      return error.message;
    }

    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
    return null;
  },
  toggleTodo: async (id): Promise<string | null> => {
    const userId = useTodoStore.getState().userId;
    const todo = useTodoStore.getState().todos.find((todo) => todo.id === id);
    const { error } = await supabase
      .from('todos')
      .update({ is_completed: !todo?.is_completed })
      .eq('id', id)
      .eq('user_id', userId);
    if (error) {
      return error.message;
    }
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo,
      ),
    }));
    return null;
  },
}));

const todoStore = useTodoStore.getState();
todoStore.fetchTodos();

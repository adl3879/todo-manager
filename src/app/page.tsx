'use client';

import AddTodoForm from '@/components/add-todo-form';
import Todo from '@/components/todo';
import { useTodoStore } from '@/store/todoStore';
import { CalendarIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const { todos, addTodo } = useTodoStore();
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="text-white max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold">Today</h1>
        <div className="flex items-center gap-2 text-gray-400">
          <CalendarIcon className="w-4 h-4 mt-2 mr-1" />
          <p className="text-xs mt-2">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="mt-10">
          {todos.map((todo) => (
            <div key={todo.id}>
              <Todo key={todo.id} todo={todo} />
              <div className="h-px bg-gray-800 my-3" aria-hidden="true"></div>
            </div>
          ))}
          {!showAddTodoForm && (
            <div
              role="button"
              onClick={() => setShowAddTodoForm(true)}
              className="flex items-center gap-3 text-gray-400 hover:text-red-400 transition-colors duration-200 cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <p className="text-xs">Add todo</p>
            </div>
          )}
          {showAddTodoForm && <AddTodoForm setShowAddTodoForm={setShowAddTodoForm} />}
        </div>
      </div>
    </main>
  );
}

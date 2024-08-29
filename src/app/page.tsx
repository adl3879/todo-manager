'use client';

import AddTodoForm from '@/components/add-todo-form';
import Todo from '@/components/todo';
import { useTodoStore } from '@/store/todoStore';
import { CalendarIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function Home() {
  const { todos } = useTodoStore();
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <main className="min-h-screen bg-background">
      <div className="text-white max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-semibold mb-2">Today</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn('w-fit justify-start text-left font-normal text-xs', !date && 'text-muted-foreground')}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              fromDate={new Date()} // Set minimum date to today
              defaultMonth={new Date()} // Always open on current month
            />
          </PopoverContent>
        </Popover>

        <div className="mt-8">
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

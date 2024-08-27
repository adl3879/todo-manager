import { TodoOccurrence, useTodoStore } from '@/store/todoStore';
import { Card, CardContent, CardFooter } from './ui/card';
import { useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CalendarClock, CalendarDays, CalendarRange, Sun, Zap } from 'lucide-react';

export const occurrenceOptions = [
  { value: 'once', label: 'Once', icon: Zap },
  { value: 'daily', label: 'Daily', icon: Sun },
  { value: 'weekly', label: 'Weekly', icon: CalendarDays },
  { value: 'monthly', label: 'Monthly', icon: CalendarClock },
  { value: 'yearly', label: 'Yearly', icon: CalendarRange },
];

export interface AddTodoFormProps {
  setShowAddTodoForm: (show: boolean) => void;
}

export default function AddTodoForm({ setShowAddTodoForm }: AddTodoFormProps) {
  const { addTodo } = useTodoStore();
  const [todo, setTodo] = useState('');
  const [occurrence, setOccurrence] = useState<TodoOccurrence>('once');

  const handleAddTodo = useCallback(() => {
    addTodo(todo, occurrence);
    setShowAddTodoForm(false);
  }, [addTodo, todo, setShowAddTodoForm, occurrence]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowAddTodoForm(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowAddTodoForm]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && todo.trim() !== '') {
        handleAddTodo();
      }
    };
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [todo, handleAddTodo]);

  return (
    <Card className="mt-2 p-2 card">
      <CardContent className="p-0">
        <input
          type="text"
          className="w-full text-white bg-transparent text-xs placeholder:text-gray-400 mb-3 outline-none"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Todo name"
          autoFocus
        />
        <Select onValueChange={(value) => setOccurrence(value as TodoOccurrence)}>
          <SelectTrigger className="text-xs w-fit p-2 h-fit outline-none">
            {occurrenceOptions.map(
              (option) =>
                occurrence === option.value && (
                  <>
                    <option.icon className="mr-2 h-4 w-4" />
                    {option.label}
                  </>
                ),
            )}
          </SelectTrigger>
          <SelectContent className="">
            {occurrenceOptions.map((item) => (
              <SelectItem key={item.value} className="p-2" value={item.value}>
                <div className="flex">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <div className="h-px bg-gray-800 my-2" aria-hidden="true"></div>
      <CardFooter>
        <div className="flex justify-end w-full space-x-2">
          <Button
            onClick={() => setShowAddTodoForm(false)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white text-xs"
          >
            Cancel
          </Button>
          <Button onClick={handleAddTodo} size="sm" className="bg-red-500 text-white hover:bg-red-600 text-xs">
            Add Todo
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

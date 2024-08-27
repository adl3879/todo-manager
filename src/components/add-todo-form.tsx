import { useTodoStore } from '@/store/todoStore';
import { Card, CardContent, CardFooter } from './ui/card';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export interface AddTodoFormProps {
  setShowAddTodoForm: (show: boolean) => void;
}

export default function AddTodoForm({ setShowAddTodoForm }: AddTodoFormProps) {
  const { addTodo } = useTodoStore();
  const [todo, setTodo] = useState('');

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

  function handleAddTodo() {
    addTodo(todo);
    setShowAddTodoForm(false);
  }

  return (
    <Card className="mt-2 p-2 card">
      <CardContent className="p-0">
        <input
          type="text"
          className="w-full text-white bg-transparent focus:outline-none text-xs"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Todo name"
          autoFocus
        />
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

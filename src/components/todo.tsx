import { useTodoStore } from '@/store/todoStore';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';

export interface TodoProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
}

export default function Todo({ todo }: TodoProps) {
  const { removeTodo, toggleTodo } = useTodoStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox id={todo.id.toString()} onCheckedChange={() => toggleTodo(todo.id)} checked={todo.completed} />
        <label
          htmlFor={todo.id.toString()}
          className={cn(
            'text-xs',
            //,
            todo.completed ? 'line-through text-gray-500' : 'text-white',
          )}
        >
          {todo.text}
        </label>
      </div>
    </div>
  );
}

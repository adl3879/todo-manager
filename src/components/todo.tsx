import { useTodoStore } from '@/store/todoStore';
import { Checkbox } from './ui/checkbox';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Todo as TodoType } from '@/store/todoStore';
import { recurrenceOptions } from './add-todo-form';
import { useMediaQuery } from '@/hooks/use-media-query';

export interface TodoProps {
  todo: TodoType;
}

export default function Todo({ todo }: TodoProps) {
  const { removeTodo, toggleTodo } = useTodoStore();
  const [isHovered, setIsHovered] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleDelete = () => {
    if (deleteAll) {
      // TODO: Delete all occurrences
      removeTodo(todo.id);
    } else {
      removeTodo(todo.id);
    }
  };

  const DeleteButton = () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-gray-500 hover:text-red-500 transition-colors">
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your todo and it will be
            removed from the list.
          </AlertDialogDescription>
          {todo.recurrence !== 'once' && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="delete-all"
                checked={deleteAll}
                onCheckedChange={() => setDeleteAll(!deleteAll)}
              />
              <label
                htmlFor="delete-all"
                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Delete all recurrences
              </label>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-xs" onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div
      className="flex items-center justify-between cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          className="rounded-full"
          id={todo.id.toString()}
          onCheckedChange={() => toggleTodo(todo.id)}
          checked={todo.is_completed}
        />
        <div className="flex flex-col gap-1">
          <label
            htmlFor={todo.id.toString()}
            className={cn(
              'text-[13px]',
              todo.is_completed ? 'line-through text-gray-500' : 'text-white',
            )}
          >
            {todo.title}
          </label>
          {todo.recurrence !== 'once' && (
            <span className="text-[10px] text-gray-500 flex items-center">
              {recurrenceOptions.map(
                (option) =>
                  todo.recurrence === option.value && (
                    <>
                      <option.icon className="mr-1 h-3 w-3" />
                      {option.label}
                    </>
                  ),
              )}
            </span>
          )}
        </div>
      </div>
      {(isHovered || isMobile) && <DeleteButton />}
    </div>
  );
}

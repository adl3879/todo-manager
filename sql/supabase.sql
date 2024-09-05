drop table if exists todos cascade;
drop table if exists todo_recurrences cascade;

create table todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  is_completed boolean default false,
  recurrence text default 'once',
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);
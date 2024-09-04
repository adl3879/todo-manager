create table todos (
  id uuid references auth.users not null primary key,
  title text not null,
  is_completed boolean default false,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

create table todo_recurrences (
  id uuid references auth.users not null primary key,
  todo_id uuid not null references todos,
  recurrence text not null,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

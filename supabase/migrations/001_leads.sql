-- Rox Boxing Gym — Lead Capture Tables & RLS Policies
-- Run this migration in your Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.trial_bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  day_type text not null,
  time_slot text not null,
  session_type text not null,
  location text not null,
  source_page text not null default '/',
  status text not null default 'new'
);

create table if not exists public.email_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  source text not null default 'footer'
);

-- Enable Row Level Security
alter table public.trial_bookings enable row level security;
alter table public.email_signups enable row level security;

-- Anonymous INSERT only; no public SELECT, UPDATE, or DELETE
drop policy if exists "Allow anonymous trial_bookings insert" on public.trial_bookings;
create policy "Allow anonymous trial_bookings insert"
  on public.trial_bookings
  for insert
  to anon
  with check (true);

drop policy if exists "Allow anonymous email_signups insert" on public.email_signups;
create policy "Allow anonymous email_signups insert"
  on public.email_signups
  for insert
  to anon
  with check (true);

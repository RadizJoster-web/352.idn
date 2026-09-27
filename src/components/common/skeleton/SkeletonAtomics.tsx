import React from 'react';

export const Title = () => (
  <div className="h-8 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800 mb-6" />
);

export const TextBody = () => (
  <div className="space-y-3">
    <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
  </div>
);

export const List = () => (
  <div className="flex gap-4 py-4 border-b border-border">
    <div className="h-20 w-28 shrink-0 rounded-md bg-zinc-200 dark:bg-zinc-800" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  </div>
);

export const Card = () => (
  <div className="rounded-lg overflow-hidden border border-border">
    <div className="aspect-video bg-zinc-200 dark:bg-zinc-800" />
    <div className="p-4 space-y-2">
      <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  </div>
);

export const Hero = () => (
  <div className="rounded-lg bg-zinc-200 dark:bg-zinc-800 p-6 space-y-4 mb-6">
    <div className="h-64 md:h-80 rounded-md bg-zinc-300 dark:bg-zinc-700" />
    <div className="h-8 w-3/4 rounded bg-zinc-300 dark:bg-zinc-700" />
    <div className="h-4 w-1/2 rounded bg-zinc-300 dark:bg-zinc-700" />
  </div>
);

export const SidebarCol = () => (
  <div className="space-y-6">
    <div className="h-10 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="space-y-4">
      <List />
      <List />
      <List />
      <List />
    </div>
  </div>
);

export const SearchBar = () => (
  <div className="flex gap-2 mb-8">
    <div className="h-12 flex-1 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="h-12 w-24 rounded bg-zinc-200 dark:bg-zinc-800 shrink-0" />
  </div>
);

export const AuthorProfile = () => (
  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start p-6 border border-border rounded-lg mb-8 bg-surface">
    <div className="h-24 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
    <div className="space-y-3 w-full text-center md:text-left">
      <div className="h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-800 mx-auto md:mx-0" />
      <div className="h-4 w-full md:w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 mx-auto md:mx-0" />
      <div className="h-4 w-5/6 md:w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 mx-auto md:mx-0" />
    </div>
  </div>
);

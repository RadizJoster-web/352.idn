import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

type SearchBarProps = {
  defaultValue?: string;
  className?: string;
};

export default function SearchBar({
  defaultValue = '',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`relative ${className}`}
    >
      <label htmlFor="search-input" className="sr-only">
        Cari Berita
      </label>
      <FaSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari berita..."
        className="w-full rounded-md border border-border bg-surface py-2 pl-10 pr-10 text-sm text-text placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Hapus pencarian"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
        >
          <IoCloseSharp className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}

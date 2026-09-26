import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../app/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-text-secondary rounded-md hover:bg-surface transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <FaMoon className="w-5 h-5" />
      ) : (
        <FaSun className="w-5 h-5" />
      )}
    </button>
  );
}

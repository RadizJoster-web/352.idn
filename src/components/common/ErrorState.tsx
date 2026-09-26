import { GoAlertFill } from 'react-icons/go';

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  message = 'Terjadi kesalahan saat memuat data.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <GoAlertFill className="h-12 w-12 text-alert mb-4" />
      <p className="text-lg font-medium text-text mb-2">{message}</p>
      <p className="text-sm text-text-muted mb-6">
        Silakan coba lagi atau kembali nanti.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}

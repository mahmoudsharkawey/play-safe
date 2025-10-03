import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <LoadingSpinner size="lg" />
      <p className="text-gray-400 text-lg">Loading...</p>
    </div>
  );
}

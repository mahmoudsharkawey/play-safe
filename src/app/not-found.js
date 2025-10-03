import Link from 'next/link';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-semibold text-gray-400">Page Not Found</h2>
        <p className="text-gray-500 max-w-md">
          Sorry, we couldn&#39;t find the page you&#39;re looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          Go Home
        </Link>
        <Link
          href="/events"
          className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-colors duration-200 font-medium"
        >
          View Events
        </Link>
      </div>
      
      <div className="mt-8">
        <LoadingSpinner size="sm" className="opacity-50" />
      </div>
    </div>
  );
}

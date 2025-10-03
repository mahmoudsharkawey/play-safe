import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function EventsLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-200">Events</h1>
        <LoadingSpinner size="md" />
        <p className="text-gray-400">Loading events...</p>
      </div>
      
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-800 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

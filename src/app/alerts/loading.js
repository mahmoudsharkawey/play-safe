import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AlertsLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-200">Alerts</h1>
        <LoadingSpinner size="md" />
        <p className="text-gray-400">Loading alerts...</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-800 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

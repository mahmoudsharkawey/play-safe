import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function InsightsLoading() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-200">Insights</h1>
        <LoadingSpinner size="md" />
        <p className="text-gray-400">Loading insights...</p>
      </div>
    </div>
  );
}



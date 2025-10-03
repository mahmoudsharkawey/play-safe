export const metadata = { 
  title: "Match Details",
  description: "Detailed match information including weather, venue map, and AI safety tips"
};

export default function MatchDetailsLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </div>
  );
}



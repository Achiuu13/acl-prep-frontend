import { useAppContext } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import LeaderboardTable from '@/components/LeaderboardTable';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  const { leaderboard } = useAppContext();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you rank against other students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <div
              key={entry.rank}
              className="bg-card border rounded-lg p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                {index === 0 && <Trophy className="h-12 w-12 text-yellow-500" />}
                {index === 1 && <Medal className="h-12 w-12 text-gray-400" />}
                {index === 2 && <Award className="h-12 w-12 text-amber-600" />}
              </div>
              <h3 className="font-semibold text-lg">{entry.name}</h3>
              <p className="text-sm text-muted-foreground">Rank #{entry.rank}</p>
              <div className="mt-4 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Accuracy:</span> {entry.accuracy}%
                </p>
                <p className="text-sm">
                  <span className="font-medium">Streak:</span> {entry.streak}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Questions:</span> {entry.totalQuestions}
                </p>
              </div>
            </div>
          ))}
        </div>

        <LeaderboardTable data={leaderboard} />
      </div>
    </div>
  );
};

export default Leaderboard;
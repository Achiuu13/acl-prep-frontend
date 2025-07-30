import { useAppContext } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Flame } from 'lucide-react';

const StreakTracker = () => {
  const { currentStreak } = useAppContext();

  return (
    <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-full">
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-bold text-primary">{currentStreak}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakTracker;
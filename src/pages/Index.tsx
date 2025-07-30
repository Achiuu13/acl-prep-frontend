import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Trophy, Target, BarChart3 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-6 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
                  <BookOpen className="h-12 w-12" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AC Learn
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Master the SAT & ACT with interactive practice questions, 
                detailed explanations, and progress tracking
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <Link to="/questions">Start Practicing</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                  <Link to="/login">Sign Up Free</Link>
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Join thousands of students improving their test scores
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and resources to help you achieve your target score
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Practice Questions</h3>
              <p className="text-sm text-muted-foreground">
                Hundreds of real SAT & ACT questions with detailed explanations
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="bg-accent/10 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Targeted Learning</h3>
              <p className="text-sm text-muted-foreground">
                Filter by topic, difficulty, and exam type to focus on your weak areas
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="bg-success/10 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-success/20 transition-colors">
                <BarChart3 className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your improvement with detailed analytics and streak tracking
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="bg-warning/10 p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-warning/20 transition-colors">
                <Trophy className="h-8 w-8 text-warning" />
              </div>
              <h3 className="font-semibold mb-2">Leaderboards</h3>
              <p className="text-sm text-muted-foreground">
                Compete with other students and stay motivated with rankings
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/50 border-t">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to boost your scores?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start practicing today and see immediate improvements in your test performance
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link to="/questions">Begin Your Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

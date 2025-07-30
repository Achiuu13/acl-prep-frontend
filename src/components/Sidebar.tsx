import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const { questions, setFilteredQuestions } = useAppContext();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedExamType, setSelectedExamType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const topics = Array.from(new Set(questions.map(q => q.topic)));
  const examTypes = Array.from(new Set(questions.map(q => q.examType)));
  const difficulties = Array.from(new Set(questions.map(q => q.difficulty)));

  const applyFilters = () => {
    let filtered = questions;

    if (selectedTopic !== 'all') {
      filtered = filtered.filter(q => q.topic === selectedTopic);
    }
    if (selectedExamType !== 'all') {
      filtered = filtered.filter(q => q.examType === selectedExamType);
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    setFilteredQuestions(filtered);
  };

  const clearFilters = () => {
    setSelectedTopic('all');
    setSelectedExamType('all');
    setSelectedDifficulty('all');
    setFilteredQuestions(questions);
  };

  const hasActiveFilters = selectedTopic !== 'all' || selectedExamType !== 'all' || selectedDifficulty !== 'all';

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="fixed top-20 left-4 z-50"
      >
        <Filter className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="fixed left-0 top-16 h-full w-80 bg-card border-r border-border p-6 overflow-y-auto z-40">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button onClick={onToggle} variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm">Filter Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Topic</label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {topics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Exam Type</label>
            <Select value={selectedExamType} onValueChange={setSelectedExamType}>
              <SelectTrigger>
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {examTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Difficulty</label>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={applyFilters} size="sm" className="flex-1">
              Apply Filters
            </Button>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline" size="sm">
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {hasActiveFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedTopic !== 'all' && (
                <Badge variant="secondary">{selectedTopic}</Badge>
              )}
              {selectedExamType !== 'all' && (
                <Badge variant="secondary">{selectedExamType}</Badge>
              )}
              {selectedDifficulty !== 'all' && (
                <Badge variant="secondary">{selectedDifficulty}</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Sidebar;
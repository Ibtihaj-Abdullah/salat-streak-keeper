import { Flame, Trophy, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StreakDisplayProps {
  currentStreak: number;
  bestStreak: number;
  todayProgress: number;
  totalPrayers: number;
}

export const StreakDisplay = ({ 
  currentStreak, 
  bestStreak, 
  todayProgress, 
  totalPrayers 
}: StreakDisplayProps) => {
  const progressPercentage = (todayProgress / totalPrayers) * 100;
  const isFullDay = todayProgress === totalPrayers;
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Current Streak */}
      <Card className={cn(
        "relative overflow-hidden transition-all duration-300",
        isFullDay ? "bg-gradient-completed shadow-completed" : "bg-card shadow-prayer"
      )}>
        <CardHeader className="pb-3">
          <CardTitle className={cn(
            "flex items-center gap-2 text-sm font-medium",
            isFullDay ? "text-white" : "text-muted-foreground"
          )}>
            <Flame className={cn(
              "h-4 w-4",
              currentStreak > 0 ? "text-orange-500" : "text-muted-foreground"
            )} />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2">
            <span className={cn(
              "text-3xl font-bold",
              isFullDay ? "text-white" : "text-foreground"
            )}>
              {currentStreak}
            </span>
            <span className={cn(
              "text-sm font-medium mb-1",
              isFullDay ? "text-white/80" : "text-muted-foreground"
            )}>
              {currentStreak === 1 ? "day" : "days"}
            </span>
          </div>
          
          {/* Today's Progress */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className={cn(
                "text-xs font-medium",
                isFullDay ? "text-white/80" : "text-muted-foreground"
              )}>
                Today's Progress
              </span>
              <span className={cn(
                "text-xs font-medium",
                isFullDay ? "text-white" : "text-foreground"
              )}>
                {todayProgress}/{totalPrayers}
              </span>
            </div>
            <div className={cn(
              "w-full bg-opacity-20 rounded-full h-2",
              isFullDay ? "bg-white/20" : "bg-muted"
            )}>
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-out",
                  isFullDay ? "bg-white" : "bg-primary"
                )}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </CardContent>
        
        {isFullDay && (
          <div className="absolute top-2 right-2">
            <Star className="h-5 w-5 text-yellow-300 fill-yellow-300 animate-pulse" />
          </div>
        )}
      </Card>
      
      {/* Best Streak */}
      <Card className="bg-card shadow-prayer">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Trophy className="h-4 w-4 text-streak-gold" />
            Best Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-foreground">
              {bestStreak}
            </span>
            <span className="text-sm font-medium text-muted-foreground mb-1">
              {bestStreak === 1 ? "day" : "days"}
            </span>
          </div>
          
          {bestStreak > currentStreak && (
            <p className="text-xs text-muted-foreground mt-2">
              {bestStreak - currentStreak} more to beat your record!
            </p>
          )}
          
          {bestStreak === currentStreak && currentStreak > 0 && (
            <p className="text-xs text-streak-gold mt-2 font-medium">
              🎉 New personal best!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
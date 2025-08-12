import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PrayerCardProps {
  name: string;
  arabicName: string;
  time: string;
  isCompleted: boolean;
  onToggle: () => void;
  isPastTime?: boolean;
}

export const PrayerCard = ({ 
  name, 
  arabicName, 
  time, 
  isCompleted, 
  onToggle,
  isPastTime = false 
}: PrayerCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 transform hover:scale-[1.02]",
        "border-2 shadow-prayer hover:shadow-lg",
        isCompleted 
          ? "bg-gradient-completed border-prayer-completed shadow-completed" 
          : "bg-card border-border hover:border-primary/30"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={cn(
                "text-lg font-semibold",
                isCompleted ? "text-white" : "text-foreground"
              )}>
                {name}
              </h3>
              <span className={cn(
                "text-sm font-medium opacity-80",
                isCompleted ? "text-white" : "text-muted-foreground"
              )}>
                {arabicName}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className={cn(
                "h-4 w-4",
                isCompleted ? "text-white/80" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-sm",
                isCompleted ? "text-white/90" : "text-muted-foreground",
                isPastTime && !isCompleted && "text-amber-600 font-medium"
              )}>
                {time}
              </span>
              {isPastTime && !isCompleted && (
                <span className="text-xs text-amber-600 font-medium">
                  Time passed
                </span>
              )}
            </div>
          </div>
          
          <Button
            onClick={onToggle}
            size="lg"
            className={cn(
              "h-12 w-12 rounded-full transition-all duration-300",
              isCompleted
                ? "bg-white/20 hover:bg-white/30 text-white border-2 border-white/30"
                : "bg-primary hover:bg-primary-glow text-primary-foreground shadow-md hover:shadow-lg"
            )}
          >
            <Check className={cn(
              "h-5 w-5 transition-transform duration-300",
              isCompleted ? "scale-100" : "scale-0"
            )} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
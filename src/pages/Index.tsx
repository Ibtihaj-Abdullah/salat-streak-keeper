import { format } from "date-fns";
import { Moon, Sun, Sunrise } from "lucide-react";
import { PrayerCard } from "@/components/PrayerCard";
import { StreakDisplay } from "@/components/StreakDisplay";
import { usePrayerTracker } from "@/hooks/usePrayerTracker";

const Index = () => {
  const { prayers, streakData, completedCount, totalPrayers, togglePrayer } = usePrayerTracker();
  
  const today = new Date();
  const todayFormatted = format(today, "EEEE, MMMM do");
  const currentHour = today.getHours();
  
  // Determine time of day for background gradient
  const getTimeOfDay = () => {
    if (currentHour >= 5 && currentHour < 12) return 'dawn';
    if (currentHour >= 12 && currentHour < 18) return 'day';
    return 'evening';
  };
  
  const timeOfDay = getTimeOfDay();
  const backgroundClass = `bg-gradient-${timeOfDay}`;
  
  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) return { text: "Good Morning", icon: Sunrise };
    if (currentHour >= 12 && currentHour < 18) return { text: "Good Afternoon", icon: Sun };
    return { text: "Good Evening", icon: Moon };
  };
  
  const { text: greeting, icon: GreetingIcon } = getGreeting();

  return (
    <div className={`min-h-screen ${backgroundClass} p-4 md:p-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GreetingIcon className="h-8 w-8 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {greeting}
            </h1>
          </div>
          <p className="text-white/90 text-lg font-medium">
            {todayFormatted}
          </p>
          <p className="text-white/80 text-sm mt-2">
            Track your daily prayers and build your spiritual streak
          </p>
        </div>

        {/* Streak Display */}
        <div className="mb-8">
          <StreakDisplay
            currentStreak={streakData.currentStreak}
            bestStreak={streakData.bestStreak}
            todayProgress={completedCount}
            totalPrayers={totalPrayers}
          />
        </div>

        {/* Prayer List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            Today's Prayers ({completedCount}/{totalPrayers})
          </h2>
          
          <div className="grid gap-4">
            {prayers.map((prayer) => (
              <PrayerCard
                key={prayer.id}
                name={prayer.name}
                arabicName={prayer.arabicName}
                time={prayer.time}
                isCompleted={prayer.isCompleted}
                onToggle={() => togglePrayer(prayer.id)}
                isPastTime={false} // Could implement time checking logic
              />
            ))}
          </div>
        </div>

        {/* Completion Message */}
        {completedCount === totalPrayers && totalPrayers > 0 && (
          <div className="mt-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">
                🎉 Alhamdulillah! 
              </h3>
              <p className="text-white/90">
                You've completed all your prayers for today!
              </p>
              <p className="text-white/80 text-sm mt-2">
                May Allah accept your prayers and grant you strength for tomorrow.
              </p>
            </div>
          </div>
        )}

        {/* Islamic Quote */}
        <div className="mt-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <p className="text-white/90 italic text-sm leading-relaxed">
              "And establish prayer and give zakah and bow with those who bow."
            </p>
            <p className="text-white/70 text-xs mt-2">
              — Quran 2:43
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
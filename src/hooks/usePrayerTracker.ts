import { useState, useEffect } from "react";

export interface Prayer {
  id: string;
  name: string;
  arabicName: string;
  time: string;
  isCompleted: boolean;
}

interface PrayerData {
  date: string;
  prayers: Prayer[];
  completedCount: number;
}

interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastCompletedDate: string | null;
}

const defaultPrayers: Omit<Prayer, 'isCompleted'>[] = [
  { id: 'fajr', name: 'Fajr', arabicName: 'الفجر', time: '5:30 AM' },
  { id: 'dhuhr', name: 'Dhuhr', arabicName: 'الظهر', time: '12:30 PM' },
  { id: 'asr', name: 'Asr', arabicName: 'العصر', time: '3:45 PM' },
  { id: 'maghrib', name: 'Maghrib', arabicName: 'المغرب', time: '6:15 PM' },
  { id: 'isha', name: 'Isha', arabicName: 'العشاء', time: '8:00 PM' },
];

export const usePrayerTracker = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    bestStreak: 0,
    lastCompletedDate: null
  });

  const today = new Date().toISOString().split('T')[0];

  // Initialize prayers for today
  useEffect(() => {
    const todayKey = `prayers_${today}`;
    const stored = localStorage.getItem(todayKey);
    
    if (stored) {
      const data: PrayerData = JSON.parse(stored);
      setPrayers(data.prayers);
    } else {
      const initialPrayers = defaultPrayers.map(prayer => ({
        ...prayer,
        isCompleted: false
      }));
      setPrayers(initialPrayers);
    }
  }, [today]);

  // Load streak data
  useEffect(() => {
    const storedStreak = localStorage.getItem('streak_data');
    if (storedStreak) {
      setStreakData(JSON.parse(storedStreak));
    }
  }, []);

  // Save prayers when they change
  useEffect(() => {
    if (prayers.length > 0) {
      const completedCount = prayers.filter(p => p.isCompleted).length;
      const prayerData: PrayerData = {
        date: today,
        prayers,
        completedCount
      };
      
      localStorage.setItem(`prayers_${today}`, JSON.stringify(prayerData));
      
      // Update streak when all prayers are completed
      if (completedCount === prayers.length && completedCount > 0) {
        updateStreak();
      }
    }
  }, [prayers, today]);

  const updateStreak = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = yesterday.toISOString().split('T')[0];
    
    let newStreak = 1;
    
    // Check if user completed prayers yesterday
    if (streakData.lastCompletedDate === yesterdayKey) {
      newStreak = streakData.currentStreak + 1;
    } else if (streakData.lastCompletedDate !== today) {
      // Streak broken, start fresh
      newStreak = 1;
    } else {
      // Already completed today
      return;
    }
    
    const newStreakData: StreakData = {
      currentStreak: newStreak,
      bestStreak: Math.max(newStreak, streakData.bestStreak),
      lastCompletedDate: today
    };
    
    setStreakData(newStreakData);
    localStorage.setItem('streak_data', JSON.stringify(newStreakData));
  };

  const togglePrayer = (prayerId: string) => {
    setPrayers(prev => 
      prev.map(prayer => 
        prayer.id === prayerId 
          ? { ...prayer, isCompleted: !prayer.isCompleted }
          : prayer
      )
    );
  };

  const completedCount = prayers.filter(p => p.isCompleted).length;
  const totalPrayers = prayers.length;

  return {
    prayers,
    streakData,
    completedCount,
    totalPrayers,
    togglePrayer
  };
};
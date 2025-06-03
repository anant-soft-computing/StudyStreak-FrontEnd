import { AlarmClock, CalendarDays, Clock, Hourglass } from "lucide-react";

const CountdownTimer = ({ timeLeft }) => {
  const formatTime = (num) => num.toString().padStart(2, "0");
  return (
    <div className="bg-neutral-50 rounded-xl p-6 text-center shadow-sm border border-neutral-200 max-w-md mx-auto w-full">
      <p className="text-neutral-700 text-lg font-medium mb-4">Offer ends in</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3 border border-neutral-200">
          <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
            <CalendarDays className="w-4 h-4" />
            <span className="text-xs">Days</span>
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {timeLeft.days}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-neutral-200">
          <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
            <Hourglass className="w-4 h-4" />
            <span className="text-xs">Hours</span>
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {formatTime(timeLeft.hours)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-neutral-200">
          <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
            <AlarmClock className="w-4 h-4" />
            <span className="text-xs">Minutes</span>
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {formatTime(timeLeft.minutes)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-neutral-200">
          <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs">Seconds</span>
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {formatTime(timeLeft.seconds)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

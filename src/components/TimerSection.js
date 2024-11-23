import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function TimerSection({
    currentTime,
    currentPeriod,
}) {
    const [remainingTime, setRemainingTime] = useState("--:--:--");
    const { isDark } = useTheme();

    useEffect(() => {
        if (!currentPeriod) {
            setRemainingTime("--:--:--");
            return;
        }

        const updateTimer = () => {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const currentSeconds = now.getSeconds();

            let remainingMinutes;
            if (currentPeriod.endMinutes > 24 * 60) {
                const adjustedCurrentMinutes =
                    currentMinutes < 12 * 60
                        ? currentMinutes + 24 * 60
                        : currentMinutes;
                remainingMinutes =
                    currentPeriod.endMinutes - adjustedCurrentMinutes - 1;
            } else {
                remainingMinutes =
                    currentPeriod.endMinutes - currentMinutes - 1;
            }
            const remainingSeconds = 60 - currentSeconds;

            const hours = Math.floor(remainingMinutes / 60);
            const minutes = remainingMinutes % 60;

            setRemainingTime(
                `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                    2,
                    "0"
                )}:${String(remainingSeconds).padStart(2, "0")}`
            );
        };

        updateTimer();
        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
    }, [currentPeriod]);

    return (
        <div className="flex-1 bg-transparent p-8 flex flex-col items-center justify-center gap-8 transition-colors duration-200">
            {/* Clock Card */}
            <div className={`w-full max-w-md p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200 shadow-lg`}>
                <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Current Time</h2>
                </div>
                <div className={`text-4xl font-bold tracking-wider ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                    {currentTime.toLocaleTimeString("en-US", {
                        hour12: true,
                        hour: "numeric",
                        minute: "2-digit",
                        second: "2-digit",
                    })}
                </div>
            </div>

            {/* Current Session Card */}
            <div className={`w-full max-w-md p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
                <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Current Session</h2>
                </div>
                <div className={`text-2xl font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {currentPeriod ? currentPeriod.schedule : "No Active Session"}
                </div>
            </div>

            {/* Time Remaining Card */}
            <div className={`w-full max-w-md p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
                <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Time Remaining</h2>
                </div>
                <div className={`text-3xl font-bold tracking-wider ${isDark ? 'text-red-400' : 'text-red-500'}`}>
                    {remainingTime}
                </div>
            </div>
        </div>
    );
}

export default TimerSection;

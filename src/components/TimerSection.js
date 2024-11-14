import { useEffect, useState } from "react";

function TimerSection({
    currentTime,
    currentPeriod,
    scheduleType,
    setScheduleType,
}) {
    const [remainingTime, setRemainingTime] = useState("--:--:--");

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
        <div className="flex-1 bg-gray-50 p-5 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-800 mb-4">
                {currentTime.toLocaleTimeString("en-US", {
                    hour12: true,
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                })}
            </div>
            <div className="text-xl text-blue-600 mb-4">
                Current: {currentPeriod ? currentPeriod.schedule : "None"}
            </div>
            <div className="text-3xl text-red-500 mb-4">{remainingTime}</div>
            <div className="space-x-4">
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        name="schedule"
                        value="daily"
                        checked={scheduleType === "daily"}
                        onChange={(e) => setScheduleType(e.target.value)}
                        className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Daily</span>
                </label>
                <label className="inline-flex items-center">
                    <input
                        type="radio"
                        name="schedule"
                        value="holiday"
                        checked={scheduleType === "holiday"}
                        onChange={(e) => setScheduleType(e.target.value)}
                        className="form-radio text-blue-600"
                    />
                    <span className="ml-2">Holiday</span>
                </label>
            </div>
        </div>
    );
}

export default TimerSection;

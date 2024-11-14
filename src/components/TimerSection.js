import { useEffect, useState } from "react";

function TimerSection({
    currentTime,
    currentPeriod,
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
        <div className="flex-1 bg-transparent p-5 flex flex-col items-center justify-center ">
            <div className="flex container flex-row mx-auto gap-5 justify-center">
                <p className="text-3xl font-bold dark:text-white">Clock</p>
                <div className="text-3xl font-medium text-gray-800 dark:text-gray-200 mb-4">
                    {currentTime.toLocaleTimeString("en-US", {
                        hour12: true,
                        hour: "numeric",
                        minute: "2-digit",
                        second: "2-digit",
                    })}
                </div>
            </div>
            <div className="text-xl text-blue-600 dark:text-blue-400 mb-4">
                Current: {currentPeriod ? currentPeriod.schedule : "None"}
            </div>
            <div className="text-3xl text-red-500 dark:text-red-400 mb-4">{remainingTime}</div>
        </div>
    );
}

export default TimerSection;

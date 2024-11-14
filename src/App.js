import { useState, useEffect } from "react";
import TimerSection from "./components/TimerSection";
import TimetableSection from "./components/TimetableSection";
import timetableData from "./timetable.json";
import "./App.css";

function App() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [scheduleType, setScheduleType] = useState("daily");
    const [currentPeriod, setCurrentPeriod] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            updateCurrentPeriod();
        }, 1000);

        return () => clearInterval(timer);
    }, [scheduleType]);

    const parseTime = (timeStr) => {
        const [time, period] = timeStr.split(" ");
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours);
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return hours * 60 + parseInt(minutes);
    };

    const updateCurrentPeriod = () => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        for (const item of timetableData.schedule) {
            const [startStr, endStr] = (
                scheduleType === "daily" ? item.dailyTime : item.holidayTime
            ).split(" - ");
            const startMinutes = parseTime(startStr);
            let endMinutes = parseTime(endStr);

            if (endMinutes < startMinutes) {
                endMinutes += 24 * 60;
                if (currentMinutes < startMinutes) {
                    if (
                        currentMinutes + 24 * 60 >= startMinutes &&
                        currentMinutes <= endMinutes % (24 * 60)
                    ) {
                        setCurrentPeriod({
                            item,
                            startMinutes,
                            endMinutes,
                            schedule:
                                scheduleType === "daily"
                                    ? item.dailySchedule
                                    : item.holidaySchedule,
                        });
                        return;
                    }
                } else {
                    if (currentMinutes >= startMinutes) {
                        setCurrentPeriod({
                            item,
                            startMinutes,
                            endMinutes,
                            schedule:
                                scheduleType === "daily"
                                    ? item.dailySchedule
                                    : item.holidaySchedule,
                        });
                        return;
                    }
                }
            } else {
                if (
                    currentMinutes >= startMinutes &&
                    currentMinutes < endMinutes
                ) {
                    setCurrentPeriod({
                        item,
                        startMinutes,
                        endMinutes,
                        schedule:
                            scheduleType === "daily"
                                ? item.dailySchedule
                                : item.holidaySchedule,
                    });
                    return;
                }
            }
        }
        setCurrentPeriod(null);
    };

    return (
        <div className="flex min-h-screen">
            <TimerSection
                currentTime={currentTime}
                currentPeriod={currentPeriod}
                scheduleType={scheduleType}
                setScheduleType={setScheduleType}
            />
            <TimetableSection
                scheduleType={scheduleType}
                currentPeriod={currentPeriod}
                timetable={timetableData.schedule}
            />
        </div>
    );
}

export default App;

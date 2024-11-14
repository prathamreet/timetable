import TimerSection from "./components/TimerSection";
import TimetableSection from "./components/TimetableSection";
import { useSchedule } from "./components/useSchedule";

import timetableData from "./timetable.json";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    const { currentTime, currentPeriod, scheduleType, setScheduleType } =
        useSchedule(timetableData);

    return (
        <div className="h-screen bg-white dark:bg-gray-900 flex flex-col gap-5 p-5">
            <Navbar 
                scheduleType={scheduleType} 
                setScheduleType={setScheduleType}
            />
            <div className="flex shadow rounded-lg">
                <TimerSection
                    currentTime={currentTime}
                    currentPeriod={currentPeriod}
                />
                <TimetableSection
                    scheduleType={scheduleType}
                    currentPeriod={currentPeriod}
                    timetable={timetableData.schedule}
                />
            </div>
        </div>
    );
}

export default App;

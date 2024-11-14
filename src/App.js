import TimerSection from "./components/TimerSection";
import TimetableSection from "./components/TimetableSection";
import { useSchedule } from "./components/useSchedule";
import { BrowserRouter as Router } from "react-router-dom";

import timetableData from "./timetable.json";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    const { currentTime, currentPeriod, scheduleType, setScheduleType } =
        useSchedule(timetableData);

    return (
        <Router>
            <div className="h-screen bg-white dark:bg-gray-900 flex flex-col gap-5 p-5 transition-colors duration-200">
                <Navbar
                    scheduleType={scheduleType}
                    setScheduleType={setScheduleType}
                />
                <div className="flex shadow rounded-lg transition-colors duration-200">
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
        </Router>
    );
}

export default App;

import { useTheme } from "../context/ThemeContext";

function TimetableSection({ scheduleType, currentPeriod, timetable }) {
    const { isDark } = useTheme();
    const TimetableItem = ({ item }) => {
        const time =
            scheduleType === "daily" ? item.dailyTime : item.holidayTime;
        const schedule =
            scheduleType === "daily"
                ? item.dailySchedule
                : item.holidaySchedule;
        const isActive = currentPeriod?.item === item;

        return (
            <div
                className={`
                    relative overflow-hidden
                    p-3 mb-2 rounded-lg
                    transition-all duration-300 ease-in-out
                    hover:shadow-md flex gap-3
                    ${
                        isActive
                            ? "bg-gradient-to-r from-green-500 to-green-600 text-white transform scale-[1.02] shadow-lg"
                            : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                `}
            >
                <div className="text-sm font-medium tracking-wide mb-1 dark:text-gray-200">
                    {time}
                </div>
                <div
                    className={`
                        text-sm
                        ${
                            isActive
                                ? "text-white"
                                : "text-gray-600 dark:text-gray-300"
                        }
                    `}
                >
                    {schedule}
                </div>
            </div>
        );
    };

    const splitTimetable = () => {
        const beforeFive = [];
        const afterFive = [];

        timetable.forEach((item) => {
            const timeStr = (
                scheduleType === "daily" ? item.dailyTime : item.holidayTime
            ).split(" - ")[0];
            const hour = parseInt(timeStr.split(":")[0]);
            const isPM = timeStr.includes("PM");
            const hour24 = isPM && hour !== 12 ? hour + 12 : hour;

            if (hour24 < 17) {
                beforeFive.push(item);
            } else {
                afterFive.push(item);
            }
        });

        return { beforeFive, afterFive };
    };

    const { beforeFive, afterFive } = splitTimetable();

    return (
        <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 bg-transparent transition-colors duration-200">
            {/* Day Section */}
            <div className="flex-1 min-w-0">
                <div className="sticky top-0 z-10">
                    <div
                        className={`
                        text-center font-semibold 
                        ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm
                        p-3 rounded-lg mb-4
                        border ${isDark ? 'border-gray-700' : 'border-gray-100'}
                        ${isDark ? 'text-gray-200' : 'text-gray-700'}   
                        flex items-center justify-center
                        space-x-2
                        transition-colors duration-200
                    `}
                    >   
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${isDark ? 'text-yellow-300' : 'text-yellow-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                            />
                        </svg>
                        <span>Before 5 PM</span>
                    </div>
                </div>
                <div
                    className="space-y-3 overflow-y-auto max-h-[calc(100vh-10rem)] pr-2 
                    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                >
                    {beforeFive.map((item, index) => (
                        <TimetableItem key={index} item={item} />
                    ))}
                </div>
            </div>

            {/* Evening Section */}
            <div className="flex-1 min-w-0">
                <div className="sticky top-0 z-10">
                    <div
                        className={`
                        text-center font-semibold 
                        ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm
                        p-3 rounded-lg mb-4
                        border ${isDark ? 'border-gray-700' : 'border-gray-100'}
                        ${isDark ? 'text-gray-200' : 'text-gray-700'}
                        flex items-center justify-center
                        space-x-2
                        transition-colors duration-200
                    `}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                        <span>After 5 PM</span>
                    </div>
                </div>
                <div
                    className="space-y-3 overflow-y-auto max-h-[calc(100vh-10rem)] pr-2
                    scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                >
                    {afterFive.map((item, index) => (
                        <TimetableItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TimetableSection;

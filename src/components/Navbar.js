import React from "react";
import Swap from "./Swap";
import ThemeIcon from "./Themeicon";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Navbar = ({ scheduleType, setScheduleType }) => {
    const { isDark } = useTheme();

    return (
        <div className={`navbar rounded-lg shadow gap-2 px-5 transition-colors duration-200 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <div className="flex-1">
                <Link 
                    to="/" 
                    className="btn btn-ghost text-xl transition-colors hover:bg-transparent"
                >
                    TimeTable
                </Link>
            </div>
            <div className="flex-none">
                <Swap
                    scheduleType={scheduleType}
                    setScheduleType={setScheduleType}
                />
            </div>
            <div>
                <ThemeIcon />
            </div>
        </div>
    );
};

export default Navbar;

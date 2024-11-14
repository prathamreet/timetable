import React from "react";

const Swap = ({ scheduleType, setScheduleType }) => {
    return (
        <label className="swap swap-rotate mx-2 text-center hover:scale-110 transition-transform duration-200 cursor-pointer">
            <input 
                type="checkbox" 
                checked={scheduleType === "holiday"}
                onChange={() => setScheduleType(scheduleType === "daily" ? "holiday" : "daily")}
            />
            
            {/* Daily text */}
            <div className="swap-on text-bold">
                Daily
            </div>
            
            {/* Holiday text */}
            <div className="swap-off text-bold">
                Holiday
            </div>
        </label>
    );
};

export default Swap;

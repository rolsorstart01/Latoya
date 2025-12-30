import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isBefore, startOfToday } from 'date-fns';

const BookingCalendar = ({ selectedDate, onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = startOfToday();

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const previousMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get the first day of the month to calculate offset
    const firstDayOfMonth = startOfMonth(currentMonth);
    const startOffset = firstDayOfMonth.getDay();

    return (
        <div className="card p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white font-display">
                    {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={previousMonth}
                        disabled={isSameMonth(currentMonth, today)}
                        className="p-2 rounded-lg bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 rounded-lg bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                    <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for offset */}
                {Array.from({ length: startOffset }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                ))}

                {/* Day cells */}
                {days.map((day) => {
                    const isPast = isBefore(day, today);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isCurrentDay = isToday(day);

                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => !isPast && onDateSelect(day)}
                            disabled={isPast}
                            className={`
                aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200
                ${isPast
                                    ? 'text-gray-700 cursor-not-allowed'
                                    : isSelected
                                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-500/20'
                                        : isCurrentDay
                                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                                            : 'text-gray-300 hover:bg-zinc-800'
                                }
              `}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600"></div>
                    <span className="text-xs text-gray-400">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <span className="text-xs text-gray-400">Today</span>
                </div>
            </div>
        </div>
    );
};

export default BookingCalendar;

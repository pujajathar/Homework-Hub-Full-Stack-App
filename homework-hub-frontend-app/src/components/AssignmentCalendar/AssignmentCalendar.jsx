import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './AssignmentCalendar.css';

function AssignmentCalendar({ assignments }) {
    const events = assignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        start: assignment.dueDate,
    }));

    return (
        <div className="assignment-calendar">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    );
}
export default AssignmentCalendar;

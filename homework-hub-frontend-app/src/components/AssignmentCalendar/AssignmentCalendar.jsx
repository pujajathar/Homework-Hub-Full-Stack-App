import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './AssignmentCalendar.css';

function AssignmentCalendar({ assignments }) {

    //Convers assignments into events that FullCalendar can display.
    const events = assignments.map((assignment) => ({
        id: assignment.id,
        title: assignment.title,
        start: assignment.dueDate,
    }));

    return (
        <div className="assignment-calendar">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}  //Enable calendar plugins
                initialView="dayGridMonth"
                events={events}  //Pass assignment events to calendar
            />
        </div>
    );
}
export default AssignmentCalendar;

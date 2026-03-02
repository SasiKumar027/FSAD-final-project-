import Button from "../common/Button";

function HoursTracker({ application, onLog }) {
  return (
    <div>
      <p>Hours Logged: {application.hoursLogged}</p>
      <Button onClick={() => onLog(application.id)}>Log Hours</Button>
    </div>
  );
}

export default HoursTracker;
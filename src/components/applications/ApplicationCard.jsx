import Button from "../common/Button";

function ApplicationCard({ application, onApprove, onReject, children }) {
  return (
    <div className="card">
      <p>Student: {application.studentName}</p>
      <p>
        Status: <span className={"badge badge-" + application.status}>{application.status}</span>
      </p>

      {children}

      {onApprove && (
        <>
          <Button onClick={() => onApprove(application.id)}>Approve</Button>
          <Button
            onClick={() => onReject(application.id)}
            style={{ backgroundColor: "red", marginLeft: 5 }}
          >
            Reject
          </Button>
        </>
      )}
    </div>
  );
}

export default ApplicationCard;
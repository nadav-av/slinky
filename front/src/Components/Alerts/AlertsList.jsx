import Alert from "./Alert";
import AddAlert from "./AddAlert";

const AlertsList = ({ alerts, handleAddAlert, handleDeleteAlert }) => {
  return (
    <div className="alerts-list">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          id={alert.id}
          text={alert.text}
          date={alert.date}
          handleDeleteAlert={handleDeleteAlert}
        ></Alert>
      ))}
      <AddAlert handleAddAlert={handleAddAlert} />
    </div>
  );
};

export default AlertsList;

import { MdDeleteForever } from "react-icons/md";

const Alert = ({ id, text, date, handleDeleteAlert }) => {
  return (
    <div className="alert">
      <span>{text}</span>
      <div className="alert-footer">
        <small>{date}</small>
        <MdDeleteForever
          onClick={() => handleDeleteAlert(id)}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Alert;

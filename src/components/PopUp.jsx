import PropTypes from "prop-types";
PopUp.propTypes = {
  onClose: PropTypes.func.isRequired,
  Error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  errorDetails: PropTypes.string.isRequired,
};

export default function PopUp({ onClose, Error, message, errorDetails }) {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>{Error}</h3>
        <br />
        <p>{message}</p>
        <br />
        {errorDetails && <code>{JSON.stringify(errorDetails, null, 2)}</code>}
      </div>
    </div>
  );
}

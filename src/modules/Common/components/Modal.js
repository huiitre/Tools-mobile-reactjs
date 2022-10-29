import '../styles/modal.scss';
import ReactDOM from 'react-dom';

const Modal = ({
  isShowing, hide, title, ...props
}) => (isShowing
  ? ReactDOM.createPortal(
    <>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <h4>{title}</h4>
              <button
                type="button"
                className="modal-close-button"
                onClick={hide}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
    </>,
    document.body
  ) : null);

export default Modal;

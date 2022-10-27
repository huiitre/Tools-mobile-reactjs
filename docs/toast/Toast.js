import useTimeout from '../../src/modules/Common/hooks/useTimeout';

const Toast = ({ close, children }) => {
  useTimeout(close, 5000);

  return (
    <div className="toast">
      <div className="toast__text">{children}</div>
      <div>
        <button
          onClick={close}
          className="toast__close-btn"
          type="button"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Toast;

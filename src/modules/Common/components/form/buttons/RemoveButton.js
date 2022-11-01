import '../../../styles/remove-button.scss';

const RemoveButton = ({ callback }) => (
  <i className="icon bi bi bi-dash-square" onClick={callback}></i>
);

export default RemoveButton;

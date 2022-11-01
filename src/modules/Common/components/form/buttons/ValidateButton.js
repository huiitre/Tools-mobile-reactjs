import '../../../styles/validate-button.scss';

const ValidateButton = ({ callback }) => (
  <i onClick={callback} className="icon bi bi-check-square"></i>
);

export default ValidateButton;

export default function ButtonAction({ type, text, onClick, classBtn = 'btn-primary', icon = '' }) {
  return (
    <button type={type} className={`btn ${classBtn}`} onClick={onClick}>
      {icon && <i className={icon}></i>}&nbsp;
      {text}
    </button>
  );
}
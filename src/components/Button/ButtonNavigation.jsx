import { useNavigate } from 'react-router-dom';

export default function ButtonNavigation({ url, icon, text }) {
  const navigate = useNavigate();

  return (
    <button className="btn btn-outline-primary mb-2" onClick={() => navigate(url)}>
      <i className={icon}></i>&nbsp;
      {text}
    </button>
  );
}
import ButtonNavigation from "../../components/Button/ButtonNavigation";

const CreateLeague = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Crear nueva Liga</h4>
          <ButtonNavigation url="/league" icon="bi bi-arrow-bar-left" text="Volver atras" />
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 d-flex align-items-center">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLeague;
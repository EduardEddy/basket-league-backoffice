import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../store/country/countrySlice';
import { getUsers } from '../../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import ButtonNavigation from "../../components/Button/ButtonNavigation";
import { createLeague } from '../../store/league/createLeagueSlice';
import { ClipLoader } from "react-spinners";
import Swal from 'sweetalert2';
import UploadLeagueLogoModal from '../../components/Modals/UploadLeagueLogo';

const LeagueAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { countries = [], loading: countriesLoading } = useSelector(state => state.countries);
  const { users = [], loading: usersLoading } = useSelector(state => state.users);
  const { loading: createLeagueLoading } = useSelector(state => state.createLeague);

  //TEST MODAL
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    managerUserId: '',
  });

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(getUsers({ limit: 100, page: 1 }));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        country: formData.country,
        managerUserId: formData.managerUserId,
      };

      // Aquí debes llamar a tu slice createLeague o apiPost con payload
      // Ejemplo:
      // await dispatch(createLeague(payload)).unwrap();

      console.log('Payload a enviar:', payload);
      dispatch(createLeague(payload));
      Swal.fire({
        icon: 'success',
        title: 'Liga creada correctamente',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/league');
      });
    } catch (error) {
      console.error('Error creando liga:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error creando liga. Intenta nuevamente.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4>Crear Nueva Liga</h4>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setShowUploadModal(true)}
            >
              Subir Logo
            </button>
            <ButtonNavigation url="/league" icon="bi bi-arrow-left" text="Volver" />
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Descripción</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>País</label>
              <select
                className="form-select"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                disabled={countriesLoading}
              >
                <option value="">Selecciona un país</option>
                {countries.map(country => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Selecciona Gerente</label>
              <select
                className="form-select"
                name="managerUserId"
                value={formData.managerUserId}
                onChange={handleChange}
                required
                disabled={usersLoading}
              >
                <option value="">Selecciona un gerente</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.lastName ?? ''} -- ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="text-end">
              {
                createLeagueLoading
                  ? <ClipLoader color="#fff" size={20} />
                  :
                  <button type="submit" className="btn btn-primary" disabled={createLeagueLoading} onClick={handleSubmit}>
                    {createLeagueLoading ? 'Creando...' : 'Crear Liga'}
                  </button>
              }
            </div>

          </form>
        </div>
      </div>

      <UploadLeagueLogoModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploaded={(uploadedUrl) => {
          setFormData(prev => ({ ...prev, logoUrl: uploadedUrl }));
        }}
      />
    </div>


  );
};

export default LeagueAdd;

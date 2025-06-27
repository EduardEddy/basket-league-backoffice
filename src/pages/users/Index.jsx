import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonNavigation from '../../components/Button/ButtonNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/usersSlice';
import { mapProfileName } from '../../utils/MapRoleName';
import { ClipLoader } from "react-spinners";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users = [], loading = false, pagination = { currentPage: 1, totalPages: 0, totalUsers: 0, limit: 5 } } = useSelector((state) => state.users || {});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleGetUsers = async () => {
    const params = {
      page: currentPage,
      limit: pageSize,
      search: searchTerm,
      sortField: sortField,
      sortDirection: sortDirection
    };
    await dispatch(getUsers(params));
  };

  useEffect(() => {
    handleGetUsers();
  }, [currentPage, pageSize, searchTerm, sortField, sortDirection]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, pagination.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(pagination.totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Gestión de Usuarios</h4>
          <ButtonNavigation url="/users/add" icon="bi bi-plus-lg" text="Agregar Usuario" />
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6 d-flex align-items-center">
              <label className="me-2">Mostrar:</label>
              <select className="form-select w-auto" value={pageSize} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="ms-2">registros</span>
            </div>
            <div className="col-md-6 text-end">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                    Nombre {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <ClipLoader
                        color={"#000"}
                        size={60}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">No se encontraron usuarios</td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{mapProfileName(user.profile.name)}</td>
                      <td>
                        <span className={`badge bg-${user.status.toLowerCase() === 'active' ? 'success' : 'danger'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.phone ?? '--'}</td>
                      <td>
                        <ButtonNavigation url={`/users/${user.id}`} icon="bi bi-pencil-square" text="" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {!loading && users.length > 0 && pagination.totalPages > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                Mostrando {(pagination.currentPage - 1) * pagination.pageSize + 1} a{' '}
                {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalUsers)} de {pagination.totalUsers} registros
              </div>
              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${pagination.currentPage === 1 && 'disabled'}`}>
                    <button className="page-link" onClick={() => handlePageChange(1)}>Primera</button>
                  </li>
                  <li className={`page-item ${pagination.currentPage === 1 && 'disabled'}`}>
                    <button className="page-link" onClick={() => handlePageChange(pagination.currentPage - 1)}>Anterior</button>
                  </li>
                  {getPageNumbers().map(num => (
                    <li key={num} className={`page-item ${pagination.currentPage === num && 'active'}`}>
                      <button className="page-link" onClick={() => handlePageChange(num)}>{num}</button>
                    </li>
                  ))}
                  <li className={`page-item ${pagination.currentPage === pagination.totalPages && 'disabled'}`}>
                    <button className="page-link" onClick={() => handlePageChange(pagination.currentPage + 1)}>Siguiente</button>
                  </li>
                  <li className={`page-item ${pagination.currentPage === pagination.totalPages && 'disabled'}`}>
                    <button className="page-link" onClick={() => handlePageChange(pagination.totalPages)}>Última</button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

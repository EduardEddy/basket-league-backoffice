import ButtonNavigation from "../../components/Button/ButtonNavigation";
import { useDispatch, useSelector } from 'react-redux';
import { getAllLeagues } from '../../store/league/getAllSlice';
import { useEffect, useState } from 'react';
import GenericTable from "../../components/Table.jsx/GenericTable";

const League = () => {
  const dispatch = useDispatch();
  const { leagues = [], loading = false, pagination = { currentPage: 1, totalPages: 0, totalUsers: 0, pageSize: 3 } } = useSelector((state) => state.leagues || {});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [search, setSearch] = useState('');

  const handleGetLeagues = async () => {
    const params = {
      page: currentPage,
      limit: pageSize,
      search: searchTerm,
      sortField: sortField,
      sortDirection: sortDirection
    };
    console.log('Fetching leagues with params:', params);
    await dispatch(getAllLeagues(params));
  };

  useEffect(() => {
    handleGetLeagues();
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
          <h4 className="mb-0">Gestión de Ligas</h4>
          <ButtonNavigation url="/league/add" icon="bi bi-plus-lg" text="Agregar Liga" />
        </div>

        <div className="card-body">
          {/*S<div className="row mb-3">
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
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>*/}

          <div className="table-responsive">
            {/*<table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                    Nombre {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Descripción</th>
                  <th>País</th>
                  <th>Usuario Manager</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <ClipLoader
                        color={"#000"}
                        size={60}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </td>
                  </tr>
                ) : leagues.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No se encontraron ligas</td>
                  </tr>
                ) : (
                  leagues.map((league) => (
                    <tr key={league.id}>
                      <td>{league.name}</td>
                      <td>{league.description || '--'}</td>
                      <td>{league.country || '--'}</td>
                      <td>{league.managerUserId || '--'}</td>
                      <td>
                        <ButtonNavigation url={`/league/edit/${league.id}`} icon="bi bi-pencil-square" text="" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>*/}

            {/* Paginación */}
            {/*!loading && leagues.length > 0 && pagination.totalPages > 0 && (
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
          )*/}

            <GenericTable
              columns={[
                { header: 'Nombre', accessor: 'name' },
                { header: 'Descripción', accessor: 'description' },
                { header: 'País', accessor: 'country' },
                { header: 'Usuario Manager', accessor: 'managerUserId' },
              ]}
              data={leagues}
              onEdit={() => { }}
              onDelete={() => { }}
              searchValue={search}
              onSearchChange={setSearch}
              pageSize={3}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default League;
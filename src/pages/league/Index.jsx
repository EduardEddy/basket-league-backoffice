import ButtonNavigation from "../../components/Button/ButtonNavigation";
import { useDispatch, useSelector } from 'react-redux';
import { getAllLeagues } from '../../store/league/getAllSlice';
import { useEffect, useState } from 'react';
import GenericTable from "../../components/Table.jsx/GenericTable";

const League = () => {
  const dispatch = useDispatch();
  const { leagues = [], loading = false, pagination = { currentPage: 1, totalPages: 0, totalUsers: 0, pageSize: 10 } } = useSelector((state) => state.leagues || {});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleGetLeagues = async () => {
    const params = {
      page: currentPage,
      limit: pageSize,
      search: searchTerm.trim(),
      sortField,
      sortDirection
    };
    console.log('Fetching leagues with params:', params);
    await dispatch(getAllLeagues(params));
  };

  useEffect(() => {
    handleGetLeagues();
    // eslint-disable-next-line
  }, [currentPage, pageSize, sortField, sortDirection]);

  const handleSearch = () => {
    setCurrentPage(1);
    handleGetLeagues();
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

  return (
    <div className="container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Gestión de Ligas</h4>
          <ButtonNavigation url="/league/add" icon="bi bi-plus-lg" text="Agregar Liga" />
        </div>

        <div className="card-body">
          <div className="mb-3 d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Buscar liga..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>

          <div className="table-responsive">
            <GenericTable
              columns={[
                { header: 'Nombre', accessor: 'name', sortable: true },
                { header: 'Descripción', accessor: 'description', sortable: true },
                { header: 'País', accessor: 'country', sortable: true },
                {
                  header: 'Usuario Manager',
                  accessor: 'managerUserId',
                  sortable: true,
                  cell: (item) => {
                    if (item.managerUser) {
                      return `${item?.managerUser?.name ?? ''} ${item?.managerUser?.lastName ?? ''}`;
                    }
                    return '--'
                  }
                },
                {
                  header: 'Logo',
                  accessor: 'logo',
                  sortable: true,
                  cell: (item) =>
                    item.logoUrl ? <i className="bi bi-check-circle text-success"></i> : <i className="bi bi-x-circle text-danger"></i>
                }
              ]}
              data={leagues}
              onEdit={() => { }}
              onDelete={() => { }}
              pageSize={pageSize}
              loading={loading}
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={setCurrentPage}
              onSort={handleSort}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default League;

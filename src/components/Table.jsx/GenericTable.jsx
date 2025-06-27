import React, { useState } from 'react';
import { ClipLoader } from "react-spinners";

function GenericTable({
  columns = [],
  data = [],
  onEdit = () => { },
  onDelete = () => { },
  searchValue = '',
  onSearchChange = () => { },
  pageSize = 10,
  loading = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.accessor]).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* Buscador */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Buscar..."
          value={searchValue}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setCurrentPage(1); // reiniciar paginación al buscar
          }}
        />
        <span className="ms-3 small">
          {filteredData.length} resultados encontrados
        </span>
      </div>

      {/* Tabla */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  <ClipLoader
                    color={"#000"}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader" />
                </td>
              </tr>
            )}
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <tr key={idx}>
                  {columns.map((col, cidx) => (
                    <td key={cidx}>{item[col.accessor]}</td>
                  ))}
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onEdit(item)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(item)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  No hay registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination pagination-sm">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Siguiente
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default GenericTable;

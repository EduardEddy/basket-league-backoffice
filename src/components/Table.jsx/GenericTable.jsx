import React from 'react';
import { ClipLoader } from "react-spinners";

function GenericTable({
  columns = [],
  data = [],
  onEdit = () => { },
  onDelete = () => { },
  loading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => { },
}) {

  function getValueByAccessor(item, accessor) {
    if (!accessor) return '--';
    // Permite 'profile.name' acceso profundo
    return accessor.split('.').reduce((obj, key) => obj?.[key], item) ?? '--';
  }

  return (
    <div>
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
                  <ClipLoader color={"#000"} size={40} />
                </td>
              </tr>
            )}
            {!loading && data.length > 0 ? (
              data.map((item, idx) => (
                <tr key={idx}>
                  {columns.map((col, cidx) => (
                    //{<td key={cidx}>{item[col.accessor]}</td>}
                    <td key={cidx}>{col.cell ? col.cell(item) : getValueByAccessor(item, col.accessor)}</td>
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
              !loading && (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center">
                    No hay registros.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-3">
          <ul className="pagination pagination-sm">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => onPageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
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

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import '../styles/Dashboard.css';

const Dashboard = () => {

  //const user = useSelector((state) => state.auth.user);

  // Datos de ejemplo para los gráficos
  const salesData = [
    { name: 'Ene', ventas: 4000 },
    { name: 'Feb', ventas: 3000 },
    { name: 'Mar', ventas: 2000 },
    { name: 'Abr', ventas: 2780 },
    { name: 'May', ventas: 1890 },
    { name: 'Jun', ventas: 2390 },
  ];

  const pieData = [
    { name: 'Móvil', value: 400, color: '#0d6efd' },
    { name: 'Tablet', value: 300, color: '#6610f2' },
    { name: 'Desktop', value: 300, color: '#6f42c1' },
  ];

  return (
    <div className="dashboard-container">
      {/* Tarjetas de métricas */}
      <div className="row g-4 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="card stat-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-start mb-2">
                <div className="stat-icon bg-primary bg-opacity-10 text-primary">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="ms-3">
                  <h6 className="text-muted mb-1">Ingresos Totales</h6>
                  <h4 className="fw-bold mb-1">$24,500</h4>
                  <small className="text-success">+12% vs mes anterior</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card stat-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-start mb-2">
                <div className="stat-icon bg-success bg-opacity-10 text-success">
                  <i className="bi bi-people"></i>
                </div>
                <div className="ms-3">
                  <h6 className="text-muted mb-1">Usuarios Activos</h6>
                  <h4 className="fw-bold mb-1">1,250</h4>
                  <small className="text-success">+8% vs mes anterior</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card stat-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-start mb-2">
                <div className="stat-icon bg-warning bg-opacity-10 text-warning">
                  <i className="bi bi-cart"></i>
                </div>
                <div className="ms-3">
                  <h6 className="text-muted mb-1">Pedidos</h6>
                  <h4 className="fw-bold mb-1">850</h4>
                  <small className="text-success">+5% vs mes anterior</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card stat-card h-100">
            <div className="card-body">
              <div className="d-flex align-items-start mb-2">
                <div className="stat-icon bg-info bg-opacity-10 text-info">
                  <i className="bi bi-graph-up"></i>
                </div>
                <div className="ms-3">
                  <h6 className="text-muted mb-1">Tasa de Conversión</h6>
                  <h4 className="fw-bold mb-1">2.4%</h4>
                  <small className="text-success">+0.2% vs mes anterior</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card chart-card h-100">
            <div className="card-header bg-transparent border-0 pb-0">
              <h6 className="card-title mb-0">Ventas por Mes</h6>
            </div>
            <div className="card-body pt-2">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={salesData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#666' }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="ventas" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card chart-card h-100">
            <div className="card-header bg-transparent border-0 pb-0">
              <h6 className="card-title mb-0">Dispositivos</h6>
            </div>
            <div className="card-body pt-2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3">
                {pieData.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle me-2"
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: item.color
                        }}
                      ></div>
                      <small className="text-muted">{item.name}</small>
                    </div>
                    <small className="fw-medium">{item.value}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de actividad reciente */}
      <div className="row">
        <div className="col-12">
          <div className="card chart-card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="border-0 ps-4">Usuario</th>
                      <th className="border-0">Acción</th>
                      <th className="border-0">Fecha</th>
                      <th className="border-0 pe-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ps-4">Juan Pérez</td>
                      <td>Nueva compra</td>
                      <td>2 min ago</td>
                      <td className="pe-4"><span className="badge bg-success">Completado</span></td>
                    </tr>
                    <tr>
                      <td className="ps-4">María García</td>
                      <td>Registro</td>
                      <td>5 min ago</td>
                      <td className="pe-4"><span className="badge bg-primary">Activo</span></td>
                    </tr>
                    <tr>
                      <td className="ps-4">Carlos López</td>
                      <td>Actualización perfil</td>
                      <td>10 min ago</td>
                      <td className="pe-4"><span className="badge bg-warning">Pendiente</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
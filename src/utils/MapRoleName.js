export const mapProfileName = (name) => {
  switch (name) {
    case 'SUPER_ADMIN':
      return 'Super Admin';
    case 'MANAGER_LEAGUE':
      return 'Gerente de liga';
    case 'MANAGER_TEAM':
      return 'Gerente de equipo';
    case 'PLAYER':
      return 'Jugador';
    default:
      return name;
  }
};
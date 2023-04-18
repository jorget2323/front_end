import { axiosConfig } from "../configuration/axiosConfig";

// obtener los tipos de equipos
const getTipoEquipos = (estado) => {
  return axiosConfig.get("tiposequipos?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// crear tipo equipo
const createTipoEquipo = (data = {}) => {
  return axiosConfig.post("tiposequipos", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const editarTipoEquipo = (tipoId, data) => {
  return axiosConfig.put(`tiposequipos/${tipoId}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

// opcional
const borrarTipoEquipo = (tipoId) => {
  return axiosConfig.delete(
    `tipoequipos/${tipoId}`,
    {},
    {
      headers: {
        "Content-type": "application/json",
      },
    }
  );
};

export { getTipoEquipos, createTipoEquipo, editarTipoEquipo, borrarTipoEquipo };

// obtener usuarios
const getTipoUsuarios = (estado) => {
  return axiosConfig.get("usuarios?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Crear Usuarios
const createTipoUsuarios = (data = {}) => {
  return axiosConfig.post("usuarios", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const editarUsuario = (tipoId, data) => {
  return axiosConfig.put(`usuarios/${tipoId}`, data, {
    headers: {
      "Content-type": "application/json",
    },
  });
};

export { getTipoUsuarios, createTipoUsuarios, editarUsuario };

const getMarcas = (estado) => {
  return axiosConfig.get("marcas?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const cearMarcas = (marca) => {
  return axiosConfig.post("marcas", marca, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getMarcas, cearMarcas };

const getEstados = (estado) => {
  return axiosConfig.get("estados?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const crearEstados = (estado) => {
  console.log('estado', estado);
  return axiosConfig.post("estados", estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const editarEstados = (estado) => {
  return axiosConfig.get("estados?estado=" + estado, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export { getEstados, editarEstados, crearEstados };

const getInventarios = (estado) => {
    return axiosConfig.get("inventarios?estado=" + estado, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const crearInventarios = (estado) => {
    console.log('estado', estado);
    return axiosConfig.post("inventarios", estado, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

 export{
    getInventarios,
    crearInventarios
 }
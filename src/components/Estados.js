import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  crearEstados,
  editarTipoEquipo,
  editarUsuario,
  getEstados,
} from "../services/TipoEquipoService";
import ModalEdit from "./ui/ModalEdit";
import ModalEstado from "./ui/ModalEstado";

export default function Estados() {
  const title = "estado";
  const [estados, setEstados] = useState([]);
  const [query, setQuery] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [estado, setUsuario] = useState({
    nombre: "",
  });
  const [loadingSave, setLoadingSave] = useState(false);

  const [id, setId] = useState("");

  const listUsuarios = async () => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await getEstados(query);
      console.log(data);
      setEstados(data);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    listUsuarios();
  }, [query]);

  const changeSwitch = () => {
    setQuery(!query);
  };

  const handleChange = (e) => {
    setUsuario({
      ...estado,
      [e.target.name]: e.target.value,
    });
  };

  const saveEstado = async () => {
    console.log('1')
    try {
      console.log('2')
      setError(false);
      setLoadingSave(true);
      const response = await crearEstados(estado);
      console.log(response);
      setUsuario({ nombre: "" });
      listUsuarios();
      setTimeout(() => {
        setLoadingSave(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoadingSave(false);
    }
  };

  const closeModal = () => {
    setUsuario({ nombre: "" });
    if (id) setId("");
  };

  const selectTipoEquipo = (evt) => {
    evt.preventDefault();
    setId(evt.target.id);
    const tEq = estados.filter((estado) => estado._id === evt.target.id);
    setUsuario({ ...tEq[0] });
  };

  const editTipoEquipo = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await editarTipoEquipo(id, estado);
      console.log(response);
      setUsuario({ nombre: "" });
      listUsuarios();
      setTimeout(() => {
        setLoadingSave(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoadingSave(false);
    }
  };

  return (
    <>
      <ModalEdit
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        tipoEquipo={estado}
        loadingSave={loadingSave}
        editarUsuario={editarUsuario}
      />
      <ModalEstado
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        estado={estado}
        loadingSave={loadingSave}
        saveEstado={saveEstado}
      />
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={query}
          onChange={changeSwitch}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          Activos
        </label>
      </div>
      <button
        type="button"
        className="btn btn-outline-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Agregar
      </button>
      {error && (
        <div className="alert alert-danger" role="alert">
          Ha ocurrido un error
        </div>
      )}

      <div className="table-responsive">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha crea.</th>
                <th scope="col">Fecha act.</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {estados.map((estado, index) => {
                return (
                  <tr key={estado._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{estado.nombre}</td>
                    <td>{estado.estado ? "Activo" : "Inactivo"}</td>
                    <td>{dayjs(estado.fechaCreacion).format("YYYY-MM-DD")}</td>
                    <td>
                      {dayjs(estado.fechaActualizacion).format("YYYY-MM-DD")}
                    </td>

                    <td>
                      <button
                        onClick={selectTipoEquipo}
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalEdit"
                        id={estado._id}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}


import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  cearMarcas,
  editarTipoEquipo,
  getMarcas,
} from "../services/TipoEquipoService";
import ModalEdit from "./ui/ModalEdit";
import ModalMarca from "./ui/ModalMarcas";

export default function Marcas() {
  const title = "marca";
  const [marcas, setMarcas] = useState([]);
  const [query, setQuery] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [marca, setUsuario] = useState({
    nombre: "",
  });
  const [loadingSave, setLoadingSave] = useState(false);

  const [id, setId] = useState("");

  const listUsuarios = async () => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await getMarcas(query);
      console.log(data);
      setMarcas(data);

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
      ...marca,
      [e.target.name]: e.target.value,
    });
  };

  const saveMarca = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await cearMarcas(marca);
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
    const tEq = marcas.filter((marca) => marca._id === evt.target.id);
    setUsuario({ ...tEq[0] });
  };

  const editarUsuario = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await editarTipoEquipo(id, marca);
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
        tipoEquipo={marca}
        loadingSave={loadingSave}
        editarUsuario={editarUsuario}
      />
      <ModalMarca
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        marca={marca}
        loadingSave={loadingSave}
        saveMarca={saveMarca}
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
              </tr>
            </thead>
            <tbody>
              {marcas.map((marca, index) => {
                return (
                  <tr key={marca._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{marca.nombre}</td>
                    <td>{marca.estado ? "Activo" : "Inactivo"}</td>
                    <td>{dayjs(marca.fechaCreacion).format("YYYY-MM-DD")}</td>
                    <td>
                      {dayjs(marca.fechaActualizacion).format("YYYY-MM-DD")}
                    </td>

                    <td>
                      <button
                        onClick={selectTipoEquipo}
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalEdit"
                        id={marca._id}
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

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  crearInventarios,
  editarTipoEquipo,
  getInventarios,
  getMarcas,
} from "../services/TipoEquipoService";
import ModalEdit from "./ui/ModalEdit";
import ModalInventario from "./ui/ModalInventario";

export default function TipoEquipos() {
  const FORM_DEFAULT = {
    serial: "",
    modelo: "",
    descripcion: "",
    foto: "",
    color: "",
    fechaCompra: "",
    precio: "",
    usuario: "",
    marca: "",
    estado: "",
    tipoEquipo: ""
  };

  const title = "Inventario";
  const [inventarios, setInventarios] = useState([]);
  const [query, setQuery] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inventario, setInventario] = useState(FORM_DEFAULT);
  const [loadingSave, setLoadingSave] = useState(false);

  const [id, setId] = useState("");

  const listInventario = async () => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await getInventarios(query);
      console.log("log", error);
      setInventarios(data);

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
    listInventario();
  }, [query]);

  const changeSwitch = () => {
    setQuery(!query);
  };

  const handleChange = (e) => {
    setInventario({
      ...inventario,
      [e.target.name]: e.target.value,
    });
  };

  const saveInventario = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await crearInventarios(inventario);
      console.log(response);
      setInventario(FORM_DEFAULT);
      listInventario();
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
    setInventario(FORM_DEFAULT);
    if (id) setId("");
  };

  /* const selectTipoEquipo = (evt) => {
    evt.preventDefault();
    setId(evt.target.id);
    const tEq = inventarios.filter(
      (tipoEquipo) => tipoEquipo._id === evt.target.id
    );
    setTipoEquipo({ ...tEq[0] });
  }; */

  /* const editTipoEquipo = async () => {
    try {
      setError(false);
      setLoadingSave(true);
      const response = await editarTipoEquipo(id, tipoEquipo);
      console.log(response);
      setTipoEquipo({ nombre: "" });
      listInventario();
      setTimeout(() => {
        setLoadingSave(false);
      }, 500);
    } catch (e) {
      console.log(e);
      setError(true);
      setLoadingSave(false);
    }
  }; */

  return (
    <>
      {/* <ModalEdit
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        tipoEquipo={tipoEquipo}
        loadingSave={loadingSave}
        editTipoEquipo={editTipoEquipo}
      /> */}
      <ModalInventario
        title={title}
        closeModal={closeModal}
        handleChange={handleChange}
        inventario={inventario}
        loadingSave={loadingSave}
        saveInventario={saveInventario}
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
                <th scope="col">Serial</th>
                <th scope="col">Modelo</th>
                <th scope="col">descrip</th>
                <th scope="col">Foto</th>
                <th scope="col">Color</th>
                <th scope="col">Fecha de com.</th>
                <th scope="col">Precio</th>
                <th scope="col">Usuario</th>
                <th scope="col">Marca</th>
                <th scope="col">Estado</th>
                <th scope="col">tipoEquipo</th>
              </tr>
            </thead>
            <tbody>
              {inventarios.map((inventario, index) => {
                return (
                  <tr key={inventario._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{inventario.serial}</td>
                    <td>{inventario.modelo ? "Activo" : "Inactivo"}</td>
                    <td>{inventario.descripcion}</td>
                    <td>
                      <a href={inventario.foto} target="_blank">
                        Ver
                      </a>
                    </td>
                    <td>{inventario.color}</td>
                    <td>
                      {dayjs(inventario.fechaCompra).format("YYYY-MM-DD")}
                    </td>
                    <td>{inventario.precio}</td>
                    <td>{inventario.usuario}</td>
                    <td>{inventario.marca}</td>
                    <td>{inventario.estado}</td>
                    <td>{inventario.tipoEquipo}</td>
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

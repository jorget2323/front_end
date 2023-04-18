import React, { useState, useEffect } from "react";
import { getEstados, getMarcas, getTipoEquipos, getTipoUsuarios } from "../../services/TipoEquipoService";

export default function ModalInventario({
  title,
  closeModal,
  handleChange,
  inventario,
  loadingSave,
  saveInventario,
}) {
  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [tipoEquipos, setTipoEquipos] = useState([])

  const listUsuarios = async () => {
    try {
      const { data } = await getTipoUsuarios(true);
      setUsuarios(data);
    } catch (e) {
      console.log(e);
    }
  };

  const listMarcas = async () => {
    try {
      const { data } = await getMarcas(true);

      setMarcas(data);
    } catch (e) {
      console.log(e);
    }
  };

  const listEstado = async () => {
    try {
      const { data } = await getEstados(true);
      setEstados(data);
    } catch (e) {
      console.log(e);
    }
  };

  const listTipoEquipos = async () => {
    try{
      
      const { data } = await getTipoEquipos(true)
      setTipoEquipos(data)
      
    }catch(e){
      console.log(e)
    }
  }
  useEffect(() => {
    listUsuarios();
    listMarcas();
    listEstado();
    listTipoEquipos()
  }, []);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Nuevo {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="serial" className="col-form-label">
                  Serial:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="serial"
                  name="serial"
                  onChange={handleChange}
                  value={inventario.serial}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="modelo" className="col-form-label">
                  Modelo:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="modelo"
                  name="modelo"
                  onChange={handleChange}
                  value={inventario.modelo}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="col-form-label">
                  Descripción:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  name="descripcion"
                  onChange={handleChange}
                  value={inventario.descripcion}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="foto" className="col-form-label">
                  Foto:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="foto"
                  name="foto"
                  onChange={handleChange}
                  value={inventario.foto}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="col-form-label">
                  Color:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="color"
                  name="color"
                  onChange={handleChange}
                  value={inventario.color}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fechaCompra" className="col-form-label">
                  Fecha compra:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fechaCompra"
                  name="fechaCompra"
                  onChange={handleChange}
                  value={inventario.fechaCompra}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="precio" className="col-form-label">
                  Precio:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="precio"
                  name="precio"
                  onChange={handleChange}
                  value={inventario.precio}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="usuario" className="col-form-label">
                  Usuario:
                </label>
                <select
                  className="form-control"
                  id="usuario"
                  name="usuario"
                  onChange={handleChange}
                  value={inventario.usuario}
                >
                  {usuarios.map((usuario) => (
                    <option key={usuario._id} value={usuario._id}>
                      {usuario.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="marca" className="col-form-label">
                  Marca:
                </label>
                <select
                  className="form-control"
                  id="marca"
                  name="marca"
                  onChange={handleChange}
                  value={inventario.marca}
                >
                  {marcas.map((marca) => (
                    <option key={marca._id} value={marca._id}>
                      {marca.nombre}
                    </option>
                  ))}
                  <option value="">Default</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="estado" className="col-form-label">
                  Estado:
                </label>
                <select
                  className="form-control"
                  id="estado"
                  name="estado"
                  onChange={handleChange}
                  value={inventario.estado}
                >
                    {estados.map((estado) => (
                    <option key={estado._id} value={estado._id}>
                      {estado.nombre}
                    </option>
                  ))}
                  <option value="">Default</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="tipoEquipo" className="col-form-label">
                  Tipo equipo:
                </label>
                <select
                  className="form-control"
                  id="tipoEquipo"
                  name="tipoEquipo"
                  onChange={handleChange}
                  value={inventario.tipoEquipo}
                >
                   {tipoEquipos.map((tipoEquipo) => (
                    <option key={tipoEquipo._id} value={tipoEquipo._id}>
                      {tipoEquipo.nombre}
                    </option>
                  ))} 
                  <option value="">Default</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Cerrar
            </button>
            {loadingSave ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Guardando...
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveInventario}
                disabled={inventario.serial.length == 0}
              >
                Enviar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

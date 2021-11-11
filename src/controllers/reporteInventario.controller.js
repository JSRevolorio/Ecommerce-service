import view from "../views/reporteInventario.html";
import * as bootstrap from "bootstrap";

const searchForInvenario = async (producto) => {
  try {
    return await fetch(
      `https://localhost:44366/api/inventario/${producto.nombre}`,
      { method: "GET" }
    ).then((response) => {
      if (!response) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  } catch (error) {
    console.log(error);
  }
};

export default async () => {
  const Element = document.createElement("div");
  Element.innerHTML = view;

  //Funciones o metodos
  const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };

  on(Element, "click", "#ListarReporteInventario", async (e) => {
    const formulario = Element.querySelector("#formReporteInventario");
    const form = new FormData(formulario);

    var producto = {
      nombre: form.get("productoNombre"),
    };

    Element.querySelector(".tabla-ListaReporteInventario").innerHTML = "";

    var reportes = await searchForInvenario(producto);

    reportes.forEach((inventario) => {
      Element.querySelector(".tabla-ListaReporteInventario").innerHTML += `
            <tr id="${inventario.idProducto}">
            <td>${inventario.nombreProducto}</td>
            <td>${inventario.descripcion}</td>
            <td>${inventario.cantidad}</td>
            </tr>`;
    });
  });

  return Element;
};

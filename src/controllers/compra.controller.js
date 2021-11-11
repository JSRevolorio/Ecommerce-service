import view from '../views/compra.html';
import * as bootstrap from "bootstrap";

const getProveedor = async () =>{
    const response = await fetch('https://localhost:44366/api/proveedor',{ method: 'GET'});
    return await response.json();
}

const getProducto = async () =>{
    try {
        const response = await fetch('https://localhost:44366/api/producto/',{ method: 'GET'});

        if(!response.ok){
            throw new Error(response.statusText);
        }

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}

const createCompra = async (factura) => {
    try {
        
        return await fetch( "https://localhost:44366/api/compra",{ method: 'POST', body : JSON.stringify(factura), headers: {"Content-type": "application/json"}})
        .then(response =>{ if(!response){throw new Error(response.statusText)} return response.json()});
        
    } catch (error) {
        console.log(error);
    }
}



export default async () => {

    const Element = document.createElement('div');
    Element.innerHTML = view

    const modalAdd    = new bootstrap.Modal(Element.querySelector('#modalAddFacturaProducto'));
    const modalModify = new bootstrap.Modal(Element.querySelector('#modalEditFacturaProducto'));
    //const modalDelete = new bootstrap.Modal(Element.querySelector('#modalEliminarProducto'));

    var idTotalFactura = Element.querySelector("#TotalFactura");
    //Funciones o metodos
    const on =(element, event, selector, handler)=>{
        element.addEventListener(event, e =>{
            if(e.target.closest(selector)){
                handler(e)
            }            
        });
    };

    var proveedores  = await getProveedor();
    var productos    = await getProducto();

    // Actuliza el select proveedores
    var valuesProveedores = Element.querySelector('#ListProveedores');
    valuesProveedores.innerHTML = "";
    valuesProveedores.innerHTML = `<option id="0" value="0">Seleccione un proveedor</option>`;
    proveedores.forEach(proveedor => {
        valuesProveedores.innerHTML += `<option id="${proveedor.id}" value="${proveedor.id}">${proveedor.nombre}</option>`;
    });


    // Actuliza el select producto
    var valuesProductos = Element.querySelector('.ListProductos');
    valuesProductos.innerHTML = "";
    valuesProductos.innerHTML = `<option id="0" value="0">Seleccione un producto</option>`;
    productos.forEach(producto => {
        valuesProductos.innerHTML += `<option id="${producto.id}" value="${producto.id}">${producto.nombre}</option>`;
    });

    // Agregar Producto
    on(Element, 'click', '#btnModalFacturaProducto', (e) =>{
        document.querySelector("#formAddFacturaProducto").reset();
        modalAdd.show();
    });

    on(Element, 'click', '#btnAgregarFacturaProducto', (e) => {
        const formulario = Element.querySelector('#formAddFacturaProducto');
        const form = new FormData(formulario);
        
        var combo          = Element.querySelector('#SelectProductos');
        var precioDeCompra = parseFloat(form.get('precioCompra'));

        var producto = {
            nombre             : combo.options[combo.selectedIndex].text,
            idProducto         : parseInt(form.get('idProducto')),
            precioUnidadConIva : precioDeCompra,
            precioUnidadSinIva : (precioDeCompra / 1.12).toFixed(2),
            cantidad           : parseInt(form.get('cantidad')),
        }

        Element.querySelector('.tabla-facProductos').innerHTML +=`
        <tr id="${producto.idProducto}">
        <th scope="row">${producto.idProducto}</th>
        <td>${producto.nombre}</td>  
        <td>${producto.precioUnidadConIva}</td>    
        <td>${producto.precioUnidadSinIva}</td>
        <td>${(precioDeCompra * 1.10).toFixed(2)}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.cantidad * producto.precioUnidadConIva}</td>
        <td>
            <button type="button" class="btn btn-success btnEditar"  value="${producto.idProducto}"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger btnEliminar" value="${producto.idProducto}"><i class="fas fa-trash-alt"></i></button>
        </td>
        </tr>
        `;

        modalAdd.hide();
        recorrerTabla();
    });

    //Editar Producto
    on(Element, 'click', '.btnEditar', (e) => {

        var id = e.target.closest('.btnEditar').getAttribute('value');
        const fila = Element.querySelector(`tr[id="${id}"]`);

        var id           = fila.children[0].innerHTML;
        var nombre       = fila.children[1].innerHTML;
        var precioIva    = fila.children[2].innerHTML;
        var PrecioSinIva = fila.children[3].innerHTML;
        var PrecioVenta  = fila.children[4].innerHTML;
        var cantidad     = fila.children[5].innerHTML;

        var valuesProductos = Element.querySelector('#IDSelectProductos');
        valuesProductos.innerHTML = "";
        valuesProductos.innerHTML = `<option id="0" value="0">Seleccione un producto</option>`;
        productos.forEach(producto => {
            valuesProductos.innerHTML += `<option id="${producto.id}" value="${producto.id}">${producto.nombre}</option>`;
        });

        const formulario = Element.querySelector('#formEditFacturaProducto');
        formulario['idProducto'].value          = id;
        formulario['precioCompra'].value        = precioIva;
        formulario['precioUnidadConIva'].value  = PrecioVenta;
        formulario['precioUnidadSinIva'].value  = (parseFloat(PrecioVenta) / 1.12).toFixed(2);
        formulario['cantidad'].value            = cantidad;

        modalModify.show();
    });

    on(Element, 'click', '#btnEditarFacturaProducto', (e) =>{
        const formulario = Element.querySelector('#formEditFacturaProducto');
        const form = new FormData(formulario);

        var combo          =  Element.querySelector('#IDSelectProductos');
        var precioDeCompra = parseFloat(form.get('precioCompra'));

        var producto = {
            nombre             : combo.options[combo.selectedIndex].text,
            idProducto         : parseInt(form.get('idProducto')),
            precioUnidadConIva : precioDeCompra,
            precioUnidadSinIva : (precioDeCompra / 1.12).toFixed(2),
            cantidad           : parseInt(form.get('cantidad')),
        }

        const fila = Element.querySelector(`tr[id="${producto.idProducto}"]`);
        fila.remove();

        Element.querySelector('.tabla-facProductos').innerHTML +=`
        <tr id="${producto.idProducto}">
        <th scope="row">${producto.idProducto}</th>
        <td>${producto.nombre}</td>  
        <td>${producto.precioUnidadConIva}</td>    
        <td>${producto.precioUnidadSinIva}</td>
        <td>${(precioDeCompra * 1.10).toFixed(2)}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.cantidad * producto.precioUnidadConIva}</td>
        <td>
            <button type="button" class="btn btn-success btnEditar"  value="${producto.idProducto}"><i class="fas fa-edit"></i></button>
            <button type="button" class="btn btn-danger btnEliminar" value="${producto.idProducto}"><i class="fas fa-trash-alt"></i></button>
        </td>
        </tr>
        `;

        modalModify.hide();
        recorrerTabla();
    });

      

    on(Element, 'click', '.btnEliminar', (e) =>{
        var id = e.target.closest('.btnEliminar').getAttribute('value');
        const fila = Element.querySelector(`tr[id="${id}"]`);

        fila.remove();
        recorrerTabla();
    });

    on(Element, 'click', '#btnGrabarFacturaProducto', async (e) => {
        const formulario = Element.querySelector('#formDeCompra');
        const form = new FormData(formulario);

        var total = recorrerTabla();
        var productos = [];
        var Factura = {
            fecha         : form.get('fecha'),
            numeroFactura : form.get('numeroFactura'),
            idProveedor   : parseInt(form.get('idProveedor')),
            idEmpleado    : 2,
            totalConIva   : total,
            compraDetalles : []
        }

        var resume_table = Element.querySelector('#Tabla-Productos-row');
        for (var i = 1, row; row = resume_table.rows[i]; i++) {
            
            var producto = {
                idProducto: parseInt(row.cells[0].innerText),
                precioUnidadSinIva: parseFloat(row.cells[3].innerText),
                precioUnidadConIva: parseFloat(row.cells[2].innerText),
                cantidad: parseInt(row.cells[5].innerText),
            }

            Factura.compraDetalles.push(producto);
        }

        Element.querySelector('#formDeCompra').reset();
        Element.querySelector('.tabla-facProductos').innerHTML = '';

        console.log(Factura);
        var compra = await createCompra(Factura);

        Element.querySelector('#formDeCompra').reset();
        Element.querySelector('.tabla-facProductos').innerHTML = '';
    });

    function recorrerTabla()
    {
        
        var total = 0;
        var resume_table = Element.querySelector('#Tabla-Productos-row');

        for (var i = 1, row; row = resume_table.rows[i]; i++) {
            total +=  parseInt(row.cells[6].innerText)
        }

        idTotalFactura.value = total;
        return total;
    }

    on(Element, 'change', '#idPrecioCompra', (e) => {
        var precioDeCompra = parseFloat(Element.querySelector('#idPrecioCompra').value) * 1.10;

        Element.querySelector("#idPrecioDeVentaIva").value = precioDeCompra.toFixed(2);
        Element.querySelector('#idPrecioDeVentaSinIva').value = (precioDeCompra / 1.12).toFixed(2);
    });

    //idEditPrecioCompra
    on(Element, 'change', '#idEditPrecioCompra', (e) => {
        var precioDeCompra = parseFloat(Element.querySelector('#idEditPrecioCompra').value) * 1.10;

        Element.querySelector("#idEditPrecioDeVentaIva").value = precioDeCompra.toFixed(2);
        Element.querySelector('#idEditPrecioDeVentaSinIva').value = (precioDeCompra / 1.12).toFixed(2);
    });

    on(Element, 'click', '#RedireccionaProducto', e => {
        modalAdd.hide();

        window.location.href = 'http://localhost:3001/#/Productos';
    });

    return Element;
};
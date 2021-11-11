import {pages} from '../controllers/pages.controller';

let root  = document.getElementById('root');

const router = async (route) => {
    root.innerHTML = '';

    switch(route) {
        case '#/Usuario':{
            return root.appendChild(await pages.usuario())
        }
        case '#/Productos':{
            return root.appendChild(await pages.producto())
        }
        case '#/Proveedores':{
            return root.appendChild(await pages.proveedor())
        }
        case '#/Categorias':{
            return root.appendChild(await pages.categoria())
        }
        case '#/Compra':{
            return root.appendChild(await pages.compra())
        }
        case '#/RVenta':{
            return root.appendChild(await pages.rVenta())
        }
        case '#/RCompra':{
            return root.appendChild(await pages.rCompra())
        }
        case '#/existencia':{
            return root.appendChild(await pages.existencia())
        }
        case '#/resumen':{
            return root.appendChild(await pages.resumen())
        }
        case '#/RInventario':{
            return root.appendChild(await pages.rinventario())
        }

        case '#/Cerra':{
            location.reload(true);
        }
        case '':{
            location.reload(true);
        }
    }
};

export {router};
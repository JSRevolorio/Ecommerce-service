import Producto  from './producto.controller';
import Proveedor from './proveedor.controller';
import Categoria from './categoria.controller';
import Compra    from  './compra.controller';
import Usuario   from  './usuario.controller';
import RVenta    from  './reporteVenta.controller';
import RCompra   from  './reporteCompra.controller';
import Existencia from './existencia.controller';
import Resumen   from  './resumen.controller';
import RInventario from './reporteInventario.controller';

const pages = {
    producto  : Producto,
    proveedor : Proveedor,
    categoria : Categoria,
    compra    : Compra,
    rVenta    : RVenta,
    rCompra   : RCompra,
    usuario   : Usuario,
    existencia : Existencia,
    resumen    : Resumen,
    rinventario : RInventario
}

export {pages};
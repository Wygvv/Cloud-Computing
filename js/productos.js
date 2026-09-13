// ==========================================
// OBTENER EL BOTÓN GUARDAR
// ==========================================

const btnGuardar = document.getElementById("btnGuardar");


// ==========================================
// VERIFICAR QUE EL BOTÓN EXISTA
// ==========================================

if (btnGuardar) {

    btnGuardar.addEventListener("click", function () {

        // ==========================================
        // OBTENER LOS DATOS DEL FORMULARIO
        // ==========================================

        const id = document.getElementById("idProducto").value.trim();
        const nombre = document.getElementById("nombreProducto").value.trim();
        const precio = document.getElementById("precioProducto").value.trim();
        const stock = document.getElementById("stockProducto").value.trim();


        // ==========================================
        // VALIDAR CAMPOS VACÍOS
        // ==========================================

        if (
            id === "" ||
            nombre === "" ||
            precio === "" ||
            stock === ""
        ) {

            alert("Por favor complete todos los campos");

            return;
        }


        // ==========================================
        // VALIDAR PRECIO Y STOCK
        // ==========================================

        if (Number(precio) < 0 || Number(stock) < 0) {

            alert("El precio y el stock no pueden ser negativos");

            return;
        }


        // ==========================================
        // OBTENER PRODUCTOS GUARDADOS
        // ==========================================

        let productos =
            JSON.parse(localStorage.getItem("productos")) || [];


        // ==========================================
        // VALIDAR QUE EL ID NO ESTÉ REPETIDO
        // ==========================================

        const productoExistente = productos.find(
            producto => producto.id === id
        );


        if (productoExistente) {

            alert("Ya existe un producto con ese ID");

            return;
        }


        // ==========================================
        // CREAR EL OBJETO PRODUCTO
        // ==========================================

        const nuevoProducto = {
            id: id,
            nombre: nombre,
            precio: Number(precio),
            stock: Number(stock)
        };


        // ==========================================
        // AGREGAR PRODUCTO AL ARREGLO
        // ==========================================

        productos.push(nuevoProducto);


        // ==========================================
        // GUARDAR EN LOCALSTORAGE
        // ==========================================

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );


        // ==========================================
        // MOSTRAR MENSAJE
        // ==========================================

        alert("Producto guardado correctamente");


        // ==========================================
        // LIMPIAR FORMULARIO
        // ==========================================

        document.getElementById("idProducto").value = "";
        document.getElementById("nombreProducto").value = "";
        document.getElementById("precioProducto").value = "";
        document.getElementById("stockProducto").value = "";

    });

}



// ==========================================
// OBTENER LA TABLA DE PRODUCTOS
// ==========================================

const tablaProductos =
    document.getElementById("tablaProductos");



// ==========================================
// FUNCIÓN PARA MOSTRAR LOS PRODUCTOS
// ==========================================

function mostrarProductos(listaProductos) {

    // Verificar que la tabla exista
    if (!tablaProductos) {
        return;
    }


    // Limpiar la tabla antes de cargar datos
    tablaProductos.innerHTML = "";


    // ==========================================
    // MOSTRAR MENSAJE SI NO HAY PRODUCTOS
    // ==========================================

    if (listaProductos.length === 0) {

        tablaProductos.innerHTML = `
            <tr>
                <td colspan="5">
                    No hay productos registrados
                </td>
            </tr>
        `;

        return;
    }


    // ==========================================
    // RECORRER LOS PRODUCTOS
    // ==========================================

    listaProductos.forEach(function (producto) {

        const fila = document.createElement("tr");


        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>

            <td>
                <button onclick="editarProducto('${producto.id}')">
                    Editar
                </button>

                <button onclick="eliminarProducto('${producto.id}')">
                    Eliminar
                </button>
            </td>
        `;


        tablaProductos.appendChild(fila);

    });

}



// ==========================================
// CARGAR PRODUCTOS DESDE LOCALSTORAGE
// ==========================================

if (tablaProductos) {

    const productosGuardados =
        JSON.parse(localStorage.getItem("productos")) || [];

    mostrarProductos(productosGuardados);

}



// ==========================================
// BUSCAR PRODUCTOS
// ==========================================

const buscarProducto =
    document.getElementById("buscarProducto");


if (buscarProducto) {

    buscarProducto.addEventListener("input", function () {

        const textoBusqueda =
            buscarProducto.value.toLowerCase().trim();


        const productos =
            JSON.parse(localStorage.getItem("productos")) || [];


        const productosFiltrados =
            productos.filter(function (producto) {

                return (
                    producto.id.toLowerCase().includes(textoBusqueda) ||
                    producto.nombre.toLowerCase().includes(textoBusqueda)
                );

            });


        mostrarProductos(productosFiltrados);

    });

}



// ==========================================
// EDITAR PRODUCTO
// ==========================================

function editarProducto(id) {

    // Obtener los productos guardados
    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    // Buscar el producto por su ID
    const producto = productos.find(
        producto => producto.id === id
    );


    // Verificar que el producto exista
    if (!producto) {

        alert("Producto no encontrado");

        return;
    }


    // Pedir nuevos datos al usuario
    const nuevoNombre =
        prompt("Ingrese el nuevo nombre:", producto.nombre);

    const nuevoPrecio =
        prompt("Ingrese el nuevo precio:", producto.precio);

    const nuevoStock =
        prompt("Ingrese el nuevo stock:", producto.stock);


    // Si el usuario cancela, no hacer cambios
    if (
        nuevoNombre === null ||
        nuevoPrecio === null ||
        nuevoStock === null
    ) {
        return;
    }


    // ==========================================
    // VALIDAR CAMPOS
    // ==========================================

    if (
        nuevoNombre.trim() === "" ||
        nuevoPrecio.trim() === "" ||
        nuevoStock.trim() === ""
    ) {

        alert("Los campos no pueden quedar vacíos");

        return;
    }


    // ==========================================
    // VALIDAR PRECIO Y STOCK
    // ==========================================

    if (
        Number(nuevoPrecio) < 0 ||
        Number(nuevoStock) < 0
    ) {

        alert("El precio y el stock no pueden ser negativos");

        return;
    }


    // ==========================================
    // ACTUALIZAR PRODUCTO
    // ==========================================

    producto.nombre = nuevoNombre.trim();
    producto.precio = Number(nuevoPrecio);
    producto.stock = Number(nuevoStock);


    // ==========================================
    // GUARDAR LOS CAMBIOS
    // ==========================================

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


    alert("Producto actualizado correctamente");


    // Mostrar la tabla actualizada
    mostrarProductos(productos);

}



// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(id) {

    // Confirmar antes de eliminar
    const confirmar =
        confirm("¿Está seguro de eliminar este producto?");


    if (!confirmar) {
        return;
    }


    // Obtener los productos guardados
    let productos =
        JSON.parse(localStorage.getItem("productos")) || [];


    // Eliminar el producto seleccionado
    productos = productos.filter(
        producto => producto.id !== id
    );


    // ==========================================
    // GUARDAR LA LISTA ACTUALIZADA
    // ==========================================

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


    alert("Producto eliminado correctamente");


    // Mostrar la tabla actualizada
    mostrarProductos(productos);

}
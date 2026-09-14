// ==========================================
// IMPORTAR FIREBASE
// ==========================================

import { db } from "./firebase.js";


// ==========================================
// IMPORTAR FUNCIONES DE FIRESTORE
// ==========================================

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
}
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ==========================================
// ELEMENTOS DE LA PÁGINA
// ==========================================

const tablaProductosFirebase =
    document.getElementById("tablaProductosFirebase");

const buscarProductoFirebase =
    document.getElementById("buscarProductoFirebase");


// Aquí guardaremos los productos obtenidos
// desde Firestore para poder filtrarlos
let productosFirebase = [];


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductosFirebase(listaProductos) {

    // Limpiar tabla
    tablaProductosFirebase.innerHTML = "";


    // ==========================================
    // MOSTRAR MENSAJE SI NO HAY PRODUCTOS
    // ==========================================

    if (listaProductos.length === 0) {

        tablaProductosFirebase.innerHTML = `
            <tr>
                <td colspan="5">
                    No hay productos registrados
                </td>
            </tr>
        `;

        return;
    }


    // ==========================================
    // RECORRER PRODUCTOS
    // ==========================================

    listaProductos.forEach(function (producto) {

        const fila = document.createElement("tr");


        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.stock}</td>

            <td>
                <button
                    class="btnEditar"
                    data-id="${producto.id}">
                    Editar
                </button>

                <button
                    class="btnEliminar"
                    data-id="${producto.id}">
                    Eliminar
                </button>
            </td>
        `;


        tablaProductosFirebase.appendChild(fila);

    });


    // ==========================================
    // ACTIVAR BOTONES EDITAR
    // ==========================================

    const botonesEditar =
        document.querySelectorAll(".btnEditar");


    botonesEditar.forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const id =
                    boton.getAttribute("data-id");

                editarProductoFirebase(id);

            }
        );

    });


    // ==========================================
    // ACTIVAR BOTONES ELIMINAR
    // ==========================================

    const botonesEliminar =
        document.querySelectorAll(".btnEliminar");


    botonesEliminar.forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const id =
                    boton.getAttribute("data-id");

                eliminarProductoFirebase(id);

            }
        );

    });

}


// ==========================================
// CARGAR PRODUCTOS DESDE FIRESTORE
// ==========================================

async function cargarProductosFirebase() {

    try {

        // Referencia a la colección productos
        const productosRef =
            collection(db, "productos");


        // Obtener documentos
        const resultado =
            await getDocs(productosRef);


        // Limpiar arreglo
        productosFirebase = [];


        // Guardar los productos obtenidos
        resultado.forEach(function (documento) {

            productosFirebase.push(
                documento.data()
            );

        });


        // Mostrar productos
        mostrarProductosFirebase(
            productosFirebase
        );

    }

    catch (error) {

        console.error(
            "Error al cargar productos:",
            error
        );


        tablaProductosFirebase.innerHTML = `
            <tr>
                <td colspan="5">
                    Error al cargar productos desde Firebase
                </td>
            </tr>
        `;

    }

}


// ==========================================
// EDITAR PRODUCTO FIREBASE
// ==========================================

async function editarProductoFirebase(id) {

    // Buscar producto en el arreglo local
    const producto =
        productosFirebase.find(
            producto => producto.id === id
        );


    if (!producto) {

        alert("Producto no encontrado");

        return;
    }


    // Pedir nuevos datos
    const nuevoNombre =
        prompt(
            "Ingrese el nuevo nombre:",
            producto.nombre
        );

    const nuevoPrecio =
        prompt(
            "Ingrese el nuevo precio:",
            producto.precio
        );

    const nuevoStock =
        prompt(
            "Ingrese el nuevo stock:",
            producto.stock
        );


    // Si cancela alguna ventana
    if (
        nuevoNombre === null ||
        nuevoPrecio === null ||
        nuevoStock === null
    ) {

        return;
    }


    // ==========================================
    // VALIDAR CAMPOS VACÍOS
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
    // VALIDAR NÚMEROS
    // ==========================================

    if (
        Number(nuevoPrecio) < 0 ||
        Number(nuevoStock) < 0
    ) {

        alert(
            "El precio y el stock no pueden ser negativos"
        );

        return;
    }


    try {

        // Referencia al documento
        const productoRef =
            doc(db, "productos", id);


        // Actualizar Firestore
        await updateDoc(
            productoRef,
            {
                nombre: nuevoNombre.trim(),
                precio: Number(nuevoPrecio),
                stock: Number(nuevoStock)
            }
        );


        alert(
            "Producto actualizado correctamente"
        );


        // Volver a cargar la tabla
        await cargarProductosFirebase();

    }

    catch (error) {

        console.error(
            "Error al actualizar producto:",
            error
        );


        alert(
            "Error al actualizar el producto"
        );

    }

}


// ==========================================
// ELIMINAR PRODUCTO FIREBASE
// ==========================================

async function eliminarProductoFirebase(id) {

    const confirmar =
        confirm(
            "¿Está seguro de eliminar este producto?"
        );


    if (!confirmar) {

        return;
    }


    try {

        // Referencia al documento
        const productoRef =
            doc(db, "productos", id);


        // Eliminar en Firestore
        await deleteDoc(productoRef);


        alert(
            "Producto eliminado correctamente"
        );


        // Actualizar la tabla
        await cargarProductosFirebase();

    }

    catch (error) {

        console.error(
            "Error al eliminar producto:",
            error
        );


        alert(
            "Error al eliminar el producto"
        );

    }

}


// ==========================================
// BUSCADOR
// ==========================================

if (buscarProductoFirebase) {

    buscarProductoFirebase.addEventListener(
        "input",
        function () {

            const textoBusqueda =
                buscarProductoFirebase
                    .value
                    .toLowerCase()
                    .trim();


            const productosFiltrados =
                productosFirebase.filter(
                    function (producto) {

                        return (
                            producto.id
                                .toLowerCase()
                                .includes(textoBusqueda) ||

                            producto.nombre
                                .toLowerCase()
                                .includes(textoBusqueda)
                        );

                    }
                );


            mostrarProductosFirebase(
                productosFiltrados
            );

        }
    );

}


// ==========================================
// CARGAR PRODUCTOS AL ABRIR LA PÁGINA
// ==========================================

cargarProductosFirebase();
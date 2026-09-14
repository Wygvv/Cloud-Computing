// ==========================================
// IMPORTAR BASE DE DATOS FIRESTORE
// ==========================================

import { db } from "./firebase.js";


// ==========================================
// IMPORTAR FUNCIONES DE FIRESTORE
// ==========================================

import {
    doc,
    setDoc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ==========================================
// OBTENER BOTÓN GUARDAR
// ==========================================

const btnGuardarFirebase =
    document.getElementById("btnGuardarFirebase");


// ==========================================
// EVENTO DEL BOTÓN
// ==========================================

if (btnGuardarFirebase) {

    btnGuardarFirebase.addEventListener(
        "click",
        async function () {

            // ==========================================
            // OBTENER DATOS DEL FORMULARIO
            // ==========================================

            const id =
                document.getElementById("idProducto").value.trim();

            const nombre =
                document.getElementById("nombreProducto").value.trim();

            const precio =
                document.getElementById("precioProducto").value.trim();

            const stock =
                document.getElementById("stockProducto").value.trim();


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
            // VALIDAR NÚMEROS
            // ==========================================

            if (
                Number(precio) < 0 ||
                Number(stock) < 0
            ) {

                alert(
                    "El precio y el stock no pueden ser negativos"
                );

                return;
            }


            try {

                // ==========================================
                // CREAR REFERENCIA AL DOCUMENTO
                // colección: productos
                // documento: ID escrito por el usuario
                // ==========================================

                const productoRef =
                    doc(db, "productos", id);


                // ==========================================
                // COMPROBAR SI EL PRODUCTO YA EXISTE
                // ==========================================

                const productoExistente =
                    await getDoc(productoRef);


                if (productoExistente.exists()) {

                    alert(
                        "Ya existe un producto con ese ID"
                    );

                    return;
                }


                // ==========================================
                // GUARDAR PRODUCTO EN FIRESTORE
                // ==========================================

                await setDoc(
                    productoRef,
                    {
                        id: id,
                        nombre: nombre,
                        precio: Number(precio),
                        stock: Number(stock)
                    }
                );


                alert(
                    "Producto guardado correctamente en Firebase"
                );


                // ==========================================
                // LIMPIAR FORMULARIO
                // ==========================================

                document.getElementById(
                    "idProducto"
                ).value = "";

                document.getElementById(
                    "nombreProducto"
                ).value = "";

                document.getElementById(
                    "precioProducto"
                ).value = "";

                document.getElementById(
                    "stockProducto"
                ).value = "";

            }

            catch (error) {

                console.error(
                    "Error al guardar producto:",
                    error
                );

                alert(
                    "Ocurrió un error al conectar con Firebase"
                );

            }

        }
    );

}
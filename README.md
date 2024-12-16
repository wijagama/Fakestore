# Proyecto de Tienda en Línea

Este proyecto consiste en la integración de una API de un fakestore, diseñada para permitir la selección de productos, añadirlos a un carrito, ver el total a pagar y eliminar productos del carrito. También se han implementado funcionalidades de login y cierre de sesión.

## Funcionalidades

- **Login y Cerrar Sesión**: Implementación de un sistema de autenticación básico que permite al usuario iniciar sesión y cerrar sesión.
- **Carrito de Compras**: Los productos seleccionados se agregan a un carrito, y el total de la compra se calcula en un modal.
- **Modal de Carrito**: En el modal, se muestra la lista de productos seleccionados y el total. También permite eliminar productos del carrito.
- **Contador de Productos**: Un contador lleva un registro de la cantidad de productos seleccionados, aunque este contador está en desarrollo y puede no funcionar correctamente.

## Tecnologías Utilizadas

- **HTML**: Estructura del sitio web.
- **CSS**: Estilo y diseño de la página.
- **JavaScript**: Lógica de la aplicación, incluyendo manipulación de arrays y objetos, control de eventos, y manipulación del DOM.
- **Local Storage y Session Storage**: Para almacenar información sobre el usuario y el carrito de compras.
- **Fetch API**: Para consumir los datos de la API de fakestore y mostrar los productos.
- **Programación Orientada a Objetos (POO)**: Se han utilizado clases para organizar la estructura de la aplicación.

## Características

- Los productos se obtienen de una API de fakestore.
- Los productos pueden agregarse al carrito desde una vista de productos.
- El total se calcula automáticamente en el modal.
- El usuario puede eliminar productos del carrito directamente desde el modal.
- La autenticación de usuario se maneja con almacenamiento local y de sesión.

## Cómo Usar

1. Clona este repositorio a tu máquina local.
   ```bash
   git clone https://github.com/tu-usuario/tienda-en-linea.git

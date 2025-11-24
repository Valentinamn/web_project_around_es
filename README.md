# Tripleten web_project_around_es

Este proyecto representa una página interactiva donde se pueden editar datos del perfil, agregar nuevas tarjetas con imágenes, ver las fotos en tamaño ampliado y validar formularios con JavaScript. La interfaz está construida siguiendo una maqueta en Figma, empleando metodología BEM y desarrollo modular.

Funcionalidades principales
-Editar perfil

Cambia el nombre y la descripción del usuario.

Validación con mensajes de error dinámicos.

Botón de guardar activo solo si los campos son válidos.

-Agregar nuevas tarjetas

Crea tarjetas con título e imagen.

Validación del campo de URL y longitud del texto.

Los mensajes de error se muestran debajo de cada input.

-Popup de imagen ampliada

Al hacer clic en una tarjeta, la imagen se abre en un popup grande con título.

-Interacciones con tarjetas

Like / unlike

Eliminar tarjeta

Renderizado dinámico con clases JS

-Validación personalizada

Implementada con una clase FormValidator:

Manejo de errores en tiempo real

Activación/desactivación del botón según validez

Reset automático al abrir formularios

-Arquitectura modular (ES6)

Card.js — creación y funcionalidad de cada tarjeta

FormValidator.js — validación de formularios

utils.js — manejo de modales y eventos globales

index.js — punto de entrada

-Tecnologías utilizadas

HTML5

CSS3

JavaScript (ES6 modules)

Metodología BEM (Block, Element, Modifier)

Git / GitHub

Figma

-Objetivos del proyecto

Practicar manipulación avanzada del DOM

Implementar clases y modularización en JavaScript

Utilizar eventos, popups y validación dinámica

Crear una interfaz basada en Figma con BEM

Consolidar buenas prácticas de código profesional

-Autora
Valentina Montoya
Proyecto desarrollado como parte del bootcamp TripleTen.

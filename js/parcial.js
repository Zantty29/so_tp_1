const productos = [
  {
    id: 1,
    nombre: "One Piece",
    descripcion: "Monkey D. Luffy zarpa en busca del tesoro legendario One Piece para convertirse en el Rey de los Piratas.",
    precio: 8500,
    imagen: "img/luffy.webp",
    categoria: "Shonen"
  },
  {
    id: 2,
    nombre: "Shingeki no Kyojin",
    descripcion: "La humanidad sobrevive encerrada tras enormes murallas para protegerse de gigantes devoradores de hombres.",
    precio: 9200,
    imagen: "img/eren.webp",
    categoria: "Seinen"
  },
  {
    id: 3,
    nombre: "Berserk",
    descripcion: "Guts, un guerrero solitario marcado por un pasado brutal, se enfrenta a fuerzas demoníacas en un mundo medieval oscuro.",
    precio: 9800,
    imagen: "img/berserk.jpg",
    categoria: "Seinen"
  },
  {
    id: 4,
    nombre: "Fruits Basket",
    descripcion: "Tohru Kyo se muda con la familia Soma y descubre que varios de sus miembros se transforman en animales del zodíaco chino.",
    precio: 7600,
    imagen: "img/taka.webp",
    categoria: "Shoujo"
  },
  {
    id: 5,
    nombre: "Jujutsu Kaisen",
    descripcion: "Yuji Itadori se une a una organización de hechiceros para cazar maldiciones después de tragar un dedo maldito.",
    precio: 8900,
    imagen: "img/yuji.webp",
    categoria: "Shonen"
  },
  {
    id: 6,
    nombre: "Vinland Saga",
    descripcion: "Thorfinn crece entre vikingos buscando venganza, hasta cuestionarse el verdadero sentido de la guerra.",
    precio: 9400,
    imagen: "img/saga.webp",
    categoria: "Seinen"
  },
  {
    id: 7,
    nombre: "Chainsaw Man",
    descripcion: "Denji fusiona su destino con el demonio motosierra Pochita y se convierte en cazador de demonios para el gobierno.",
    precio: 8200,
    imagen: "img/ch.webp",
    categoria: "Shonen"
  },
  {
    id: 8,
    nombre: "Nana",
    descripcion: "Dos chicas llamadas Nana, con sueños opuestos, comparten departamento en Tokio y forjan una amistad inolvidable.",
    precio: 7200,
    imagen: "img/nana.webp",
    categoria: "Shoujo"
  }
];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  renderFiltros();
  renderCatalogo("todos");
  actualizarResumenCarrito();

  document
    .getElementById("btn-ver-carrito")
    .addEventListener("click", abrirCarritoModal);
});

function renderFiltros() {
  const nav = document.getElementById("filtros");

  const categorias = ["todos"];
  productos.forEach((producto) => {
    if (!categorias.includes(producto.categoria)) {
      categorias.push(producto.categoria);
    }
  });

  categorias.forEach((categoria) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.classList.add("filtro-btn");
    boton.textContent = categoria === "todos" ? "Todos" : categoria;
    boton.dataset.categoria = categoria;

    if (categoria === "todos") {
      boton.classList.add("activo");
    }

    boton.addEventListener("click", () => {
      const botones = document.querySelectorAll(".filtro-btn");
      botones.forEach((b) => b.classList.remove("activo"));
      boton.classList.add("activo");
      renderCatalogo(categoria);
      mostrarBannerOferta(categoria);
    });

    nav.appendChild(boton);
  });
}

function renderCatalogo(categoria) {
  const contenedor = document.getElementById("catalogo");

  while (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }

  const listaAMostrar =
    categoria === "todos"
      ? productos
      : productos.filter((producto) => producto.categoria === categoria);

  listaAMostrar.forEach((producto) => {
    contenedor.appendChild(crearCardProducto(producto));
  });
}

function crearCardProducto(producto) {
  const card = document.createElement("article");
  card.classList.add("card-producto");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = "Portada de " + producto.nombre;
  card.appendChild(imagen);

  const badge = document.createElement("span");
  badge.classList.add("badge-categoria");
  badge.textContent = producto.categoria;
  card.appendChild(badge);

  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;
  card.appendChild(titulo);

  const descripcion = document.createElement("p");
  descripcion.classList.add("descripcion-card");
  descripcion.textContent = producto.descripcion;
  card.appendChild(descripcion);

  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.textContent = formatearPrecio(producto.precio);
  card.appendChild(precio);

  const acciones = document.createElement("div");
  acciones.classList.add("acciones-card");

  const btnDetalle = document.createElement("button");
  btnDetalle.type = "button";
  btnDetalle.classList.add("btn-secundario");
  btnDetalle.textContent = "Ver detalle";
  btnDetalle.addEventListener("click", () => abrirDetalleModal(producto));
  acciones.appendChild(btnDetalle);

  const btnAgregar = document.createElement("button");
  btnAgregar.type = "button";
  btnAgregar.classList.add("btn-primario");
  btnAgregar.textContent = "Agregar";
  btnAgregar.addEventListener("click", () => agregarAlCarrito(producto.id));
  acciones.appendChild(btnAgregar);

  card.appendChild(acciones);

  return card;
}

function crearOverlay() {
  const overlayExistente = document.getElementById("modal-overlay");
  if (overlayExistente) {
    overlayExistente.remove();
  }

  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.classList.add("overlay");
  overlay.addEventListener("click", (evento) => {
    if (evento.target === overlay) {
      cerrarModal();
    }
  });

  document.body.appendChild(overlay);
  return overlay;
}

function cerrarModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) {
    overlay.remove();
  }
}

function abrirDetalleModal(producto) {
  const overlay = crearOverlay();

  const modal = document.createElement("div");
  modal.classList.add("modal", "modal-detalle");

  const btnCerrar = document.createElement("button");
  btnCerrar.type = "button";
  btnCerrar.classList.add("btn-cerrar");
  btnCerrar.textContent = "×";
  btnCerrar.setAttribute("aria-label", "Cerrar");
  btnCerrar.addEventListener("click", cerrarModal);
  modal.appendChild(btnCerrar);

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = "Portada de " + producto.nombre;
  modal.appendChild(imagen);

  const info = document.createElement("div");
  info.classList.add("modal-info");

  const titulo = document.createElement("h2");
  titulo.textContent = producto.nombre;
  info.appendChild(titulo);

  const badge = document.createElement("span");
  badge.classList.add("badge-categoria");
  badge.textContent = producto.categoria;
  info.appendChild(badge);

  const descripcion = document.createElement("p");
  descripcion.classList.add("descripcion");
  descripcion.textContent = producto.descripcion;
  info.appendChild(descripcion);

  const precio = document.createElement("p");
  precio.classList.add("precio", "precio-modal");
  precio.textContent = formatearPrecio(producto.precio);
  info.appendChild(precio);

  const btnAgregar = document.createElement("button");
  btnAgregar.type = "button";
  btnAgregar.classList.add("btn-primario");
  btnAgregar.textContent = "Agregar al carrito";
  btnAgregar.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
    cerrarModal();
  });
  info.appendChild(btnAgregar);

  modal.appendChild(info);
  overlay.appendChild(modal);
}

function agregarAlCarrito(idProducto) {
  const itemExistente = carrito.find((item) => item.id === idProducto);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  actualizarResumenCarrito();
}

function quitarUnoDelCarrito(idProducto) {
  const itemExistente = carrito.find((item) => item.id === idProducto);
  if (!itemExistente) return;

  itemExistente.cantidad--;

  if (itemExistente.cantidad <= 0) {
    carrito = carrito.filter((item) => item.id !== idProducto);
  }

  actualizarResumenCarrito();
  renderCarritoModal();
}

function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter((item) => item.id !== idProducto);
  actualizarResumenCarrito();
  renderCarritoModal();
}

function vaciarCarrito() {
  carrito = [];
  actualizarResumenCarrito();
  renderCarritoModal();
}

function calcularResumenCarrito() {
  let cantidadTotal = 0;
  let montoTotal = 0;

  carrito.forEach((item) => {
    const producto = productos.find((p) => p.id === item.id);
    cantidadTotal += item.cantidad;
    montoTotal += producto.precio * item.cantidad;
  });

  return { cantidadTotal, montoTotal };
}

function actualizarResumenCarrito() {
  const { cantidadTotal, montoTotal } = calcularResumenCarrito();

  document.getElementById("cart-cantidad").textContent = cantidadTotal;
  document.getElementById("cart-total").textContent = formatearPrecio(montoTotal);
}

function abrirCarritoModal() {
  renderCarritoModal();
}

function renderCarritoModal() {
  const overlay = crearOverlay();

  const modal = document.createElement("div");
  modal.classList.add("modal", "modal-carrito");

  const btnCerrar = document.createElement("button");
  btnCerrar.type = "button";
  btnCerrar.classList.add("btn-cerrar");
  btnCerrar.textContent = "×";
  btnCerrar.setAttribute("aria-label", "Cerrar");
  btnCerrar.addEventListener("click", cerrarModal);
  modal.appendChild(btnCerrar);

  const titulo = document.createElement("h2");
  titulo.textContent = "Tu carrito";
  modal.appendChild(titulo);

  if (carrito.length === 0) {
    const vacio = document.createElement("p");
    vacio.classList.add("carrito-vacio");
    vacio.textContent = "Todavía no agregaste mangas al carrito.";
    modal.appendChild(vacio);
  } else {
    const lista = document.createElement("ul");
    lista.classList.add("lista-carrito");

    carrito.forEach((item) => {
      const producto = productos.find((p) => p.id === item.id);
      lista.appendChild(crearItemCarrito(producto, item.cantidad));
    });

    modal.appendChild(lista);

    const { cantidadTotal, montoTotal } = calcularResumenCarrito();
    const resumen = document.createElement("p");
    resumen.classList.add("resumen-carrito");
    resumen.textContent =
      "Total: " + cantidadTotal + " ítem(s) — " + formatearPrecio(montoTotal);
    modal.appendChild(resumen);

    const btnVaciar = document.createElement("button");
    btnVaciar.type = "button";
    btnVaciar.classList.add("btn-secundario");
    btnVaciar.textContent = "Vaciar carrito";
    btnVaciar.addEventListener("click", vaciarCarrito);
    modal.appendChild(btnVaciar);

    const btnFinalizar = document.createElement("button");
    btnFinalizar.type = "button";
    btnFinalizar.classList.add("btn-primario");
    btnFinalizar.textContent = "Finalizar compra";
    btnFinalizar.addEventListener("click", abrirCheckoutModal);
    modal.appendChild(btnFinalizar);
  }

  overlay.appendChild(modal);
}

function crearItemCarrito(producto, cantidad) {
  const item = document.createElement("li");
  item.classList.add("item-carrito");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  item.appendChild(imagen);

  const datos = document.createElement("div");
  datos.classList.add("item-datos");

  const nombre = document.createElement("p");
  nombre.classList.add("item-nombre");
  nombre.textContent = producto.nombre;
  datos.appendChild(nombre);

  const controlCantidad = document.createElement("div");
  controlCantidad.classList.add("control-cantidad");

  const btnMenos = document.createElement("button");
  btnMenos.type = "button";
  btnMenos.classList.add("btn-cantidad");
  btnMenos.textContent = "−";
  btnMenos.setAttribute("aria-label", "Quitar uno de " + producto.nombre);
  btnMenos.addEventListener("click", () => quitarUnoDelCarrito(producto.id));
  controlCantidad.appendChild(btnMenos);

  const cantidadTexto = document.createElement("span");
  cantidadTexto.classList.add("cantidad-numero");
  cantidadTexto.textContent = cantidad;
  controlCantidad.appendChild(cantidadTexto);

  const btnMas = document.createElement("button");
  btnMas.type = "button";
  btnMas.classList.add("btn-cantidad");
  btnMas.textContent = "+";
  btnMas.setAttribute("aria-label", "Agregar uno de " + producto.nombre);
  btnMas.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
    renderCarritoModal();
  });
  controlCantidad.appendChild(btnMas);

  datos.appendChild(controlCantidad);

  const subtotal = document.createElement("p");
  subtotal.classList.add("subtotal");
  subtotal.textContent = "Subtotal: " + formatearPrecio(producto.precio * cantidad);
  datos.appendChild(subtotal);

  item.appendChild(datos);

  const btnQuitar = document.createElement("button");
  btnQuitar.type = "button";
  btnQuitar.classList.add("btn-quitar");
  btnQuitar.textContent = "Eliminar";
  btnQuitar.addEventListener("click", () => eliminarDelCarrito(producto.id));
  item.appendChild(btnQuitar);

  return item;
}

function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-AR");
}

function CampoFormulario(id, etiqueta, tipo, requerido) {
  this.id = id;
  this.etiqueta = etiqueta;
  this.tipo = tipo;
  this.requerido = requerido;
}

CampoFormulario.prototype.crearElemento = function () {
  const contenedor = document.createElement("div");
  contenedor.classList.add("campo-formulario");

  const label = document.createElement("label");
  label.setAttribute("for", this.id);
  label.textContent = this.etiqueta + (this.requerido ? " *" : "");
  contenedor.appendChild(label);

  const input = document.createElement(this.tipo === "textarea" ? "textarea" : "input");
  input.id = this.id;
  input.name = this.id;
  if (this.tipo !== "textarea") {
    input.type = this.tipo;
  }
  contenedor.appendChild(input);

  const error = document.createElement("span");
  error.classList.add("campo-error");
  error.id = this.id + "-error";
  error.textContent = "Este campo es obligatorio.";
  contenedor.appendChild(error);

  return contenedor;
};

function abrirCheckoutModal() {
  renderCheckoutModal();
}

function renderCheckoutModal() {
  const overlay = crearOverlay();

  const modal = document.createElement("div");
  modal.classList.add("modal", "modal-checkout");

  const btnCerrar = document.createElement("button");
  btnCerrar.type = "button";
  btnCerrar.classList.add("btn-cerrar");
  btnCerrar.textContent = "×";
  btnCerrar.setAttribute("aria-label", "Cerrar");
  btnCerrar.addEventListener("click", cerrarModal);
  modal.appendChild(btnCerrar);

  const titulo = document.createElement("h2");
  titulo.textContent = "Datos de envío y pago";
  modal.appendChild(titulo);

  const form = document.createElement("form");
  form.id = "form-checkout";

  const camposCliente = [
    new CampoFormulario("nombre", "Nombre completo", "text", true),
    new CampoFormulario("telefono", "Teléfono", "tel", true),
    new CampoFormulario("email", "Email", "email", true),
    new CampoFormulario("lugar", "Lugar de entrega", "text", true),
    new CampoFormulario("fecha", "Fecha de entrega", "date", true)
  ];

  camposCliente.forEach((campo) => {
    form.appendChild(campo.crearElemento());
  });

  const campoMetodoPago = document.createElement("div");
  campoMetodoPago.classList.add("campo-formulario");

  const labelMetodo = document.createElement("label");
  labelMetodo.setAttribute("for", "metodo-pago");
  labelMetodo.textContent = "Método de pago *";
  campoMetodoPago.appendChild(labelMetodo);

  const selectMetodo = document.createElement("select");
  selectMetodo.id = "metodo-pago";
  selectMetodo.name = "metodo-pago";

  const opciones = ["Seleccionar...", "Tarjeta de crédito", "Tarjeta de débito", "Transferencia"];
  opciones.forEach((texto, indice) => {
    const opcion = document.createElement("option");
    opcion.value = indice === 0 ? "" : texto;
    opcion.textContent = texto;
    selectMetodo.appendChild(opcion);
  });
  campoMetodoPago.appendChild(selectMetodo);

  const errorMetodo = document.createElement("span");
  errorMetodo.classList.add("campo-error");
  errorMetodo.id = "metodo-pago-error";
  errorMetodo.textContent = "Elegí un método de pago.";
  campoMetodoPago.appendChild(errorMetodo);

  form.appendChild(campoMetodoPago);

  const campoCuotas = document.createElement("div");
  campoCuotas.classList.add("campo-formulario");
  campoCuotas.id = "contenedor-cuotas";
  campoCuotas.style.display = "none";

  const labelCuotas = document.createElement("label");
  labelCuotas.setAttribute("for", "cuotas");
  labelCuotas.textContent = "Cuotas *";
  campoCuotas.appendChild(labelCuotas);

  const selectCuotas = document.createElement("select");
  selectCuotas.id = "cuotas";
  selectCuotas.name = "cuotas";
  ["1", "3", "6", "12"].forEach((numero) => {
    const opcion = document.createElement("option");
    opcion.value = numero;
    opcion.textContent = numero + " cuota" + (numero === "1" ? "" : "s");
    selectCuotas.appendChild(opcion);
  });
  campoCuotas.appendChild(selectCuotas);

  const errorCuotas = document.createElement("span");
  errorCuotas.classList.add("campo-error");
  errorCuotas.id = "cuotas-error";
  errorCuotas.textContent = "Elegí la cantidad de cuotas.";
  campoCuotas.appendChild(errorCuotas);

  form.appendChild(campoCuotas);

  selectMetodo.addEventListener("change", () => {
    campoCuotas.style.display =
      selectMetodo.value === "Tarjeta de crédito" ? "block" : "none";
  });

  const { cantidadTotal, montoTotal } = calcularResumenCarrito();
  const resumen = document.createElement("p");
  resumen.classList.add("resumen-carrito");
  resumen.textContent =
    "Vas a pagar: " + formatearPrecio(montoTotal) + " (" + cantidadTotal + " ítem(s))";
  form.appendChild(resumen);

  const acciones = document.createElement("div");
  acciones.classList.add("acciones-checkout");

  const btnCancelar = document.createElement("button");
  btnCancelar.type = "button";
  btnCancelar.classList.add("btn-secundario");
  btnCancelar.textContent = "Cancelar";
  btnCancelar.addEventListener("click", () => {
    renderCarritoModal();
  });
  acciones.appendChild(btnCancelar);

  const btnConfirmar = document.createElement("button");
  btnConfirmar.type = "submit";
  btnConfirmar.classList.add("btn-primario");
  btnConfirmar.textContent = "Confirmar compra";
  acciones.appendChild(btnConfirmar);

  form.appendChild(acciones);

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    confirmarCompra(camposCliente, selectMetodo, selectCuotas, campoCuotas);
  });

  modal.appendChild(form);
  overlay.appendChild(modal);
}

function confirmarCompra(camposCliente, selectMetodo, selectCuotas, campoCuotas) {
  let esValido = true;

  camposCliente.forEach((campo) => {
    const input = document.getElementById(campo.id);
    const error = document.getElementById(campo.id + "-error");
    if (input.value.trim() === "") {
      input.classList.add("campo-invalido");
      error.style.display = "block";
      esValido = false;
    } else {
      input.classList.remove("campo-invalido");
      error.style.display = "none";
    }
  });

  const errorMetodo = document.getElementById("metodo-pago-error");
  if (selectMetodo.value === "") {
    selectMetodo.classList.add("campo-invalido");
    errorMetodo.style.display = "block";
    esValido = false;
  } else {
    selectMetodo.classList.remove("campo-invalido");
    errorMetodo.style.display = "none";
  }

  if (selectMetodo.value === "Tarjeta de crédito") {
    const errorCuotas = document.getElementById("cuotas-error");
    if (selectCuotas.value === "") {
      selectCuotas.classList.add("campo-invalido");
      errorCuotas.style.display = "block";
      esValido = false;
    } else {
      selectCuotas.classList.remove("campo-invalido");
      errorCuotas.style.display = "none";
    }
  }

  if (!esValido) {
    return;
  }

  vaciarCarrito();
  mostrarConfirmacionCompra();
}

function mostrarConfirmacionCompra() {
  const overlay = crearOverlay();

  const modal = document.createElement("div");
  modal.classList.add("modal", "modal-confirmacion");

  const titulo = document.createElement("h2");
  titulo.textContent = "¡Compra confirmada!";
  modal.appendChild(titulo);

  const texto = document.createElement("p");
  texto.textContent = "Gracias por tu compra. Te vamos a contactar para coordinar la entrega.";
  modal.appendChild(texto);

  const btnCerrar = document.createElement("button");
  btnCerrar.type = "button";
  btnCerrar.classList.add("btn-primario");
  btnCerrar.textContent = "Aceptar";
  btnCerrar.addEventListener("click", cerrarModal);
  modal.appendChild(btnCerrar);

  overlay.appendChild(modal);
}

function mostrarBannerOferta(categoria) {
  // Si ya hay un banner en pantalla, lo saco antes de poner el nuevo
  const bannerAnterior = document.getElementById("banner-oferta");
  if (bannerAnterior) {
    bannerAnterior.remove();
  }

  const banner = document.createElement("div");
  banner.id = "banner-oferta";
  banner.classList.add("banner-oferta");

  const texto = document.createElement("p");
  texto.textContent =
    categoria === "todos"
      ? "🔥 Oferta especial: 15% OFF en toda la tienda"
      : "🔥 Oferta especial: 15% OFF en " + categoria;
  banner.appendChild(texto);

  document.body.appendChild(banner);

  setTimeout(() => {
    if (document.body.contains(banner)) {
      banner.remove();
    }
  }, 10000);
}
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    cerrarModal();
  }
});

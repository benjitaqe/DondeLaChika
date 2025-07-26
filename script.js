const PRECIO_EMPANADA = 1500;
const COSTO_DELIVERY = 500;
const DIRECCION_TIENDA = "Pasaje 47 Casa 2156"; 

let carrito = [];

function agregarAlCarrito(tipo, coccion) {
  carrito.push({ tipo, coccion });
  actualizarCarrito();
}

function agregarEmpanadaPino() {
  const coccion = document.getElementById("tipoPino").value;
  carrito.push({ tipo: "Pino", coccion });
  actualizarCarrito();
}

function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const entrega = document.getElementById("entrega") ? document.getElementById("entrega").value : "retiro";

  lista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `Empanada ${item.tipo} (${item.coccion}) - $${PRECIO_EMPANADA}`;
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.onclick = () => eliminarDelCarrito(index);
    li.appendChild(botonEliminar);
    lista.appendChild(li);
  });

  let total = carrito.length * PRECIO_EMPANADA;
  if (entrega === "delivery") {
    total += COSTO_DELIVERY;
    totalCarrito.innerHTML = `<strong>Total:</strong> $${total} (incluye $${COSTO_DELIVERY} de delivery)`;
  } else {
    totalCarrito.innerHTML = `<strong>Total:</strong> $${total}`;
  }
}

function cambiarEntrega() {
  const entrega = document.getElementById("entrega").value;
  const direccionInput = document.getElementById("direccion");
  const direccionTienda = document.getElementById("direccion-tienda");

  if (entrega === "retiro") {
    direccionInput.disabled = true;
    direccionInput.value = "";
    direccionTienda.style.display = "block";
  } else {
    direccionInput.disabled = false;
    direccionTienda.style.display = "none";
  }
  actualizarCarrito();
}

function enviarPedido(event) {
  event.preventDefault();
  const direccionInput = document.getElementById("direccion");
  const entrega = document.getElementById("entrega").value;
  const pago = document.getElementById("pago").value;

  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega empanadas antes de enviar.");
    return;
  }

  let direccion = entrega === "retiro" ? DIRECCION_TIENDA : direccionInput.value;

  if (entrega === "delivery" && direccion.trim() === "") {
    alert("Por favor, ingresa tu dirección para el despacho.");
    return;
  }

  let total = carrito.length * PRECIO_EMPANADA;
  let detalleDelivery = "";
  if (entrega === "delivery") {
    total += COSTO_DELIVERY;
    detalleDelivery = `\nCosto de delivery: $${COSTO_DELIVERY}`;
  }

  let entregaTexto = entrega === "retiro" ? "Retiro en Casa" : "Despacho a Domicilio";

  let mensaje = "¡Hola! Quiero hacer el siguiente pedido:\n\n";
  carrito.forEach((item, index) => {
    mensaje += `${index + 1}. Empanada ${item.tipo} (${item.coccion}) - $${PRECIO_EMPANADA}\n`;
  });
  mensaje += `${detalleDelivery}\n`;
  mensaje += `\nMétodo de entrega: ${entregaTexto}`;
  mensaje += `\nDirección: ${direccion}`;
  mensaje += `\nMétodo de pago: ${pago}`;
  mensaje += `\n\nTOTAL: $${total}`;

  const numeroWhatsApp = "56988039496";
  const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;
  window.location.href = url;
}

function cambiarImagenPino() {
    const tipo = document.getElementById("tipoPino").value;
    const imagen = document.getElementById("imagenPino");
  
    if (tipo === "Horno") {
      imagen.src = "img/pino_horno.jpg";
    } else {
      imagen.src = "img/pino_frita.jpg";
    }
  }
  
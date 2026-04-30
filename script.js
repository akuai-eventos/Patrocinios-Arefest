const PLANES = {
    'Base - $10': 10,
    'Platino - $15': 15,
    'Oro - $20': 20
};

const MAX_PRODUCTOS = 5;
let contadorProductos = 0;

const form = document.getElementById('patrociniosForm');
const tipoAporte = document.getElementById('tipoAporte');
const planPatrocinio = document.getElementById('planPatrocinio');
const valorMonetarioBox = document.getElementById('valorMonetarioBox');
const valorMonetario = document.getElementById('valorMonetario');
const productoHeader = document.getElementById('productoHeader');
const productosSection = document.getElementById('productosSection');
const productosContainer = document.getElementById('productosContainer');
const btnAgregarProducto = document.getElementById('btnAgregarProducto');
const servicioHeader = document.getElementById('servicioHeader');
const servicioSection = document.getElementById('servicioSection');
const pagoHeader = document.getElementById('pagoHeader');
const pagoSection = document.getElementById('pagoSection');
const estadoFinanzas = document.getElementById('estadoFinanzas');
const estadoFinanzasPreview = document.getElementById('estadoFinanzasPreview');

function limpiarFormulario() {
    if (confirm('¿Seguro que deseas borrar todo el formulario?')) {
        form.reset();
        productosContainer.innerHTML = '';
        contadorProductos = 0;
        actualizarSecciones();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function mostrar(elemento, debeMostrar) {
    elemento.classList.toggle('hidden', !debeMostrar);
}

function activarCamposPorSeccion(seccionActiva) {
    document.querySelectorAll('[data-section-required]').forEach((campo) => {
        const pertenece = campo.dataset.sectionRequired === seccionActiva;
        campo.required = pertenece;
        campo.disabled = !pertenece;

        if (!pertenece && campo.type !== 'file') {
            campo.value = '';
        }

        if (!pertenece && campo.type === 'file') {
            campo.value = '';
        }
    });

    document.querySelectorAll('[data-product-required]').forEach((campo) => {
        const activo = seccionActiva === 'Producto';
        campo.required = activo;
        campo.disabled = !activo;
    });
}

function actualizarSecciones() {
    const tipo = tipoAporte.value;
    const esMonetario = tipo === 'Monetario';
    const esProducto = tipo === 'Producto';
    const esServicio = tipo === 'Servicio';

    mostrar(valorMonetarioBox, esMonetario);
    mostrar(productoHeader, esProducto);
    mostrar(productosSection, esProducto);
    mostrar(servicioHeader, esServicio);
    mostrar(servicioSection, esServicio);
    mostrar(pagoHeader, esMonetario);
    mostrar(pagoSection, esMonetario);

    activarCamposPorSeccion(tipo || '');

    if (esProducto && productosContainer.children.length === 0) {
        agregarProducto();
    }

    if (!esProducto) {
        productosContainer.innerHTML = '';
        contadorProductos = 0;
    }

    estadoFinanzas.value = esMonetario ? 'Pendiente pago' : 'No aplica';
    estadoFinanzasPreview.textContent = estadoFinanzas.value;

    actualizarValorMonetario();
    actualizarEstadoBotonAgregar();
}

function actualizarValorMonetario() {
    if (tipoAporte.value === 'Monetario') {
        valorMonetario.value = PLANES[planPatrocinio.value] || '';
        valorMonetario.required = true;
    } else {
        valorMonetario.value = '';
        valorMonetario.required = false;
    }
}

function agregarProducto() {
    const totalActual = productosContainer.children.length;
    if (totalActual >= MAX_PRODUCTOS) return;

    contadorProductos += 1;
    const productoId = contadorProductos;
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productCard = productoId;

    const puedeEliminar = totalActual > 0;

    card.innerHTML = `
        <div class="product-card-header">
            <h3 class="product-card-title">Producto ${totalActual + 1}</h3>
            ${puedeEliminar ? `<button type="button" class="btn-remove" onclick="eliminarProducto(${productoId})">Eliminar</button>` : ''}
        </div>

        <div class="product-grid">
            <div class="product-field-full">
                <label class="question-title" for="productoNombre${productoId}">¿Qué producto aporta? <span>*</span></label>
                <input type="text" id="productoNombre${productoId}" class="input-text producto-nombre" placeholder="Ej: café, vasos, postres" data-product-required required>
            </div>

            <div>
                <label class="question-title" for="productoCantidad${productoId}">Cantidad <span>*</span></label>
                <input type="number" id="productoCantidad${productoId}" class="input-text producto-cantidad" min="0" step="0.01" placeholder="Ej: 5" data-product-required required>
            </div>

            <div>
                <label class="question-title" for="productoUnidad${productoId}">Und de medida <span>*</span></label>
                <input type="text" id="productoUnidad${productoId}" class="input-text producto-unidad" placeholder="Ej: unidades, cajas, paquetes" data-product-required required>
            </div>

            <div class="product-field-full">
                <label class="question-title" for="productoValor${productoId}">Valor estimado <span>*</span></label>
                <input type="number" id="productoValor${productoId}" class="input-text producto-valor" min="0" step="0.01" placeholder="Ej: 20" data-product-required required>
            </div>
        </div>
    `;

    productosContainer.appendChild(card);
    actualizarTitulosProductos();
    activarCamposPorSeccion(tipoAporte.value);
    actualizarEstadoBotonAgregar();
}

function eliminarProducto(productoId) {
    const card = document.querySelector(`[data-product-card="${productoId}"]`);
    if (card) card.remove();

    actualizarTitulosProductos();
    actualizarEstadoBotonAgregar();
}

function actualizarTitulosProductos() {
    const cards = document.querySelectorAll('[data-product-card]');
    cards.forEach((card, index) => {
        const titulo = card.querySelector('.product-card-title');
        titulo.textContent = `Producto ${index + 1}`;
    });
}

function actualizarEstadoBotonAgregar() {
    const totalCards = document.querySelectorAll('[data-product-card]').length;
    btnAgregarProducto.disabled = totalCards >= MAX_PRODUCTOS;
}

function obtenerNombreArchivo(idCampo) {
    const input = document.getElementById(idCampo);
    return input && input.files && input.files[0] ? input.files[0].name : '';
}

function obtenerProductos() {
    const cards = document.querySelectorAll('[data-product-card]');

    return Array.from(cards).map((card) => ({
        nombre: card.querySelector('.producto-nombre').value.trim(),
        cantidad: card.querySelector('.producto-cantidad').value.trim(),
        unidad: card.querySelector('.producto-unidad').value.trim(),
        valor: Number(card.querySelector('.producto-valor').value || 0)
    }));
}

function construirDetalleProductos(productos) {
    return productos.map((producto, index) => {
        return `${index + 1}. ${producto.nombre} — ${producto.cantidad} ${producto.unidad} — $${producto.valor}`;
    }).join('\n');
}

function obtenerDatosFormulario() {
    const tipo = tipoAporte.value;
    const plan = planPatrocinio.value;
    const productos = obtenerProductos();
    const valorProductos = productos.reduce((total, producto) => total + Number(producto.valor || 0), 0);

    let queAporta = '';
    let cantidad = '';
    let unidad = '';
    let valorEstimado = '';
    let fechaEntrega = '';
    let metodoPago = 'No aplica';
    let referencia = 'No aplica';
    let capture = 'No aplica';

    if (tipo === 'Monetario') {
        queAporta = 'Aporte monetario';
        cantidad = '1';
        unidad = 'Pago';
        valorEstimado = PLANES[plan] || '';
        fechaEntrega = 'No aplica';
        metodoPago = document.getElementById('metodoPago').value;
        referencia = document.getElementById('referencia').value.trim();
        capture = obtenerNombreArchivo('capture');
    }

    if (tipo === 'Producto') {
        queAporta = construirDetalleProductos(productos);
        cantidad = productos.length > 1 ? 'Varios' : (productos[0]?.cantidad || '');
        unidad = productos.length > 1 ? 'Varios' : (productos[0]?.unidad || '');
        valorEstimado = valorProductos;
        fechaEntrega = document.getElementById('fechaEntregaProducto').value;
    }

    if (tipo === 'Servicio') {
        const nombreServicio = document.getElementById('nombreServicio').value.trim();
        const descripcionServicio = document.getElementById('descripcionServicio').value.trim();

        queAporta = `${nombreServicio} — ${descripcionServicio}`;
        cantidad = 'No aplica';
        unidad = 'Servicio';
        valorEstimado = Number(document.getElementById('valorServicio').value || 0);
        fechaEntrega = document.getElementById('fechaEntregaServicio').value;
    }

    return {
        'ID': document.getElementById('id').value,
        'Estudiante responsable': document.getElementById('estudianteResponsable').value.trim(),
        'Patrocinante': document.getElementById('patrocinante').value.trim(),
        'Descripción de la empresa': document.getElementById('descripcionEmpresa').value.trim(),
        'Logo': obtenerNombreArchivo('logo'),
        'Instagram': document.getElementById('instagram').value.trim(),
        'Tipo de aporte': tipo,
        'Plan de patrocinio': plan,
        '¿Qué aporta?': queAporta,
        'Cantidad': cantidad,
        'Und de medida': unidad,
        'Valor estimado': valorEstimado,
        'Recibido': document.getElementById('recibido').value,
        'Fecha de entrega': fechaEntrega,
        'Método de pago': metodoPago,
        'Referencia': referencia,
        'Capture': capture,
        'Estado finanzas': estadoFinanzas.value
    };
}

function validarFormulario() {
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    if (tipoAporte.value === 'Producto' && obtenerProductos().length === 0) {
        alert('Agrega al menos un producto.');
        return false;
    }

    return true;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validarFormulario()) return;

    const datos = obtenerDatosFormulario();
    console.log('Datos listos para enviar a PATROCINIOS:', datos);

    alert('¡Patrocinio registrado correctamente! En el siguiente paso conectaremos este envío con Google Sheets y Drive.');
});

tipoAporte.addEventListener('change', actualizarSecciones);
planPatrocinio.addEventListener('change', actualizarValorMonetario);
btnAgregarProducto.addEventListener('click', agregarProducto);

document.addEventListener('DOMContentLoaded', actualizarSecciones);

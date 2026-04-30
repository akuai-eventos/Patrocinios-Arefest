const MAX_PRODUCTOS = 5;

const PLANES = {
    'Base - $10': 10,
    'Platino - $15': 15,
    'Oro - $20': 20
};

const form = document.getElementById('patrociniosForm');
const tipoAporte = document.getElementById('tipoAporte');
const planPatrocinio = document.getElementById('planPatrocinio');
const valorMonetario = document.getElementById('valorMonetario');
const valorMonetarioBox = document.getElementById('valorMonetarioBox');
const productosSection = document.getElementById('productosSection');
const productoHeader = document.getElementById('productoHeader');
const productosContainer = document.getElementById('productosContainer');
const btnAgregarProducto = document.getElementById('btnAgregarProducto');
const servicioSection = document.getElementById('servicioSection');
const servicioHeader = document.getElementById('servicioHeader');
const pagoSection = document.getElementById('pagoSection');
const pagoHeader = document.getElementById('pagoHeader');
const estadoFinanzas = document.getElementById('estadoFinanzas');
const resumenBox = document.getElementById('resumenBox');
const resumenContenido = document.getElementById('resumenContenido');

let contadorProductos = 0;

function limpiarFormulario() {
    if (confirm('¿Seguro que deseas borrar todo el formulario?')) {
        form.reset();
        productosContainer.innerHTML = '';
        contadorProductos = 0;
        resumenBox.classList.add('hidden');
        actualizarVistaPorTipo();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function actualizarValorMonetario() {
    const plan = planPatrocinio.value;
    valorMonetario.value = PLANES[plan] || '';
}

function actualizarVistaPorTipo() {
    const tipo = tipoAporte.value;

    ocultarSeccionesDinamicas();
    quitarRequeridosDinamicos();
    actualizarValorMonetario();

    if (tipo === 'Monetario') {
        valorMonetarioBox.classList.remove('hidden');
        pagoHeader.classList.remove('hidden');
        pagoSection.classList.remove('hidden');
        estadoFinanzas.value = 'Pendiente pago';
        document.getElementById('metodoPago').required = true;
        return;
    }

    if (tipo === 'Producto') {
        productoHeader.classList.remove('hidden');
        productosSection.classList.remove('hidden');
        estadoFinanzas.value = 'No aplica';

        if (contadorProductos === 0) {
            agregarProducto();
        }
        actualizarRequeridosProductos();
        return;
    }

    if (tipo === 'Servicio') {
        servicioHeader.classList.remove('hidden');
        servicioSection.classList.remove('hidden');
        estadoFinanzas.value = 'No aplica';
        document.getElementById('nombreServicio').required = true;
        document.getElementById('valorServicio').required = true;
    }
}

function ocultarSeccionesDinamicas() {
    valorMonetarioBox.classList.add('hidden');
    productoHeader.classList.add('hidden');
    productosSection.classList.add('hidden');
    servicioHeader.classList.add('hidden');
    servicioSection.classList.add('hidden');
    pagoHeader.classList.add('hidden');
    pagoSection.classList.add('hidden');
}

function quitarRequeridosDinamicos() {
    document.getElementById('metodoPago').required = false;
    document.getElementById('nombreServicio').required = false;
    document.getElementById('valorServicio').required = false;

    document.querySelectorAll('[data-product-required]').forEach((input) => {
        input.required = false;
    });
}

function actualizarRequeridosProductos() {
    document.querySelectorAll('[data-product-required]').forEach((input) => {
        input.required = true;
    });
}

function agregarProducto() {
    if (contadorProductos >= MAX_PRODUCTOS) return;

    contadorProductos += 1;
    const productoId = contadorProductos;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productCard = productoId;

    card.innerHTML = `
        <div class="product-card-header">
            <h3 class="product-card-title">Producto ${productoId}</h3>
            ${productoId > 1 ? `<button type="button" class="btn-remove" onclick="eliminarProducto(${productoId})">Eliminar</button>` : ''}
        </div>

        <div class="product-grid">
            <div class="product-field-full">
                <label class="question-title" for="productoNombre${productoId}">¿Qué producto aporta? <span>*</span></label>
                <input type="text" id="productoNombre${productoId}" class="input-text producto-nombre" placeholder="Ej: café, vasos, postres" data-product-required>
            </div>

            <div>
                <label class="question-title" for="productoCantidad${productoId}">Cantidad <span>*</span></label>
                <input type="number" id="productoCantidad${productoId}" class="input-text producto-cantidad" min="0" step="0.01" placeholder="Ej: 5" data-product-required>
            </div>

            <div>
                <label class="question-title" for="productoUnidad${productoId}">Und de medida <span>*</span></label>
                <input type="text" id="productoUnidad${productoId}" class="input-text producto-unidad" placeholder="Ej: unidades, cajas, paquetes" data-product-required>
            </div>

            <div class="product-field-full">
                <label class="question-title" for="productoValor${productoId}">Valor estimado <span>*</span></label>
                <input type="number" id="productoValor${productoId}" class="input-text producto-valor" min="0" step="0.01" placeholder="Ej: 20" data-product-required>
            </div>
        </div>
    `;

    productosContainer.appendChild(card);
    actualizarEstadoBotonAgregar();
    actualizarRequeridosProductos();
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

function obtenerProductos() {
    const cards = document.querySelectorAll('[data-product-card]');

    return Array.from(cards).map((card) => {
        return {
            nombre: card.querySelector('.producto-nombre').value.trim(),
            cantidad: card.querySelector('.producto-cantidad').value.trim(),
            unidad: card.querySelector('.producto-unidad').value.trim(),
            valor: Number(card.querySelector('.producto-valor').value || 0)
        };
    }).filter((producto) => producto.nombre || producto.cantidad || producto.unidad || producto.valor);
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
    let referencia = '';

    if (tipo === 'Monetario') {
        queAporta = 'Aporte monetario';
        cantidad = '1';
        unidad = 'Pago';
        valorEstimado = PLANES[plan] || '';
        fechaEntrega = '';
        metodoPago = document.getElementById('metodoPago').value;
        referencia = document.getElementById('referencia').value.trim();
    }

    if (tipo === 'Producto') {
        queAporta = construirDetalleProductos(productos);
        cantidad = productos.length > 1 ? 'Varios' : (productos[0]?.cantidad || '');
        unidad = productos.length > 1 ? 'Varios' : (productos[0]?.unidad || '');
        valorEstimado = valorProductos;
        fechaEntrega = document.getElementById('fechaEntregaProducto').value;
        metodoPago = 'No aplica';
        referencia = 'No aplica';
    }

    if (tipo === 'Servicio') {
        const nombreServicio = document.getElementById('nombreServicio').value.trim();
        const descripcionServicio = document.getElementById('descripcionServicio').value.trim();

        queAporta = descripcionServicio
            ? `${nombreServicio} — ${descripcionServicio}`
            : nombreServicio;
        cantidad = 'No aplica';
        unidad = 'Servicio';
        valorEstimado = Number(document.getElementById('valorServicio').value || 0);
        fechaEntrega = document.getElementById('fechaEntregaServicio').value;
        metodoPago = 'No aplica';
        referencia = 'No aplica';
    }

    return {
        'ID': '',
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
        'Capture': tipo === 'Monetario' ? obtenerNombreArchivo('capture') : 'No aplica',
        'Estado finanzas': estadoFinanzas.value
    };
}

function obtenerNombreArchivo(inputId) {
    const input = document.getElementById(inputId);
    return input.files && input.files[0] ? input.files[0].name : '';
}

function mostrarResumen(datos) {
    resumenContenido.textContent = JSON.stringify(datos, null, 2);
    resumenBox.classList.remove('hidden');
}

function enviarFormulario(datos) {
    // Cuando este formulario esté dentro de Google Apps Script,
    // esta función enviará los datos a la función guardarPatrocinio(datos).
    if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
            .withSuccessHandler(() => {
                alert('¡Registro enviado con éxito!');
                limpiarFormularioSinConfirmar();
            })
            .withFailureHandler((error) => {
                alert('Error al enviar: ' + error.message);
            })
            .guardarPatrocinio(datos);
        return;
    }

    // Modo prueba local: muestra lo que se enviaría a Sheets.
    mostrarResumen(datos);
    alert('Formulario validado. Abajo verás el resumen listo para enviar a Sheets.');
}

function limpiarFormularioSinConfirmar() {
    form.reset();
    productosContainer.innerHTML = '';
    contadorProductos = 0;
    resumenBox.classList.add('hidden');
    actualizarVistaPorTipo();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

btnAgregarProducto.addEventListener('click', agregarProducto);
tipoAporte.addEventListener('change', actualizarVistaPorTipo);
planPatrocinio.addEventListener('change', actualizarValorMonetario);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    actualizarVistaPorTipo();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const datos = obtenerDatosFormulario();
    enviarFormulario(datos);
});

actualizarVistaPorTipo();

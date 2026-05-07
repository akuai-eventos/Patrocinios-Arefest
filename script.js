const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzieexGmpDRVKH3KHenjV7bfWfmlUTIjsyuoPPsLKze8HuhHBoi5xsDqSXaTLEyBVlmng/exec";

const PLANES = {
    'Aliado Base': 10,
    'Aliado Bronce': 20,
    'Aliado Plata': 40,
    'Aliado Oro / Estratégico': 80
};

const INSUMOS_STOCK = [
    { nombre: 'Queso Blanco', categoria: 'Proteína', requerido: 7, unidad: 'Kg' },
    { nombre: 'Pechuga de pollo', categoria: 'Proteína', requerido: 10, unidad: 'Kg' },
    { nombre: 'Falda/Pecho', categoria: 'Proteína', requerido: 6, unidad: 'Kg' },
    { nombre: 'Queso Amarillo', categoria: 'Proteína', requerido: 2, unidad: 'Unidades' },
    { nombre: 'Pernil o Paletas', categoria: 'Proteína', requerido: 1, unidad: 'Unidad' },
    { nombre: 'Hueso Ahumado', categoria: 'Proteína', requerido: 1, unidad: 'Kg' },
    { nombre: 'Huevos', categoria: 'Proteína', requerido: 2, unidad: 'Cartón' },
    { nombre: 'Tocineta Ahumada', categoria: 'Proteína', requerido: 1, unidad: 'Kg' },
    { nombre: 'Aceite', categoria: 'Víveres', requerido: 1, unidad: 'Galón' },
    { nombre: 'Aceitunas', categoria: 'Víveres', requerido: 1, unidad: 'Botella mediana' },
    { nombre: 'Alcaparras', categoria: 'Víveres', requerido: 1, unidad: 'Botella mediana' },
    { nombre: 'Azúcar', categoria: 'Víveres', requerido: 5, unidad: 'Kg' },
    { nombre: 'Bolsas negras para basura', categoria: 'Víveres', requerido: 3, unidad: 'Unidades' },
    { nombre: 'Bolsas para empacar arepas', categoria: 'Víveres', requerido: 200, unidad: 'Unidades' },
    { nombre: 'Desinfectante para pisos', categoria: 'Víveres', requerido: 1, unidad: 'Lt' },
    { nombre: 'Envoplast', categoria: 'Víveres', requerido: 1, unidad: 'Unidad' },
    { nombre: 'Esponja', categoria: 'Víveres', requerido: 1, unidad: 'Unidad' },
    { nombre: 'Fécula de maíz', categoria: 'Víveres', requerido: 500, unidad: 'gr' },
    { nombre: 'Harina Pan', categoria: 'Víveres', requerido: 1, unidad: 'Bulto' },
    { nombre: 'Jabón lavaplatos', categoria: 'Víveres', requerido: 1, unidad: 'Kg' },
    { nombre: 'Margarina Mavesa', categoria: 'Víveres', requerido: 2, unidad: 'Kg' },
    { nombre: 'Mayonesa', categoria: 'Víveres', requerido: 2, unidad: 'Galón' },
    { nombre: 'Mostaza', categoria: 'Víveres', requerido: 1, unidad: 'Kg' },
    { nombre: 'Papel de Aluminio', categoria: 'Víveres', requerido: 1, unidad: 'Unidad' },
    { nombre: 'Vaso plástico 7onz con y sin domo', categoria: 'Víveres', requerido: 200, unidad: 'Unidades' },
    { nombre: 'Vasos plásticos con tapa para salsa', categoria: 'Víveres', requerido: 200, unidad: 'Unidades' },
    { nombre: 'Pitillos', categoria: 'Víveres', requerido: 400, unidad: 'Unidades' },
    { nombre: 'Sal', categoria: 'Víveres', requerido: 2, unidad: 'Kg' },
    { nombre: 'Salsa Inglesa', categoria: 'Víveres', requerido: 1, unidad: 'Botella pequeña' },
    { nombre: 'Salsa Soya', categoria: 'Víveres', requerido: 1, unidad: 'Botella pequeña' },
    { nombre: 'Sangría Blanca o cervezas', categoria: 'Víveres', requerido: 1, unidad: 'Lt' },
    { nombre: 'Servilletas', categoria: 'Víveres', requerido: 4, unidad: 'Paquetes' },
    { nombre: 'Toallín', categoria: 'Víveres', requerido: 1, unidad: 'Unidad' },
    { nombre: 'Vinagre', categoria: 'Víveres', requerido: 0.5, unidad: 'Lt' },
    { nombre: 'Guantes desechables', categoria: 'Utensilios', requerido: 1, unidad: 'Caja' },
    { nombre: 'Teteros dispensadores de salsas', categoria: 'Utensilios', requerido: 5, unidad: 'Unidades' },
    { nombre: 'Otro', categoria: 'Otro', requerido: '', unidad: '' }
];

const UNIDADES = [
    'Kg', 'gr', 'Lt', 'ml', 'Galón', 'Unidad', 'Unidades', 'Botella',
    'Botella mediana', 'Botella pequeña', 'Bulto', 'Cartón', 'Caja',
    'Paquete', 'Paquetes', 'Bolsa', 'Bolsas', 'Servicio', 'No aplica', 'Otro'
];

const MAX_PRODUCTOS = 5;
let contadorProductos = 0;

const form = document.getElementById('patrociniosForm');
const tipoAporte = document.getElementById('tipoAporte');
const nombrePlan = document.getElementById('nombrePlan');
const montoPlan = document.getElementById('montoPlan');
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
const formMessage = document.getElementById('formMessage');
const btnSubmit = document.getElementById('btnSubmit');

function limpiarFormulario() {
    if (confirm('¿Seguro que deseas borrar todo el formulario?')) {
        form.reset();
        productosContainer.innerHTML = '';
        contadorProductos = 0;
        ocultarMensajeFormulario();
        actualizarSecciones();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function mostrar(elemento, debeMostrar) {
    if (!elemento) return;
    elemento.classList.toggle('hidden', !debeMostrar);
}

function mostrarMensajeFormulario(texto, tipo = 'info') {
    if (!formMessage) return;
    formMessage.textContent = texto;
    formMessage.className = `form-message form-message-${tipo}`;
}

function ocultarMensajeFormulario() {
    if (!formMessage) return;
    formMessage.textContent = '';
    formMessage.className = 'form-message hidden';
}

function getValue(id) {
    const elemento = document.getElementById(id);
    return elemento ? elemento.value : '';
}

function getTrimValue(id) {
    return getValue(id).trim();
}

function getFile(id) {
    const input = document.getElementById(id);
    return input && input.files && input.files[0] ? input.files[0] : null;
}

function activarCamposPorSeccion(seccionActiva) {
    document.querySelectorAll('[data-section-required]').forEach((campo) => {
        const pertenece = campo.dataset.sectionRequired === seccionActiva;
        campo.required = pertenece;
        campo.disabled = !pertenece;

        if (!pertenece) {
            campo.value = '';
        }
    });

    document.querySelectorAll('[data-product-required]').forEach((campo) => {
        const activo = seccionActiva === 'Producto';
        campo.required = activo;
        campo.disabled = !activo;

        if (!activo) {
            campo.value = '';
        }
    });

    actualizarCamposOtroProducto();
}

function actualizarSecciones() {
    const tipo = tipoAporte.value;
    const esMonetario = tipo === 'Monetario';
    const esProducto = tipo === 'Producto';
    const esServicio = tipo === 'Servicio';

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

    const estadoAutomatico = esMonetario ? 'Pago confirmado' : 'No aplica';

    if (estadoFinanzas) {
        estadoFinanzas.value = estadoAutomatico;
    }

    if (estadoFinanzasPreview) {
        estadoFinanzasPreview.textContent = estadoAutomatico;
    }

    actualizarMontoPlan();
    actualizarEstadoBotonAgregar();
}

function actualizarMontoPlan() {
    if (!montoPlan || !nombrePlan) return;
    montoPlan.value = PLANES[nombrePlan.value] || '';
}

function obtenerOpcionesInsumos() {
    return INSUMOS_STOCK.map((insumo) => {
        const label = insumo.nombre === 'Otro'
            ? 'Otro'
            : `${insumo.nombre} — ${insumo.categoria} — requerido: ${insumo.requerido} ${insumo.unidad}`;
        return `<option value="${escapeHtml(insumo.nombre)}" data-unidad="${escapeHtml(insumo.unidad)}">${escapeHtml(label)}</option>`;
    }).join('');
}

function obtenerOpcionesUnidades() {
    return UNIDADES.map((unidad) => `<option value="${escapeHtml(unidad)}">${escapeHtml(unidad)}</option>`).join('');
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
                <select id="productoNombre${productoId}" class="input-select producto-nombre" data-product-required required onchange="manejarCambioProducto(${productoId})">
                    <option value="">Selecciona un insumo del stock</option>
                    ${obtenerOpcionesInsumos()}
                </select>
                <p class="field-help stock-note" id="productoStockNota${productoId}">Selecciona un insumo para ver su unidad sugerida.</p>
            </div>

            <div class="product-field-full other-product-field hidden" id="productoOtroBox${productoId}">
                <label class="question-title" for="productoOtro${productoId}">Especifica el producto <span>*</span></label>
                <input type="text" id="productoOtro${productoId}" class="input-text producto-otro" placeholder="Escribe el producto o insumo" disabled>
            </div>

            <div>
                <label class="question-title" for="productoCantidad${productoId}">Cantidad <span>*</span></label>
                <input type="number" id="productoCantidad${productoId}" class="input-text producto-cantidad" min="0.01" step="0.01" placeholder="Ej: 5" data-product-required required>
            </div>

            <div>
                <label class="question-title" for="productoUnidad${productoId}">Und de medida <span>*</span></label>
                <select id="productoUnidad${productoId}" class="input-select producto-unidad" data-product-required required>
                    <option value="">Selecciona una unidad</option>
                    ${obtenerOpcionesUnidades()}
                </select>
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

function manejarCambioProducto(productoId) {
    const select = document.getElementById(`productoNombre${productoId}`);
    const unidad = document.getElementById(`productoUnidad${productoId}`);
    const nota = document.getElementById(`productoStockNota${productoId}`);
    const selected = select.options[select.selectedIndex];
    const unidadSugerida = selected ? selected.dataset.unidad : '';
    const insumo = INSUMOS_STOCK.find((item) => item.nombre === select.value);

    if (unidadSugerida && unidad) {
        unidad.value = unidadSugerida;
    }

    if (nota) {
        if (insumo && insumo.nombre !== 'Otro') {
            nota.textContent = `Stock requerido: ${insumo.requerido} ${insumo.unidad}. Categoría: ${insumo.categoria}.`;
        } else if (select.value === 'Otro') {
            nota.textContent = 'Escribe el nombre del producto en el campo adicional.';
        } else {
            nota.textContent = 'Selecciona un insumo para ver su unidad sugerida.';
        }
    }

    actualizarCamposOtroProducto();
}

function actualizarCamposOtroProducto() {
    document.querySelectorAll('[data-product-card]').forEach((card) => {
        const select = card.querySelector('.producto-nombre');
        const box = card.querySelector('.other-product-field');
        const inputOtro = card.querySelector('.producto-otro');
        const esProductoActivo = tipoAporte.value === 'Producto';
        const esOtro = select && select.value === 'Otro';

        if (box) box.classList.toggle('hidden', !esOtro);

        if (inputOtro) {
            inputOtro.disabled = !(esProductoActivo && esOtro);
            inputOtro.required = esProductoActivo && esOtro;
            if (!esOtro) inputOtro.value = '';
        }
    });
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
        if (titulo) titulo.textContent = `Producto ${index + 1}`;
    });
}

function actualizarEstadoBotonAgregar() {
    const totalCards = document.querySelectorAll('[data-product-card]').length;
    if (!btnAgregarProducto) return;
    btnAgregarProducto.disabled = totalCards >= MAX_PRODUCTOS;
    btnAgregarProducto.textContent = totalCards >= MAX_PRODUCTOS
        ? 'Máximo 5 productos agregados'
        : '+ Añadir otro producto';
}

function obtenerNombreArchivo(idCampo) {
    const input = document.getElementById(idCampo);
    return input && input.files && input.files[0] ? input.files[0].name : '';
}

function archivoABase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = String(reader.result).split(',')[1];
            resolve({
                nombre: file.name,
                tipo: file.type,
                base64
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function obtenerProductos() {
    const cards = document.querySelectorAll('[data-product-card]');

    return Array.from(cards).map((card) => {
        const selectNombre = card.querySelector('.producto-nombre');
        const inputOtro = card.querySelector('.producto-otro');
        const nombreSeleccionado = selectNombre.value.trim();
        const nombreFinal = nombreSeleccionado === 'Otro'
            ? inputOtro.value.trim()
            : nombreSeleccionado;
        const insumo = INSUMOS_STOCK.find((item) => item.nombre === nombreSeleccionado);

        return {
            nombre: nombreFinal,
            nombreSeleccionado,
            categoria: insumo ? insumo.categoria : 'Otro',
            cantidad: card.querySelector('.producto-cantidad').value.trim(),
            unidad: card.querySelector('.producto-unidad').value.trim(),
            valor: Number(card.querySelector('.producto-valor').value || 0)
        };
    });
}

function construirDetalleProductos(productos) {
    return productos.map((producto, index) => {
        return `${index + 1}. ${producto.nombre} — ${producto.cantidad} ${producto.unidad} — $${formatoNumero(producto.valor)}`;
    }).join('\n');
}

function formatoNumero(valor) {
    return Number(valor || 0).toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function obtenerFechaRegistroLocal() {
    return new Date().toLocaleString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

async function obtenerDatosFormulario() {
    const tipo = tipoAporte.value;
    const plan = nombrePlan.value;
    const monto = PLANES[plan] || '';
    const productos = obtenerProductos();
    const valorProductos = productos.reduce((total, producto) => total + Number(producto.valor || 0), 0);
    const logoFile = getFile('logo');
    const captureFile = getFile('capture');

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
        valorEstimado = monto;
        fechaEntrega = 'No aplica';
        metodoPago = getValue('metodoPago');
        referencia = getTrimValue('referencia');
        capture = obtenerNombreArchivo('capture');
    }

    if (tipo === 'Producto') {
        queAporta = construirDetalleProductos(productos);
        cantidad = productos.length > 1 ? 'Varios' : (productos[0]?.cantidad || '');
        unidad = productos.length > 1 ? 'Varios' : (productos[0]?.unidad || '');
        valorEstimado = valorProductos;
        fechaEntrega = getValue('fechaEntregaProducto');
    }

    if (tipo === 'Servicio') {
        const nombreServicio = getTrimValue('nombreServicio');
        const descripcionServicio = getTrimValue('descripcionServicio');

        queAporta = `${nombreServicio} — ${descripcionServicio}`;
        cantidad = 'No aplica';
        unidad = 'Servicio';
        valorEstimado = Number(getValue('valorServicio') || 0);
        fechaEntrega = getValue('fechaEntregaServicio');
    }

    const recibidoAutomatico = tipo === 'Monetario' ? 'Sí' : 'Pendiente';
    const estadoFinanzasAutomatico = tipo === 'Monetario' ? 'Pago confirmado' : 'No aplica';

    return {
        columnas: {
            'ID': getValue('id'),
            'Fecha de registro': obtenerFechaRegistroLocal(),
            'Estudiante responsable': getTrimValue('estudianteResponsable'),
            'Patrocinante': getTrimValue('patrocinante'),
            'Descripción de la empresa': getTrimValue('descripcionEmpresa'),
            'Logo': obtenerNombreArchivo('logo'),
            'Instagram': getTrimValue('instagram'),
            'Tipo de aporte': tipo,
            'Nombre del plan': plan,
            'Monto del plan': monto,
            '¿Qué aporta?': queAporta,
            'Cantidad': cantidad,
            'Und de medida': unidad,
            'Valor estimado': valorEstimado,
            'Recibido': recibidoAutomatico,
            'Fecha de entrega': fechaEntrega,
            'Método de pago': metodoPago,
            'Referencia': referencia,
            'Capture': capture,
            'Estado finanzas': estadoFinanzasAutomatico
        },
        productos,
        archivos: {
            logo: await archivoABase64(logoFile),
            capture: await archivoABase64(captureFile)
        }
    };
}

function validarFormulario() {
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    if (tipoAporte.value === 'Producto') {
        const productos = obtenerProductos();

        if (productos.length === 0) {
            alert('Agrega al menos un producto.');
            return false;
        }

        const incompleto = productos.some((producto) => {
            return !producto.nombre || !producto.cantidad || !producto.unidad || Number.isNaN(producto.valor);
        });

        if (incompleto) {
            alert('Completa todos los campos de cada producto agregado.');
            return false;
        }
    }

    return true;
}

async function enviarPatrocinio(datos) {
    await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(datos)
    });

    return {
        ok: true,
        mensaje: 'Patrocinio enviado correctamente. Revisa Google Sheets para confirmar el registro.'
    };
}

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    ocultarMensajeFormulario();

    if (!validarFormulario()) return;

    try {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Enviando...';

        const datos = await obtenerDatosFormulario();
        const respuesta = await enviarPatrocinio(datos);

        if (respuesta && respuesta.ok === false) {
            throw new Error(respuesta.error || 'No se pudo guardar el patrocinio.');
        }

        const mensaje = respuesta && respuesta.mensaje
            ? respuesta.mensaje
            : '¡Patrocinio registrado correctamente!';

        mostrarMensajeFormulario(mensaje, 'success');

        form.reset();
        productosContainer.innerHTML = '';
        contadorProductos = 0;
        actualizarSecciones();

    } catch (error) {
        console.error(error);
        mostrarMensajeFormulario(`Error: ${error.message || error}`, 'error');
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar patrocinio';
    }
});

tipoAporte.addEventListener('change', actualizarSecciones);
nombrePlan.addEventListener('change', actualizarMontoPlan);
btnAgregarProducto.addEventListener('click', agregarProducto);

document.addEventListener('DOMContentLoaded', function() {
    actualizarMontoPlan();
    actualizarSecciones();
});

function escapeHtml(texto) {
    return String(texto || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
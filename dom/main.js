const auto = {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2022,
    color: "Rojo",
    kilometraje: 15000,
    combustible: "Híbrido",
    transmisión: "Automática",
    precio: 25000,
    dueñosAnteriores: ["Juan Pérez", "Ana Gómez"],
    especificaciones: {
      motor: { tipo: "4 cilindros", potencia: "140 HP", torque: "190 Nm" },
      seguridad: { airbags: 8, frenosABS: true, controlEstabilidad: true },
      dimensiones: { largo: "4.63 m", ancho: "1.78 m", altura: "1.45 m" },
    },
    opciones: ["Asientos de cuero", "Pantalla táctil", "Cámara de reversa"],
    historialMantenimiento: [
      { fecha: "10/03/2023", servicio: "Cambio de aceite", costo: 120 },
      { fecha: "15/07/2023", servicio: "Rotación de llantas", costo: 50 },
    ],
    calcularDepreciacion: function (añoActual) {
      return this.precio * 0.9 ** (añoActual - this.año);
    },
  };
  
  // Insertar en HTML
  const contenido = document.getElementById("contenido");
  
  contenido.innerHTML = `
    <h1 class="text-3xl font-bold mb-4">${auto.marca} ${auto.modelo}</h1>
    <p class="text-gray-700 mb-2"><strong>Año:</strong> ${auto.año}</p>
    <p class="text-gray-700 mb-2"><strong>Color:</strong> ${auto.color}</p>
    <p class="text-gray-700 mb-2"><strong>Kilometraje:</strong> ${auto.kilometraje} km</p>
    <p class="text-gray-700 mb-2"><strong>Combustible:</strong> ${auto.combustible}</p>
    <p class="text-gray-700 mb-2"><strong>Transmisión:</strong> ${auto.transmisión}</p>
    <p class="text-gray-700 mb-2"><strong>Precio:</strong> $${auto.precio}</p>
  
    <h2 class="text-2xl font-semibold mt-6 mb-2">Dueños Anteriores</h2>
    <ul class="list-disc list-inside text-gray-600">
      ${auto.dueñosAnteriores.map(dueno => `<li>${dueno}</li>`).join("")}
    </ul>
  
    <h2 class="text-2xl font-semibold mt-6 mb-2">Especificaciones</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
      <div>
        <h3 class="font-bold mb-1">Motor</h3>
        <p>Tipo: ${auto.especificaciones.motor.tipo}</p>
        <p>Potencia: ${auto.especificaciones.motor.potencia}</p>
        <p>Torque: ${auto.especificaciones.motor.torque}</p>
      </div>
      <div>
        <h3 class="font-bold mb-1">Seguridad</h3>
        <p>Airbags: ${auto.especificaciones.seguridad.airbags}</p>
        <p>Frenos ABS: ${auto.especificaciones.seguridad.frenosABS ? "Sí" : "No"}</p>
        <p>Control de Estabilidad: ${auto.especificaciones.seguridad.controlEstabilidad ? "Sí" : "No"}</p>
      </div>
      <div>
        <h3 class="font-bold mb-1">Dimensiones</h3>
        <p>Largo: ${auto.especificaciones.dimensiones.largo}</p>
        <p>Ancho: ${auto.especificaciones.dimensiones.ancho}</p>
        <p>Altura: ${auto.especificaciones.dimensiones.altura}</p>
      </div>
    </div>
  
    <h2 class="text-2xl font-semibold mt-6 mb-2">Opciones</h2>
    <ul class="list-disc list-inside text-gray-600">
      ${auto.opciones.map(opcion => `<li>${opcion}</li>`).join("")}
    </ul>
  
    <h2 class="text-2xl font-semibold mt-6 mb-2">Historial de Mantenimiento</h2>
    <ul class="list-disc list-inside text-gray-600">
      ${auto.historialMantenimiento.map(servicio => `
        <li>${servicio.fecha}: ${servicio.servicio} ($${servicio.costo})</li>
      `).join("")}
    </ul>
  
    <h2 class="text-2xl font-semibold mt-6 mb-2">Depreciación Actual</h2>
    <p class="text-gray-700">$${auto.calcularDepreciacion(new Date().getFullYear()).toFixed(2)}</p>
  `;
  
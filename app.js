/* ==========================================
   SaaS Dashboard JS - Prototipo Institucional
   ========================================== */

// Función asíncrona para generar hash SHA-256 utilizando la API nativa de Web Crypto
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Estado global de la aplicación (en memoria)
const AppState = {
  currentUser: null,
  users: [
    {
      email: "coordinador@institucion.edu",
      name: "Mateo Torres",
      role: "Administrador",
      contrasenaHash: "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3" // SHA-256 de "admin123"
    },
    {
      email: "juan@institucion.edu",
      name: "Juan Pérez",
      role: "Personal Operativo",
      contrasenaHash: "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92" // SHA-256 de "123456"
    }
  ],
  requirements: [
    {
      id: "REQ-001",
      title: "Gotera en cocina del comedor",
      category: "Cocina",
      priority: "Alta",
      status: "Pendiente",
      location: "Módulo C, Cocina Principal",
      creator: "Ana Gómez",
      date: "2026-06-12",
      description: "Hay una gotera constante sobre la zona de preparación de alimentos que afecta las operaciones del mediodía.",
      responsible: null,
      evidenceBefore: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23E53935' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%23E53935' stroke-width='2' stroke-dasharray='4 4'/></svg>",
      evidenceWork: null,
      responsibleNotes: null,
      evidenceAfter: null,
      closeNotes: null,
      closeDate: null,
      rejectionReason: null,
      history: [
        { date: "2026-06-12 08:30", action: "Requerimiento Creado", user: "Ana Gómez", desc: "Se registró el reporte de gotera en el comedor principal." }
      ]
    },
    {
      id: "REQ-002",
      title: "Reparación de ventana pabellón B",
      category: "Infraestructura",
      priority: "Media",
      status: "En Proceso",
      location: "Pabellón B, Aula 102",
      creator: "Carlos Ruiz",
      date: "2026-06-13",
      description: "El marco de la ventana está suelto y vibra fuertemente con el viento, poniendo en riesgo a los estudiantes.",
      responsible: "Juan Pérez",
      evidenceBefore: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23FF9800' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%23FF9800' stroke-width='2' stroke-dasharray='4 4'/></svg>",
      evidenceWork: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%2300BCD4' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%2300BCD4' stroke-width='2' stroke-dasharray='4 4'/></svg>",
      responsibleNotes: "Bisagras y rieles dañados desmontados. El marco de la ventana ha sido fijado con pernos de expansión y re-sellado.",
      evidenceAfter: null,
      closeNotes: null,
      closeDate: null,
      rejectionReason: null,
      history: [
        { date: "2026-06-13 09:00", action: "Requerimiento Creado", user: "Carlos Ruiz", desc: "Se registró la ventana rota." },
        { date: "2026-06-13 11:15", action: "Responsable Asignado", user: "Admin", desc: "Se asignó a Juan Pérez para la reparación." },
        { date: "2026-06-14 10:00", action: "Trabajo Iniciado", user: "Juan Pérez", desc: "Comenzó el desmonte de las bisagras dañadas." },
        { date: "2026-06-14 15:45", action: "Evidencia Cargada", user: "Juan Pérez", desc: "El responsable subió la evidencia del trabajo de campo y sus observaciones." }
      ]
    },
    {
      id: "REQ-003",
      title: "Limpieza profunda comedor central",
      category: "Limpieza",
      priority: "Baja",
      status: "Resuelto",
      location: "Comedor Central",
      creator: "Lucía Torres",
      date: "2026-06-14",
      description: "Se requiere desinfección y limpieza profunda de pisos y mesas después del evento del aniversario institucional.",
      responsible: "Sofía Rojas",
      evidenceBefore: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23FF9800' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%23FF9800' stroke-width='2' stroke-dasharray='4 4'/></svg>",
      evidenceWork: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%2300BCD4' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%2300BCD4' stroke-width='2'/></svg>",
      responsibleNotes: "Se aplicó desinfectante y cloro industrial en todas las superficies de las mesas y pisos.",
      evidenceAfter: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%234CAF50' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%234CAF50' stroke-width='2'/></svg>",
      closeNotes: "Cierre verificado. Limpieza profunda completada según estándar.",
      closeDate: "2026-06-15",
      rejectionReason: null,
      history: [
        { date: "2026-06-14 15:30", action: "Requerimiento Creado", user: "Lucía Torres", desc: "Reporte de limpieza post-evento." },
        { date: "2026-06-14 16:00", action: "Responsable Asignado", user: "Admin", desc: "Se asignó a Sofía Rojas." },
        { date: "2026-06-15 08:00", action: "Trabajo Iniciado", user: "Sofía Rojas", desc: "Inicio de labores de barrido y desinfección." },
        { date: "2026-06-15 11:30", action: "Evidencia Cargada", user: "Sofía Rojas", desc: "Se subieron observaciones y fotos del comedor limpio." },
        { date: "2026-06-15 13:00", action: "Solución Aprobada", user: "Admin", desc: "El administrador aprobó la solución presentada." },
        { date: "2026-06-15 14:00", action: "Requerimiento Resuelto", user: "Admin", desc: "Cierre de incidencia: Cierre verificado. Limpieza profunda completada según estándar." }
      ]
    },
    {
      id: "REQ-004",
      title: "Fuga de agua jardín frontal",
      category: "Mantenimiento",
      priority: "Alta",
      status: "Resuelto",
      location: "Jardines del Frontis",
      creator: "Pedro Soto",
      date: "2026-06-11",
      description: "Tubería de regadío rota genera encharcamiento de agua limpia en el acceso peatonal principal.",
      responsible: "Juan Pérez",
      evidenceBefore: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23E53935' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%23E53935' stroke-width='2' stroke-dasharray='4 4'/></svg>",
      evidenceWork: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%2300BCD4' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%2300BCD4' stroke-width='2'/></svg>",
      responsibleNotes: "Se cerró la llave de paso de agua potable, se cavó el tramo y se reemplazó el codo de PVC fisurado.",
      evidenceAfter: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%234CAF50' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%234CAF50' stroke-width='2'/></svg>",
      closeNotes: "Cierre verificado. Tubería nueva operativa y terreno compactado.",
      closeDate: "2026-06-12",
      rejectionReason: null,
      history: [
        { date: "2026-06-11 10:00", action: "Requerimiento Creado", user: "Pedro Soto", desc: "Se detectó fuga de agua potable." },
        { date: "2026-06-11 10:20", action: "Responsable Asignado", user: "Admin", desc: "Se asignó a Juan Pérez con carácter de urgencia." },
        { date: "2026-06-11 11:00", action: "Trabajo Iniciado", user: "Juan Pérez", desc: "Cierre de llave de paso principal e inicio de excavación." },
        { date: "2026-06-11 13:00", action: "Evidencia Cargada", user: "Juan Pérez", desc: "Se subieron observaciones y fotos de la zanja reparada." },
        { date: "2026-06-11 13:30", action: "Solución Aprobada", user: "Admin", desc: "El administrador aprobó la solución presentada." },
        { date: "2026-06-12 09:00", action: "Requerimiento Resuelto", user: "Admin", desc: "Cierre de incidencia: Cierre verificado. Tubería nueva operativa y terreno compactado." }
      ]
    }
  ],
  staff: [
    { name: "Juan Pérez", specialty: "Plomería y Carpintería", avatar: "JP" },
    { name: "Sofía Rojas", specialty: "Limpieza y Desinfección", avatar: "SR" },
    { name: "Carlos Mendoza", specialty: "Sistemas Eléctricos y Clima", avatar: "CM" },
    { name: "María Silva", specialty: "Albañilería e Infraestructura", avatar: "MS" }
  ],
  currentSelectedReqId: null,
  activeFilter: "Todos",
  currentTourStep: 0,
  uploadedEvidenceSimulated: null
};

// Configuración de los Pasos del Flujo de Evaluación Guiado
const TourSteps = [
  {
    title: "1. Inicio de Sesión",
    desc: "Ingresa al sistema de mantenimiento con las credenciales precargadas para conocer el portal institucional.",
    highlightId: "login-btn",
    action: () => {
      document.getElementById("login-email").value = "coordinador@institucion.edu";
      document.getElementById("login-password").value = "admin123";
      changeView("login-screen"); // Asegura que esté en login
    }
  },
  {
    title: "2. Dashboard Principal",
    desc: "Visualiza los indicadores clave, incidencias por categoría y prioridad en tiempo real. Esta es la vista general del administrador.",
    highlightId: "dashboard-metrics",
    action: () => {
      // Autenticar automáticamente si no se ha hecho
      if (!AppState.currentUser) {
        AppState.currentUser = { email: "coordinador@institucion.edu", name: "Mateo Torres", role: "Administrador" };
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("sidebar-username").innerText = AppState.currentUser.name;
        document.querySelector(".sidebar-footer .user-role").innerText = AppState.currentUser.role;
      }
      changeView("view-dashboard");
    }
  },
  {
    title: "3. Crear Requerimiento",
    desc: "Vamos a registrar una nueva incidencia. El sistema nos redirigirá al formulario de reporte.",
    highlightId: "btn-crear-req-nav",
    action: () => {
      changeView("view-crear-req");
      // Autocompletar formulario
      document.getElementById("req-title").value = "Cortocircuito en Laboratorio de Computación";
      document.getElementById("req-category").value = "Mantenimiento";
      document.getElementById("req-priority").value = "Alta";
      document.getElementById("req-location").value = "Pabellón A, Segundo Piso";
      document.getElementById("req-desc").value = "Dos tomacorrientes traseros del laboratorio A-202 sacaron chispas al encender las máquinas. El disyuntor saltó inmediatamente.";
    }
  },
  {
    title: "4. Adjuntar Evidencia",
    desc: "Carga la fotografía que demuestra el problema técnico para evitar reportes falsos y facilitar el diagnóstico previo.",
    highlightId: "drag-drop-zone",
    action: () => {
      // Simular la carga de una imagen de cortocircuito
      AppState.uploadedEvidenceSimulated = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23E53935' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%23E53935' stroke-width='2' stroke-dasharray='4 4'/><text x='50%25' y='35%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='11' font-weight='bold' fill='%23E53935'>ESTADO INICIAL</text><text x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%23B71C1C'>Deterioro en tomacorriente</text><text x='50%25' y='78%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%23B71C1C'>y quemadura por chispas</text></svg>";
      
      const zone = document.getElementById("drag-drop-zone");
      const preview = document.getElementById("preview-evidence-img");
      
      // Mostrar la imagen simulada en la UI
      preview.src = AppState.uploadedEvidenceSimulated;
      preview.style.display = "block";
      zone.querySelector("svg").style.display = "none";
      zone.querySelector(".drag-drop-title").innerText = "Imagen cargada con éxito";
      zone.querySelector(".drag-drop-subtitle").innerText = "tomacorriente_quemado.png";
    }
  },
  {
    title: "5. Registrar e Inspeccionar",
    desc: "Registra el requerimiento y ve cómo se inserta en la lista de gestión institucional con su respectivo código REQ-005.",
    highlightId: "btn-submit-req",
    action: () => {
      // Comprobar si ya existe el REQ-005 para no duplicar en clicks repetitivos
      const exists = AppState.requirements.find(r => r.id === "REQ-005");
      if (!exists) {
        const newReq = {
          id: "REQ-005",
          title: "Cortocircuito en Laboratorio de Computación",
          category: "Mantenimiento",
          priority: "Alta",
          status: "Pendiente",
          location: "Pabellón A, Segundo Piso",
          creator: "C. Coordinador",
          date: new Date().toISOString().split('T')[0],
          description: "Dos tomacorrientes traseros del laboratorio A-202 sacaron chispas al encender las máquinas. El disyuntor saltó inmediatamente.",
          responsible: null,
          evidenceBefore: AppState.uploadedEvidenceSimulated || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23E53935' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%23E53935' stroke-width='2' stroke-dasharray='4 4'/><text x='50%25' y='35%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='11' font-weight='bold' fill='%23E53935'>ESTADO INICIAL</text><text x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%23B71C1C'>Deterioro en tomacorriente</text><text x='50%25' y='78%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%23B71C1C'>y quemadura por chispas</text></svg>",
          evidenceAfter: null,
          history: [
            { date: new Date().toISOString().replace('T', ' ').substring(0, 16), action: "Requerimiento Creado", user: "C. Coordinador", desc: "Registro inicial de la falla eléctrica." }
          ]
        };
        AppState.requirements.unshift(newReq); // Añadir al inicio
        // Resetear formulario
        document.getElementById("req-title").value = "";
        document.getElementById("req-desc").value = "";
        document.getElementById("preview-evidence-img").style.display = "none";
        const zone = document.getElementById("drag-drop-zone");
        zone.querySelector("svg").style.display = "inline";
        zone.querySelector(".drag-drop-title").innerText = "Arrastra imágenes aquí";
        zone.querySelector(".drag-drop-subtitle").innerText = "O haz clic para seleccionar (Máx: 5MB)";
        AppState.uploadedEvidenceSimulated = null;
      }
      
      changeView("view-gestion");
      renderRequirementsTable();
    }
  },
  {
    title: "6. Asignar Responsable",
    desc: "Asigna el personal capacitado para resolver el cortocircuito. Seleccionaremos a Carlos Mendoza, especialista eléctrico.",
    highlightId: "btn-assign-req",
    action: () => {
      AppState.currentSelectedReqId = "REQ-005";
      changeView("view-assign");
      renderAssignmentView();
      
      // Simular selección de Carlos Mendoza en la lista
      setTimeout(() => {
        const items = document.querySelectorAll(".staff-item");
        items.forEach(item => {
          if (item.dataset.name === "Carlos Mendoza") {
            item.classList.add("selected");
          } else {
            item.classList.remove("selected");
          }
        });
      }, 50);
    }
  },
  {
    title: "7. Seguimiento Kanban",
    desc: "Asignamos al técnico y navegamos al Tablero Kanban. Moveremos el requerimiento a 'En Proceso' simulando que el técnico inicia la labor.",
    highlightId: "kanban-board-container",
    action: () => {
      // Asignar responsable en el estado
      const req = AppState.requirements.find(r => r.id === "REQ-005");
      if (req) {
        req.responsible = "Carlos Mendoza";
        req.status = "En Proceso";
        const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
        // Evitar duplicar historial en clicks repetidos
        if (!req.history.find(h => h.action.includes("Asignado"))) {
          req.history.push({ date: dateStr, action: "Responsable Asignado", user: "Admin", desc: "Se asignó a Carlos Mendoza para solucionar la falla." });
          req.history.push({ date: dateStr, action: "Estado Actualizado: En Proceso", user: "Carlos Mendoza", desc: "Se realiza corte general e inspección del cableado." });
        }
      }
      
      changeView("view-kanban");
      renderKanban();
    }
  },
  {
    title: "8. Cargar Solución y Resolver",
    desc: "El técnico soluciona la falla y carga la evidencia del trabajo terminado, cambiando el requerimiento a estado 'Resuelto'.",
    highlightId: "kanban-board-container",
    action: () => {
      const req = AppState.requirements.find(r => r.id === "REQ-005");
      if (req) {
        req.status = "Resuelto";
        req.evidenceAfter = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%234CAF50' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%234CAF50' stroke-width='2'/><text x='50%25' y='35%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='11' font-weight='bold' fill='%232E7D32'>SOLUCIÓN VERIFICADA</text><text x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%232E7D32'>Tomacorriente nuevo instalado</text><text x='50%25' y='78%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%232E7D32'>y suministro eléctrico reestablecido</text></svg>";
        const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
        
        if (!req.history.find(h => h.action.includes("Resuelto"))) {
          req.history.push({ date: dateStr, action: "Estado Actualizado: Resuelto", user: "Carlos Mendoza", desc: "Cableado quemado reemplazado. Tomacorrientes nuevos instalados y probados." });
        }
      }
      changeView("view-kanban");
      renderKanban();
    }
  },
  {
    title: "9. Historial y Trazabilidad",
    desc: "Inspecciona la línea de tiempo vertical de la incidencia. Muestra la trazabilidad total de fechas, acciones y personal que intervino.",
    highlightId: "timeline-box",
    action: () => {
      AppState.currentSelectedReqId = "REQ-005";
      changeView("view-timeline");
      renderTimelineView();
    }
  },
  {
    title: "10. Reportes y Estadísticas",
    desc: "Genera el reporte consolidado de la gestión. Observa cómo el tiempo promedio de resolución y los porcentajes cambian dinámicamente.",
    highlightId: "btn-generate-report",
    action: () => {
      changeView("view-reports");
      renderReportsView();
    }
  }
];

// ==========================================
// Rutas e Intercambio de Vistas
// ==========================================
function changeView(viewId) {
  // Ocultar todas las pantallas
  const views = document.querySelectorAll(".screen-view");
  views.forEach(v => v.classList.remove("active"));

  // Mostrar la pantalla seleccionada
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add("active");
  }

  // Si es login, ocultar la estructura general del app, de lo contrario mostrarla
  const loginWrapper = document.getElementById("login-screen");
  if (viewId === "login-screen") {
    loginWrapper.style.display = "flex";
  } else {
    loginWrapper.style.display = "none";
  }

  // Actualizar el menú del sidebar
  const menuItems = document.querySelectorAll(".sidebar-menu-item");
  menuItems.forEach(item => {
    if (item.dataset.view === viewId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Renderizados correspondientes a la vista
  if (viewId === "view-dashboard") {
    updateDashboard();
  } else if (viewId === "view-gestion") {
    renderRequirementsTable();
  } else if (viewId === "view-kanban") {
    renderKanban();
  } else if (viewId === "view-assign") {
    renderAssignmentView();
  } else if (viewId === "view-evidences") {
    renderEvidenceGallery();
  } else if (viewId === "view-timeline") {
    renderTimelineView();
  } else if (viewId === "view-reports") {
    renderReportsView();
  } else if (viewId === "view-aprobacion") {
    renderAprobacionView();
  } else if (viewId === "view-usuarios") {
    renderUsersTable();
  }

  // Actualizar título del header principal
  updateHeaderTitle(viewId);
}

function updateHeaderTitle(viewId) {
  const titles = {
    "view-dashboard": "Dashboard Institucional",
    "view-gestion": "Gestión de Requerimientos",
    "view-crear-req": "Nuevo Requerimiento",
    "view-aprobacion": "Aprobación y Cierre de Incidencias",
    "view-kanban": "Seguimiento Kanban de Incidencias",
    "view-assign": "Asignación de Personal Responsable",
    "view-evidences": "Galería de Evidencias (Antes / Después)",
    "view-timeline": "Historial de Trazabilidad del Requerimiento",
    "view-reports": "Reportes y Métricas del Sistema",
    "view-usuarios": "Gestión de Usuarios y Roles"
  };
  const title = titles[viewId] || "Sistema de Gestión Institucional";
  document.getElementById("main-header-title").innerText = title;
}

// ==========================================
// PANTALLA 2: Dashboard Lógica
// ==========================================
function updateDashboard() {
  const reqs = AppState.requirements;
  
  // Contar estados
  const pendientes = reqs.filter(r => r.status === "Pendiente" || r.status === "Pendiente de Aprobación").length;
  const proceso = reqs.filter(r => r.status === "En Proceso" || r.status === "Aprobado" || r.status === "Corrección Requerida").length;
  const resueltos = reqs.filter(r => r.status === "Resuelto").length;
  const total = pendientes + proceso + resueltos;

  // Actualizar números en tarjetas superiores
  document.getElementById("dash-val-pendientes").innerText = pendientes;
  document.getElementById("dash-val-proceso").innerText = proceso;
  document.getElementById("dash-val-resueltos").innerText = resueltos;
  document.getElementById("dash-val-total").innerText = total;

  // Renderizar Gráficos SVG
  renderCategoryChart();
  renderPriorityChart();

  // Renderizar tabla de reportes recientes (últimos 3)
  const recentTableBody = document.getElementById("dashboard-recent-table-body");
  recentTableBody.innerHTML = "";
  
  // Tomar los 3 primeros (los más recientes)
  reqs.slice(0, 3).forEach(req => {
    const tr = document.createElement("tr");
    tr.style.cursor = "pointer";
    tr.onclick = () => {
      AppState.currentSelectedReqId = req.id;
      changeView("view-timeline");
    };

    let badgeStatus = "badge-pendiente";
    if (req.status === "En Proceso") badgeStatus = "badge-proceso";
    if (req.status === "Aprobado") badgeStatus = "badge-aprobado";
    if (req.status === "Corrección Requerida") badgeStatus = "badge-reparacion-requerida";
    if (req.status === "Resuelto") badgeStatus = "badge-resuelto";

    const badgePriority = req.priority === "Alta" ? "badge-alta" : (req.priority === "Media" ? "badge-media" : "badge-baja");
    const responsibleName = req.responsible ? req.responsible : "Sin Asignar";
    
    tr.innerHTML = `
      <td style="font-weight:700; color:var(--primary);">${req.id}</td>
      <td style="font-weight:600;">${req.title}</td>
      <td>${req.category}</td>
      <td><span class="badge ${badgePriority}">${req.priority}</span></td>
      <td>
        <div class="user-cell">
          <div class="user-avatar-sm">${responsibleName.split(" ").map(n=>n[0]).join("")}</div>
          <span>${responsibleName}</span>
        </div>
      </td>
      <td><span class="badge ${badgeStatus}">${req.status}</span></td>
    `;
    recentTableBody.appendChild(tr);
  });
}

// Gráfico de Barras SVG (Categorías)
function renderCategoryChart() {
  const container = document.getElementById("category-chart-container");
  const categories = ["Infraestructura", "Limpieza", "Cocina", "Mantenimiento", "Suministros"];
  
  // Contar incidencias por categoría
  const counts = {};
  categories.forEach(cat => counts[cat] = 0);
  AppState.requirements.forEach(req => {
    if (counts[req.category] !== undefined) {
      counts[req.category]++;
    }
  });

  const maxVal = Math.max(...Object.values(counts), 1);
  
  // Dibujar barras SVG
  let barsHTML = "";
  categories.forEach((cat, idx) => {
    const val = counts[cat];
    const heightPercent = (val / maxVal) * 150; // Max altura 150px
    const y = 180 - heightPercent;
    const x = 50 + idx * 75;

    barsHTML += `
      <g class="bar-hover" data-category="${cat}" data-count="${val}">
        <!-- Barra -->
        <rect x="${x}" y="${y}" width="40" height="${heightPercent}" rx="4" fill="#1F4E79" />
        <!-- Valor arriba de la barra -->
        <text x="${x + 20}" y="${y - 8}" text-anchor="middle" font-size="11" font-weight="700" fill="#1E293B">${val}</text>
        <!-- Texto del eje X -->
        <text x="${x + 20}" y="200" text-anchor="middle" font-size="10" font-weight="600" fill="#64748B">${cat.substring(0, 5)}...</text>
        <!-- Tooltip invisible en SVG, simulado -->
        <title>${cat}: ${val} requerimientos</title>
      </g>
    `;
  });

  container.innerHTML = `
    <svg class="svg-chart" viewBox="0 0 450 240">
      <!-- Líneas de cuadrícula horizontales -->
      <line x1="30" y1="180" x2="420" y2="180" stroke="#E2E8F0" stroke-width="1" />
      <line x1="30" y1="105" x2="420" y2="105" stroke="#F1F5F9" stroke-width="1" />
      <line x1="30" y1="30" x2="420" y2="30" stroke="#F1F5F9" stroke-width="1" />
      ${barsHTML}
    </svg>
  `;
}

// Gráfico de Torta / Donut SVG (Prioridades)
function renderPriorityChart() {
  const container = document.getElementById("priority-chart-container");
  const reqs = AppState.requirements;
  
  const alta = reqs.filter(r => r.priority === "Alta").length;
  const media = reqs.filter(r => r.priority === "Media").length;
  const baja = reqs.filter(r => r.priority === "Baja").length;
  const total = alta + media + baja;

  if (total === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);">Sin datos</p>`;
    return;
  }

  // Ángulos
  const pAlta = alta / total;
  const pMedia = media / total;
  const pBaja = baja / total;

  // Renderizamos un semicírculo o gráfico circular estilizado, 
  // pero para asegurar robustez matemática y diseño premium, utilizaremos una representación donut SVG
  // usando stroke-dasharray en círculos concéntricos o un desglose circular clásico de 3 partes
  const r = 50;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * r;

  const dashAlta = circumference * pAlta;
  const dashMedia = circumference * pMedia;
  const dashBaja = circumference * pBaja;

  const offsetAlta = 0;
  const offsetMedia = dashAlta;
  const offsetBaja = dashAlta + dashMedia;

  container.innerHTML = `
    <svg class="svg-chart" viewBox="0 0 320 200">
      <g transform="translate(10, 0)">
        <!-- Donut Slices -->
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="transparent" stroke="#E53935" stroke-width="20" 
          stroke-dasharray="${dashAlta} ${circumference}" stroke-dashoffset="${-offsetAlta}" class="pie-slice">
          <title>Alta: ${alta} (${Math.round(pAlta*100)}%)</title>
        </circle>
        
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="transparent" stroke="#FF9800" stroke-width="20" 
          stroke-dasharray="${dashMedia} ${circumference}" stroke-dashoffset="${-offsetMedia}" class="pie-slice">
          <title>Media: ${media} (${Math.round(pMedia*100)}%)</title>
        </circle>
        
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="transparent" stroke="#94A3B8" stroke-width="20" 
          stroke-dasharray="${dashBaja} ${circumference}" stroke-dashoffset="${-offsetBaja}" class="pie-slice">
          <title>Baja: ${baja} (${Math.round(pBaja*100)}%)</title>
        </circle>

        <!-- Centro del Donut -->
        <circle cx="${cx}" cy="${cy}" r="38" fill="white" />
        <text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="12" font-weight="800" fill="#1E293B">${total}</text>
        <text x="${cx}" y="${cy + 17}" text-anchor="middle" font-size="8" font-weight="600" fill="#64748B">TOTAL</text>
      </g>

      <!-- Leyenda -->
      <g transform="translate(200, 50)">
        <rect x="0" y="0" width="12" height="12" rx="3" fill="#E53935" />
        <text x="20" y="10" font-size="11" font-weight="600" fill="#475569">Alta: ${alta}</text>

        <rect x="0" y="24" width="12" height="12" rx="3" fill="#FF9800" />
        <text x="20" y="34" font-size="11" font-weight="600" fill="#475569">Media: ${media}</text>

        <rect x="0" y="48" width="12" height="12" rx="3" fill="#94A3B8" />
        <text x="20" y="58" font-size="11" font-weight="600" fill="#475569">Baja: ${baja}</text>
      </g>
    </svg>
  `;
}

// ==========================================
// PANTALLA 3: Gestión de Requerimientos Lógica
// ==========================================
function renderRequirementsTable() {
  const tableBody = document.getElementById("req-table-body");
  tableBody.innerHTML = "";

  // Filtrar según el filtro activo
  let filtered = AppState.requirements;
  if (AppState.activeFilter === "Pendiente") {
    filtered = AppState.requirements.filter(r => r.status === "Pendiente" || r.status === "Pendiente de Aprobación");
  } else if (AppState.activeFilter === "En Proceso") {
    filtered = AppState.requirements.filter(r => r.status === "En Proceso" || r.status === "Aprobado" || r.status === "Corrección Requerida");
  } else if (AppState.activeFilter === "Resuelto") {
    filtered = AppState.requirements.filter(r => r.status === "Resuelto");
  }

  // Actualizar los números de los filtros rápidos
  const countTodos = AppState.requirements.length;
  const countPendiente = AppState.requirements.filter(r => r.status === "Pendiente" || r.status === "Pendiente de Aprobación").length;
  const countProceso = AppState.requirements.filter(r => r.status === "En Proceso" || r.status === "Aprobado" || r.status === "Corrección Requerida").length;
  const countResuelto = AppState.requirements.filter(r => r.status === "Resuelto").length;

  document.getElementById("filter-count-todos").innerText = countTodos;
  document.getElementById("filter-count-pendiente").innerText = countPendiente;
  document.getElementById("filter-count-proceso").innerText = countProceso;
  document.getElementById("filter-count-resuelto").innerText = countResuelto;

  filtered.forEach(req => {
    const tr = document.createElement("tr");
    
    let badgeStatus = "badge-pendiente";
    if (req.status === "En Proceso") badgeStatus = "badge-proceso";
    if (req.status === "Aprobado") badgeStatus = "badge-aprobado";
    if (req.status === "Corrección Requerida") badgeStatus = "badge-reparacion-requerida";
    if (req.status === "Resuelto") badgeStatus = "badge-resuelto";

    const badgePriority = req.priority === "Alta" ? "badge-alta" : (req.priority === "Media" ? "badge-media" : "badge-baja");

    tr.innerHTML = `
      <td style="font-weight:700; color:var(--primary);">${req.id}</td>
      <td style="font-weight:600; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${req.title}</td>
      <td>${req.category}</td>
      <td><span class="badge ${badgePriority}">${req.priority}</span></td>
      <td><span class="badge ${badgeStatus}">${req.status}</span></td>
      <td>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-outline" style="padding: 6px 10px; font-size:0.75rem;" onclick="viewTimelineFromTable('${req.id}')">Trazabilidad</button>
          ${req.status !== "Resuelto" && req.status !== "Aprobado" ? `<button class="btn btn-primary" style="padding: 6px 10px; font-size:0.75rem;" onclick="assignFromTable('${req.id}')">Asignar</button>` : ''}
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

window.viewTimelineFromTable = function(id) {
  AppState.currentSelectedReqId = id;
  changeView("view-timeline");
};

window.assignFromTable = function(id) {
  AppState.currentSelectedReqId = id;
  changeView("view-assign");
};

// Configurar los filtros rápidos de la pantalla de gestión
function initGestionFilters() {
  const filters = document.querySelectorAll(".filter-quick-card");
  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      filters.forEach(f => f.classList.remove("active"));
      filter.classList.add("active");
      AppState.activeFilter = filter.dataset.status;
      renderRequirementsTable();
    });
  });
}

// ==========================================
// PANTALLA 4: Crear Requerimiento Lógica
// ==========================================
function setupCrearRequerimientoForm() {
  const form = document.getElementById("new-req-form");
  const dragZone = document.getElementById("drag-drop-zone");
  const fileInput = document.getElementById("req-file-input");
  const previewImg = document.getElementById("preview-evidence-img");
  const descTextarea = document.getElementById("req-desc");
  const charCountDiv = document.getElementById("desc-char-count");

  // Character counter for description
  if (descTextarea && charCountDiv) {
    descTextarea.addEventListener("input", () => {
      const len = descTextarea.value.length;
      charCountDiv.innerText = `${len} / 1000 caracteres`;
    });
  }

  // Drag and Drop
  dragZone.addEventListener("click", () => fileInput.click());
  
  dragZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragZone.classList.add("dragover");
  });

  dragZone.addEventListener("dragleave", () => {
    dragZone.classList.remove("dragover");
  });

  dragZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dragZone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      handleFileSelected(fileInput.files[0]);
    }
  });

  function handleFileSelected(file) {
    // Reset error styles
    dragZone.classList.remove("drag-error");
    dragZone.querySelector(".drag-drop-title").style.color = "";
    
    const maxSize = 10 * 1024 * 1024; // 10 MB
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    
    // Check format
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith(".jpg") && !file.name.toLowerCase().endsWith(".jpeg") && !file.name.toLowerCase().endsWith(".png")) {
      dragZone.classList.add("drag-error");
      dragZone.querySelector(".drag-drop-title").innerText = "Error: Formato no permitido. Solo JPG o PNG.";
      dragZone.querySelector(".drag-drop-subtitle").innerText = "Por favor, elija un archivo válido.";
      fileInput.value = "";
      previewImg.style.display = "none";
      AppState.uploadedEvidenceSimulated = null;
      return;
    }
    
    // Check size
    if (file.size > maxSize) {
      dragZone.classList.add("drag-error");
      dragZone.querySelector(".drag-drop-title").innerText = "Error: El archivo pesa más de 10 MB.";
      dragZone.querySelector(".drag-drop-subtitle").innerText = "Por favor, suba una imagen de menor tamaño.";
      fileInput.value = "";
      previewImg.style.display = "none";
      AppState.uploadedEvidenceSimulated = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      AppState.uploadedEvidenceSimulated = e.target.result;
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
      dragZone.querySelector("svg").style.display = "none";
      dragZone.querySelector(".drag-drop-title").innerText = "Imagen cargada con éxito";
      
      // Simular la copia física del archivo localmente
      const simPath = `\\\\servidor-local\\mantenimiento\\evidencias\\inicial_${Date.now()}_${file.name}`;
      dragZone.querySelector(".drag-drop-subtitle").innerText = `${file.name}\n💾 Copiado localmente a: ${simPath}`;
      console.log(`[Copia Física Local] Archivo de evidencia copiado exitosamente a: ${simPath}`);
      
      // Guardar el path temporal
      AppState.uploadedEvidenceSimulatedPath = simPath;
    };
    reader.readAsDataURL(file);
  }

  // Submit del Formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("req-title").value;
    const category = document.getElementById("req-category").value;
    const priority = document.getElementById("req-priority").value;
    const location = document.getElementById("req-location").value;
    const description = document.getElementById("req-desc").value;
    const momento = document.getElementById("req-momento").value;

    if (!title || !description) {
      alert("Por favor complete los campos obligatorios.");
      return;
    }

    if (description.length > 1000) {
      alert("Error: La descripción no puede superar los 1000 caracteres.");
      return;
    }

    const nextIdNum = AppState.requirements.length + 1;
    const nextId = `REQ-00${nextIdNum}`;
    
    const evidencePath = AppState.uploadedEvidenceSimulatedPath || (AppState.uploadedEvidenceSimulated ? `\\\\servidor-local\\mantenimiento\\evidencias\\${nextId}_inicial.png` : null);
    
    // Crear el nuevo requerimiento
    const newReq = {
      id: nextId,
      title: title,
      category: category,
      priority: priority,
      status: "Pendiente",
      location: location,
      creator: AppState.currentUser ? AppState.currentUser.name : "Coordinador",
      date: new Date().toISOString().split('T')[0],
      description: description,
      responsible: null,
      momentoEvidencia: momento,
      evidenceBeforePath: evidencePath,
      evidenceBefore: AppState.uploadedEvidenceSimulated || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%2364748B' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%2364748B' stroke-width='2' stroke-dasharray='4 4'/></svg>",
      evidenceWork: null,
      responsibleNotes: null,
      evidenceAfter: null,
      closeNotes: null,
      closeDate: null,
      rejectionReason: null,
      history: [
        { 
          date: new Date().toISOString().replace('T', ' ').substring(0, 16), 
          action: "Requerimiento Creado", 
          user: AppState.currentUser ? AppState.currentUser.name : "Coordinador", 
          desc: `Se registró el reporte en el sistema. Momento de Evidencia: ${momento}.${evidencePath ? ` Archivo copiado físicamente a: ${evidencePath}` : ''}`
        }
      ]
    };

    AppState.requirements.unshift(newReq); // Insertar al inicio de la lista
    
    // Resetear formulario
    form.reset();
    if (charCountDiv) charCountDiv.innerText = "0 / 1000 caracteres";
    previewImg.style.display = "none";
    dragZone.querySelector("svg").style.display = "inline";
    dragZone.querySelector(".drag-drop-title").innerText = "Arrastra imágenes aquí";
    dragZone.querySelector(".drag-drop-subtitle").innerText = "O haz clic para seleccionar (JPG/PNG, Máx: 10MB)";
    AppState.uploadedEvidenceSimulated = null;
    AppState.uploadedEvidenceSimulatedPath = null;

    alert(`Requerimiento ${nextId} creado de forma exitosa.`);
    changeView("view-gestion");
  });
}

// ==========================================
// PANTALLA 5: Kanban Seguimiento Lógica
// ==========================================
function renderKanban() {
  const colPendiente = document.getElementById("kanban-col-pendiente");
  const colProceso = document.getElementById("kanban-col-proceso");
  const colResuelto = document.getElementById("kanban-col-resuelto");

  colPendiente.innerHTML = "";
  colProceso.innerHTML = "";
  colResuelto.innerHTML = "";

  const reqs = AppState.requirements;

  reqs.forEach(req => {
    const card = document.createElement("div");
    card.className = "kanban-card";
    card.onclick = () => {
      AppState.currentSelectedReqId = req.id;
      changeView("view-timeline");
    };

    const badgePriority = req.priority === "Alta" ? "badge-alta" : (req.priority === "Media" ? "badge-media" : "badge-baja");
    const responsibleAvatar = req.responsible ? req.responsible.split(" ").map(n=>n[0]).join("") : "?";

    let actionButtonHTML = "";
    if (req.status === "Pendiente" || req.status === "Pendiente de Aprobación") {
      actionButtonHTML = `
        <button class="btn btn-primary" style="padding: 6px 10px; font-size:0.75rem; width:100%; margin-top:8px; background-color: var(--primary);" onclick="event.stopPropagation(); startWorkFromKanban('${req.id}');">
          Iniciar Trabajo
        </button>
      `;
    } else if (req.status === "En Proceso") {
      if (!req.evidenceWork) {
        actionButtonHTML = `
          <button class="btn btn-secondary" style="padding: 6px 10px; font-size:0.75rem; width:100%; margin-top:8px; background-color: var(--info);" onclick="event.stopPropagation(); simulateTechnicianWork('${req.id}');">
            Registrar Trabajo (Técnico)
          </button>
        `;
      } else {
        actionButtonHTML = `
          <div style="margin-top: 8px; padding: 6px; font-size: 0.75rem; font-weight:700; color: var(--info); background-color: var(--info-light); text-align: center; border-radius: var(--radius-sm); border: 1px solid rgba(0, 188, 212, 0.2);">
            Trabajo Listo para Revisión
          </div>
        `;
      }
    } else if (req.status === "Aprobado") {
      actionButtonHTML = `
        <div style="margin-top: 8px; padding: 6px; font-size: 0.75rem; font-weight:700; color: var(--secondary); background-color: var(--secondary-light); text-align: center; border-radius: var(--radius-sm); border: 1px solid rgba(76, 175, 80, 0.2);">
          Solución Aprobada (Cierre Pendiente)
        </div>
      `;
    } else if (req.status === "Corrección Requerida") {
      actionButtonHTML = `
        <button class="btn btn-primary" style="padding: 6px 10px; font-size:0.75rem; width:100%; margin-top:8px; background-color: var(--danger);" onclick="event.stopPropagation(); simulateTechnicianWork('${req.id}');">
          Subir Corrección Solicitada
        </button>
      `;
    }

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-weight:700; color:var(--primary); font-size:0.8rem;">${req.id}</span>
        <span class="badge ${badgePriority}">${req.priority}</span>
      </div>
      <div class="kanban-card-title">${req.title}</div>
      <div style="font-size:0.75rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
        <svg style="width:12px; height:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        <span>${req.location}</span>
      </div>
      <div class="kanban-card-footer">
        <span>${req.date}</span>
        <div style="display:flex; align-items:center; gap:6px;">
          <div class="user-avatar-sm" style="width:22px; height:22px; font-size:0.65rem;">${responsibleAvatar}</div>
          <span style="font-weight:600;">${req.responsible || "Sin Asignar"}</span>
        </div>
      </div>
      ${actionButtonHTML}
    `;

    // Adjuntar a su columna respectiva
    if (req.status === "Pendiente" || req.status === "Pendiente de Aprobación") {
      colPendiente.appendChild(card);
    } else if (req.status === "En Proceso" || req.status === "Aprobado" || req.status === "Corrección Requerida") {
      colProceso.appendChild(card);
    } else if (req.status === "Resuelto") {
      colResuelto.appendChild(card);
    }
  });

  // Mostrar el conteo de tarjetas
  document.getElementById("kanban-count-pendiente").innerText = reqs.filter(r => r.status === "Pendiente" || r.status === "Pendiente de Aprobación").length;
  document.getElementById("kanban-count-proceso").innerText = reqs.filter(r => r.status === "En Proceso" || r.status === "Aprobado" || r.status === "Corrección Requerida").length;
  document.getElementById("kanban-count-resuelto").innerText = reqs.filter(r => r.status === "Resuelto").length;
}

window.startWorkFromKanban = function(id) {
  const req = AppState.requirements.find(r => r.id === id);
  if (req) {
    req.status = "En Proceso";
    if (!req.responsible) {
      req.responsible = AppState.staff[0].name; // Asignar por defecto Juan Pérez
    }
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    req.history.push({
      date: dateStr,
      action: "Trabajo Iniciado",
      user: req.responsible,
      desc: "Se iniciaron las inspecciones y tareas de campo en el sitio."
    });
    renderKanban();
    updateDashboard();
    renderRequirementsTable();
  }
};

window.simulateTechnicianWork = function(id) {
  const req = AppState.requirements.find(r => r.id === id);
  if (req) {
    let defaultNotes = "Se completó la reparación y se realizaron las pruebas correspondientes.";
    if (req.category === "Cocina") {
      defaultNotes = "Se detectó fisura en codo principal del desagüe de cocina. Se reemplazó tubería y selló gotera.";
    } else if (req.category === "Infraestructura") {
      defaultNotes = "Vidrios y marcos sueltos reforzados. Bisagras y anclajes nuevos instalados para evitar vibración.";
    } else if (req.category === "Limpieza") {
      defaultNotes = "Área completamente desinfectada con cloro industrial. Mesas y pisos limpios y secos.";
    } else if (req.category === "Mantenimiento") {
      defaultNotes = "Se cambiaron tomacorrientes quemados y se probó la carga del disyuntor en el tablero general.";
    } else if (req.category === "Suministros") {
      defaultNotes = "Suministros ordenados y clasificados en los estantes del almacén.";
    }

    const notes = prompt("Ingrese observaciones del responsable técnico sobre el trabajo realizado:", defaultNotes);
    if (notes === null) return;
    if (!notes.trim()) {
      alert("Las observaciones son obligatorias para registrar el trabajo.");
      return;
    }

    req.responsibleNotes = notes;
    req.status = "En Proceso";

    // Generar evidencia de trabajo (SVG cian)
    req.evidenceWork = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%2300BCD4' opacity='0.15'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%2300BCD4' stroke-width='2' stroke-dasharray='4 4'/></svg>`;

    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    req.history.push({
      date: dateStr,
      action: "Evidencia Cargada",
      user: req.responsible || "Técnico Asignado",
      desc: `Trabajo finalizado. Observaciones técnicas: ${notes}`
    });

    alert(`Trabajo registrado para ${req.id}. La evidencia de trabajo y observaciones han sido cargadas para aprobación del administrador.`);
    
    renderKanban();
    updateDashboard();
    renderRequirementsTable();
  }
};

// ==========================================
// PANTALLA 6: Asignación de Responsables Lógica
// ==========================================
let selectedStaffName = null;

function renderAssignmentView() {
  const req = AppState.requirements.find(r => r.id === AppState.currentSelectedReqId) || AppState.requirements[0];
  if (!req) return;

  AppState.currentSelectedReqId = req.id;

  // Llenar detalles del requerimiento a la izquierda
  document.getElementById("assign-req-code").innerText = req.id;
  document.getElementById("assign-req-title").innerText = req.title;
  document.getElementById("assign-req-desc").innerText = req.description;
  document.getElementById("assign-req-category").innerText = req.category;
  document.getElementById("assign-req-priority").innerText = req.priority;
  document.getElementById("assign-req-location").innerText = req.location;
  document.getElementById("assign-req-current-resp").innerText = req.responsible || "Ninguno asignado";

  // Llenar lista de personal disponible a la derecha
  const staffContainer = document.getElementById("assign-staff-list");
  staffContainer.innerHTML = "";

  selectedStaffName = null;

  AppState.staff.forEach(person => {
    const div = document.createElement("div");
    div.className = "staff-item";
    div.dataset.name = person.name;
    
    // Si ya es el responsable actual, mostrarlo seleccionado
    if (req.responsible === person.name) {
      div.classList.add("selected");
      selectedStaffName = person.name;
    }

    div.innerHTML = `
      <div class="staff-profile-card">
        <div class="staff-avatar">${person.avatar}</div>
        <div class="staff-item-info">
          <span class="staff-name">${person.name}</span>
          <span class="staff-specialty">${person.specialty}</span>
        </div>
      </div>
      <svg style="width:20px; height:20px; color:var(--primary); visibility: ${req.responsible === person.name ? 'visible' : 'hidden'};" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
    `;

    div.onclick = () => {
      document.querySelectorAll(".staff-item").forEach(item => {
        item.classList.remove("selected");
        item.querySelector("svg").style.visibility = "hidden";
      });
      div.classList.add("selected");
      div.querySelector("svg").style.visibility = "visible";
      selectedStaffName = person.name;
    };

    staffContainer.appendChild(div);
  });
}

function setupAssignmentAction() {
  const btn = document.getElementById("btn-confirm-assign");
  btn.onclick = () => {
    if (!selectedStaffName) {
      alert("Por favor seleccione un responsable técnico de la lista.");
      return;
    }

    const req = AppState.requirements.find(r => r.id === AppState.currentSelectedReqId);
    if (req) {
      req.responsible = selectedStaffName;
      // Si estaba pendiente, lo cambiamos automáticamente a "En Proceso" al asignar responsable (regla práctica)
      if (req.status === "Pendiente") {
        req.status = "En Proceso";
      }

      const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
      req.history.push({
        date: dateStr,
        action: "Responsable Asignado",
        user: AppState.currentUser ? AppState.currentUser.name : "Admin",
        desc: `Se asignó a ${selectedStaffName} para la ejecución física de los trabajos.`
      });

      alert(`Responsable ${selectedStaffName} asignado correctamente a ${req.id}.`);
      changeView("view-gestion");
    }
  };
}

// ==========================================
// PANTALLA 7: Galería de Evidencias Lógica
// ==========================================
function renderEvidenceGallery() {
  const container = document.getElementById("evidence-gallery-grid-container");
  container.innerHTML = "";
  
  // Set to 2 columns for beautiful horizontal cards
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(2, 1fr)";
  container.style.gap = "24px";

  // Mostrar solo incidencias que tengan al menos una foto (antes o después)
  const reqsWithEvidence = AppState.requirements.filter(r => r.evidenceBefore || r.evidenceAfter);

  if (reqsWithEvidence.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); grid-column: span 2; text-align:center; padding: 40px;">No se han cargado evidencias fotográficas aún.</p>`;
    return;
  }

  reqsWithEvidence.forEach(req => {
    const card = document.createElement("div");
    card.className = "card evidence-item-card";
    
    // Style card as horizontal layout
    card.style.display = "grid";
    card.style.gridTemplateColumns = "1.5fr 1fr";
    card.style.gap = "20px";
    card.style.alignItems = "center";
    card.style.padding = "20px";
    
    // Preparar fotos por defecto si son nulas (sin textos dentro del SVG)
    const beforeImg = req.evidenceBefore || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23E53935' opacity='0.08'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%23E53935' stroke-width='1.5' stroke-dasharray='4 4'/></svg>";
    const afterImg = req.evidenceAfter || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%234CAF50' opacity='0.08'/><rect x='10' y='10' width='180' height='130' rx='6' fill='none' stroke='%234CAF50' stroke-width='1.5' stroke-dasharray='4 4'/></svg>";

    let badgeStatus = "badge-pendiente";
    if (req.status === "En Proceso") badgeStatus = "badge-proceso";
    if (req.status === "Aprobado") badgeStatus = "badge-aprobado";
    if (req.status === "Corrección Requerida") badgeStatus = "badge-reparacion-requerida";
    if (req.status === "Resuelto") badgeStatus = "badge-resuelto";

    card.innerHTML = `
      <!-- Imágenes Comparativas (Lado Izquierdo) -->
      <div class="evidence-images-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; height: 130px; margin: 0;">
        <div class="evidence-image-box" style="position: relative; overflow: hidden; height: 100%; border-radius: var(--radius-md);">
          <img src="${beforeImg}" alt="Antes" style="width: 100%; height: 100%; object-fit: cover;" />
          <span class="badge" style="position: absolute; top: 8px; left: 8px; background-color: #ffebee; color: #E53935; font-size: 0.65rem; border: 1px solid rgba(229, 57, 85, 0.2); font-weight: 700; border-radius: 4px; padding: 2px 6px;">ANTES</span>
        </div>
        <div class="evidence-image-box" style="position: relative; overflow: hidden; height: 100%; border-radius: var(--radius-md);">
          <img src="${afterImg}" alt="Después" style="width: 100%; height: 100%; object-fit: cover;" />
          <span class="badge" style="position: absolute; top: 8px; left: 8px; background-color: #e8f5e9; color: #4CAF50; font-size: 0.65rem; border: 1px solid rgba(76, 175, 80, 0.2); font-weight: 700; border-radius: 4px; padding: 2px 6px;">DESPUÉS</span>
        </div>
      </div>
      
      <!-- Información (Lado Derecho) -->
      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; text-align: left;">
        <div>
          <h4 style="font-weight: 700; font-size: 0.95rem; color: var(--text-main); margin: 0 0 6px; line-height: 1.3;">${req.title}</h4>
          <div style="margin-bottom: 6px;">
            <span class="badge ${badgeStatus}" style="font-size: 0.65rem; padding: 2px 8px;">${req.status}</span>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 8px; display: flex; flex-direction: column; gap: 4px;">
          <div>Código: <strong style="color: var(--primary);">${req.id}</strong></div>
          <div>Responsable: <strong>${req.responsible || 'Sin Asignar'}</strong></div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ==========================================
// PANTALLA 8: Historial y Trazabilidad Lógica
// ==========================================
function renderTimelineView() {
  const req = AppState.requirements.find(r => r.id === AppState.currentSelectedReqId) || AppState.requirements[0];
  const container = document.getElementById("timeline-detail-header");
  const timelineContainer = document.getElementById("timeline-items-container");

  if (!req) {
    timelineContainer.innerHTML = "<p>Seleccione un requerimiento primero.</p>";
    return;
  }

  AppState.currentSelectedReqId = req.id;

  // Llenar cabecera detallada
  let badgeStatus = "badge-pendiente";
  if (req.status === "En Proceso") badgeStatus = "badge-proceso";
  if (req.status === "Aprobado") badgeStatus = "badge-aprobado";
  if (req.status === "Corrección Requerida") badgeStatus = "badge-reparacion-requerida";
  if (req.status === "Resuelto") badgeStatus = "badge-resuelto";

  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 20px;">
      <div>
        <h3 style="font-size:1.3rem; font-weight:800; color:var(--primary); margin-bottom: 6px;">${req.id}: ${req.title}</h3>
        <p style="color:var(--text-medium); font-size:0.9rem;">${req.description}</p>
      </div>
      <span class="badge ${badgeStatus}" style="font-size:0.85rem; padding: 6px 14px;">${req.status}</span>
    </div>
    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 16px; border-top: 1px solid var(--border-color); padding-top:16px; font-size:0.85rem;">
      <div><span style="color:var(--text-light); font-weight:600; text-transform:uppercase;">Categoría:</span> <div style="font-weight:700;">${req.category}</div></div>
      <div><span style="color:var(--text-light); font-weight:600; text-transform:uppercase;">Prioridad:</span> <div style="font-weight:700;">${req.priority}</div></div>
      <div><span style="color:var(--text-light); font-weight:600; text-transform:uppercase;">Ubicación:</span> <div style="font-weight:700;">${req.location}</div></div>
      <div><span style="color:var(--text-light); font-weight:600; text-transform:uppercase;">Responsable:</span> <div style="font-weight:700;">${req.responsible || "Sin Asignar"}</div></div>
    </div>
  `;

  // Renderizar la línea de tiempo vertical
  timelineContainer.innerHTML = "";
  req.history.forEach((step) => {
    const item = document.createElement("div");
    item.className = "timeline-item completed";

    let imgHTML = "";
    
    if (step.action === "Requerimiento Creado") {
      if (req.evidenceBefore) {
        imgHTML = `
          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">Evidencia Inicial (Momento: ${req.momentoEvidencia || 'Inicial'}):</span>
            <img src="${req.evidenceBefore}" class="timeline-image-preview" alt="Evidencia Inicial" style="max-width: 200px; border-radius: 6px; border: 1px solid var(--border-color);" />
            ${req.evidenceBeforePath ? `<div style="font-size:0.75rem; color:var(--secondary); font-weight:600; margin-top: 4px;">💾 Copia física en red local: <code>${req.evidenceBeforePath}</code></div>` : ''}
          </div>
        `;
      } else {
        imgHTML = `
          <div style="margin-top: 10px; padding: 10px; background-color: var(--bg-main); border: 1px dashed var(--border-color); border-radius: 6px; font-size: 0.8rem; color: var(--text-light);">
            No se registró evidencia inicial.
          </div>
        `;
      }
    } else if (step.action === "Evidencia Cargada") {
      if (req.evidenceWork) {
        imgHTML = `
          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">Evidencia de Trabajo Realizado:</span>
            <img src="${req.evidenceWork}" class="timeline-image-preview" alt="Evidencia de Trabajo" style="max-width: 200px; border-radius: 6px; border: 1px solid var(--border-color);" />
          </div>
        `;
      }
    } else if (step.action === "Requerimiento Resuelto") {
      if (req.evidenceAfter) {
        imgHTML = `
          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">Evidencia Final (Momento: ${req.cierreMomentoEvidencia || 'Cierre'}):</span>
            <img src="${req.evidenceAfter}" class="timeline-image-preview" alt="Evidencia Final" style="max-width: 200px; border-radius: 6px; border: 1px solid var(--border-color);" />
            ${req.evidenceAfterPath ? `<div style="font-size:0.75rem; color:var(--secondary); font-weight:600; margin-top: 4px;">💾 Copia física en red local: <code>${req.evidenceAfterPath}</code></div>` : ''}
          </div>
        `;
      }
    }

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-time">${step.date}</span>
        <h4 class="timeline-title">${step.action} (por ${step.user})</h4>
        <p class="timeline-desc">${step.desc}</p>
        ${imgHTML}
      </div>
    `;
    timelineContainer.appendChild(item);
  });
}

// ==========================================
// PANTALLA 9: Reportes Lógica
// ==========================================
function renderReportsView() {
  const reqs = AppState.requirements;
  
  // Totales
  const total = reqs.length;
  const resueltos = reqs.filter(r => r.status === "Resuelto").length;
  const porcentaje = total > 0 ? Math.round((resueltos / total) * 100) : 0;

  // Categoría más reportada
  const counts = {};
  reqs.forEach(r => counts[r.category] = (counts[r.category] || 0) + 1);
  let topCategory = "Ninguna";
  let maxCount = 0;
  Object.keys(counts).forEach(cat => {
    if (counts[cat] > maxCount) {
      maxCount = counts[cat];
      topCategory = cat;
    }
  });

  // Mostrar métricas en tarjetas
  document.getElementById("report-total").innerText = total;
  document.getElementById("report-percentage").innerText = `${porcentaje}%`;
  document.getElementById("report-top-category").innerText = topCategory;
  // Simular un tiempo promedio
  document.getElementById("report-avg-time").innerText = "28.4 Horas";

  // Gráficos consolidados
  renderReportsCharts();
}

function renderReportsCharts() {
  const containerCategory = document.getElementById("reports-chart-categories");
  const containerStatus = document.getElementById("reports-chart-status");

  // Reusar la lógica de categorías en SVG
  const categories = ["Infraestructura", "Limpieza", "Cocina", "Mantenimiento", "Suministros"];
  const catCounts = {};
  categories.forEach(c => catCounts[c] = 0);
  AppState.requirements.forEach(r => { if (catCounts[r.category] !== undefined) catCounts[r.category]++; });

  let barsHTML = "";
  const maxVal = Math.max(...Object.values(catCounts), 1);
  categories.forEach((cat, idx) => {
    const val = catCounts[cat];
    const height = (val / maxVal) * 100;
    const y = 120 - height;
    const x = 40 + idx * 70;

    barsHTML += `
      <rect x="${x}" y="${y}" width="30" height="${height}" rx="3" fill="#1F4E79" />
      <text x="${x + 15}" y="${y - 5}" text-anchor="middle" font-size="10" font-weight="700" fill="#1E293B">${val}</text>
      <text x="${x + 15}" y="135" text-anchor="middle" font-size="9" font-weight="600" fill="#64748B">${cat.substring(0, 4)}...</text>
    `;
  });

  containerCategory.innerHTML = `
    <svg viewBox="0 0 380 160" style="width:100%; height:100%;">
      <line x1="20" y1="120" x2="360" y2="120" stroke="#E2E8F0" />
      ${barsHTML}
    </svg>
  `;

  // Gráfico de Barras de Estados
  const estados = ["Pendiente", "En Proceso", "Resuelto"];
  const statusColors = ["#FF9800", "#00BCD4", "#4CAF50"];
  const estCounts = {
    "Pendiente": AppState.requirements.filter(r => r.status === "Pendiente" || r.status === "Pendiente de Aprobación").length,
    "En Proceso": AppState.requirements.filter(r => r.status === "En Proceso" || r.status === "Aprobado" || r.status === "Corrección Requerida").length,
    "Resuelto": AppState.requirements.filter(r => r.status === "Resuelto").length
  };
 
  const maxValStatus = Math.max(...Object.values(estCounts), 1);
  let statusBarsHTML = "";
  estados.forEach((est, idx) => {
    const val = estCounts[est];
    const height = (val / maxValStatus) * 100;
    const y = 120 - height;
    const x = 60 + idx * 90;
 
    statusBarsHTML += `
      <rect x="${x}" y="${y}" width="40" height="${height}" rx="4" fill="${statusColors[idx]}" />
      <text x="${x + 20}" y="${y - 5}" text-anchor="middle" font-size="10" font-weight="700" fill="#1E293B">${val}</text>
      <text x="${x + 20}" y="135" text-anchor="middle" font-size="9" font-weight="600" fill="#64748B">${est}</text>
    `;
  });
 
  containerStatus.innerHTML = `
    <svg viewBox="0 0 340 160" style="width:100%; height:100%;">
      <line x1="20" y1="120" x2="320" y2="120" stroke="#E2E8F0" />
      ${statusBarsHTML}
    </svg>
  `;
}

// Configurar el botón de exportación de reporte ficticio
function setupGenerateReportAction() {
  const btn = document.getElementById("btn-generate-report");
  btn.onclick = () => {
    alert("Reporte PDF generado exitosamente en segundo plano. Listo para impresión.");
  };
}

// ==========================================
// LÓGICA DE INICIO DE SESIÓN
// ==========================================
function setupLoginAction() {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    
    // Buscar en AppState.users
    const user = AppState.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      alert("Error: Usuario no registrado. Regístrelo en la pestaña 'Gestión de Usuarios' o use credenciales predeterminadas.");
      return;
    }
    
    // Hashing
    const hashed = await sha256(password);
    if (hashed !== user.contrasenaHash) {
      alert("Error: Contraseña incorrecta.");
      return;
    }
    
    AppState.currentUser = user;

    // Actualizar nombre y rol en el menú
    document.getElementById("sidebar-username").innerText = AppState.currentUser.name;
    document.querySelector(".sidebar-footer .user-role").innerText = AppState.currentUser.role;

    // Redirigir al dashboard
    changeView("view-dashboard");
  });
}

// ==========================================
// PANTALLA 10: Aprobación y Resolución (Nuevo)
// ==========================================
let currentSelectedAprobacionId = null;

window.approveSolution = function(id) {
  const req = AppState.requirements.find(r => r.id === id);
  if (req) {
    req.status = "Aprobado";
    req.rejectionReason = null;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    req.history.push({
      date: dateStr,
      action: "Solución Aprobada",
      user: AppState.currentUser ? AppState.currentUser.name : "Coordinador",
      desc: "El coordinador general revisó las evidencias y aprobó la solución. Listo para cierre."
    });
    alert("La solución fue aprobada. Puede proceder al cierre del requerimiento.");
    renderAprobacionView();
    updateDashboard();
    renderRequirementsTable();
  }
};

window.rejectSolution = function(id) {
  const req = AppState.requirements.find(r => r.id === id);
  if (req) {
    const reason = prompt("Ingrese el motivo de rechazo:");
    if (reason === null) return; // Cancelado
    if (!reason.trim()) {
      alert("Debe ingresar un motivo de rechazo para solicitar correcciones.");
      return;
    }
    
    req.status = "Corrección Requerida";
    req.rejectionReason = reason;
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    req.history.push({
      date: dateStr,
      action: "Corrección Requerida",
      user: AppState.currentUser ? AppState.currentUser.name : "Coordinador",
      desc: `Se solicitó corrección al técnico. Motivo: ${reason}`
    });
    alert("Se ha solicitado corrección para este requerimiento.");
    renderAprobacionView();
    updateDashboard();
    renderRequirementsTable();
  }
};

window.handleCierreClick = function(id, status) {
  if (status !== "Aprobado") {
    alert("Debe aprobar la solución antes de cerrar el requerimiento.");
    return;
  }
  openCierreModal(id);
};

window.openCierreModal = function(id) {
  const req = AppState.requirements.find(r => r.id === id);
  if (req) {
    document.getElementById("cierre-req-id").value = id;
    document.getElementById("cierre-req-info").innerText = `${req.id}: ${req.title}`;
    document.getElementById("cierre-observation").value = "";
    document.getElementById("cierre-date").value = new Date().toISOString().split('T')[0];
    
    const previewImg = document.getElementById("cierre-preview-evidence-img");
    previewImg.style.display = "none";
    previewImg.src = "";
    
    const dragZone = document.getElementById("cierre-drag-drop-zone");
    dragZone.querySelector("svg").style.display = "inline";
    document.getElementById("cierre-drag-title").innerText = "Arrastra o haz clic para subir foto";
    document.getElementById("cierre-drag-subtitle").innerText = "Formatos: PNG, JPG";
    
    AppState.uploadedCierreEvidenceSimulated = null;
    document.getElementById("cierre-modal").style.display = "flex";
  }
};

window.closeCierreModal = function() {
  document.getElementById("cierre-modal").style.display = "none";
};

function setupCierreModalForm() {
  const form = document.getElementById("cierre-form");
  const dragZone = document.getElementById("cierre-drag-drop-zone");
  const fileInput = document.getElementById("cierre-file-input");
  const previewImg = document.getElementById("cierre-preview-evidence-img");

  if (!form || !dragZone) return;

  dragZone.onclick = () => fileInput.click();

  dragZone.ondragover = (e) => {
    e.preventDefault();
    dragZone.classList.add("dragover");
  };

  dragZone.ondragleave = () => {
    dragZone.classList.remove("dragover");
  };

  dragZone.ondrop = (e) => {
    e.preventDefault();
    dragZone.classList.remove("dragover");
    if (e.dataTransfer.files.length > 0) {
      handleCierreFile(e.dataTransfer.files[0]);
    }
  };

  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      handleCierreFile(fileInput.files[0]);
    }
  };

  function handleCierreFile(file) {
    // Reset error styles
    dragZone.classList.remove("drag-error");
    document.getElementById("cierre-drag-title").style.color = "";
    
    const maxSize = 10 * 1024 * 1024; // 10 MB
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    
    // Check format
    if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith(".jpg") && !file.name.toLowerCase().endsWith(".jpeg") && !file.name.toLowerCase().endsWith(".png")) {
      dragZone.classList.add("drag-error");
      document.getElementById("cierre-drag-title").innerText = "Error: Formato no permitido. Solo JPG o PNG.";
      document.getElementById("cierre-drag-title").style.color = "var(--danger)";
      document.getElementById("cierre-drag-subtitle").innerText = "Por favor, elija un archivo válido.";
      fileInput.value = "";
      previewImg.style.display = "none";
      AppState.uploadedCierreEvidenceSimulated = null;
      return;
    }
    
    // Check size
    if (file.size > maxSize) {
      dragZone.classList.add("drag-error");
      document.getElementById("cierre-drag-title").innerText = "Error: El archivo pesa más de 10 MB.";
      document.getElementById("cierre-drag-title").style.color = "var(--danger)";
      document.getElementById("cierre-drag-subtitle").innerText = "Por favor, suba una imagen de menor tamaño.";
      fileInput.value = "";
      previewImg.style.display = "none";
      AppState.uploadedCierreEvidenceSimulated = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      AppState.uploadedCierreEvidenceSimulated = e.target.result;
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
      dragZone.querySelector("svg").style.display = "none";
      document.getElementById("cierre-drag-title").innerText = "Evidencia final cargada con éxito";
      
      // Simular la copia física del archivo localmente
      const simPath = `\\\\servidor-local\\mantenimiento\\evidencias\\cierre_${Date.now()}_${file.name}`;
      document.getElementById("cierre-drag-subtitle").innerText = `${file.name}\n💾 Copiado localmente a: ${simPath}`;
      console.log(`[Copia Física Local] Archivo de cierre copiado exitosamente a: ${simPath}`);
      
      // Guardar el path temporal
      AppState.uploadedCierreEvidenceSimulatedPath = simPath;
    };
    reader.readAsDataURL(file);
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("cierre-req-id").value;
    const observation = document.getElementById("cierre-observation").value;
    const dateVal = document.getElementById("cierre-date").value;
    const momento = document.getElementById("cierre-momento").value;
    
    if (!AppState.uploadedCierreEvidenceSimulated) {
      alert("La evidencia fotográfica de solución es obligatoria para cerrar la incidencia.");
      return;
    }

    const req = AppState.requirements.find(r => r.id === id);
    if (req) {
      const evidencePath = AppState.uploadedCierreEvidenceSimulatedPath || `\\\\servidor-local\\mantenimiento\\evidencias\\${id}_cierre.png`;
      
      req.status = "Resuelto";
      req.evidenceAfter = AppState.uploadedCierreEvidenceSimulated;
      req.cierreMomentoEvidencia = momento;
      req.evidenceAfterPath = evidencePath;
      req.closeNotes = observation;
      req.closeDate = dateVal;
      
      const timeStr = new Date().toISOString().split('T')[1].substring(0, 5);
      req.history.push({
        date: `${dateVal} ${timeStr}`,
        action: "Requerimiento Resuelto",
        user: AppState.currentUser ? AppState.currentUser.name : "Coordinador",
        desc: `Cierre de incidencia: ${observation}. Momento de Evidencia: ${momento}.${evidencePath ? ` Archivo copiado físicamente a: ${evidencePath}` : ''}`
      });

      closeCierreModal();
      alert(`Requerimiento ${id} ha sido resuelto y cerrado exitosamente.`);
      
      // Reset variables
      AppState.uploadedCierreEvidenceSimulated = null;
      AppState.uploadedCierreEvidenceSimulatedPath = null;
      
      renderAprobacionView();
      updateDashboard();
      renderRequirementsTable();
    }
  };
}

// ==========================================
// PANTALLA 11: Gestión de Usuarios Lógica
// ==========================================
function renderUsersTable() {
  const tableBody = document.getElementById("users-table-body");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  
  AppState.users.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td style="font-weight:600;">${user.name}</td>
      <td>${user.email}</td>
      <td><span class="badge ${user.role === 'Administrador' ? 'badge-alta' : 'badge-proceso'}">${user.role}</span></td>
      <td style="font-family: monospace; font-size: 0.8rem; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${user.contrasenaHash}">
        ${user.contrasenaHash}
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function setupCreateUserForm() {
  const form = document.getElementById("create-user-form");
  if (!form) return;
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("user-fullname").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const role = document.getElementById("user-role").value;
    const password = document.getElementById("user-password").value;
    
    if (!name || !email || !role || !password) {
      alert("Por favor complete todos los campos obligatorios.");
      return;
    }
    
    // Validar duplicado
    if (AppState.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      alert("Error: Este correo electrónico ya está registrado.");
      return;
    }
    
    // Encriptar contraseña en el Frontend usando SHA-256
    const contrasenaHash = await sha256(password);
    
    // Crear usuario
    const newUser = {
      name,
      email,
      role,
      contrasenaHash
    };
    
    AppState.users.push(newUser);
    
    // Si el usuario es un Personal Operativo, agregarlo a la lista de staff técnico
    if (role === "Personal Operativo") {
      AppState.staff.push({
        name: name,
        specialty: "Técnico General",
        avatar: name.split(" ").map(n => n[0]).join("").toUpperCase()
      });
    }
    
    // Resetear formulario
    form.reset();
    
    alert(`Usuario ${name} registrado con éxito.\nContraseña encriptada en Frontend (SHA-256):\n${contrasenaHash}`);
    renderUsersTable();
  });
}

function renderAprobacionView() {
  const listContainer = document.getElementById("aprobacion-list-items");
  const detailPanel = document.getElementById("aprobacion-detail-panel");
  
  if (!listContainer || !detailPanel) return;
  listContainer.innerHTML = "";

  const reqs = AppState.requirements;
  // Solo requerimientos en En Proceso, Aprobado y Corrección Requerida
  const activeReqs = reqs.filter(r => r.status === "En Proceso" || r.status === "Aprobado" || r.status === "Corrección Requerida");

  if (activeReqs.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align:center; padding: 20px; color:var(--text-muted); font-size: 0.85rem;">
        No hay requerimientos en revisión.
      </div>
    `;
    detailPanel.innerHTML = `
      <div class="aprobacion-detail-empty">
        <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p>No hay requerimientos activos pendientes de revisión o cierre.</p>
      </div>
    `;
    currentSelectedAprobacionId = null;
    return;
  }

  // Si no hay ninguno seleccionado, o el seleccionado ya no está en la lista activa, seleccionar el primero
  if (!currentSelectedAprobacionId || !activeReqs.find(r => r.id === currentSelectedAprobacionId)) {
    currentSelectedAprobacionId = activeReqs[0].id;
  }

  activeReqs.forEach(req => {
    const card = document.createElement("div");
    card.className = `aprobacion-list-card ${req.id === currentSelectedAprobacionId ? "selected" : ""}`;
    card.onclick = () => {
      currentSelectedAprobacionId = req.id;
      renderAprobacionView();
    };

    let statusClass = "badge-proceso";
    if (req.status === "Aprobado") statusClass = "badge-aprobado";
    if (req.status === "Corrección Requerida") statusClass = "badge-reparacion-requerida";

    card.innerHTML = `
      <div class="aprobacion-card-header">
        <span class="aprobacion-card-code">${req.id}</span>
        <span class="badge ${statusClass}" style="font-size:0.6rem; padding:2px 6px;">${req.status}</span>
      </div>
      <div class="aprobacion-card-title">${req.title}</div>
      <div style="font-size:0.75rem; color:var(--text-muted); display:flex; justify-content:space-between; margin-top:4px;">
        <span>${req.category}</span>
        <span>${req.date}</span>
      </div>
    `;
    listContainer.appendChild(card);
  });

  renderAprobacionDetail(currentSelectedAprobacionId);
}

function renderAprobacionDetail(id) {
  const detailPanel = document.getElementById("aprobacion-detail-panel");
  if (!detailPanel) return;
  const req = AppState.requirements.find(r => r.id === id);

  if (!req) {
    detailPanel.innerHTML = `
      <div class="aprobacion-detail-empty">
        <p>Seleccione un requerimiento para ver detalles.</p>
      </div>
    `;
    return;
  }

  const badgePriority = req.priority === "Alta" ? "badge-alta" : (req.priority === "Media" ? "badge-media" : "badge-baja");
  let statusBadgeClass = "badge-proceso";
  if (req.status === "Aprobado") statusBadgeClass = "badge-aprobado";
  if (req.status === "Corrección Requerida") statusBadgeClass = "badge-reparacion-requerida";

  let alertBannerHTML = "";
  if (req.status === "Corrección Requerida") {
    alertBannerHTML = `
      <div class="aprobacion-rejection-warning">
        <strong>Corrección Solicitada:</strong> ${req.rejectionReason || "No especificado."}
      </div>
    `;
  } else if (req.status === "Aprobado") {
    alertBannerHTML = `
      <div class="aprobacion-success-banner">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span style="margin-left: 8px;">La solución fue aprobada. Puede proceder al cierre del requerimiento.</span>
      </div>
    `;
  }

  let evidenceBeforeHTML = "";
  if (req.evidenceBefore) {
    evidenceBeforeHTML = `
      <div class="aprobacion-evidence-wrapper">
        <img src="${req.evidenceBefore}" alt="Evidencia Inicial">
        <span class="aprobacion-evidence-badge antes">ANTES</span>
      </div>
    `;
  } else {
    evidenceBeforeHTML = `
      <div class="aprobacion-placeholder-box">
        No se registró evidencia inicial.
      </div>
    `;
  }

  let evidenceWorkHTML = "";
  if (req.evidenceWork) {
    evidenceWorkHTML = `
      <div class="aprobacion-evidence-wrapper">
        <img src="${req.evidenceWork}" alt="Evidencia Trabajo">
        <span class="aprobacion-evidence-badge despues">TRABAJO</span>
      </div>
    `;
  } else {
    evidenceWorkHTML = `
      <div class="aprobacion-placeholder-box">
        El responsable aún no ha cargado evidencia de trabajo.
      </div>
    `;
  }

  let responsibleNotesHTML = "";
  if (req.responsibleNotes) {
    responsibleNotesHTML = `
      <div class="aprobacion-obs-box">
        <strong>Observaciones del Responsable:</strong><br>
        "${req.responsibleNotes}"
      </div>
    `;
  } else {
    responsibleNotesHTML = `
      <div class="aprobacion-obs-box" style="background-color: var(--bg-main); border-color: var(--border-color); color: var(--text-light);">
        Sin observaciones del responsable.
      </div>
    `;
  }

  const approveDisabled = (req.status === "Aprobado") ? "disabled" : "";
  const correctionDisabled = (req.status === "En Proceso") ? "" : "disabled";
  const resolveBtnClass = (req.status === "Aprobado") ? "btn-secondary" : "btn-outline";

  detailPanel.innerHTML = `
    <div class="aprobacion-detail-content">
      ${alertBannerHTML}
      
      <div class="aprobacion-detail-header-row">
        <div class="aprobacion-detail-code-title">
          <span class="aprobacion-detail-code">${req.id}</span>
          <h2 class="aprobacion-detail-title">${req.title}</h2>
        </div>
        <div style="display:flex; gap:8px; align-items: center;">
          <span class="badge ${statusBadgeClass}">${req.status}</span>
          <span class="badge ${badgePriority}">${req.priority}</span>
        </div>
      </div>

      <div class="aprobacion-detail-grid">
        <div>
          <div class="aprobacion-detail-label">Categoría</div>
          <div class="aprobacion-detail-value">${req.category}</div>
        </div>
        <div>
          <div class="aprobacion-detail-label">Ubicación</div>
          <div class="aprobacion-detail-value">${req.location}</div>
        </div>
        <div>
          <div class="aprobacion-detail-label">Fecha Reporte</div>
          <div class="aprobacion-detail-value">${req.date}</div>
        </div>
        <div>
          <div class="aprobacion-detail-label">Reportado por</div>
          <div class="aprobacion-detail-value">${req.creator}</div>
        </div>
        <div>
          <div class="aprobacion-detail-label">Responsable Técnico</div>
          <div class="aprobacion-detail-value">${req.responsible || "Sin Asignar"}</div>
        </div>
        <div>
          <div class="aprobacion-detail-label">Estado de Flujo</div>
          <div class="aprobacion-detail-value" style="font-weight:800; color:var(--primary);">${req.status}</div>
        </div>
      </div>

      <h3 class="aprobacion-detail-section-title">Descripción</h3>
      <p style="font-size:0.9rem; line-height:1.6; color:var(--text-medium); margin-bottom: 24px; background:var(--bg-main); padding: 12px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">${req.description}</p>

      <h3 class="aprobacion-detail-section-title">Evidencias y Descargo Técnico</h3>
      
      <div class="aprobacion-evidences-layout">
        <div class="aprobacion-evidence-column">
          <span style="font-size: 0.8rem; font-weight:700; color: var(--text-medium); margin-bottom: 6px;">Evidencia Inicial</span>
          ${evidenceBeforeHTML}
        </div>
        <div class="aprobacion-evidence-column">
          <span style="font-size: 0.8rem; font-weight:700; color: var(--text-medium); margin-bottom: 6px;">Evidencia de Trabajo Realizado</span>
          ${evidenceWorkHTML}
        </div>
      </div>

      ${responsibleNotesHTML}
    </div>

    <!-- Footer fijo de decisión final -->
    <div class="aprobacion-fixed-footer">
      <button class="btn btn-outline" style="border-color: var(--danger); color: var(--danger); font-size: 0.85rem;" ${correctionDisabled} onclick="rejectSolution('${req.id}')">
        Solicitar Corrección
      </button>
      <button class="btn btn-primary" style="background-color: var(--primary); font-size: 0.85rem;" ${approveDisabled} onclick="approveSolution('${req.id}')">
        Aprobar Solución
      </button>
      <button class="btn ${resolveBtnClass}" style="font-size: 0.85rem;" onclick="handleCierreClick('${req.id}', '${req.status}')">
        Marcar como Resuelto
      </button>
    </div>
  `;
}

// ==========================================
// Carga Inicial del Sistema
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Configurar formularios y clics
  setupLoginAction();
  setupCrearRequerimientoForm();
  setupAssignmentAction();
  setupGenerateReportAction();
  initGestionFilters();
  setupCierreModalForm();
  setupCreateUserForm();

  // Escuchar clics en el sidebar
  const menuItems = document.querySelectorAll(".sidebar-menu-item");
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetView = item.dataset.view;
      if (AppState.currentUser || targetView === "login-screen") {
        changeView(targetView);
      } else {
        alert("Por favor, inicie sesión primero para navegar.");
      }
    });
  });

  // Iniciar en la pantalla de Login
  changeView("login-screen");
});

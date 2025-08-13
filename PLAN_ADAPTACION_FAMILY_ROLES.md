# 📋 PLAN DETALLADO DE ADAPTACIÓN: PremiumFamilyRoles.tsx

**Proyecto**: Boda Premium Vicky & Miguel  
**Archivo objetivo**: `components/demo/boda/premium/PremiumFamilyRoles.tsx`  
**Fecha creación**: 12 de agosto de 2025  
**Objetivo**: Adaptar sistema de invitaciones personalizadas de bautizo a boda

---

## 🎯 OBJETIVO GENERAL

Transformar el componente `PremiumFamilyRoles.tsx` (originalmente diseñado para bautizo de Mia Isabel) en un sistema completo de **invitaciones personalizadas para la boda de Vicky & Miguel**, manteniendo toda la funcionalidad avanzada pero adaptando contenido, datos y tema visual.

---

## 📊 ANÁLISIS INICIAL

### **Estado Actual**
- ✅ Componente funcional para bautizo de Mia Isabel
- ✅ Sistema de autenticación admin
- ✅ Formulario de invitaciones personalizadas
- ✅ Integración WhatsApp automática
- ✅ Descarga PNG de invitaciones
- ✅ Vista previa en tiempo real

### **Estado Objetivo**
- 🎯 Componente adaptado para boda de Vicky & Miguel
- 🎯 Integración con `wedding-config.ts` centralizado
- 🎯 Mensajes y templates específicos de boda
- 🎯 Tema visual de boda (rosa/dorado)
- 🎯 Datos reales: 27 dic 2025, jardín Ceiba, Tabasco

---

## 🗂️ ESTRUCTURA DEL PLAN

### **FASE 1: PREPARACIÓN Y ANÁLISIS** ⏱️ 30 min
### **FASE 2: ADAPTACIÓN DE IMPORTS Y DATOS** ⏱️ 45 min
### **FASE 3: TRANSFORMACIÓN DE CONTENIDO** ⏱️ 60 min
### **FASE 4: ADAPTACIÓN VISUAL Y TEMA** ⏱️ 30 min
### **FASE 5: TESTING Y VERIFICACIÓN** ⏱️ 45 min

**⏱️ TIEMPO TOTAL ESTIMADO: 3 horas 30 minutos**

---

## 📋 FASE 1: PREPARACIÓN Y ANÁLISIS (30 min)

### **1.1 Backup y Documentación** (10 min)
- [ ] Crear copia de seguridad del archivo original
- [ ] Documentar dependencias actuales
- [ ] Verificar imports necesarios

### **1.2 Análisis de Dependencias** (10 min)
- [ ] Revisar imports de `mia-isabel-data`
- [ ] Identificar referencias a `MiaIsabelBautizoData`
- [ ] Mapear tipos TypeScript necesarios

### **1.3 Planificación de Estructura** (10 min)
- [ ] Definir nueva estructura de props
- [ ] Planificar integración con `wedding-config.ts`
- [ ] Identificar componentes UI reutilizables

---

## 📋 FASE 2: ADAPTACIÓN DE IMPORTS Y DATOS (45 min)

### **2.1 Actualización de Imports** (15 min)
- [ ] Remover: `import { MiaIsabelBautizoData, miaIsabelBautizoData } from "./data/mia-isabel-data"`
- [ ] Remover: `import { MiaIsabelTheme } from "@/lib/themes/mia-isabel-theme"`
- [ ] Agregar: `import { weddingConfig } from '../data/wedding-config'`
- [ ] Agregar: `import { BasicDemoData } from '../basic/data/basic-demo-data'` (si necesario)

### **2.2 Actualización de Interfaces** (15 min)
- [ ] Renombrar `VipFamilyRolesProps` → `WeddingInvitationManagerProps`
- [ ] Remover referencias a `MiaIsabelBautizoData` y `MiaIsabelTheme`
- [ ] Crear interface simple usando `weddingConfig`
- [ ] Actualizar `InvitationFormData` si es necesario

### **2.3 Actualización de Props del Componente** (15 min)
- [ ] Cambiar `data = miaIsabelBautizoData` → usar `weddingConfig`
- [ ] Remover `theme` prop o simplificar
- [ ] Renombrar función principal: `VipFamilyRoles` → `WeddingInvitationManager`

---

## 📋 FASE 3: TRANSFORMACIÓN DE CONTENIDO (60 min)

### **3.1 Datos del Evento** (20 min)
- [ ] Cambiar referencias de bautizo → boda
- [ ] Actualizar nombre evento: `data.hero.name` → `weddingConfig.couple.displayNames`
- [ ] Actualizar fecha: → `weddingConfig.event.date.full`
- [ ] Actualizar lugar: → `weddingConfig.event.ceremony.venue`
- [ ] Actualizar hora: → `weddingConfig.event.ceremony.time`

### **3.2 Mensajes y Templates** (25 min)
- [ ] **Templates de mensajes WhatsApp:**
  ```typescript
  // Cambiar de:
  "Tienes una invitación especial al bautismo de: 👶 Mia Isabel"
  
  // A:
  "Tienes una invitación especial a la boda de: 💍 Vicky & Miguel"
  ```

- [ ] **Sugerencias de mensajes personalizados:**
  ```typescript
  // Nuevos templates para boda:
  "¡Querida familia! Los invitamos a celebrar nuestra unión en matrimonio..."
  "Con gran alegría los esperamos en nuestro día especial..."
  "Su presencia sería el mejor regalo en nuestra boda..."
  "Estimados amigos, este día no sería completo sin ustedes..."
  "¡Queridos padrinos! Su bendición es muy importante para nosotros..."
  ```

- [ ] **Firmas y despedidas:**
  ```typescript
  // Cambiar:
  "Con mucho cariño, ${data.invitation.parents.mother}"
  
  // A:
  "Con todo nuestro amor, Vicky & Miguel"
  ```

### **3.3 Textos de Interfaz** (15 min)
- [ ] Títulos: "Bautismo de..." → "Boda de Vicky & Miguel"
- [ ] Headers: "Invitaciones Personalizadas para Mia Isabel" → "Invitaciones Personalizadas para la Boda"
- [ ] Labels y placeholders apropiados para boda
- [ ] Mensajes de confirmación y success

---

## 📋 FASE 4: ADAPTACIÓN VISUAL Y TEMA (30 min)

### **4.1 Colores y Tema** (15 min)
- [ ] **Paleta de colores para boda:**
  ```css
  /* Remover: colores rosa/azul bautizo */
  /* Agregar: colores rosa/dorado/blanco boda */
  
  // Primarios: rosa elegante, dorado suave
  // Secundarios: blanco perla, rosa claro
  // Acentos: dorado brillante, rosa intenso
  ```

- [ ] Actualizar gradientes de fondo
- [ ] Ajustar colores de botones y elementos

### **4.2 Iconografía y Emojis** (10 min)
- [ ] Cambiar: 👶🌸⛪ (bautizo) → 💍💒👰🤵💐 (boda)
- [ ] Actualizar iconos de Lucide React si necesario
- [ ] Ajustar emojis en mensajes WhatsApp

### **4.3 Elementos Visuales** (5 min)
- [ ] Verificar backgrounds y gradientes
- [ ] Ajustar sombras y efectos si necesario

---

## 📋 FASE 5: TESTING Y VERIFICACIÓN (45 min)

### **5.1 Pruebas de Compilación** (10 min)
- [ ] Verificar que no hay errores TypeScript
- [ ] Comprobar imports correctos
- [ ] Validar que el componente renderiza

### **5.2 Pruebas Funcionales** (20 min)
- [ ] **Sistema de autenticación:**
  - [ ] Login con contraseña funciona
  - [ ] Estados de autenticado/no autenticado
  - [ ] Toggle de popover de admin

- [ ] **Formulario de invitación:**
  - [ ] Campos se llenan correctamente
  - [ ] Validaciones funcionan
  - [ ] Vista previa se actualiza en tiempo real

- [ ] **Integración WhatsApp:**
  - [ ] Mensaje se genera correctamente
  - [ ] Datos de evento son correctos
  - [ ] Formato de número mexicano funciona
  - [ ] URL de WhatsApp se construye bien

- [ ] **Descarga PNG:**
  - [ ] Función de descarga funciona
  - [ ] Imagen se genera correctamente
  - [ ] Nombre de archivo es apropiado

### **5.3 Verificación de Datos** (10 min)
- [ ] **Datos de boda correctos:**
  - [ ] Nombres: "Vicky & Miguel"
  - [ ] Fecha: "Sábado 27 de Diciembre 2025"
  - [ ] Lugar: "jardín Ceiba"
  - [ ] Dirección: "Cam. Curahueso, Plutarco Elias Calles, Centro, Tabasco"
  - [ ] Horarios: Ceremonia 19:00, Recepción 20:00

### **5.4 Testing de UI/UX** (5 min)
- [ ] Diseño responsive funciona
- [ ] Colores y tema son apropiados
- [ ] Textos son coherentes con contexto de boda
- [ ] Navegación y flujo de usuario es intuitivo

---

## 🎯 CRITERIOS DE ÉXITO

### **✅ Funcionalidad Completa**
- [ ] Sistema de autenticación admin operativo
- [ ] Formulario de invitaciones funcional
- [ ] Generación de mensajes WhatsApp correcta
- [ ] Descarga PNG operativa
- [ ] Vista previa en tiempo real

### **✅ Integración con Sistema**
- [ ] Usa datos de `wedding-config.ts`
- [ ] Consistente con tema de la boda
- [ ] Compatible con estructura actual del proyecto

### **✅ Calidad de Código**
- [ ] Sin errores TypeScript
- [ ] Sin warnings de linting
- [ ] Código limpio y mantenible
- [ ] Comentarios actualizados

### **✅ Experiencia de Usuario**
- [ ] Interfaz intuitiva para Vicky & Miguel
- [ ] Flujo de creación de invitaciones claro
- [ ] Mensajes de WhatsApp profesionales
- [ ] Vista previa atractiva y precisa

---

## 📝 NOTAS DE IMPLEMENTACIÓN

### **Consideraciones Especiales**
1. **Autenticación**: Mantener contraseña simple para demo ("admin1234")
2. **WhatsApp**: Formato mexicano (+52) debe mantenerse
3. **PNG**: Funcionalidad de descarga debe ser robusta
4. **Responsive**: Debe funcionar en móvil y desktop

### **Archivos Relacionados**
- `wedding-config.ts` - Fuente de datos principal
- `basic-demo-data.ts` - Datos complementarios si necesario
- `app/page.tsx` - Para integración del componente

### **Posibles Extensiones Futuras**
- [ ] Integración con base de datos de invitados
- [ ] Templates adicionales de invitación
- [ ] Sistema de confirmación de asistencia
- [ ] Analytics de invitaciones enviadas

---

## 🚀 READY TO START

**Estado del Plan**: ✅ LISTO PARA IMPLEMENTACIÓN

**Próximo Paso**: Ejecutar FASE 1 - PREPARACIÓN Y ANÁLISIS

**Responsable**: Asistente IA + Usuario

**Timeline**: Completar en sesión de trabajo de 3-4 horas

---

*Plan generado automáticamente el 12 de agosto de 2025*  
*Proyecto: Boda Premium Vicky & Miguel*  
*Versión: 1.0*

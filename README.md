
---

## 🔧 **SOLUCIÓN RÁPIDA CON POWER SHELL:**

Ejecuta **ESTE COMANDO ÚNICO** y se arregla todo:

```powershell
cd C:\Users\STEPHANIE\Documents\frontend-prueba

@"
# 🚀 Prueba Técnica Front-End React - Dashboard de Usuarios

## 👤 Desarrolladora
**Nancy Stephanie Vidal**  
[GitHub: @NancyStephanieVidal](https://github.com/NancyStephanieVidal)

## 📋 Vista Rápida
| Aspecto | Estado |
|---------|--------|
| ✅ Requisitos obligatorios | Completado |
| ✅ Extras recomendados | Completado |
| ✅ Tests unitarios | Implementado |
| ✅ Responsive design | Mobile-first |
| ✅ Seguridad | Validaciones XSS |

### 🔒 Validaciones de Seguridad:
- Sanitización de inputs contra XSS
- Bloqueo de: `<script>`, `javascript:`, `onclick`, etc.
- Validación en tiempo real con debounce
- **10 pruebas unitarias ejecutadas y pasando**

### 🧪 Resultados de Pruebas:
```bash
npm test -- validation.test.ts
npm test -- searchbar.test.tsx
npm test -- userservice.test.ts
# PASS: 10 pruebas, 0 fallos 


## 🚀 **CÓMO EJECUTAR EL PROYECTO LOCALMENTE**

### **📋 Prerrequisitos**
Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (versión 16 o superior)
- **npm** (viene con Node.js) o **yarn**
- **Git** (para clonar el repositorio)

**Verifica tus versiones:**
\`\`\`bash
node --version    # Debe mostrar v16.x.x o superior
npm --version     # Debe mostrar 8.x.x o superior
git --version     # Cualquier versión reciente funciona
\`\`\`

### **📥 Paso 1: Clonar el Repositorio**
\`\`\`bash
git clone https://github.com/NancyStephanieVidal/prueba-tecnica-react.git
cd prueba-tecnica-react
\`\`\`

### **📦 Paso 2: Instalar Dependencias**
\`\`\`bash
npm install
\`\`\`

### **▶️ Paso 3: Ejecutar en Modo Desarrollo**
\`\`\`bash
npm start
\`\`\`
La aplicación se abrirá automáticamente en: \`http://localhost:3000\`

### **🧪 Paso 4: Ejecutar Pruebas Unitarias**
\`\`\`bash
npm test
\`\`\`

## 📁 Estructura del Proyecto
\`\`\`
src/
├── components/
│   └── __tests__/
│       └── SearchBar.test.tsx  # Tests unitarios
│   ├── Pagination.tsx
│   ├── SearchBar.tsx      # Con validaciones integradas
│   ├── UserCard.tsx       # Con Material-UI
│   ├── UserDetail.tsx
│   └── UserList.tsx
├── services/
│   └── __tests__/
│       └── userService.test.ts  # Tests unitarios
│   └── userService.ts     # Consumo de API
├── styles/
│   ├── App.css           # Estilos globales
│   ├── index.css           # Estilos
├── types/
│   └── usertypes.ts     # Tipos de usuario
├── utils/
│   ├── validations.ts    # Funciones de seguridad
│   └── __tests__/
│       └── validations.test.ts  # Tests unitarios
├── App.tsx
└── index.tsx            
\`\`\`

---

#!/bin/bash
# ===========================================================
# 🧠 PrediRev - Backup Automático del Backend
# Autor: Franklyn Sánchez
# Fecha: Generado automáticamente el 2025-10-18
# ===========================================================

# 🕒 1️⃣ Obtener fecha actual en formato YYYY-MM-DD
FECHA=$(date +"%Y-%m-%d_%H-%M-%S")

# 📂 2️⃣ Definir directorios y nombre del archivo
ORIGEN="$HOME/PrediRev"
DESTINO="$HOME/PrediRev/backups"
ARCHIVO="backend_predirev_${FECHA}.zip"

# 📦 3️⃣ Crear carpeta de backups si no existe
mkdir -p "$DESTINO"

# 🔍 4️⃣ Mostrar encabezado
echo "==========================================================="
echo " 🚀 Iniciando respaldo del backend PrediRev"
echo " 📅 Fecha: $FECHA"
echo " 📁 Origen: $ORIGEN"
echo " 💾 Destino: $DESTINO/$ARCHIVO"
echo "==========================================================="

# 🧱 5️⃣ Crear archivo ZIP con estructura completa del backend
cd "$ORIGEN" || { echo "❌ No se encontró el directorio $ORIGEN"; exit 1; }

zip -r "$DESTINO/$ARCHIVO" src package.json package-lock.json .env > /dev/null 2>&1

# ✅ 6️⃣ Verificar resultado
if [ $? -eq 0 ]; then
  echo "✅ Respaldo completado correctamente."
  echo "📦 Archivo creado: $DESTINO/$ARCHIVO"
else
  echo "❌ Error durante la creación del respaldo."
  exit 1
fi

# 🧹 7️⃣ Limpieza opcional: eliminar backups antiguos (>15 días)
find "$DESTINO" -type f -name "backend_predirev_*.zip" -mtime +15 -exec rm {} \; > /dev/null 2>&1

echo "🧽 Limpieza completada (archivos de más de 15 días eliminados)."
echo "==========================================================="
echo "✅ Proceso finalizado con éxito."


"use client";

import { useState, useRef } from "react";
import {
  Heart,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  Settings,
  X,
  MessageCircle,
  Download,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  weddingConfig,
  WeddingConfig,
} from "../data/wedding-config";

interface VipWeddingRolesProps {
  data?: WeddingConfig;
}

interface InvitationFormData {
  guestName: string;
  personalMessage: string;
  numberOfGuests: string;
  whatsappNumber: string;
  guestRelation: string; // Nuevo campo para el tipo de relación
}

export function VipWeddingRoles({
  data = weddingConfig,
}: VipWeddingRolesProps) {
  // 🔐 Sistema de autenticación admin discreto
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPopover, setShowAuthPopover] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // 📝 Estados del formulario de invitación
  const [formData, setFormData] = useState<InvitationFormData>({
    guestName: "",
    personalMessage: "",
    numberOfGuests: "",
    whatsappNumber: "",
    guestRelation: "",
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const invitationRef = useRef<HTMLDivElement>(null);

  // 🔑 Función de autenticación simple
  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin1234") {
      setIsAuthenticated(true);
      setAuthError("");
      setPassword("");
      setShowAuthPopover(false);
    } else {
      setAuthError("Contraseña incorrecta");
      setPassword("");
    }
  };

  // 📱 Función para generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const invitationURL = "https://boda-vicky-miguel.vercel.app/"; // URL de la invitación

    return `💒 ¡Hola ${formData.guestName}! 💒

${formData.personalMessage}

Tienes una invitación especial a nuestra boda:
👰‍♀️🤵‍♂️ ${data.couple.displayNames}

📅 ${data.event.date.full}
⏰ Ceremonia: ${data.event.ceremony.time}
🏛️ ${data.event.ceremony.venue}
📍 ${data.event.ceremony.address}

👥 Número de invitados: ${formData.numberOfGuests} ${parseInt(formData.numberOfGuests) === 1 ? 'persona' : 'personas'}

✨ Ver tu invitación completa aquí:
👉 ${invitationURL}

💖 ¡Te esperamos para celebrar este día tan especial con nosotros!

Con todo nuestro amor,
${data.couple.displayNames} 💕💒`;
  };

  // 📤 Función para enviar por WhatsApp
  const sendWhatsAppInvitation = () => {
    if (!formData.guestName || !formData.whatsappNumber || !formData.numberOfGuests) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const cleanNumber = formData.whatsappNumber.replace(/\D/g, "");
    if (cleanNumber.length !== 10) {
      alert("El número debe tener exactamente 10 dígitos");
      return;
    }

    const message = generateWhatsAppMessage();
    const mexicanNumber = `52${cleanNumber}`; // Agregar código de país México (+52)
    const whatsappURL = `https://wa.me/${mexicanNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  // 📱 Función para formatear número de teléfono mexicano
  const formatMexicanPhone = (value: string) => {
    // Eliminar todo excepto números
    const numbers = value.replace(/\D/g, "");

    // Limitar a 10 dígitos
    const limited = numbers.slice(0, 10);

    // Formatear como XXX XXX XXXX
    if (limited.length >= 6) {
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(
        6
      )}`;
    } else if (limited.length >= 3) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    }
    return limited;
  };

  // 🖼️ Función para descargar la invitación como PNG
  const downloadInvitationPNG = async () => {
    if (!invitationRef.current) return;

    setIsDownloading(true);

    try {
      // Usar html2canvas si está disponible, sino usar método alternativo
      if (typeof window !== "undefined") {
        // Método usando html2canvas (si está disponible)
        const html2canvas = (await import("html2canvas")).default;

        // Obtener dimensiones reales del elemento
        const actualWidth = invitationRef.current.scrollWidth;
        const actualHeight = invitationRef.current.scrollHeight;

        // Capturar con configuración simplificada
        const canvas = await html2canvas(invitationRef.current, {
          background: "#ffffff",
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: actualWidth,
          height: actualHeight,
        });

        // Convertir a blob y descargar
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.download = `invitacion-${formData.guestName
                .replace(/\s+/g, "-")
                .toLowerCase()}-vicky-miguel.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
            }
          },
          "image/png",
          0.95
        ); // Alta calidad
      }
    } catch (error) {
      console.error("Error al generar PNG:", error);
      // Método alternativo usando captura de pantalla nativa
      alert(
        'Para descargar la invitación:\n1. Haz click derecho en la vista previa\n2. Selecciona "Guardar imagen como..."\n3. O usa captura de pantalla (Ctrl/Cmd + Shift + S)'
      );
    } finally {
      setIsDownloading(false);
    }
  };

  // 📝 Función para actualizar campos del formulario
  const updateFormData = (field: keyof InvitationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section
      className={`py-16 px-4 relative overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, rgba(251, 207, 232, 0.9) 0%, rgba(219, 234, 254, 0.85) 100%), url('${data.media.hero.backgroundImages[0]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 🔐 Badge de autenticación discreto */}
      <div className="absolute top-4 right-4 z-50">
        {!isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setShowAuthPopover(!showAuthPopover)}
              className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-lg transition-colors"
              title="Área de administración"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>

            {/* Popover de autenticación */}
            {showAuthPopover && (
              <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-2xl border-2 border-pink-200 p-4 z-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-pink-800">
                    Admin Panel
                  </h3>
                  <button
                    onClick={() => setShowAuthPopover(false)}
                    className="p-1 hover:bg-gray-100 rounded text-pink-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleAuthentication} className="space-y-3">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      className={`w-full px-3 py-2 pr-10 border ${
                        authError
                          ? "border-red-300"
                          : "border-pink-200"
                      } rounded-lg text-sm`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {authError && (
                    <p className="text-xs text-red-600">{authError}</p>
                  )}

                  <Button
                    type="submit"
                    size="sm"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    <Lock className="w-3 h-3 mr-1" />
                    Acceder
                  </Button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 bg-green-500 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white text-xs font-medium">Admin</span>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header Principal */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-pink-300 to-purple-300 text-pink-800 border-pink-300 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-xl border-2">
            <div className="flex items-center gap-2">
              <span>💒</span>
              <span>Invitaciones Personalizadas para {data.couple.displayNames}</span>
              <span>💕</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">
            💒 INVITACIONES PERSONALIZADAS
          </h2>

          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mx-4"></div>
            <Heart className="w-8 h-8 text-pink-500 fill-current" />
            <div className="h-1 w-20 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mx-4"></div>
          </div>

          <div className="text-lg text-pink-700 max-w-3xl mx-auto leading-relaxed">
            {isAuthenticated ? (
              <>
                Crea invitaciones personalizadas para cada familiar y amigo con mensaje
                especial, número de invitados y envío directo por WhatsApp para la
                celebración de la boda de {data.couple.displayNames}.
              </>
            ) : (
              <div className="hidden">
                Funcionalidad disponible para organizadores del evento. Permite
                crear invitaciones personalizadas para la celebración de la boda de{" "}
                {data.couple.displayNames}.
              </div>
            )}
          </div>
        </div>

        {isAuthenticated ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario de Invitación */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-pink-800 mb-6">
                📝 Crear Invitación Personal
              </h3>

              <div className="bg-white rounded-2xl p-6 border-2 border-pink-100 shadow-lg">
                <div className="space-y-4">
                  {/* Nombre del invitado */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      Nombre del invitado *
                    </label>
                    <input
                      type="text"
                      value={formData.guestName}
                      onChange={(e) =>
                        updateFormData("guestName", e.target.value)
                      }
                      placeholder="Ej: María González López"
                      className="w-full px-4 py-3 border border-pink-200 focus:ring-pink-400 rounded-lg focus:ring-2 focus:border-transparent"
                    />
                  </div>

                  {/* Relación con los novios */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      Relación con los novios
                    </label>
                    <select
                      value={formData.guestRelation}
                      onChange={(e) =>
                        updateFormData("guestRelation", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-pink-200 focus:ring-pink-400 rounded-lg focus:ring-2 focus:border-transparent"
                    >
                      <option value="">Selecciona relación (opcional)</option>
                      <option value="familia-novia">Familia de la Novia</option>
                      <option value="familia-novio">Familia del Novio</option>
                      <option value="padrinos">Padrinos</option>
                      <option value="amigos-novia">Amigos de la Novia</option>
                      <option value="amigos-novio">Amigos del Novio</option>
                      <option value="amigos-pareja">Amigos de la Pareja</option>
                      <option value="trabajo">Compañeros de Trabajo</option>
                      <option value="otros">Otros</option>
                    </select>
                  </div>

                  {/* Mensaje personalizado */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      Mensaje de saludo personalizado *
                    </label>
                    <textarea
                      value={formData.personalMessage}
                      onChange={(e) =>
                        updateFormData("personalMessage", e.target.value)
                      }
                      placeholder="Ej: ¡Querida familia! Esperamos que puedan acompañarnos en este día tan especial..."
                      rows={4}
                      className="w-full px-4 py-3 border border-pink-200 focus:ring-pink-400 rounded-lg focus:ring-2 focus:border-transparent resize-none"
                    />

                    {/* Sugerencias de mensaje para bodas */}
                    <div className="mt-3 p-3 bg-pink-50 border-pink-200 rounded-lg border">
                      <p className="text-xs font-medium text-pink-700 mb-2">
                        💡 Sugerencias de mensajes para bodas:
                      </p>
                      <div className="space-y-1">
                        {[
                          "¡Querida familia! Con mucha alegría los invitamos a celebrar nuestro gran día...",
                          "Estimados amigos, su presencia sería el mejor regalo en nuestra boda...",
                          "¡Hola! Nos encantaría que fueran parte de este momento tan especial...",
                          "Queridos padrinos, este día no sería completo sin su bendición y presencia...",
                          "¡Queridos! Después de tantos años, finalmente llegó el gran día...",
                          "Con gran emoción los invitamos a ser testigos de nuestro amor...",
                        ].map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              updateFormData("personalMessage", suggestion)
                            }
                            className="text-left w-full px-2 py-1 text-xs text-pink-600 hover:bg-pink-100 rounded hover:font-medium transition-colors"
                          >
                            &quot;{suggestion}&quot;
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-pink-500 mt-2">
                        Haz clic en cualquier sugerencia para usarla y
                        personalizarla
                      </p>
                    </div>
                  </div>

                  {/* Número de personas */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      Número de invitados *
                    </label>
                    <select
                      value={formData.numberOfGuests}
                      onChange={(e) =>
                        updateFormData("numberOfGuests", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-pink-200 focus:ring-pink-400 rounded-lg focus:ring-2 focus:border-transparent"
                    >
                      <option value="">Selecciona número de invitados</option>
                      <option value="1">1 persona</option>
                      <option value="2">2 personas</option>
                      <option value="3">3 personas</option>
                      <option value="4">4 personas</option>
                      <option value="5">5 personas</option>
                      <option value="6">6 personas</option>
                      <option value="7">7 personas</option>
                      <option value="8">8 personas</option>
                      <option value="9">9 personas</option>
                      <option value="10">10 personas</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Indica cuántas personas están incluidas en esta invitación
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-medium text-pink-700 mb-2">
                      WhatsApp México (10 dígitos) *
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                        🇲🇽 +52
                      </div>
                      <input
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) =>
                          updateFormData(
                            "whatsappNumber",
                            formatMexicanPhone(e.target.value)
                          )
                        }
                        placeholder="555 123 4567"
                        maxLength={13} // XXX XXX XXXX = 13 chars con espacios
                        className={`w-full pl-16 pr-4 py-3 border ${
                          formData.whatsappNumber &&
                          formData.whatsappNumber.replace(/\D/g, "").length !==
                            10
                            ? "border-red-300 focus:ring-red-400"
                            : "border-pink-200 focus:ring-pink-400"
                        } rounded-lg focus:ring-2 focus:border-transparent`}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        Formato: XXX XXX XXXX (solo México)
                      </p>
                      {formData.whatsappNumber && (
                        <span
                          className={`text-xs ${
                            formData.whatsappNumber.replace(/\D/g, "")
                              .length === 10
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {formData.whatsappNumber.replace(/\D/g, "").length}/10
                        </span>
                      )}
                    </div>
                    {formData.whatsappNumber &&
                      formData.whatsappNumber.replace(/\D/g, "").length !==
                        10 &&
                      formData.whatsappNumber.length > 0 && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          ⚠️ Debe tener exactamente 10 dígitos
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Vista Previa de Invitación */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-pink-800 mb-6">
                👀 Vista Previa
              </h3>

              {!formData.guestName ? (
                <div className="bg-white rounded-2xl p-8 border-2 border-pink-100 text-center">
                  <div className="text-6xl mb-4">💒</div>
                  <h4 className="text-xl font-bold text-pink-800 mb-2">
                    Completa el Formulario
                  </h4>
                  <p className="text-gray-600">
                    Llena los datos del lado izquierdo para ver la vista previa
                    de la invitación personalizada para la boda
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Tarjeta de invitación */}
                  <div
                    ref={invitationRef}
                    className="bg-white rounded-2xl p-1 border-2 border-pink-200 shadow-lg"
                  >
                    <div className="rounded-xl p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 border-2 border-pink-200 max-w-md mx-auto">
                      {/* Header de invitación */}
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-3">💒</div>
                        <h3 className="text-2xl font-bold text-pink-800 mb-2">
                          ¡Estás Invitad
                          {formData.guestName.toLowerCase().endsWith("a") ||
                          formData.guestName.toLowerCase().includes("maría") ||
                          formData.guestName.toLowerCase().includes("ana")
                            ? "a"
                            : "o"}
                          !
                        </h3>
                        <h4 className="text-xl font-semibold text-purple-700">
                          Boda de {data.couple.displayNames}
                        </h4>
                        <p className="text-sm text-pink-600 mt-2">
                          {data.event.date.full}
                        </p>
                      </div>

                      {/* Saludo personalizado */}
                      <div className="bg-white/80 rounded-lg p-4 mb-4">
                        <h5 className="font-bold text-pink-800 mb-2">
                          ¡Hola {formData.guestName}!
                        </h5>
                        {formData.personalMessage && (
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {formData.personalMessage}
                          </p>
                        )}
                      </div>

                      {/* Detalles del evento */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-pink-700">
                          <span>📅</span>
                          <span>{data.event.date.full}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-pink-700">
                          <span>⏰</span>
                          <span>Ceremonia: {data.event.ceremony.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-pink-700">
                          <span>🏛️</span>
                          <span>{data.event.ceremony.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-pink-700">
                          <span>📍</span>
                          <span className="text-xs">{data.event.ceremony.address}</span>
                        </div>

                        {formData.numberOfGuests && (
                          <div className="flex items-center gap-2 text-sm font-bold text-purple-700">
                            <span>👥</span>
                            <span>Para {formData.numberOfGuests} {parseInt(formData.numberOfGuests) === 1 ? 'persona' : 'personas'}</span>
                          </div>
                        )}

                        {data.event.dressCode && (
                          <div className="flex items-center gap-2 text-sm text-pink-700">
                            <span>👔</span>
                            <span>Código de vestimenta: {data.event.dressCode}</span>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="text-center border-t border-pink-200 pt-4">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Heart className="w-3 h-3 text-pink-500 fill-current" />
                          <span className="text-xs text-pink-600">
                            Con amor, {data.couple.displayNames}
                          </span>
                          <Heart className="w-3 h-3 text-pink-500 fill-current" />
                        </div>
                        <p className="text-xs text-gray-500">
                          ¡Te esperamos para celebrar este día tan especial!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  {formData.guestName && (
                    <div className="space-y-3">
                      {/* Botón de descarga PNG */}
                      <Button
                        onClick={downloadInvitationPNG}
                        disabled={isDownloading}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 font-medium"
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Generando imagen...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Descargar como PNG
                          </>
                        )}
                      </Button>

                      {/* Botón de envío por WhatsApp */}
                      {formData.whatsappNumber &&
                        formData.whatsappNumber.replace(/\D/g, "").length ===
                          10 && formData.numberOfGuests && (
                          <Button
                            onClick={sendWhatsAppInvitation}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 font-medium"
                          >
                            <MessageCircle className="w-5 h-5 mr-2" />
                            Enviar por WhatsApp (+52 {formData.whatsappNumber})
                          </Button>
                        )}
                    </div>
                  )}

                  {/* Información sobre WhatsApp + imagen */}
                  {formData.guestName && (
                    <div className="mt-4 p-4 bg-blue-50 border-blue-200 rounded-lg border">
                      <div className="flex items-start gap-2">
                        <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h6 className="font-semibold text-blue-800 text-sm mb-1">
                            💡 Para enviar con imagen:
                          </h6>
                          <ol className="text-xs text-blue-700 space-y-1">
                            <li>1. Descarga la imagen PNG ⬆️</li>
                            <li>2. Envía el mensaje de WhatsApp ⬆️</li>
                            <li>
                              3. En WhatsApp, adjunta manualmente la imagen
                              descargada
                            </li>
                          </ol>
                          <p className="text-xs text-blue-600 mt-2 italic">
                            ⚠️ WhatsApp no permite adjuntar imágenes
                            automáticamente por seguridad
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{display: 'none'}}
            className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 rounded-2xl p-8 border text-center"
          >
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-pink-800 mb-4">
              Área de Administración
            </h3>
            <p className="text-lg text-pink-700 mb-6">
              Esta funcionalidad está disponible únicamente para organizadores
              de la boda. Permite crear invitaciones personalizadas con mensaje
              especial y envío directo por WhatsApp.
            </p>
            <p className="text-sm text-pink-600">
              Si eres organizador, usa el botón ⚙️ en la
              esquina superior derecha para acceder.
            </p>
          </div>
        )}

        {/* Información adicional */}
        <div
          style={{display: 'none'}}
          className="mt-16 bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 rounded-2xl p-8 border"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <h3 className="text-2xl font-bold text-pink-800">
                Información Importante para la Boda
              </h3>
              <Sparkles className="w-6 h-6 text-pink-500" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl">💒</div>
                <h4 className="font-semibold text-pink-700">
                  Invitación Personal
                </h4>
                <p className="text-sm text-gray-600">
                  Cada invitado recibe un mensaje personalizado y único para la boda
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-3xl">📱</div>
                <h4 className="font-semibold text-pink-700">
                  WhatsApp Directo
                </h4>
                <p className="text-sm text-gray-600">
                  Envío automático con enlace a la invitación completa
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-3xl">💕</div>
                <h4 className="font-semibold text-pink-700">
                  Diseño Romántico
                </h4>
                <p className="text-sm text-gray-600">
                  Tema rosa y púrpura elegante para la celebración de {data.couple.displayNames}
                </p>
              </div>
            </div>

            <div 
              style={{display: 'none'}}
              className="mt-6 p-4 bg-white/50 rounded-xl"
            >
              <p className="text-sm text-pink-700">
                <strong>Funcionalidad Admin:</strong> Esta herramienta permite a
                los organizadores crear y enviar invitaciones personalizadas,
                incluyendo número de invitados y mensajes especiales para cada
                invitado de la boda de {data.couple.displayNames}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

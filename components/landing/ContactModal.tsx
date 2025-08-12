"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { contactFormData } from "./data/contact-form-data";

// Esquema de validación
const contactSchema = z.object({
  name: z.string()
    .min(2, contactFormData.validation.name.minLength)
    .max(50, contactFormData.validation.name.maxLength),
  eventType: z.string().min(1, contactFormData.validation.eventType.required),
  package: z.string().min(1, contactFormData.validation.package.required),
  description: z.string()
    .min(10, contactFormData.validation.description.minLength)
    .max(200, contactFormData.validation.description.maxLength)
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      eventType: "",
      package: "",
      description: ""
    }
  });

  const selectedEventType = watch("eventType");
  const selectedPackage = watch("package");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Construir mensaje de WhatsApp
      const message = contactFormData.whatsapp.messageTemplate(
        data.name,
        data.eventType,
        data.package,
        data.description
      );
      
      // Codificar mensaje para URL
      const encodedMessage = encodeURIComponent(message);
      
      // Construir URL de WhatsApp
      const whatsappUrl = `https://wa.me/${contactFormData.whatsapp.countryCode}${contactFormData.whatsapp.phone}?text=${encodedMessage}`;
      
      // Mostrar mensaje de éxito
      setShowSuccess(true);
      
      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, '_blank');
      
      // Resetear formulario y cerrar modal después de 2 segundos
      setTimeout(() => {
        reset();
        setShowSuccess(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setShowSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {contactFormData.title}
            </h2>
            <p className="text-gray-600 mt-1">
              {contactFormData.subtitle}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              {contactFormData.form.nameLabel}
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder={contactFormData.form.namePlaceholder}
              className={`${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Tipo de evento */}
          <div className="space-y-2">
            <Label htmlFor="eventType" className="text-sm font-medium text-gray-700">
              {contactFormData.form.eventTypeLabel}
            </Label>
            <Select
              value={selectedEventType}
              onValueChange={(value) => setValue("eventType", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className={`${errors.eventType ? 'border-red-500' : 'border-gray-300'}`}>
                <SelectValue placeholder={contactFormData.form.eventTypePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {contactFormData.eventTypes.map((eventType) => (
                  <SelectItem key={eventType.value} value={eventType.value}>
                    <span className="flex items-center gap-2">
                      <span>{eventType.icon}</span>
                      <span>{eventType.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eventType && (
              <p className="text-sm text-red-500">{errors.eventType.message}</p>
            )}
          </div>

          {/* Paquete de interés */}
          <div className="space-y-2">
            <Label htmlFor="package" className="text-sm font-medium text-gray-700">
              {contactFormData.form.packageLabel}
            </Label>
            <Select
              value={selectedPackage}
              onValueChange={(value) => setValue("package", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className={`${errors.package ? 'border-red-500' : 'border-gray-300'}`}>
                <SelectValue placeholder={contactFormData.form.packagePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {contactFormData.packages.map((packageOption) => (
                  <SelectItem key={packageOption.value} value={packageOption.value}>
                    <div className="flex items-center justify-between w-full">
                      <span className="flex items-center gap-2">
                        <span>{packageOption.icon}</span>
                        <span>{packageOption.label}</span>
                      </span>
                      <span className="text-sm font-semibold text-green-600 ml-2">
                        {packageOption.price}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.package && (
              <p className="text-sm text-red-500">{errors.package.message}</p>
            )}
            
            {/* Información del paquete seleccionado */}
            {selectedPackage && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600 font-semibold">
                    {contactFormData.packages.find(p => p.value === selectedPackage)?.label}
                  </span>
                  <span className="text-green-600 font-bold">
                    {contactFormData.packages.find(p => p.value === selectedPackage)?.price}
                  </span>
                </div>
                <ul className="text-xs text-blue-700 space-y-1">
                  {contactFormData.packages.find(p => p.value === selectedPackage)?.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              {contactFormData.form.descriptionLabel}
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder={contactFormData.form.descriptionPlaceholder}
              rows={4}
              className={`${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              {contactFormData.form.cancelButton}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-500 hover:bg-green-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {contactFormData.messages.loading}
                </>
              ) : showSuccess ? (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  ¡Enviado!
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {contactFormData.form.submitButton}
                </>
              )}
            </Button>
          </div>

          {/* Mensaje de éxito */}
          {showSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800 font-medium">
                {contactFormData.messages.success}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 
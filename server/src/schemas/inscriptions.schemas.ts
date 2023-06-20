import Joi from 'joi'

export const inscriptionSchema = Joi.object({
  id_modalidad_inscripcion: Joi
    .number()
    .required()
    .min(1),
  nombres_inscripcion: Joi
    .string()
    .required()
    .min(3)
    .max(50),
  apellidos_inscripcion: Joi
    .string()
    .required()
    .min(3)
    .max(45),
  tipo_documento_inscripcion: Joi
    .string()
    .required()
    .min(2)
    .max(10),
  numero_documento_inscripcion: Joi
    .string()
    .required()
    .min(5)
    .max(20),
  correo_electronico_inscripcion: Joi
    .string()
    .required()
    .min(5)
    .max(60),
  numero_celular_inscripcion: Joi
    .string()
    .required()
    .min(5)
    .max(15),
  etapa_formacion_actual_inscripcion: Joi
    .string()
    .required()
    .min(3)
    .max(15),
  nivel_formacion_actual_inscripcion: Joi
    .string()
    .required()
    .min(3)
    .max(20),
  id_ficha_inscripcion: Joi
    .number()
    .required()
    .min(1),
  id_instructor_lider_inscripcion: Joi
    .number()
    .required()
    .min(1),
  apoyo_sostenimiento_inscripcion: Joi
    .string()
    .required()
    .min(2)
    .max(50),
  id_empresa_inscripcion: Joi
    .number()
    .min(1)
    .allow(null),
  nombre_completo_jefe_inmediato_inscripcion: Joi
    .string()
    .min(3)
    .max(100)
    .allow(null),
  cargo_jefe_inmediato_inscripcion: Joi
    .string()
    .min(3)
    .max(100)
    .allow(null),
  telefono_jefe_inmediato_inscripcion: Joi
    .string()
    .min(5)
    .max(100)
    .allow(null),
  correo_jefe_inmediato_inscripcion: Joi
    .string()
    .min(5)
    .max(100)
    .allow(null),
  asume_pago_arl_inscripcion: Joi
    .string()
    .min(2)
    .max(20)
    .allow(null),
  link_documentos_pdf_inscripcion: Joi
    .string()
    .required()
    .min(5)
    .max(200),
  observaciones_inscripcion: Joi
    .string()
    .required()
    .min(1)
    .max(200),
  fecha_creacion_inscripcion: Joi
    .date()
    .required(),
  id_usuario_responsable_inscripcion: Joi
    .number()
    .required()
    .min(1)
})

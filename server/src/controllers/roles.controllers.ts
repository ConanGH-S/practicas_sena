import { type Request, type Response } from 'express'
import { handleHTTP } from '../errors/errorsHandler.js'
import { httpStatus } from '../models/httpStatus.enums.js'
import { connection } from '../config/db.js'
import { type CustomError } from '../errors/customErrors.js'

export const createRole = async (req: Request<{ nombre_rol: string }>, res: Response): Promise<Response> => {
  const { nombre_rol } = req.body
  try {
    await connection.query('INSERT INTO roles (nombre_rol) VALUE (?)', [nombre_rol])
    return res.status(httpStatus.OK).json({ message: 'Rol creado' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const getRoles = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const [roles] = await connection.query('SELECT * FROM roles')
    return res.status(httpStatus.OK).json({ data: roles })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

export const editRole = async (req: Request<{ nombre_rol: string, id_rol: number }>, res: Response): Promise<Response> => {
  const { nombre_rol, id_rol } = req.body
  try {
    await connection.query('UPDATE roles SET nombre_rol = ? WHERE id_rol = ?', [nombre_rol, id_rol])
    return res.status(httpStatus.OK).json({ message: 'Rol actualizado' })
  } catch (error) {
    return handleHTTP(res, error as CustomError)
  }
}

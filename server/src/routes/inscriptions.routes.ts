import { type IRouter, Router } from 'express'
import { createInscription, getInscriptionById, getInscriptions } from '../controllers/inscriptions.controllers.js'
import { checkIdReq } from '../middlewares/idCheck.middlewares.js'
import { checkInscriptionData } from '../middlewares/inscriptions.middlewares.js'

const inscriptionRoutes: IRouter = Router()

// * GET
inscriptionRoutes.get('/inscriptions', getInscriptions)
inscriptionRoutes.get('/inscription/:id', checkIdReq, getInscriptionById)

// * POST
inscriptionRoutes.post('/create-inscription', checkInscriptionData, createInscription)

export { inscriptionRoutes }

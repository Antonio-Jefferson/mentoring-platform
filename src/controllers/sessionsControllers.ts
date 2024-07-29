import { Request, Response, NextFunction } from "express";
import sessionsService from "../services/sessionsService";

async function create(req: Request, res: Response, next: NextFunction) {
  const {
    mentorId,
    menteeId,
    skillId,
    startTime,
    endTime,
  } = req.body

  try {
    const session = await sessionsService.create({menteeId, mentorId, skillId, startTime, endTime})
    res.status(201).send(session);
  } catch (error) {
    next(error)
  }
}

async function assessment(req: Request, res: Response, next: NextFunction) {
  const { sessionId } = req.params
  const { assessment } = req.body

  try {
    await sessionsService.assessment(Number(sessionId), Number(assessment))
    res.sendStatus(201);
  } catch (error) {
    next(error)
  }
}

export default {
  create,
  assessment
}
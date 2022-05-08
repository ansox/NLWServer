import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from 'express';
import { SubmitFeedbackUseCase } from './repositories/use-cases/submit-feedback-use-case';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  console.log(req.body);

  await submitFeedbackUseCase.execute(req.body);

  return res.status(201).send();
});

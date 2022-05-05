import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './repositories/use-cases/submit-feedback-use-case';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '0dd529aceb5087',
    pass: '1421170ff95ade',
  },
});

routes.post('/feedbacks', async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  );

  await submitFeedbackUseCase.execute(req.body);

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Anso <anderson.floriano@gmail.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div>`,
  //     `<p>Tipo do feedback: ${feedback.type}</p>`,
  //     `<p>Comentário: ${feedback.comment}</p>`,
  //     `<div>`,
  //   ].join(''),
  // });

  return res.status(201).send();
});

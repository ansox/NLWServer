import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  {
    create: createFeedbackSpy,
  },
  {
    sendMail: sendMailSpy,
  }
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'I have a problem',
        screenshot: 'data:image/png;base64,asdfasdfasdqw4r',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'I have a problem',
        screenshot: 'data:image/png;base64,asdfasdfasdqw4r',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,asdfasdfasdqw4r',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with invalid screenshot format', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'abc',
        screenshot: 'data.jpeg',
      })
    ).rejects.toThrow();
  });
});

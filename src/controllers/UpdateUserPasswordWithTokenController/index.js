const UpdateUserPasswordWithTokenService = require('@service/UpdateUserPasswordWithTokenService');

class UpdateUserPasswordWithTokenController {
  async update(request, response) {
    try {
      const { token, newPassword, confirmNewPassword } = request.body;

      const updateUserPasswordWithTokenService =
        new UpdateUserPasswordWithTokenService();

      await updateUserPasswordWithTokenService.execute({
        token,
        newPassword,
        confirmNewPassword,
      });

      return response
        .status(201)
        .json({ message: 'Senha atualizada com sucesso!' });
    } catch (err) {
      const errorMessage = err.message;

      return response.status(400).json({ error: errorMessage });
    }
  }
}

module.exports = new UpdateUserPasswordWithTokenController();

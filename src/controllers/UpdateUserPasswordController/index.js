const UpdateUserPasswordService = require('@service/UpdateUserPasswordService');

class UpdateUserPasswordController {
  async update(request, response) {
    try {
      const { _id } = request.user;
      const { newPassword, confirmNewPassword, password } = request.body;

      const updateUserPasswordService = new UpdateUserPasswordService();

      await updateUserPasswordService.execute({
        _id,
        newPassword,
        confirmNewPassword,
        password,
      });

      return response
        .status(201)
        .json({ message: 'Senha alterada com sucesso!' });
    } catch (err) {
      const messageError = err.message;

      return response.status(400).json({ error: messageError });
    }
  }
}

module.exports = new UpdateUserPasswordController();

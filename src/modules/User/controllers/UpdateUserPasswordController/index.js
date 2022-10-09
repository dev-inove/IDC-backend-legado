const UpdateUserPasswordService = require('@modules/User/services/UpdateUserPasswordService');

class UpdateUserPasswordController {
  async update(request, response) {
    try {
      const { _id } = request.user;
      const { newPassword, confirmNewPassword } = request.body;

      const updateUserPasswordService = new UpdateUserPasswordService();

      await updateUserPasswordService.execute({
        _id,
        newPassword,
        confirmNewPassword,
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

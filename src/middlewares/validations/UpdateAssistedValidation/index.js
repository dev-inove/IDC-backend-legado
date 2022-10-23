const Yup = require('yup');

async function UpdateAssistedValidation(request, response, next) {
    const schema = Yup.object().shape({
        fullName: Yup.string().typeError('O nome completo deve ser um texto.'),
        socialName: Yup.string().typeError('O nome social deve ser um texto.'),
        maritalStatus: Yup.string().typeError('O estado civil deve ser um texto.'),
        email: Yup.string().typeError('O email deve ser um texto.'),
        phone: Yup.number()
            .positive('O telefone não pode ser negativo.')
            .typeError('O telefone deve ser um número.'),

        birth: Yup.string().typeError('O aniversário deve ser uma data.'),
        sex: Yup.string().typeError('O sexo deve ser um texto.'),
        nationality: Yup.string().typeError('A nacionalidade deve ser um texto.'),
        placeOfBirth: Yup.string().typeError(
            'O lugar de nascimento deve ser um nascimento deve ser um texto.',
        ),

        hasDeficiency: Yup.boolean().typeError(
            'Se tem deficiência deve ser um boolean.',
        ),
        deficiency: Yup.string().typeError('A deficiência deve ser um texto.'),

        address: Yup.object().shape({
            address: Yup.string().typeError('A rua deve ser um texto.'),
            number: Yup.string().typeError('O número da casa deve ser um texto.'),
            neighborhood: Yup.string().typeError('O bairro deve ser um texto.'),
            city: Yup.string().typeError('A cidade deve ser um texto.'),
            state: Yup.string().typeError('O estado deve ser um texto.'),
            cep: Yup.number()
                .positive('o cep deve ser um número positivo.')
                .typeError('O cep deve ser um número.'),
            referencePoint: Yup.string().typeError(
                'O ponto de referência deve ser um texto.',
            ),
        }),

        identity: Yup.number()
            .positive('O número da identidade deve ser positivo.')
            .typeError('O número da identidade deve ser um texto.'),
        cpf: Yup.string().typeError('O cpf deve ser um texto.'),
        Department: Yup.string().typeError('O departameto deve ser um texto.'),
        emission: Yup.string().typeError('Emissão deve ser uma data.'),

        diagnostic: Yup.string().typeError('O diagnóstico deve ser um texto.'),
        visualAcuity: Yup.string().typeError(
            'A acuidade visual deve ser um texto.',
        ),
        cid10: Yup.string().typeError('cid10 deve ser um texto.'),

        hasARelativeAttended: Yup.boolean().typeError(
            'Se teve atendimento relativo deve ser um boolean.',
        ),
        relativeAttended: Yup.string().typeError(
            'Atendimento relativo deve ser um texto.',
        ),

        transport: Yup.string().typeError('Transporte deve ser um texto.'),

        isInGovernmentProgram: Yup.boolean().typeError(
            'Se está em um programa do governo deve ser um boolean.',
        ),
        governmentProgram: Yup.string().typeError(
            'Programa do governo deve ser um texto.',
        ),
        governmentProgramValue: Yup.number()
            .positive('O valor recebido no programa deve ser um número positivo.')
            .typeError('O valor recebido no programa deve ser um número.'),
        beneficiary: Yup.string().typeError('Beneficiário deve ser um texto.'),
        nisNumber: Yup.number()
            .positive('O número do nis deve ser um número positivo.')
            .typeError('O número do nis deve ser um número.'),

        schooling: Yup.object().shape({
            grade: Yup.string().typeError('O grau de escolaridade deve ser um texto'),
            turn: Yup.string().typeError('O turno deve ser um texto.'),
            hasVinculeHelioGoes: Yup.boolean().typeError(
                'hasVinculeHelioGoes deve ser um boolean.',
            ),
            transportToInstitute: Yup.string().typeError(
                'Transporte para a escola deve ser um texto.',
            ),
            hasMemberMatriculatedOrWillMatriculate: Yup.boolean().typeError(
                'Se é um membro matriculado ou vai matricular deve ser um boolean.',
            ),
        }),

        property: Yup.object().shape({
            type_property: Yup.string().typeError(
                'O tipo da propriedade deve ser um texto.',
            ),
            physical_structure: Yup.string().typeError(
                'Estrutura física deve ser um texto.',
            ),
            numberOfRooms: Yup.number()
                .positive('O número de quartos deve ser um número positivo.')
                .typeError('O número de quartos deve ser um número.'),
            numberOfBathrooms: Yup.number()
                .positive('O número de banheiros deve ser um número positivo.')
                .typeError('O número de banheiros deve ser um número.'),
            energyElectric: Yup.string().typeError(
                'Energia elétrica deve ser um texto.',
            ),
            waterSupply: Yup.string().typeError(
                'Fornecimento de água deve ser um texto.',
            ),
            sanitarySewage: Yup.boolean().typeError(
                'Saneamento básico deve ser um boolean.',
            ),
            garbageCollection: Yup.boolean().typeError(
                'Coleta de lixo deve ser um boolean.',
            ),
            statusProperty: Yup.string().typeError(
                'Estado da propriedade deve ser um texto',
            ),
            monthlyRent: Yup.number()
                .positive('Aluguel mensal deve ser um número positivo.')
                .typeError('Aluguel mensal deve ser um número.'),
            monthlyFinancing: Yup.number()
                .positive('Financiamento mensal deve ser um número positivo.')
                .typeError('Financiamento mensal deve ser um número.'),
            isSharedWithOtherFamily: Yup.boolean().typeError(
                'Se é compartilhado com outra família deve ser um boolean.',
            ),
            houseProvidedBy: Yup.string().typeError(
                'Casa provida por deve ser um texto.',
            ),
        }),
    });

    try {
        await schema.validate(request.body, { strict: true, abortEarly: false });
    } catch (err) {
        const validationErros = err.errors;

        return response.status(400).json({ errors: validationErros });
    }

    return next();
}

module.exports = UpdateAssistedValidation;

export class VerificationProvider {
  async verifyStudent() {
    throw new Error('VerificationProvider.verifyStudent precisa ser implementado.');
  }
}

const mockStudents = new Map([
  ['2024001', { email: 'aluno.aprovado@conecta.test' }],
  ['2024002', { email: 'email.correto@conecta.test' }],
]);

export class MockVerificationProvider extends VerificationProvider {
  async verifyStudent({ enrollment, email }) {
    const normalizedEnrollment = normalizeEnrollment(enrollment);
    const normalizedEmail = normalizeEmail(email);
    const student = mockStudents.get(normalizedEnrollment);

    if (!student) {
      return {
        approved: false,
        result: 'recusado',
        reason: 'STUDENT_NOT_FOUND',
        message: 'Os dados informados não foram encontrados.',
      };
    }

    if (normalizeEmail(student.email) !== normalizedEmail) {
      return {
        approved: false,
        result: 'recusado',
        reason: 'EMAIL_MISMATCH',
        message: 'A matrícula foi encontrada, mas o e-mail informado não confere.',
      };
    }

    return {
      approved: true,
      result: 'aprovado',
      reason: null,
      message: 'Verificação concluída.',
    };
  }
}

export class ApiVerificationProvider extends VerificationProvider {
  constructor({ endpoint = process.env.CONECTA_DISCORD_VERIFY_URL } = {}) {
    super();
    this.endpoint = endpoint;
  }

  async verifyStudent({ enrollment, email, discordUserId }) {
    if (!this.endpoint) {
      throw new Error('Configure CONECTA_DISCORD_VERIFY_URL antes de usar ApiVerificationProvider.');
    }

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        enrollment,
        email,
        discordUserId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Falha na API de verificação: HTTP ${response.status}`);
    }

    return response.json();
  }
}

export function createVerificationProvider() {
  return new MockVerificationProvider();
}

export function normalizeEnrollment(value) {
  return String(value ?? '').trim();
}

export function normalizeEmail(value) {
  return String(value ?? '').trim().toLowerCase();
}

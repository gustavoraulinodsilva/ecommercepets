export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'chave_secreta_padronizada',
  signOptions: { expiresIn: '1h' },
};
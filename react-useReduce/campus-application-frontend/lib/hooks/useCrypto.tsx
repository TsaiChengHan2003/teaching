import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';

const AES_TOKEN = process.env.NEXT_PUBLIC_TOKEN_SECRET as string;

export const useEncrypto = (conetext: string) => {
  const ciphertext = AES.encrypt(conetext, AES_TOKEN).toString();

  return ciphertext;
};

export const useDecrypto = (conetext: string) => {
  const bytes = AES.decrypt(conetext, AES_TOKEN);
  const originalText = bytes.toString(encUtf8);

  return originalText;
};
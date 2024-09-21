import CryptoJS from "crypto-js";



const Secret_Key = 'ODISEC_DERIVATION';


if (!Secret_Key) {
  console.error("ERROR: SECRET_KEY no está definido. Revisa tu archivo .env.");
  process.exit(1); 
}


export const encryptData = (data) => {
  try {

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), Secret_Key).toString();
    console.log("Datos Cifrados:", encrypted);
    return encrypted;
  } catch (error) {
    console.error("Error al cifrar los datos:", error);
    return null;
  }
};


export const decryptData = (encryptedData) => {
  try {

    const bytes = CryptoJS.AES.decrypt(encryptedData, Secret_Key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log("Datos Descifrados:", decrypted);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Error de decodificación:", error.message);
    return null;
  }
};






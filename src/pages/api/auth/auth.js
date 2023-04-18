const bcrypt = require('bcrypt');


export async function hashPassword(password) {
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
}
export async function verifyPassword(password, hashedPassword) {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
}



module.exports={
verifyPassword,
hashPassword
}

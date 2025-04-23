import bcrypt from 'bcrypt';

export const hashPassword = (plainPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject('Error generating salt');

      bcrypt.hash(plainPassword, salt, (err, hash) => {
        if (err) return reject('Error hashing password');
        resolve(hash);
      });
    });
  });
};

const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('🟢 MongoDB conectado');
    })
    .catch(err => {
      console.error('❌ Error al conectar a MongoDB:', err);
    });
};
const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        
        const url="mongodb+srv://kadir:kadir1964@dbiudigital.sn7ribj.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(url);

        console.log('Conexion exitosa');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection,
}
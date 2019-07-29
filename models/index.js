const cars = require('./cars');
const manufacturers = require('./manufacturers');

module.exports = {
    cars,
    manufacturers,
    getCar: async (id) => await cars.findOne({ _id: id }),
    getManufacture: async (id) => await manufacturers.findOne({ _id: id })
}
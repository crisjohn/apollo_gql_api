const models = require('../models');

module.exports = {
    Query: {
        cars: async () => await models.cars.find({}),
        car: async (root, args) => await models.cars.findOne(args),
        manufacturers: async () => await models.manufacturers.find({})
    },
    Mutation: {
        createCar: async (root, { newCar }) => {
            const checkNewCar = await models.cars.findOne({ model: newCar.model });
            if (checkNewCar) {
                throw new Error('Car already exist.');
            }
            const manufacture = await models.manufacturers.findOne({ name: newCar.manufacturer });
            if (!manufacture) {
                throw new Error('Unable to find manufacturer.');
            }
            newCar.manufacturer = manufacture._id;
            return await models.cars.create(newCar);
        },
        createManufacturer: async (root, {newManufacture}) => {
            const checkManufacture = await models.manufacturers.findOne({name: newManufacture.name});
            if(checkManufacture) {
                throw new Error('Manufacturer already exist.');
            }
            return await models.manufacturers.create(newManufacture);
        }
    },
    Car: {
        manufacturer: async (car) => await models.getManufacture(car.manufacturer)
    },
    Manufacturer: {
        cars: async (manufacture) => await models.cars.find({ _id: { $in: manufacture.cars } })
    }
};
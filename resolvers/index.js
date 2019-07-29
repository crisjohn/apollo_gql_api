const models = require('../models');

module.exports = {
    Query: {
        cars: async () => await models.cars.find({}),
        car: async (root, args) => {
            console.log(args)
            return await models.cars.findOne(args);
        },
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
        }
    },
    Car: {
        manufacturer: async (car) => {
            return await models.getManufacture(car.manufacturer)
        }
    },
    Manufacturer: {
        cars: async (manufacture) => {
            return await models.cars.find({ _id: { $in: manufacture.cars } })
        }
    }
};
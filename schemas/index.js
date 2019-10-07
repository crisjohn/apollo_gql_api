const { gql } = require('apollo-server');

module.exports = gql`
    
    type Car {
        _id: ID
        model: String!
        color: String!
        transmission: String!
        manufacturer: Manufacturer!
    }

    type Manufacturer {
        _id: ID
        name: String!
        country: String!
        cars: [Car!]
    }

    input carInput {
        model: String!
        color: String!
        transmission: String!
        manufacturer: String!
    }

    input manufacturerInput {
        name: String!
        country: String!
    }

    # root query
    type Query {
        cars: [Car!]
        car(_id: String) : Car
        manufacturers: [Manufacturer!]
    }
    # root mutation
    type Mutation {
        createCar(newCar: carInput) : Car
        createManufacturer(newManufacturer: manufacturerInput) : Manufacturer
    }

`;
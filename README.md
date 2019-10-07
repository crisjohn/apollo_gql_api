# apollo-gql-api

## query

```bash
query {
	cars{
   		model
    		manufacturer{
      			name
    		}
  	}
}
```

## mutation

```bash
mutation{
  createCar(newCar: {
    model: "hilux 4x4 v2",
    color: "red",
    transmission: "automatic",
    manufacturer: "toyota"
  }){
    model
  }
}
```

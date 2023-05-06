## POC RabbitMQ communication between microservices

## Technologies
- NestJS
- RabbitMQ
- MongoDB
- Mongoose
- JWT
- Cookie parser
- Docker
- Docker compose
- Passport Jwt / Local

## Installation

```bash
$ yarn install
```

## Copy .env.example for each microservice
```bash
# ms auth
$  cp apps/auth/.env.example apps/auth/.env 

# ms billing
$  cp apps/billing/.env.example apps/billing/.env 

# ms orders
$  cp apps/orders/.env.example apps/orders/.env 
```




## Running the app with docker

```bash
# development
$ docker compose up -d
```


## API
### Microservice auth running: `http://localhost:3001`
```bash
# register user
$ POST http://localhost:3001/users
{
    "email": "rxrdsoft1@gmail.com",
    "password": "holamunbdo123@"
}

# login
$ POST http://localhost:3001/auth/login

{
    "email": "rxrdsoft@gmail.com",
    "password": "holamunbdo123@"
}
```

### Microservice orders running: `http://localhost:3000`
```bash
# create order
$ POST http://localhost:3000/orders
{
    "name": "Google pixel 7 pro",
    "price": 15000,
    "phoneNumber": "51987654321"
}

# get orders
$ GET http://localhost:3000/orders
[
    {
        "_id": "64559a74a7b4ec028fe44950",
        "name": "Google pixel 7 pro",
        "price": 15000,
        "phoneNumber": "51987654321"
    }
]
```

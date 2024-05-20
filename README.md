# Dashboard NestJS

This project features an API built with NestJS. The API contains the following endpoints:
- GET "/": Hello World.
- POST "/auth/login": Login;
- GET "/auth/profile": get profile logged in;
- GET "/users/": get registered users;
- POST "/users/create": create a new user;

The login endpoint returns a authentication token, if the credentials are valid. Except for the login and hello world endpoints, all the other endpoints require a valid token on the request's auth header.

## Access

The API was deployed on Vercel. It can be accessed through the URL: https://dashboard-nestjs.vercel.app/.

The params for requesting each endpoint can be seen in the following section.

## Demonstration

1. Login endpoint

https://www.youtube.com/embed/6olkPquo02Q?si=dwRouc8aI8Oo3Yn7

2. Profile endpoint

https://www.youtube.com/embed/JvTBJWoTHPc?si=AH2F6HBniHmgwZIg

3. Users endpoint

https://www.youtube.com/embed/nNEVau69jG4?si=PG88a2du3Kq-M2yH

4. Create User endpoint 

https://www.youtube.com/embed/dFzqRjw_U-Q?si=8QoMW0_QOaUiiCKz


## Development Notes

### Deployment
This is my first time deploying an API and it was actually pretty fast to do so, thanks to the great tutorial I found on how to deploy on Vercel. 

The problems emerged when connecting the deployment build to the postgreSQL database on the cloud. Initially, my database connection was managed by TypeORM, but all the modules related with it had to be removed of my imports since Vercel's database didnt support its use. There were other ORM packages supported, but at that moment I chose to use pure SQL to query the database.

## References

1. [How to deploy a NestJS app for free on Vercel](https://www.technog.com.br/blog/tips-and-tricks/how-to-deploy-a-nestjs-app-for-free-on-vercel/)
2. [NestJS - First steps](https://docs.nestjs.com/first-steps)

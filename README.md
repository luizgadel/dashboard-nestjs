# Dashboard NestJS

This project features an API built with NestJS. The API contains the following endpoints:
- POST "/auth/login": Login;
- GET "/auth/profile": get profile logged in;
- GET "/users/": get registered users;
- POST "/users/create": create a new user;

The login endpoint returns a authorization token if the credentials are valid. The authorization token can be used to request the other endpoints.

## Access

The API was deployed in Vercel with a postgreSQL database. It can be accessed through the URL: https://dashboard-nestjs.vercel.app/
The params for requesting each endpoint can be seen in the following section.

## Demonstration

1. Login endpoint

<iframe width="560" height="315" src="https://www.youtube.com/embed/6olkPquo02Q?si=CHr6NT9Czpt_Rinr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

2. Profile endpoint

<iframe width="560" height="315" src="https://www.youtube.com/embed/JvTBJWoTHPc?si=AH2F6HBniHmgwZIg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

3. Users endpoint

<iframe width="560" height="315" src="https://www.youtube.com/embed/nNEVau69jG4?si=PG88a2du3Kq-M2yH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

4. Create User endpoint 

<iframe width="560" height="315" src="https://www.youtube.com/embed/dFzqRjw_U-Q?si=8QoMW0_QOaUiiCKz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## References

1. [How to deploy a NestJS app for free on vercel](https://www.technog.com.br/blog/tips-and-tricks/how-to-deploy-a-nestjs-app-for-free-on-vercel/)
2. [NestJS - First steps](https://docs.nestjs.com/first-steps)
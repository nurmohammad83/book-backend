# Online Cow Selling Backend for Eid Ul Adha
# live link :- https://online-cow-auth-service.vercel.app/


### User
    1.User interface
    2.User model
    3.User route
    4.User controller
    5.User service
### Auth
    
    1.Auth route
    2.Auth controller
    3.Auth service
### Cows
    1.Cows interface
    2.Cows model
    3.Cows route
    4.Cows controller
    5.Cows service
### Order
    1.Order interface
    2.Order model
    3.Order route
    4.Order controller
    5.Order service


## Application Routes:
### User
 - api/v1/auth/signup (POST)
 - api/v1/users (GET)
 - api/v1/users/648e84da8537f77fc8ab23b9 (Single GET) Include an id   that is saved in your database
 -api/v1/users/648e84da8537f77fc8ab23b9 (PATCH)
 - api/v1/users/648e84da8537f77fc8ab23b9 (DELETE) Include an id that is saved in your database
### Cows
 - api/v1/cows (POST)
 - api/v1/cows (GET)
 - api/v1/cows/6491794c9cbc57075053f1e0 (Single GET) Include an id that is saved in your database
 - api/v1/cows/6491794c9cbc57075053f1e0 (PATCH)
 - api/v1/cows/6491794c9cbc57075053f1e0 (DELETE) Include an id that is saved in your database
 - Pagination and Filtering routes of Cows
 - api/v1/cows?page=1&limit=10
 - api/v1/cows?sortBy=price&sortOrder=asc
 - api/v1/cows?minPrice=20000&maxPrice=70000
 - api/v1/cows?location=Dhaka
 - api/v1/cows?searchTerm=Dha
### Orders
  - api/v1/orders (POST)
  - api/v1/orders (GET)


### Technologies
   - Use TypeScript as the programming language.
   - Use Express.js as the web framework.
   - Use Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB.

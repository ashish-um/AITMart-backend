Authentication Endpoints
1. Register a User

URL: POST /api/auth/register
Body (JSON):

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:

    Returns a JWT token and user details.

    Use the token in headers for protected routes.

2. Login a User

URL: POST /api/auth/login
Body (JSON):

{
  "email": "john@example.com",
  "password": "password123"
}

Response:

    Returns a JWT token and user details.

Listing Endpoints

(All require JWT token in the Authorization: Bearer <token> header)
1. Create a Listing

URL: POST /api/listings
Headers:
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

Body (JSON):
{
  "title": "Calculus Textbook",
  "description": "2023 Edition, like new",
  "price": 30,
  "category": "Books",
  "image": "https://res.cloudinary.com/.../image.jpg"
}

Notes:

    title, price, category, and image are required.

    description is optional.

    userId is automatically added from the JWT token.

2. Get All Listings

URL: GET /api/listings
Response:

    Returns an array of all listings.

    No authentication required.

3. Delete a Listing

URL: DELETE /api/listings/:id
Authorization: Bearer <JWT_TOKEN>

Response:

    Deletes the listing if the user owns it.

Example Usage with Curl
Register
bash
Copy

curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"pass123"}'

Login

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"pass123"}'

Create Listing

curl -X POST http://localhost:5000/api/listings \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Bike","price":100,"category":"Sports","image":"https://res.cloudinary.com/.../bike.jpg"}'

Get Listings

curl http://localhost:5000/api/listings

Delete Listing

curl -X DELETE http://localhost:5000/api/listings/650a1b2c... \
  -H "Authorization: Bearer <JWT_TOKEN>"


# GlobeTrotter Backend API

## 🚀 Quick Start Guide (For PostgreSQL Beginners)

### Step 1: Setup Database

Run this command to create all tables automatically:

```bash
node setup-db.js
```

This will:
- Create all necessary tables (users, trips, activities, expenses, itineraries)
- Add sample data
- Create a test user (email: alex@globetrotter.com, password: password123)

### Step 2: Start the Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

---

## 📚 API Endpoints

### Authentication

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "alex@globetrotter.com",
  "password": "password123"
}
```

Response includes a `token` - save this for authenticated requests!

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE
```

### Trips

#### Get All Trips
```http
GET /api/trips
Authorization: Bearer YOUR_TOKEN_HERE
```

#### Create New Trip
```http
POST /api/trips
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Summer in Paris",
  "destination": "Paris, France",
  "start_date": "2026-07-01",
  "end_date": "2026-07-10",
  "budget": 5000
}
```

#### Get Single Trip
```http
GET /api/trips/:id
Authorization: Bearer YOUR_TOKEN_HERE
```

#### Update Trip
```http
PUT /api/trips/:id
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Updated Trip Name",
  "budget": 6000,
  "status": "ongoing"
}
```

#### Delete Trip
```http
DELETE /api/trips/:id
Authorization: Bearer YOUR_TOKEN_HERE
```

### Expenses

#### Get Trip Expenses
```http
GET /api/expenses/trip/:tripId
Authorization: Bearer YOUR_TOKEN_HERE
```

#### Add Expense
```http
POST /api/expenses
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "trip_id": 1,
  "category": "food",
  "amount": 45.50,
  "description": "Dinner at restaurant",
  "expense_date": "2026-07-02"
}
```

#### Get Expense Summary
```http
GET /api/expenses/summary/:tripId
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 🔑 Environment Variables

Your `.env` file should have:

```env
DB_HOST=db.htrxbqocisjqmrcstftn.supabase.co
DB_USER=postgres
DB_PASSWORD=NandhaKumar@07
DB_NAME=postgres
DB_PORT=5432
PORT=5000
JWT_SECRET=globetrotter_secret_key_2026_hackathon
```

---

## 🧪 Testing the API

### Using Thunder Client (VS Code Extension)

1. Install "Thunder Client" extension in VS Code
2. Create a new request
3. Set method (GET, POST, etc.)
4. Enter URL (e.g., `http://localhost:5000/api/auth/login`)
5. Add headers if needed (Authorization: Bearer TOKEN)
6. Add body for POST/PUT requests
7. Click "Send"

### Test Flow Example:

1. **Register**: POST to `/api/auth/register` with name, email, password
2. **Login**: POST to `/api/auth/login` - copy the token from response
3. **Create Trip**: POST to `/api/trips` with Authorization header
4. **Get Trips**: GET `/api/trips` to see your created trip

---

## 📊 Database Tables

- **users**: User accounts
- **trips**: Travel trips
- **activities**: Trip activities
- **expenses**: Trip expenses
- **itineraries**: Day-by-day itinerary

All tables are automatically created when you run `node setup-db.js`

---

## 🐛 Troubleshooting

**Error: "connect ECONNREFUSED"**
- Make sure your Supabase credentials in `.env` are correct
- Check if your IP is allowed in Supabase dashboard

**Error: "relation does not exist"**
- Run `node setup-db.js` to create tables

**Error: "Invalid token"**
- Make sure you're sending the token in Authorization header
- Format: `Authorization: Bearer YOUR_TOKEN_HERE`

---

## 📝 Next Steps

After backend is working:
1. Create frontend API service layer
2. Connect Login/Register pages
3. Fetch real trip data in Dashboard
4. Remove all mock data from frontend

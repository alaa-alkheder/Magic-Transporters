# 🚀 Magic Transporters API

Welcome to the **Magic Transporters** project! 🧙‍♂️✨ This API powers a magical transportation system where **Magic Movers** transport **Magic Items** on exciting missions. It's built with **Node.js**, **MongoDB**, and follows **clean architecture** principles. 🎩

## 🛠️ Tech Stack
- **Node.js** (with Express.js)
- **MongoDB** (for data storage)
- **Docker** (for containerization)
- **Jest** (for testing)

## 📦 Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/magic-transporters.git
   cd magic-transporters

Install dependencies:
npm install

Set up MongoDB using Docker (Make sure you have Docker installed):
docker-compose up

This will start both the MongoDB and the Node.js application.
Start the server:
npm start

The API will now be running on http://localhost:3000 🎉.
🚀 API Endpoints
1. Magic Movers
   Create a new Magic Mover:
   POST /movers

Request body: { "name": "Mover 1", "weightLimit": 100 } Response: Returns the created Magic Mover.
Get all Magic Movers:
GET /movers

Response: Returns a list of all Magic Movers.
Load a Magic Mover with an item:
POST /movers/:moverId/load/:itemId

Response: Returns the updated Magic Mover.
Start a mission for a Magic Mover:
POST /movers/:moverId/start

Response: Returns the updated Magic Mover with mission started.
End a mission and unload the Magic Mover:
POST /movers/:moverId/end

Response: Returns the updated Magic Mover with mission ended.
Get top movers by completed missions:
GET /movers/top

Response: Returns the list of top Magic Movers sorted by completed missions.
2. Magic Items
   Create a new Magic Item:
   POST /items

Request body: { "name": "Magic Sword", "weight": 10 } Response: Returns the created Magic Item.
Get all Magic Items:
GET /items

Response: Returns a list of all Magic Items.
Get a Magic Item by ID:
GET /items/:id

Response: Returns the Magic Item for the given ID.
Update a Magic Item:
PUT /items/:id

Request body: { "name": "Updated Sword", "weight": 12 } Response: Returns the updated Magic Item.
Delete a Magic Item:
DELETE /items/:id

Response: Confirms the deletion of the Magic Item.
🧪 Testing with Jest
Run the tests with:

npm run test

🧙‍♂️ Test Coverage
We use Jest for our tests, and we’ve covered everything from API routes to business logic. You can view the test coverage once tests are run.

🚢 Docker
For a seamless experience, we’ve containerized the application using Docker. To run everything in isolated environments:

Build and start the containers:

docker-compose up --build

The API will be available at http://localhost:3000, and MongoDB is available on port 27017.

📝 Notes
The application follows clean architecture principles to maintain separation of concerns and scalability. You can easily extend the system by adding new features, like quests or more item types! 🏆

💡 Contributing
We welcome contributions! Feel free to fork the repository, open an issue, or submit a pull request. Let’s make this project magical together! ✨

👩‍💻 License
This project is licensed under the MIT License. See the LICENSE file for details.

👨‍💻 Programmer Information
Name: Alaa Alkhedder
GitHub: alaa-alkheder
Email: a.e.alkheder@gmail.com
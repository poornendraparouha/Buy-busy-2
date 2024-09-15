# Busy Buy 🛒

Busy Buy is an e-commerce web application built with React and Redux toolkit. It allows users to sign up, sign in, browse products, live filter products, add them to the cart, and make purchases.

## Features 

- User authentication (Sign Up, Sign In, Logout)
- Product browsing and filtering
- Shopping cart functionality
- Add to order or purchase
- Order history tracking

## Technologies Used 

- **React**: Building user interfaces with JavaScript.
- **Redux Toolkit**: Managing app state efficiently.
- **Firebase**: Cloud platform for web app development.
- **HTML, CSS, JavaScript**: Standard web technologies.

## Project Structure 

The project is organized into several components, pages, and database and Redux files
- src
  - Components
  - Database
  - Pages
  - Redux
    - Reducers
    - Store.js

## Firestore Database Structure 
#### collections:
- users: Store users' information.
- cart: Store cart items of all users.
- orders: store orders of all users.

## Getting Started 🚀
To get a local copy of the project and run it on your machine, follow these steps:

### Prerequisites ⚙️
- Node.js and npm/yarn installed on your machine
- Firebase project and credentials (Firestore setup)

### Installation 🛠️
1. Clone the repository:
- git clone https://github.com/poornendraparouha/Buy-busy-2.git

2. Navigate to the project directory:
- cd BuyBusy-II

3. Install dependencies:
- npm install

4. Set up Firebase:
- Create a Firebase project and set up Firestore.
- Obtain Firebase configuration credentials.
- Add Firebase config in firebaseConfig.js or similar, if not already present.

### Usage 🚀
1. Start the development server:
- npm start

2. Open the app in your browser:
- http://localhost:3000
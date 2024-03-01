# Creator Ally 

### Overview

This innovative MERN stack project revolutionizes the way content creators collaborate with their editors on Twitter. It addresses a significant privacy concern by eliminating the need for content creators to share their Twitter credentials with their editors. Instead, editors can upload content through the platform, after which the content creator receives a verification email. This email allows the creator to review the content and choose to either approve and automatically tweet it or reject it. This not only streamlines the content approval process but also significantly enhances security and control for content creators, ensuring their digital assets remain protected against unauthorized use.

### Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

### Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VishwasSaini25/twitter.git
   ```
2. **Install dependencies**

   ```bash
   cd twitter-frontend

   npm install

   cd twitter-backend

   npm install
   ```

3. **Run the development server**
   ```bash
   cd twitter-frontend

   npm start
   
   cd twitter-backend

   npm run dev
   ```
4. **Open the application in your browser**
   Visit http://localhost:3000 in your web browser to see the application

### Project Structure

The project structure is organized to maintain a clean and scalable codebase. Here are the key directories:
- FRONTEND
-- `src/`: Contains the source code of the React js application, including crucial files such as App.js and Index.js
  - `Images/`: Store static assets like images and gifs.
  - `components/`:  parent components for different routes.
  - `utils/`: other utility services.
  - `public/`: Static assets that don't require processing.
    
- BACKEND
-- `src/`: Contains the source code of the backend, including crucial files such as App.js,Index.js and Auth.js
  - `DB/`: Mongoose connect.
  - `Model/`:  Contains mongodb model.
  - `Routes/`: COntains routes.

### Dependencies

- **React js:** Progressive JavaScript liberary for building user interfaces.
- **Chakra ui:** For icons
- **React-router-dom:** For creating routes
- **Bcrypt:** For hashing password
- **Twitter-api-v2:** For twitter oauth
- **Multer:** For handling multipart/form-data
- **Nodemailer:** For sendimg mails

### Usage

- **Development**
  ```bash
  npm run dev
  ```
  This will start the development server and you can access the application at http://localhost:3000.
- **Build**
  ```bash
  npm start
  ```

### Features

- Approval based posting.
- Automated tweeting.
- Credentials safety.
- Security content management
- Mobile-first design for a responsive user experience.


  
### Screenshots

![Screenshot (73)](https://github.com/VishwasSaini25/twitter/assets/85990875/99c6dbb4-3ecc-44ff-85c2-924b369f3cc7)
![Screenshot (74)](https://github.com/VishwasSaini25/twitter/assets/85990875/6c40f5e9-0dca-45b7-875a-14909ae0bad1)
![Screenshot (75)](https://github.com/VishwasSaini25/twitter/assets/85990875/aff4ec61-f58a-49ab-af1a-f78d7549862e)
![Screenshot (76)](https://github.com/VishwasSaini25/twitter/assets/85990875/ecf1f941-7c90-4516-94bd-e8ad7dfb634e)
![Screenshot (77)](https://github.com/VishwasSaini25/twitter/assets/85990875/9aa3524e-0282-46a6-8335-52093d61e307)
![Screenshot (78)](https://github.com/VishwasSaini25/twitter/assets/85990875/3638d8aa-0d76-49dd-a813-42e316aa8b6a)
![Screenshot (79)](https://github.com/VishwasSaini25/twitter/assets/85990875/910a254c-3d7b-4915-ac11-23af4241f186)
![Screenshot (80)](https://github.com/VishwasSaini25/twitter/assets/85990875/7541311d-0a4d-433d-96dd-8032bc8dd58a)
![1709224086709](https://github.com/VishwasSaini25/twitter/assets/85990875/d0bb684f-c4bf-4115-9d62-d4a86a7e29a2)



### Contributing

We welcome contributions! Feel free to submit issues and pull requests.

- Fork the repository.
- Create a new branch: `git checkout -b feature-name`.
- Make your changes and commit: `git commit -m 'Add feature'`.
- Push to the branch: `git push origin feature-name`.
- Open a pull request.

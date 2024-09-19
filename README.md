<!-- ABOUT THE PROJECT -->

## About The Project

ChatRoom is my personal project, focusing on real-time communication. The
application allows users to create and join rooms to engage in conversations
with others in real-time. In ChatRoom, you can manage various aspects of
communication and provide users with a space to share their thoughts and discuss
different topics.

In this personal project of mine, it's important to acknowledge that there may
be bugs and areas where improvements are needed. _In the world of programming,
as in any creative endeavour, the pursuit of flawless perfection can be a highly
demanding endeavour._

### Project Goals

- Implement JWT-authentication
- Understand how Socket.io works
- Learn more React, CSS, Node.js, Express.js and SQL

### Built With

- [![React][React-io]][React-url]
- [![Node.js][Node.js-io]][Node.js-url]
- [![PostgreSQL][PostgreSQL-io]][PostgreSQL-url]
- [![Socket.io][Socket.io-io]][Socket.io-url]
- [![Express.js][Express.js-io]][Express.js-url]

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Before you can get started, you should have [Node.js][Node.js-url] and
[PostgreSQL][PostgreSQL-url] installed.

1. Clone the repository
   ```sh
   git clone https://github.com/sambbaahh/chatroom.git
   ```
2. Navigate to the project's root directory
   ```sh
   cd chatroom
   ```

#### Server Installation:

3. Navigate to the project's server directory
   ```sh
   cd server
   ```
4. Install project dependencies
   ```sh
   npm install
   ```
5. Create .env file
   ```sh
   PGUSER="YOUR_POSTGRESQL_USER"
   PGPASSWORD="YOUR_POSTGRESQL_PASSWORD"
   PGHOST="YOUR_POSTGRESQL_HOST_NAME"
   PGPORT=YOUR_POSTGRESQL_PORT
   PGDATABASE="YOUR_POSTGRESQL_DATABASE"
   ADMINPASSWORD="PASSWORD_FOR_ADMIN_USER"
   ```
6. Generate public and private keypair for authentication
   ```sh
   node generateKeyPair.js
   ```
7. Start in development mode (nodemon)

   ```sh
   npm run dev
   ```

   OR

   Start in production mode

   ```sh
   npm start
   ```

   **At startup, the server will automatically create the database if it does
   not exist.**

#### Client Installation:

8. Open a new terminal window/tab
9. Navigate to the project's client directory
   ```sh
   cd client
   ```
10. Install project dependencies

```sh
npm install
```

11. Start the development server

```sh
npm run dev
```

After following the installation steps, open your web browser and go to
http://localhost:5173 to view the React project. _Additionally, there is
possibility to create a build of the React code and deploy it alongside the
backend on the server._

With these steps, you have set up the server and client portions of the ChatRoom
application. The server should be running on one terminal window/tab, and the
client should be running on another.

<!-- EXAMPLES -->

## Example with two user (Local environment)

[![Youtube video][Youtube-img]][Youtube-url]

## Example with two user (Cloud environment)

[![Youtube video][Youtube-img2]][Youtube-url2]

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to
learn, inspire, and create. Any contributions you make are **greatly
appreciated**.

If you have a suggestion that would make this better, please fork the repo and
create a pull request. You can also simply open an issue with the tag
"enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Sami Kukkonen - [LinkedIn][Linkedin-url] - samikukkonen00@hotmail.com

Project Link: https://github.com/sambbaahh/chatroom

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

[Mantine - Amazing UI library for React](https://mantine.dev/)

[JWT + Passport.js + Node.js Tutorial](https://www.youtube.com/watch?v=Ne0tLHm1juE&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=10)

<!-- MARKDOWN LINKS & IMAGES -->

[Linkedin-url]: https://www.linkedin.com/in/sami-kukkonen7
[Node.js-url]: https://nodejs.org/en
[Node.js-io]:
  https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[React-url]: https://react.dev
[React-io]:
  https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[PostgreSQL-io]:
  https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Socket.io-url]: https://socket.io/
[Socket.io-io]:
  https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white
[Express.js-url]: https://expressjs.com/
[Express.js-io]:
  https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Youtube-img]:
  https://github.com/sambbaahh/chatroom/assets/99816212/843c8eb2-123c-4bb0-a001-19d2995d717a

[Youtube-img2]: [Youtube-url]: https://youtu.be/d4yun_H47BE?si=VdTB6f606taDXdzx
[Youtube-url2]: https://youtu.be/s-u0NEPJ8Aw?si=VOsJebjkzPgbBIW_

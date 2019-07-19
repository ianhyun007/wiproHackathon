This is simple Angular application which contains most of the Angular as a base to build and enhance further.

Following are the major features :

 - NgRx (Redux pattern)  for login statement management
 - WebRTC protocol (Javascript APIs) to create video/audio realtime Communication (chatting)
 (Socket.io was used to provide the chatting mechanism)
 - NodeJS / Express.js as a server to manage connection with MongoDB and uploading image data
 Socket was used to exchange information needed to create realtime communication
 - Firebase authentication / database services for user management
 - MongoDB for actual data storage
 - Various Angular Material features (including responsiveness)
   * Mat-Card, Mat-table(pagination, filtering, sorting..), Mat-Button-Toggle, Mat-Dialog...
 - Angular Animation was added to show taste of animated 
 - 3rd Party GreenSock Javascript library for dragging feature
 - HTML5 video element
 - Various Angular fundamentals : Routing (nested routing), Form (template / reactive with validation),
 Services, Data bindings, RxJs Observable / operations.


INSTRUCTIONS
 1. once downloaded/cloned, npm install
 2. start server : node server.js (both MongoDB and Firebase are cloudbased)
 3. start client : ng serve

 * must login to have access
 ** please signup, login and out, navigate between buttons to see the different listings
 
WebRTC Chatting
 1. open up 2 browsers
 2. on first browser, click the upper right 24/7 image button
 3. on the other browser, click the same image, then you will be able to see each other's face
 4. PLEASE MAKE SURE THE VIDEO IS CLICKED AND DRAGGED TO BE MOVED AROUND THE SCREEN

To Login, credential of 
  test@test.com / 123456
can be used
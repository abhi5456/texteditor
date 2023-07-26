# texteditor

## Available Scripts
In the project directory, you can run:

### `npm install`

Runs the npm installer to install any packages that might not be there

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `node server.js`

Runs the server on port 8000.\
If you already have something in that port, you can change the port number.\
If you make any changes to server.js you will need to restart the server
to see the changes. 


Architecture Details:
- Frontend built using react
    - enables responsive user interface with easy state managment
- Backend using Node.js and Websocket
    - enables real time communication

I used node.js because it is scalable and has good communication with websocket connections.

I used websockets becuase there are better communication channels for it under a single TCO connection. This means that there can be a low-latency update sent between the server and the text editors to enable real time collaboration.


Tradeoffs:
- There are alot of synchronization issues that can occur such as concurrent editing and conflicts during the editing. This would require more careful considerations of what should be done in each case.
- There is also some network considerations that should be done when developing this product further as there should be optimizations to decrease latency and have efficient data transfer/
- Testing on different browsers and Wifi speeds, choose to go with chrome and good wifi speeds


Given more time:
- add scalability features such as distibuting the load across multiple servers or adding microservices
- have more conflict resolution features/include and AI that would be able to choose the best fit
- adding indicators to what the users are doing, such as where the cursor is, if the user is on the page, ect.
- adding offline editing and using AI to combine the texts when online
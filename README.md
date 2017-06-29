# cvrcle.io
C-V-R-C-L-E --> Make your circles come full circle. 

## Getting Started
1) `npm install && npm install -g webpack webpack-dev-server && npm install -g knex`

2) `knex migrate:latest` sets up all your tables and relations
	
	** If the migration complains, go create an empty schema in MySQL that corresponds to the name of the schema you've decided to set as the 'MYSQL_DEV_DB' variable in .env and try again

3) `knex seed:run` automatically seeds your database with relevant data to get up and running/testing. 

4) Check in 'migrations' to see the way the foreign key relations and cascading deletions work in the database.
	
	- When you delete a user, all their itineraries and engtries automatically delete
	- When you delete an itinerary, all entries belonging to that itinerary are deleted
	- This relational model is all 1 to many/many to 1. There are no many to many relationships
	- This is called a "bottom-up" relational model

3 Open up two terminals

4) In terminal one: `npm start`

5) In terminal two: `npm run dev`

That should be enough to get you up and running. 

Tech used:

- Node

- Express & some middleware (see server.js)

- Objection + Knex (ORM)

- React

- React Router

- Redux

- Thunks

- Google Maps API

- SemanticUI-React

- React-BootStrap

- WebPack / WebPack Dev Server w/ hot reload + WebPack Dashboard

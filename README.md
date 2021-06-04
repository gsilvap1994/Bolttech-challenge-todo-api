# Bolttech Challeng TODO Api

## Dependencies

- Docker Compose
- Npx
- NodeJS


# Running the project

`npm i`

- Install the dependecies and store in *node_modules/* path


`npm run db:up`

- This command will mount the mysql database and turn the db ready for connections

`npx knex migrate:latest`

- Create the database tables and relationships

`npm start`

- Runs the project and gets ready for the REST API calls
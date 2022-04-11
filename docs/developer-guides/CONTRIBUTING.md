# Contributing to Resilience Indicator

:tada: Welcome to the Resilience Indicator! This document should help you get started contributing.

## Communication Channels

The primary forum for technical and architectural discussion is GitLab issues and merge requests. Gitlab issues can be used for bug tracking, feature requests, architectural proposals and general questions. Merge requests are used for code review and discussion of specific proposed changes. Discussion in issues and merge requests (MRs) should include deep context, such that new contributors in the future can explore past discussions and fully understand the context.

## Getting Started as a Contributor

### Environment setup

#### Create the production database in AWS
- Sign in to the AWS Management Console and open the Amazon RDS console
- In the upper-right corner of the Amazon RDS console, choose the AWS Region in which you want to create the DB instance.
- In the navigation pane, choose "Databases".
- Choose "Create database".
- In "Choose a database" creation method, select "Standard Create".
- In Engine options, choose the engine type: MySQL
- The Edition will only have one option: MySQLCommunity. Leave it this way.
- Choose the latest version of MySQL
- Choose the desired template (Production, Dev/Test, or Free Tier), and the corresponding desired Availability and durability options. 
  - You will want to choose the Free Tier option if you don't want to pay monthly expenses. Please read the "Estimated Monthly Costs" section at the bottom to see what the Free Tier provides.
- In settings, choose "inl_database" for the Database instance.
- Enter credentials for the master username and password. Make sure to keep a record of this information so you can connect to the DB instance later
- For the remaining sections, specify your DB instance settings.
- Choose "Create database".
  - To view the master user name and password for the DB instance, choose View credential details on the Databases page.
- For "Databases", choose the name of the new DB instance you created.
  - On the RDS console, the details for the new DB instance appear. The DB instance has a status of Creating until the DB instance is created and ready for use. When the state changes to Available, you can connect to the DB instance. Depending on the DB instance class and storage allocated, it can take several minutes for the new instance to be available.
  - You can edit the Inbound Rules by clicking on the Security Group with the type "Inbound". It's default is to allow all traffic.
- In `resilience-indicator-backend/src/config/config.json`, you will need to update the information for `production`.
  - The `username` and `password` should be the specified master username and master password you chose.
  - The `database` should be left as "inl_db"
  - The `host` should be the Endpoint of the database instance you created, which can be found when you click on the database instance on the Databases page. It should start with "inl-database" and end in "rds.amazonaws.com".
  - The `dialect` should be left as "mysql".
  - The `logging` should be left as false.

#### Backend

- Inside of the `resilience-indicator-backend` directory run `npm install` to install the node module dependencies.
- You can start the server by running `npm start`.
- Note: Upon making changes, you do not need to restart the server. We are using `nodemon` to watch for saved changes and restart the server automatically.
- You will need to export the following environment variables: `DB_ENV`, `SENDGRID_API_KEY`, and `SENDGRID_FROM_EMAIL` (e.g. `export SENDGRID_FROM_EMAIL='$senderEmail'`).

> :warning: **IMPORTANT**: Please follow this [section](#setup-sendgrid) to generate a SendGrid API Key if you don't already have one.

> :warning: **IMPORTANT**: Please follow this [section](#setup-local-db) to get a localhost test db server running.

#### Frontend

- Inside of the `resilience-indicator` directory run `npm install` to install the node module dependencies.
- You can start the frontend react app by running `npm start`.
- You can now migrate to `http://localhost:<frontend-port>` to view the application.

#### Setup SendGrid
1. Create a free account with [SendGrid](https://signup.sendgrid.com/).
    - Please use whatever email you'd like to act as an administrator of the application to sign up. However, you *can* use another email and add the admin email later as another authenticated sender.
    - If it asks for what type of application, then choose: "Node.js". You don't need to follow any of the steps to actually running the test they propose you do from the application. You can simply skip past those parts as we have already verified integration from the app with SendGrid on our own.
    - IMPORTANT: we require the API_KEY that gets generated for your account. Once generated, please save it to a secure location to be exported as an environment variable later to run the application.

2. Once the account is created follow the steps [here](https://docs.sendgrid.com/ui/sending-email/sender-verification) to create a single sender identity using the administrator email you'd like.

3. Once that sender shows as "verified" in SendGrid's UI you will be able to send emails using that email.

#### Setup local db

1. Ensure you have docker installed on your system.
2. Run `make local-db-<OS>` to create and run the docker mysql server and seed it with some data.
3. You can delete the docker mysql server with `make destroy-local-db`
4. You can connect to the server directly if you have mysql client avaiable with `mysql -uroot -ppass -h localhost -P 3306 --protocol=tcp`

#### Setup production db

1. Configure correct credentials in `resilience-indicator-backend/src/config/config.json` for `production`.
2. Run `npx sequelize db:create --env production` to create the `inl_db` database.
3. Run `npx sequelize db:migrate --env production` to run migrations.
4. Run `npx sequelize db:seed:all --env production` to run seeders.
## Database changes

### How to create a migration

Migrations are used to version control changes to the database.

1. Create a new migration and name it appropriately.

```
npx sequelize-cli migration:generate --name <name_the_change>
```

2. Edit the migration file generated to suit the need. The file will include an `up` and `down` function. The `up` function should make the change. The `down` function should reverse the change. That way you can rollback changes if needed.

3. Next upate the model files to match the changes (add new fields, modify types, etc).

4. Run the migration to see the changes reflected.

```
npx sequelize-cli db:migrate
```

### How to create a seed file

Seed files are used to populate database tables with sample or test data.

1. Create a new seed and name it appropriately.

```
npx sequelize-cli seed:generate --name <name_the_seed>
```

2. Edit the seed file generated to suit the need. The file will include an `up` and `down` function. These functions follow the same semantics as the migration files.

3. Run the seeding files to populate the table(s).

```
npx sequelize-cli db:seed:all
```

## Release management

### How to release

#### Release steps
1. Ensure you are on the main branch containing the latest changes of the upstream repository.
2. Update the version in `resilience-indicator-backend/package.json` file following [semantic versioning guide](https://semver.org/). You can run `make version` to verify the version update.
3. From the base directory run `make build` to build the frontend and store it in the backend directory. 
4. Push changes to the `release` branch ensuring to include the `resilience-indicator-backend/src/build` directory (which is usually gitignored - hence the use of a release branch).
- Note: If you are using an VM that has more than 4Gi of memory available you could also just run the `make build` from the machine and not worry about using the release branch.
5. Create a [new GitLab release](https://docs.gitlab.com/ee/user/project/releases/#create-a-release). Set the `Tag version` and `Release title` to be the same as the version label generated from running `make version` after you've updated the version in step 2. The content of the release should have the following format:
```
# Changelog

_changes since $PREVIOUS_TAG_:

Paste output of:

    git log --pretty='%s' $PREVIOUS_TAG..HEAD | sed 's/^/- /'
```
6. To create a new ec2 instance:
- Navigate to the AWS console and launch a new linux instance
- Download the pem file and store in your `.ssh` directory
- Then ssh to the ec2 instance `ssh -i <pem-file-name>.pem ec2-user@<public-dns>`
- Install Git with `sudo yum install git`
- Install node version manager with `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
- Activate nvm with `. ~/.nvm/nvm.sh`
- Install node with `nvm install <version>` (e.g. `nvm install 16.13.0`). You can get the version of node that you want by running `node -v` from a terminal localhost.
- Install latest version of npm with `npm install -g npm@latest`
- Git clone the repository, cd into backend directory, and run `npm install` to install node modules.
- Install `forever` with `npm -g install forever`
- Change directory to the `resilience-indicator-backend` directory.
- Run `export DB_ENV=production`
- Run commands to export needed SendGrid environment variables: `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` (e.g. `export SENDGRID_API_KEY='$apiKey'`)
- Ensure you can run it with `npm run run-prod`. Install any missing modules. Then stop the process.
- Then run `forever start -c "node src/server.js" .` to start the server and keep it running forever.
- Then map port 80 to port 8000 so that we access our app at the default http port: `sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000`
- Ensure you add an inbound rule that allows http traffic to the new ec2 instance security group.
7. If using a pre-existing instance: ssh to the pre-existing ec2 instance, pull the new release changes with git from the `release` branch.
- Stop the existing processes. You will need to stop the forever monitor process first and then kill the node process. You can discover the pids with `ps aux | grep node`. Then you can use `kill <pid_forever> <pid_node>`.
- Ensure the iptables preroute is stil in tact with `sudo iptables -t nat -L -n -v`
- Kick off the new process with the new release code using `forever start -c "node src/server.js" .` from the `resilience-indicator-backend` directory. 
8. Don't forget to commit upstream to the main branch the version bumps that were made during the release. You can remove the build directory when pushing to main. **Do not forget to remove any secrets before committing**.

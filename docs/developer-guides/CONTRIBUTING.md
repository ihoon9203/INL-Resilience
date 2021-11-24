# Contributing to Resilience Indicator

:tada: Welcome to the Resilience Indicator! This document should help you get started contributing.

## Communication Channels

The primary forum for technical and architectural discussion is GitLab issues and merge requests. Gitlab issues can be used for bug tracking, feature requests, architectural proposals and general questions. Merge requests are used for code review and discussion of specific proposed changes. Discussion in issues and merge requests (MRs) should include deep context, such that new contributors in the future can explore past discussions and fully understand the context.

## Getting Started as a Contributor

### Environment setup

#### Backend

- Inside of the `resilience-indicator-backend` directory run `npm install` to install the node module dependencies.
- You can start the server by running `npm start`.
- Note: Upon making changes, you do not need to restart the server. We are using `nodemon` to watch for saved changes and restart the server automatically.

> :warning: **IMPORTANT**: Please follow this [section](#setup-local-db) to get a localhost test db server running.

#### Frontend

- Inside of the `resilience-indicator` directory run `npm install` to install the node module dependencies.
- You can start the frontend react app by running `npm start`.
- You can now migrate to `http://localhost:<frontend-port>` to view the application.

#### Setup local db

Here are some useful commands to get a mysql server started localhost if using a macOS.
```
brew install mysql  # install mysql locally
mysql.server start  # start server
mysql -u root       # note that the root will have blank password
mysql.server stop   # stop server
```

...

## Release management

### How to release

#### Release steps
1. Ensure you are on the main branch containing the latest changes of the upstream repository.
2. Update the version in `resilience-indicator-backend/package.json` file following [semantic versioning guide](https://semver.org/). You can run `make version` to verify the version update.
3. From the base directory run `make build` to build the frontend and store it in the backend directory. 
4. Push changes to the `release branch`.
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
- Ensure you can run it with `npm run run-prod` (install any missing modules)
- Then run `forever start -c "node src/server.js" .` to start the server and keep it running forever
- Then map port 80 to port 8000 so that we access our app at the default http port: `sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000`
- Ensure you add an inbound rule that allows http traffic to the new ec2 instance security group.

7. Otherwise, ssh to the pre-existing ec2 instance, pull the new release changes with git, stop existing process and kick off the new one. 
8. Don't forget to commit upstream to the main branch the version bumps that were made during the release. You can remove the build directory when pushing to main. **Do not forget to remove any secrets before committing**.

VERSION ?= v$(shell cat ./resilience-indicator-backend/package.json | jq -r '.version')

# --- CI ---
version:
	@echo $(VERSION)

build: version # create frontend build and move to backend
	@cd ./resilience-indicator/ \
		&& npm run build \
		&& cp -r ./build ../resilience-indicator-backend/src/

lint:
	@echo "Checking frontend code..." \
	  && cd ./resilience-indicator/ \
		&& node_modules/eslint/bin/eslint.js .
	@echo "Checking backend code..." \
	  && cd ./resilience-indicator-backend/ \
		&& node_modules/eslint/bin/eslint.js .
	@echo "No linting errors!"

local-db-darwin: # create a local mysql docker db server and seed it
	@docker run --rm --name=resilience --env MYSQL_ROOT_PASSWORD=pass --detach --publish 3306:3306 mysql:5.7.24 \
	 && sleep 10
	@(cd resilience-indicator-backend/src/ && sequelize db:create && sequelize db:migrate && sequelize db:seed:all)

local-db-windows: # create a local mysql docker db server and seed it
	@docker run --rm --name=resilience --env MYSQL_ROOT_PASSWORD=pass --detach --publish 3306:3306 mysql:5.7.24 \
	 && timeout 10
	@(cd resilience-indicator-backend/src/ && npx sequelize-cli db:create && sequelize db:migrate && sequelize db:seed:all)

destroy-local-db: # destroy the local mysql docker db server
	@docker kill resilience

seed-production-db: # seed the production db
	@DB_ENV=production node ./resilience-indicator-backend/src/dbseed.js
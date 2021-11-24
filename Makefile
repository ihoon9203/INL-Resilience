VERSION ?= v$(shell cat ./resilience-indicator-backend/package.json | jq -r '.version')

# --- CI ---
version:
	@echo $(VERSION)

build: version
	@cd ./resilience-indicator/ \
		&& npm run build \
		&& cp -r ./build ../resilience-indicator-backend/src/
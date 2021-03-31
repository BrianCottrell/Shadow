NAME = phone_book

.PHONY: all
all: build

.PHONY: node_modules
.SILENT: node_modules
node_modules:
	yarn

.PHONY: build
.SILENT: build
build: node_modules
	dfx canister create --all
	dfx build

.PHONY: install
.SILENT: install
install: build
	dfx canister install --all

.PHONY: redeploy
.SILENT: redeploy
redeploy: build
	dfx canister install --all --mode reinstall
	echo "http://localhost:8000/?canisterId=$(dfx canister id ww)"

.PHONY: upgrade
.SILENT: upgrade
upgrade: build
	dfx canister install --all --mode=upgrade

.PHONY: clean
.SILENT: clean
clean:
	rm -fr .dfx
	rm -fr node_modules

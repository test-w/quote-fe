# Sponsored Quote Frontend

This frontend can be used as a widget in an `<iframe>` to show a quote along with the name of a sponsor.

The sponsor name is defined by the environment variable: `QUOTE_SPONSORED_BY`.
The quotes are provided via a `/quotes` endpoint which is expected to serve a random quote in the following format:
```
{
  text: "QUOTE TEXT",
  author: "QUOTE AUTHOR"
}
```
The quotes webservice can be configured via the `QUOTE_SERVER_NAME` environmental variable.

By default, this container serves on port `8080`. However, this can be configured via the `PORT` environmental variable.

## Running Locally
Assuming the quotes server is running on localhost on port `3001`, and the sponsor name is "Sponsor", the frontend can be run locally with the following command in the root of the repository.
```
QUOTE_SERVER_NAME="localhost:3001" QUOTE_SPONSORED_BY="Sponsor" node index.js
```
The frontend can be accessed in a browser with the following URL:
```
http://localhost:8080/
```
## Building & Running the Docker Image
To build the docker image, use the following command in the root of the repository:
```
docker build .
```
Assuming the webservice providing quotes is running on port `3001`, the docker image can be run with the following command:
```
docker run \
	-p8080:8080 \
	-e QUOTE_SERVER_NAME="localhost:3001" \
	-e QUOTE_SPONSORED_BY="Sponsor" \
	--name quote-fe \
	quote-fe
```
The container can be stopped with the following command:
```
docker stop quote-fe
```

# Gas Price API

With the Gas Price API, you can obtain the current Propose Gas Price and Fast Gas Price for Polygon's blockchain network. This API was developed with Node.js and Express, and it utilizes Axios for HTTP requests.

## Setup

Before using the Gas Price API, please ensure that you have a valid API key for Polygon's network. You can obtain this key from the PolygonScan website.

After obtaining your API key, please export it as a named constant in a config.js file. Refer to the example file config.example.js.

Finally, install the dependencies with npm install and run the server with npm start.

## Usage

The Gas Price API has one endpoint: /get-data. This endpoint returns a JSON object with the current Propose Gas Price and Fast Gas Price (in Gwei) for Polygon's network.

To use this endpoint, make a GET request to http://localhost:3000/get-data. For production use, please replace http://localhost:3000 with the appropriate domain name.

## Examples

### GET /get-data

Response:

{
"proposeGasPrice": "54",
"fastGasPrice": "81"
}

## 📄 License

This project is licensed under the [GNU General Public License](https://github.com/ColaborateBC/polygon-gas-tracker-alert/blob/main/LICENSE).

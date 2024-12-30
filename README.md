# Weather API

A simple RESTful API to fetch and cache weather information for a given city using OpenWeatherMap and Redis. This project includes rate limiting and caching mechanisms to enhance performance and reliability.

https://roadmap.sh/projects/weather-api

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Introduction

The Weather API provides weather information for a specified city using data from the OpenWeatherMap API. It includes caching to reduce redundant API calls and rate limiting to prevent abuse.

## Features

- Fetch weather data for a city using OpenWeatherMap.
- Cache weather data using Redis for improved performance.
- Rate limiting to handle excessive requests from a single client.
- Centralized error handling for better debugging.

## Technologies Used

- **Node.js**
- **Express.js**
- **Redis** for caching
- **Axios** for making HTTP requests
- **dotenv** for environment variable management
- **express-rate-limit** for rate limiting

## Installation

1. Clone the repository:

    
bash
    git clone https://github.com/yourusername/weather-api.git


2. Navigate to the project directory:

    
bash
    cd weather-api


3. Install the dependencies:

    
bash
    npm install


4. Set up the environment variables by creating a .env file in the root directory and adding the following:

    
env
    API_KEY=your-openweathermap-api-key
    PORT=your-port


## Configuration

- **API Key**: Obtain an API key from [OpenWeatherMap](https://openweathermap.org/) and set it in the API_KEY field in the .env file.
- **Redis**: Ensure Redis is installed and running on your system.
- **Port**: Specify the port in the .env file, or the server defaults to port 3000.

## Usage

1. Start the server:

    
bash
    npm start


2. The API will run at http://localhost:3000 (or the configured port).

## API Endpoints

### Fetch Weather Data

- **URL**: /api/weather/:city
- **Method**: GET
- **Rate Limiting**: A maximum of 10 requests per minute per IP address.
- **Response**: 
  - If data is served from cache: { "source": "cache", "data": {...} }
  - If data is fetched from the API: { "source": "api", "data": {...} }

## Examples

- **Fetch weather for a city**:

    
bash
    curl -X GET http://localhost:3000/api/weather/London


    **Response**:
    
json
    {
      "source": "api",
      "data": {
        "weather": [
          {
            "description": "clear sky",
            "icon": "01d"
          }
        ],
        "main": {
          "temp": 25.7,
          "feels_like": 27.3,
          "humidity": 65
        },
        "name": "London"
      }
    }


- **Cached response**:
  The second request within 12 hours will return:
  
json
  {
    "source": "cache",
    "data": {
      "weather": [
        {
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "main": {
        "temp": 25.7,
        "feels_like": 27.3,
        "humidity": 65
      },
      "name": "London"
    }
  }


  ## Troubleshooting

### Common Issues and Solutions

1. **Redis is not running**
   - Ensure Redis is installed and running. Start the Redis server using:
     ```bash
     redis-server
     ```

2. **API Key issues**
   - Verify your OpenWeatherMap API key is correct and active. Check the `.env` file for proper configuration.

3. **Rate limit exceeded**
   - If you hit the rate limit, wait a minute before making additional requests. To customize rate limiting, adjust the configuration in the `express-rate-limit` middleware.

4. **CORS errors**
   - If using the API in a frontend application and encountering CORS errors, ensure the appropriate headers are set in the server.

5. **Server not starting**
   - Check for missing or invalid dependencies by running:
     ```bash
     npm install
     ```
   - Verify the `.env` file is correctly set up.

## Contributors

- [Rahul Rasal](https://github.com/Rahul-Rasal) 

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! 🎉

# Tourist API

## Overview
The Tourist API allows users to manage a collection of tourist spots in Pakistan. It provides functionality to add, retrieve, and search for tourist spots based on various criteria, including name, location, and category. The API also supports image uploads for each tourist spot using Cloudinary.

## Features
- **Add Tourist Spot**: Store new tourist spots with details such as name, location (province, district, country), category, and an image.
- **Retrieve All Tourist Spots**: Get a list of all tourist spots available in the database.
- **Get Tourist Spot by ID**: Retrieve detailed information about a specific tourist spot using its ID.
- **Search Tourist Spots**: Search for tourist spots by name, province, or category.
- **Delete Tourist Spots**: Delete  tourist spots by id.

## API Endpoints

### 1. Add Tourist Spot
- **POST** `/api/tourist-spots`
- **Description**: Adds a new tourist spot.
- **Request Body**:
  ```json
  {
      "name": "Fairy Meadows",
      "province": "Gilgit-Baltistan",
      "district": "Diamer",
      "country": "Pakistan",
      "category": "mountain",
      "image": "<image file>" // uploaded file
  }

## API Endpoints

### 1. Add Tourist Spot
- **POST** `/api/tourist-spots`
- **Description**: Adds a new tourist spot.
- **Response**:
  - **200**: Spot added successfully.
  - **400**: Bad request (e.g., missing fields, invalid file).

### 2. Get All Tourist Spots
- **GET** `/api/tourist-spots`
- **Description**: Retrieves all tourist spots with optional pagination.
- **Query Parameters**:
  - `page`: (optional) The page number to retrieve. Default is `1`.
  - `limit`: (optional) The number of spots to return per page. Default is `10`.

- **Response**:
  - **200**: 
    - Description: List of tourist spots.
    - Body:
      ```json
      {
        "totalSpots": number,          // Total number of tourist spots
        "totalPages": number,          // Total number of pages
        "currentPage": number,         // Current page number
        "spots": [                     // Array of tourist spots
          {
            "location": {
              "province": "string",
              "district": "string",
              "country": "string"
            },
            "_id": "string",
            "name": "string",
            "image": "string",
            "category": "string",
            "createdAt": "string",
            "updatedAt": "string"
          }
        ]
      }
      ```
  - **404**: No spots added yet.
  - **500**: Error retrieving tourist spots.


### 3. Get Tourist Spot by ID
- **GET** `/api/tourist-spots/:id`
- **Description**: Retrieves a tourist spot by its ID.
- **Response**:
  - **200**: Tourist spot found.
  - **404**: Tourist spot not found.
  - **500**: Error retrieving the tourist spot.

### 4. Search Tourist Spots
- **GET** `/api/spot/search`
- **Description**: Searches for tourist spots based on query parameters.
- **Query Parameters**:
  - `query`: Search term for name, province, or category.
- **Response**:
  - **200**: List of matching tourist spots.
  - **500**: Error searching tourist spots.

### 5. Delete Tourist Spot
- **DELETE** `/api/tourist-spots/:id`
- **Description**: Deletes a tourist spot by its ID.
- **Response**:
  - **200**: Tourist spot deleted successfully.
  - **404**: Tourist spot not found.
  - **500**: Error deleting the tourist spot.


## File Upload
The API uses Cloudinary to store images. Images must be in JPEG, PNG, or GIF format and should not exceed 1MB in size.
## Error Handling
The API responds with appropriate HTTP status codes and error messages for invalid requests or server issues.

## Installation and Setup
1. Clone the repository.
2. Install the required packages:

   ```bash
   npm install express mongoose express-fileupload cloudinary


## API Documentation
For detailed API documentation, please refer to the [Postman Documentation](https://documenter.getpostman.com/view/25664365/2sAXqs8hnf).


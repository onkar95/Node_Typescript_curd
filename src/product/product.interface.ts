export interface Product {
    "id": String, // Unique identifier for the product
    "productName": String, // Name of the product
    "productDescription": String, // Description of the product
    "price": Number, // Price of the product
    "category": String, // Category of the product
    "stockQuantity": Number, // Quantity of the product in stock
    "createdAt": Date, // Timestamp when the product was created
    "updatedAt": Date // Timestamp when the product was last updated
}


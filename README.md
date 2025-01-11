# E-commerce Frontend

This is a modern e-commerce website for AutoMobile Sale frontend built with React, Vite, and Tailwind CSS. The project provides a user-friendly interface for browsing about, categories, vehicles, managing a vehicle cart, and handling user authentication. It also includes an admin dashboard for managing users, vehicle categories, vehicles, and orders.

## Features

- User authentication (login and signup)
- Browse products with pagination
- Add products to the cart
- Checkout process
- Admin dashboard for managing users, vehicle categories, vehicles, and orders
- Responsive design

## Technologies Used

- **React 18**: A JavaScript library for building user interfaces
- **Vite**: A fast build tool for modern web projects
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development

## API Endpoints

The frontend communicates with a backend API to perform various operations. Here are some of the key endpoints:

- **User Authentication**:
  - `POST /login`: User login
  - `POST /register`: User registration
- **Products**:
  - `GET /products`: Fetch products with pagination
  - `POST /products`: Create a new product (admin only)
  - `PUT /products/:id`: Update a product (admin only)
  - `DELETE /products/:id`: Delete a product (admin only)
- **Categories**:
  - `GET /categories`: Fetch categories
  - `POST /category`: Create a new category (admin only)
  - `PUT /category/:id`: Update a category (admin only)
  - `DELETE /category/:id`: Delete a category (admin only)
- **Orders**:
  - `GET /orders`: Fetch orders (admin only)
  - `PUT /orders/:id/status`: Update order status (admin only)
  - `DELETE /orders/:id`: Delete an order (admin only)
- **Cart**:
  - `GET /cart`: Fetch cart items
  - `POST /cart`: Add items to the cart
  - `DELETE /cart/:id`: Remove an item from the cart

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



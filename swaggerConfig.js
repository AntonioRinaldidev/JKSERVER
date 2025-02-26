const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "JKSERVER API documentation",
    },
    servers: [
      {
        url: "http://localhost:4000", // Update with your actual base URL
      },
    ],
  },
  apis: ["./Routes/*.js"], // Path to the API routes for documentation
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;

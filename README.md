# Travlr Getaways — CS 465 Full Stack Development

## Architecture

For Travlr Getaways, I used Express and Handlebars to render the customer-facing travel pages, while JavaScript handled the routes, controllers, and API logic behind them. The Angular single-page application (SPA) works differently because administrators can view, add, edit, and delete trips without reloading the entire page. Angular made the administration side more interactive, but connecting its components and services to the Express API took more configuration than I expected. I used MongoDB because the travel packages fit naturally into document-based records. Mongoose also let me define required fields and validate trip data while keeping the database structure relatively straightforward.

## Functionality

JavaScript is a programming language used to build application behavior, while JSON is a text format used to exchange data. In Travlr, the Express API returns trip information as JSON, and Angular's `HttpClient` uses that data to populate the administration interface. When an administrator adds or edits a trip, the updated information goes back through the API to MongoDB. I improved the organization of the project by separating routes from controllers and putting Angular's API requests into a shared `TripData` service instead of handling them separately in each component. The reusable `TripCard` component also keeps the trip listing consistent and makes changes easier because I don't have to repeat the same interface code for every trip.

## Testing

I used GET requests to retrieve trips, POST to create them, PUT to update them, and DELETE to remove them. Each method works through a specific REST API endpoint, and tools such as Postman helped me check responses and confirm that changes persisted in MongoDB. Adding security made testing more complicated because the API now requires a valid JSON Web Token (JWT) and administrator authorization for changes to trip records. A request without a token should return 401 Unauthorized, while a signed-in user without administrator privileges should be denied access. I verified the 401 response and confirmed that my administrator account could still update trips. I also had to correct Angular unit tests that weren't configured for the HTTP service and expected navigation links to appear when nobody was logged in. After those changes, all 22 Angular tests passed.

## Reflection

This course helped me understand how the pieces of a full-stack application work together instead of treating the frontend, backend, and database as separate projects. I gained experience with Express routing, Handlebars, MongoDB, Mongoose, REST APIs, Angular components and services, authentication, and testing. Troubleshooting API connections and authentication issues was probably the most challenging part, but it taught me how to identify where a problem was happening instead of changing code at random. Being able to build, test, and debug a complete application gives me more practical experience to bring into a software development role.

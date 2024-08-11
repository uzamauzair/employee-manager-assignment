Employee-Manager
Employee-Manager is a monorepo application built using Next.js for the frontend and NestJS for the backend, with MongoDB as the database. The project follows the Atomic Design pattern to ensure a scalable and maintainable structure.

Repository Structure
Frontend Structure
The frontend is built with Next.js, organized according to the Atomic Design principles.

├───e2eTest                      # End-to-End test cases
│   └───employee                 # Employee-related E2E tests
├───environments                 # Environment configurations
├───playwright-report            # Playwright test reports
├───public                       # Public assets
├───src                          # Source code
│   ├───app                      # Next.js app directory
│   │   └───employee             # Employee-related pages
│   │       ├───add              # Add employee page
│   │       ├───edit             # Edit employee page
│   │       │   └───[id]         # Dynamic route for employee ID
│   │       ├───list             # Employee list page
│   │       └───_components      # Components specific to employee pages
│   ├───components               # Atomic design components
│   │   ├───atoms                # Smallest building blocks (e.g., buttons, inputs)
│   │   │   ├───button
│   │   │   ├───dropdownMenu
│   │   │   ├───input
│   │   │   ├───label
│   │   │   ├───loader
│   │   │   ├───radio-group
│   │   │   └───switch
│   │   ├───layout               # Layout components (header, footer, etc.)
│   │   │   ├───footer
│   │   │   └───header
│   │   ├───molucules            # Composed components (e.g., card, table)
│   │   │   ├───alert-dialog
│   │   │   ├───card
│   │   │   ├───pagination
│   │   │   └───table
│   │   ├───organisms            # Complex components (e.g., forms)
│   │   │   └───form
│   │   └───templates            # Page templates combining organisms and molecules
│   ├───config                   # Configuration files
│   ├───functions                # Reusable functions
│   ├───lib                      # Libraries and utilities
│   ├───redux                    # Redux-related files
│   │   ├───actions              # Redux actions
│   │   ├───selectors            # Redux selectors
│   │   ├───slices               # Redux slices
│   │   └───store                # Redux store configuration
│   ├───styles                   # Global styles
│   ├───utils                    # Utility functions
│   └───validators               # Validation schemas (e.g., Yup)
└───test-results                 # Test result outputs



Backend Structure
The backend is built with NestJS and organized to follow best practices for modularity and maintainability.

├───src                          # Source code
│   ├───common                   # Common utilities and shared resources
│   │   ├───classes              # Reusable classes
│   │   ├───constants            # Constant values used across the app
│   │   ├───decorators           # Custom decorators
│   │   ├───dto                  # Data Transfer Objects
│   │   ├───filters              # Exception filters
│   │   ├───helpers              # Helper functions
│   │   ├───interceptors         # Interceptors
│   │   ├───logger               # Logging utilities
│   │   ├───middleware           # Middleware functions
│   │   └───modules              # Shared modules
│   │       ├───cache            # Caching module
│   │       ├───database         # Database module
│   │       └───throttler        # Throttling module
│   ├───config                   # Configuration files
│   │   ├───app                  # App-specific config
│   │   ├───cache                # Cache configuration
│   │   └───database             # Database configuration
│   │       └───mongo            # MongoDB configuration
│   └───modules                  # Feature modules
│       └───employee             # Employee module
│           ├───constants        # Employee-specific constants
│           ├───dto              # Employee DTOs
│           ├───entities         # Employee entities (schemas, models)
│           └───types            # TypeScript types for employee
└───test                         # Test files
    └───stubs                    # Stubs and mocks for testing
        └───employee             # Employee-related test stubs


Getting Started
Backend Setup
1. Navigate to the backend directory:
   cd backend
2. Create a .env file
  Add backend environment variables (e.g., MongoDB connection string, API keys, etc.) in the .env file.
3. Install dependencies:
  npm install
4. Start the backend server:
  npm run start:dev
5. Run backend test cases:
  npm run test

Frontend Setup

1. Navigate to the frontend directory:
  cd frontend
2. Create a .env.local file:
  Add frontend environment variables (e.g., API base URL, public keys, etc.) in the .env.local file.
3. Install dependencies:
 npm install
4. Start the frontend :
 npm run dev
5. Run frontend E2E test cases:
 npm run test:e2e

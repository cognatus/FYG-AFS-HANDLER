# FYG-AFS-HANDLER

**An extensible Node.js service for file processing, storage operations, and metadata management within automated business workflows.**

## Project Overview

FYG-AFS-HANDLER is an independently developed Node.js and Express backend service designed to manage file operations within automated business workflows.

The original implementation handles file uploads, storage operations, file deletion, and database metadata management through a REST API.

It was developed as a complementary component of the FYG-AFS platform, alongside [FYG-AFS-API](https://github.com/cognatus/FYG-AFS-API), which manages administrative operations, business rules, transactions, and reporting.

I plan to continue maintaining and expanding this service as part of the broader FYG-AFS ecosystem, focusing on reliable file processing, configurable storage workflows, and reusable backend integrations.

## Target Users

- Developers building file-processing and automation systems
- Businesses managing recurring document and file operations
- Backend teams integrating file handling into existing applications
- Organizations requiring configurable file storage and processing workflows

## Tech Stack

- **Backend:** Node.js, Express 4, JavaScript
- **Database:** Microsoft SQL Server
- **Database Drivers:** `mssql`, `msnodesqlv8`
- **File Handling:** Formidable, Node.js File System API
- **Architecture:** REST API with filesystem and database integration

## Existing Implementation

The current repository contains backend functionality for:

- Receiving and processing multipart file uploads
- Moving uploaded files into configured local directories
- Registering file metadata in SQL Server
- Deleting individual files and their database records
- Removing groups of files associated with business categories
- Supporting file operations initiated by the main FYG-AFS API

The original implementation uses local filesystem storage and SQL Server for metadata persistence.

Some operations require additional validation, error handling, and modernization before production use.

## API Endpoints

### POST /api/files_transfer

Processes an uploaded file, stores it in the target directory, and registers its metadata in SQL Server.

### PUT /api/files_transfer

Deletes an individual file and its associated database record.

### PUT /api/files_mod

Handles bulk deletion of files associated with a business category and branch.

These endpoints represent the original implementation. Request validation, storage security, and operational reliability are areas of planned development.

## Project Structure

- `controllers/files.js` — File uploads, deletion operations, and metadata persistence
- `routes/api.js` — File-management API endpoints and original database connection configuration
- `app.js` — Express application configuration and middleware
- `bin/www` — HTTP server initialization
- `package.json` — Dependencies and development scripts
- `public/` and `views/` — Original Express scaffolding

## Local Development

The original project was built using Node.js 8.x, npm 5.x, and Microsoft SQL Server.

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure a compatible SQL Server instance.
4. Update the database connection configuration in `routes/api.js` for your local environment.
5. Prepare a local directory for testing file operations.
6. Start the service using `npm start`.

The application listens on port `4000` by default, or on the port specified through the `PORT` environment variable.

This is a backend service and does not provide a dedicated user interface.

The original dependencies and environment require modernization before compatibility with current runtimes can be guaranteed.

## Planned Development Roadmap

### Phase 1 — Backend Modernization

- [ ] Upgrade Node.js, Express, and file-processing dependencies.
- [ ] Refactor database connection management.
- [ ] Externalize application configuration and environment settings.
- [ ] Replace dynamic SQL construction with parameterized queries.
- [ ] Introduce centralized error handling and structured logging.

### Phase 2 — Secure and Reliable File Processing

- [ ] Implement file type and size validation.
- [ ] Add path validation and configurable storage directories.
- [ ] Introduce safe filename handling and collision prevention.
- [ ] Improve consistency between filesystem operations and database records.
- [ ] Implement retry mechanisms and recovery from interrupted operations.
- [ ] Introduce file integrity verification.

### Phase 3 — Extensible Storage Architecture

- [ ] Create a reusable abstraction for storage providers.
- [ ] Refactor local filesystem operations into an independent adapter.
- [ ] Add support for S3-compatible object storage.
- [ ] Implement configurable file retention and cleanup policies.
- [ ] Introduce background processing for long-running operations.
- [ ] Add file-processing status tracking and operational events.

### Phase 4 — API and Integration Improvements

- [ ] Introduce request authentication and service-level authorization.
- [ ] Define consistent API response formats and validation schemas.
- [ ] Improve integration with FYG-AFS-API.
- [ ] Introduce batch upload and processing capabilities.
- [ ] Add operational metrics and audit logging.
- [ ] Publish API documentation and integration examples.

### Phase 5 — Testing and Deployment

- [ ] Develop unit tests for file operations and metadata persistence.
- [ ] Add integration tests using temporary directories and synthetic files.
- [ ] Create a reproducible local development environment.
- [ ] Introduce CI workflows and automated quality checks.
- [ ] Prepare containerized deployment configurations.
- [ ] Document installation, configuration, and troubleshooting procedures.

## Current Status and Future Direction

FYG-AFS-HANDLER is an independently developed backend prototype that I plan to modernize and actively maintain as part of the FYG-AFS platform.

My primary goal is to evolve the existing file-management functionality into a reliable, modular service capable of supporting different storage systems and automated processing workflows.

The initial development stage will focus on modernizing the backend, improving file-operation security, and strengthening consistency between filesystem operations and database records.

Future development will introduce configurable storage adapters, background processing, batch operations, improved observability, and deeper integration with the administrative capabilities of FYG-AFS-API.

The long-term direction is to maintain a reusable file-processing architecture that can support a broader range of organizational needs while remaining extensible for future integrations.

The existing implementation provides a starting point, while the planned work involves substantial backend development, storage architecture improvements, testing, and deployment tooling.

Development and testing will use synthetic files and metadata rather than real customer information.

## License

This project is licensed under the MIT License.

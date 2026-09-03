# DotByDot

A small personal habit-tracking application built with Vue 3, TypeScript and Vite.

DotByDot is both a genuinely usable personal tool and a deliberately bounded learning project for developing practical frontend and backend skills.

The project is being developed in stages:

- **MVP** — Vue 3 frontend with localStorage persistence
- **V1** — Java 21 + Spring Boot + PostgreSQL backend
- **V1.1** — Full-stack integration between Vue and Spring Boot
- **V2** — Personal deployment for use on PC and phone

The project is intentionally kept small. Features are added only when they contribute meaningfully to the habit-tracking experience or the learning objectives.

> **One day at a time.**

## MVP

The MVP is a complete frontend habit tracker built with Vue 3, TypeScript and Vite.

Persistence is handled locally using the browser's `localStorage`. No backend or database is required for the MVP.

### MVP Features

- Create habits
- Edit habits
- Delete habits
- Mark habits as completed
- Undo habit completions
- Persist habits and completions using `localStorage`
- Remove associated completions when a habit is deleted
- Monthly calendar view
- Select a date from the calendar
- Display habit completions on the calendar
- Display today's habits and completion status
- Display contextual encouragement messages
- Responsive dashboard layout
- Sidebar navigation
- Motivational footer

### MVP Architecture

The MVP follows a deliberately simple architecture:

    Vue Components
          ↓
       Services
          ↓
      localStorage

The MVP deliberately keeps persistence simple. Storage and service modules remain responsible for persistence only; business validation is kept outside these modules.

### MVP Status

**Complete**

The Vue MVP is intentionally considered finished at this point.

No additional MVP features are planned. Further development will continue in the next project phase.

## Technology Stack

### Frontend

- Vue 3
- TypeScript
- Vite
- HTML
- CSS

### Persistence

- Browser `localStorage`

### Planned Backend

The backend will be introduced after the Vue MVP:

- Java 21
- Spring Boot
- Maven
- Spring Web
- Spring Data JPA
- PostgreSQL

### Planned Full-Stack Architecture

The long-term architecture is:

    Vue
      ↓
    REST API
      ↓
    Spring Boot
      ↓
    Repository
      ↓
    PostgreSQL

## Development Roadmap

DotByDot is developed in deliberately bounded phases.

### MVP — Vue Frontend

**Status: Complete**

The MVP focuses on learning Vue fundamentals while building a functional habit tracker using `localStorage`.

### V1 — Backend

**Status: Planned**

Introduce a Java 21 + Spring Boot backend with PostgreSQL persistence.

Planned components:

- REST controllers
- Service layer
- Repository layer
- JPA entities
- PostgreSQL database

### V1.1 — Full-Stack Integration

**Status: Planned**

Connect the existing Vue frontend to the Spring Boot REST API and replace the MVP's `localStorage` persistence.

### V2 — Deployment

**Status: Planned**

Deploy the application so it can be used across devices, including PC and phone.

Further features will only be considered after the core application is stable and the current phase has been completed.

## Development Workflow

DotByDot is developed using a simple Git workflow designed to keep changes small and understandable.

### Feature Branches

Each bounded feature is developed on its own branch:

    develop
        ↓
    feature/<feature-name>
        ↓
    commit
        ↓
    push
        ↓
    Pull Request
        ↓
    develop

After a feature is merged, the branch is closed and the next feature starts from `develop`.

### Commits

Commits are kept focused on a single logical change.

Examples:

- `feat: add habit completion handling`
- `style: polish dashboard UI`
- `feat: add responsive sidebar navigation`
- `docs: update MVP documentation`

### Development Philosophy

The project follows a deliberate learning process:

1. Explain
2. Decide
3. Implement
4. Inspect and debug
5. Move forward

The goal is understanding the architecture and decisions rather than simply producing working code.

The project should remain deliberately small and understandable. New features and architectural changes should not be introduced without a clear reason.

## Project Scope

DotByDot is intentionally a small learning project.

The primary goal is to build a complete application while learning and practicing:

- Vue 3 and TypeScript
- Component-based frontend development
- State management and reactivity
- Service-layer organization
- REST API design
- Java and Spring Boot
- JPA and PostgreSQL
- Git and Pull Request workflows

The following features are intentionally outside the current project scope:

- User authentication
- Social features
- Notifications
- AI features
- Gamification
- Microservices
- Complex analytics
- Multi-user functionality

These may be considered in a future project only if there is a clear reason to expand the scope.

## Current Status

### Vue MVP

**Complete**

The Vue frontend is considered complete for the MVP.

The application currently provides a functional habit-tracking experience with local persistence, calendar interaction, responsive layouts, navigation, and motivational UI elements.

The project is intentionally paused at this point rather than continuing to expand the frontend.

### Next Step

The next development phase will be the backend:

    Java 21
        ↓
    Spring Boot
        ↓
    REST API
        ↓
    PostgreSQL

This phase will begin separately from the completed Vue MVP.

### Current Principle

Finish the current phase before expanding the project.

**One day at a time.**

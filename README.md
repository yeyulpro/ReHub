# Rehub API

This project is an ASP.NET Core Web API built using **Clean Architecture** principles.  
The solution separates concerns into multiple class library projects to improve maintainability, scalability, and testability.

---

## 🛠 Tech Stack
- C#
- ASP.NET Core Web API (.NET 9.0)
- Entity Framework Core
- Code First with Migrations
- Seeded Data

---

## 📁 Solution Structure

The solution is organized into the following projects:

rehub
│
├── api → Web API (entry point)
├── Application → Application logic
├── Domain → Core business entities and rules
├── Persistence → Data access and EF Core
├── Infrastructure→ External services (future use)

## 🧱 Architecture Overview

The project follows **Clean Architecture**, with clear dependency boundaries:
- **Domain**
  - Contains core entities and business rules
  - Has no dependencies on other projects

- **Application**
  - Contains use cases and application logic
  - Depends on `Domain` and `Persistence`

- **Persistence**
  - Handles database access and EF Core configurations
  - Depends on `Domain`

- **API**
  - Entry point of the application
  - Depends only on `Application`

---

## 🚀 Project Setup Process

1. Created a new **ASP.NET Core Web API** project in Visual Studio
   - Framework: **.NET 9.0**
   - Solution name: `rehub`
   - Project name: `api`

2. Created additional **Class Library** projects:
   - `Application`
   - `Domain`
   - `Infrastructure`
   - `Persistence`

3. Added project references:
   - `api` → `Application`
   - `Application` → `Domain`, `Persistence`
   - `Persistence` → `Domain`
   - `Domain` → no dependencies

---

## 🗄 Database Approach

- Uses **Code First** with **EF Core Migrations**
- Initial data is added using **data seeding**
- No Database First scaffolding is used

---

## 📌 Notes
This structure ensures:
- Loose coupling
- Clear separation of concerns
- Easier testing and future scalability


## Program.cs Overview

In `Program.cs`, there are two main sections: **Add Services to the Container** and **Configure the HTTP Request Pipeline**.

---

### 1️⃣ Add Services to the Container

- When we need functionality, we create a **class** that provides it.
- To use the class, we rely on **Dependency Injection (DI)**.
- The framework automatically **creates an instance** of the class when needed and **disposes of it** when no longer used.

**Example:**

```csharp
builder.Services.AddControllers();
builder.Services.AddScoped<IUserService, UserService>();

### Initial Setting 
At the start, `Program.cs` includes only:

```csharp
builder.Services.AddControllers();
app.MapControllers();
AddControllers(): Sets up services and environment for controllers.
MapControllers(): Maps HTTP requests to controller actions and executes them.

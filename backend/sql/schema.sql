CREATE DATABASE IF NOT EXISTS Mysqltest;

USE Mysqltest;

CREATE TABLE IF NOT EXISTS course_registrations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  designation VARCHAR(120) NOT NULL,
  course VARCHAR(120) NOT NULL,
  location VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(120) NOT NULL,
  course_name VARCHAR(120) NOT NULL,
  level VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (category, course_name, level, description)
SELECT * FROM (
  SELECT 'MERN', 'Mongo DB', 'Database', 'Document modeling, CRUD operations, indexing, and aggregation for MERN applications.'
  UNION ALL
  SELECT 'MERN', 'Express', 'Backend', 'REST APIs, middleware, routing, validation, and server-side request handling.'
  UNION ALL
  SELECT 'MERN', 'React', 'Frontend', 'Components, hooks, state management, routing, and responsive SPA patterns.'
  UNION ALL
  SELECT 'MERN', 'Node JS', 'Runtime', 'Event-driven JavaScript, package ecosystem, modules, and scalable server apps.'
  UNION ALL
  SELECT 'MEAN', 'Mongo DB', 'Database', 'Data storage, schema design, CRUD, and aggregation workflows for Angular apps.'
  UNION ALL
  SELECT 'MEAN', 'Express', 'Backend', 'HTTP services, route composition, middleware chains, and API layering.'
  UNION ALL
  SELECT 'MEAN', 'Angular', 'Frontend', 'Components, forms, routing, services, and TypeScript-based architecture.'
  UNION ALL
  SELECT 'MEAN', 'Node JS', 'Runtime', 'Backend foundations, packages, event loop concepts, and deployment readiness.'
  UNION ALL
  SELECT 'Front End', 'HTML', 'Beginner', 'Semantic markup, forms, tables, media, and accessible page structure.'
  UNION ALL
  SELECT 'Front End', 'CSS', 'Beginner', 'Layouts, selectors, flexbox, grid, responsive design, and UI styling.'
  UNION ALL
  SELECT 'Front End', 'JavaScript', 'Intermediate', 'DOM events, functions, data handling, fetch APIs, and interactivity.'
  UNION ALL
  SELECT 'Backend', 'PHP', 'Backend', 'Server-side scripting, database interaction, sessions, and dynamic rendering.'
  UNION ALL
  SELECT 'Backend', 'Java', 'Backend', 'OOP, APIs, enterprise patterns, and service-oriented backend development.'
  UNION ALL
  SELECT 'Backend', '.NET', 'Backend', 'C#, ASP.NET, web APIs, dependency injection, and scalable application design.'
) AS seed_data
WHERE NOT EXISTS (
  SELECT 1 FROM courses existing
  WHERE existing.category = seed_data.category
    AND existing.course_name = seed_data.course_name
);

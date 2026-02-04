# Workflow-Builder 

A single-page workflow builder UI built using **React functional components and Hooks**.  
Users can visually create, edit, connect, and manage workflow steps in a clean flow-based layout.

---

## Features

- **Workflow Canvas**
  - Starts with a root **Start** node
  - Clear visual flow between parent and child nodes
  - Connection lines show workflow direction

- **Node Types**
  - **Start** – entry point of the workflow
  - **Action** – one outgoing connection
  - **Branch (Condition)** – decision point with **True / False** paths
  - **End** – terminal node with no children

- **Node Operations**
  - Add nodes dynamically
  - Edit node labels inline
  - Delete nodes with proper parent reconnection
  - Branch nodes support multiple outgoing connections

---

## State Management

- Implemented using **`useReducer`**
- Immutable state updates
- **Undo / Redo** functionality using `past / present / future` pattern
- Scalable JSON-based workflow data structure

---

## Save Workflow

- A **Save** button logs the complete workflow JSON to the console
- Simulates how workflow data could be persisted to a backend

---

## UI & Design

- Built with **pure CSS (no libraries)**
- Fixed top navigation bar
- Clean typography and visual hierarchy
- Horizontal layout for branch (True / False) paths

---

## Tech Stack

- React (Hooks only)
- JavaScript
- Plain CSS  
- ❌ No UI libraries  
- ❌ No workflow/diagram libraries  
- ❌ No animation libraries  

---



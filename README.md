# Kanban Board

This project is a Kanban Board application built with React.JS.

## Demo
Here is a working live demo: https://kanban-board.madfariz.my.id/

## Features

- Create new board
- Create tasks in each board
- Move tasks between boards with "Move Left" and "Move Right" actions
- Edit tasks
- Delete tasks
- Real-time board updates after each action
- Drag and drop mechanism for moving tasks between boards

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AhmdFarzki/kanban-board
2. Navigate to the project directory:

   ```bash
   cd kanban-board
3. Install the dependencies:

   ```bash
   npm install
4. Start the development server:

   ```bash
   npm start
The application will be running at http://localhost:3000.

## Configuration
The application requires the backend server endpoints for task management. Update the API endpoint URLs in the src/axios.js file according to your backend server configuration. Update the `baseURL` variable with the URL of your backend server.

## Usage
Once the development server is running, you can access the Kanban Board application in your web browser at http://localhost:3000/v1.

- To create a new group, click on the "Add New Group" button in the top.
- To create a new task, click on the "Add Task" button in the desired board and fill in the task details.
- To move a task between boards, you have two options:
    - Option 1: Click on the task card and use the "Move Left" and "Move Right" buttons to change its position.
    - Option 2: Simply drag and drop the task card from one board to another.
- To edit a task, click on the task card and select the "Edit" option. Update the task details and save the changes.
- To delete a task, click on the task card and select the "Delete" option.
- After each action (create, move, edit, and delete), the board will be automatically updated to reflect the changes.

Created by Ahmad Alfarizki
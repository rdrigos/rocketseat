import { createId } from '@paralleldrive/cuid2';
import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import util from 'node:util';
import { database } from './infrastructure/database';
import { env } from './infrastructure/environment';

// Create the Express server
const app = express();

// Configure the middlewares
app.use(express.json());
app.use(cors());

// Creates the tasks table
database.schema.hasTable('tasks').then((exists) => {
  if (!exists) {
    return database.schema.createTable('tasks', (table) => {
      table.string('id').primary();
      table.string('title');
      table.text('description');
      table.timestamp('completed_at').nullable();
      table.timestamp('created_at').defaultTo(new Date().toISOString());
      table.timestamp('updated_at').defaultTo(new Date().toISOString());
    });
  }
});

// Welcome endpoint
app.get('/', (_req, res) => {
  try {
    return res.status(StatusCodes.OK).send({
      name: env.NAME,
      desc: env.DESC,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Endpoint to create a task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validates if the title and description of the task were received
    if (!title || !description) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Title and description are required' });
    }

    // Creates the task and saves it to the database
    const [task] = await database('tasks')
      .insert({
        id: createId(),
        title,
        description,
      })
      .returning('*');

    // Returns the endpoint response
    return res.status(StatusCodes.CREATED).json({ task });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Endpoints to list all tasks
app.get('/tasks', async (req, res) => {
  try {
    const { search } = req.query;

    // Prepare the initial query to fetch all tasks
    let query = database('tasks').select('*');

    // If the 'search' parameter is provided, add the search condition for title or description
    if (search) {
      query = query.where('title', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`);
    }

    // Execute the query and get the tasks
    const tasks = await query;

    // Returns the endpoint response
    return res.status(StatusCodes.OK).json({ tasks });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Endpoint to update a task based on the id
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Fetch the task with the received id
    const task = await database('tasks').where('id', id).first();

    // Check if the task exists
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: util.format("Task (id: '%s') not found", id),
      });
    }

    // Update the task
    const updatedTask = await database('tasks')
      .where('id', id)
      .update({
        title: title || task.title,
        description: description || task.description,
        updated_at: new Date().toISOString(),
      })
      .returning('*');

    // Returns the endpoint response
    return res.status(StatusCodes.OK).json({ taks: updatedTask });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Endpoint to delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the task with the received id
    const task = await database('tasks').where('id', id).first();

    // Check if the task exists
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: util.format("Task (id: '%s') not found", id),
      });
    }

    // Delete the task
    await database('tasks').where('id', id).del();

    // Returns the endpoint response
    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Endpoint to complete a task
app.patch('/tasks/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the task with the received id
    const task = await database('tasks').where('id', id).first();

    // Check if the task exists
    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: util.format("Task (id: '%s') not found", id),
      });
    }

    // Check if the task has already been completed
    if (task.completed_at) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: util.format("Task (id: '%s') already been completed", id),
      });
    }

    // Update the task
    const completedTask = await database('tasks')
      .where('id', id)
      .update({
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .returning('*');

    // Returns the endpoint response
    return res.status(StatusCodes.OK).json({ taks: completedTask });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

// Start the server
app.listen(env.PORT, env.HOST, () => {
  console.log(util.format('The HTTP server has started at the address: http://127.0.0.1:%d', env.PORT));
});

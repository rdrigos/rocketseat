import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { mealsRoutes } from './routes/meals.routes'
import { usersRoutes } from './routes/users.routes'

export const app = fastify()

app.register(cookie)

app.register(usersRoutes, { prefix: 'users' })
app.register(mealsRoutes, { prefix: 'meals' })

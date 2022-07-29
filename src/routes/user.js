import Controller from "../controllers/user.js";

const controller = new Controller()

export default function (fastify, opts, done) {

  fastify.get('/', controller.GET)
  fastify.get('/:id', controller.GET)
  fastify.post('/', controller.POST)
  fastify.put('/:id', controller.PUT)
  fastify.delete('/:id', controller.DELETE)

  done();
}
export default function (fastify, opts, done) {

  fastify.get('/', (req, res) => {
    return { foods: '/', method: req.method }
  })

  fastify.post('/', (req, res) => {
    return { foods: '/', method: req.method }
  })

  done();
}
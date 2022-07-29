export default function (fastify, opts, done) {

  fastify.get('/', (req, res) => {
    return { orders: '/', method }
  })

  done();
}
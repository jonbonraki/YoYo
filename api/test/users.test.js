const handler = require('../handler')

describe('users', () => {
  let createdComment
  const user = {
    user: 'a@a.com',
    uri: 'http://a.com',
    text: 'hello world',
    parents: [ 'h.minghe@gmail.com' ],
  }
  test('create', (done) => {
    handler.create({ body: JSON.stringify(user) }, null, (err, resp) => {
      expect(err).toBeNull()
      createdComment = JSON.parse(resp.body)
      expect(createdComment.user).toEqual(user.user)
      expect(createdComment.uri).toEqual(user.uri)
      expect(createdComment.text).toEqual(user.text)
      done()
    })
  })

  test('get', (done) => {
    handler.get({
      pathParameters: {
        id: createdComment.id,
      }
    }, null, (err, resp) => {
      expect(err).toBeNull()
      const data = JSON.parse(resp.body)
      expect(data.user).toEqual(user.user)
      expect(data.text).toEqual(user.text)
      expect(data.uri).toEqual(user.uri)
      done()
    })
  })

  test('update text', (done) => {
    const body = {
      text: 'change_to_this',
    }
    handler.update({
      pathParameters: {
        id:  createdComment.id
      },
      body: JSON.stringify(body)
    }, null, (err, resp) => {
      expect(err).toBeNull()
      handler.get({
        pathParameters: {
          id: createdComment.id
        }
      }, null, (err, resp) => {
        const data = JSON.parse(resp.body)
        expect(data.text).toEqual(body.text)
        done()
      })
    })
  })

  test('query', (done) => {
    handler.query({
      queryStringParameters: {
        uri: 'http://a.com',
      },
    }, null, (err, resp) => {
      expect(err).toBeNull()
      const data = JSON.parse(resp.body)
      expect(data[0].uri).toEqual(user.uri)
      done()
    })
  })
})

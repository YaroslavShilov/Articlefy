var router = require('express').Router()
var assign = require('object-assign')
var mocks = require('./mock')
var rndm = require('rndm')

var ID_LENGTH = 24

router.get('/article', function (req, res, next) {
  var articles = mocks.articles.map(function (article) {
      return assign({}, article, {
        text: undefined,
      })
    }),
    limit = Number(req.query.limit) || articles.length,
    offset = Number(req.query.offset) || 0

  res.json({ data: articles.slice(offset, limit + offset), total: articles.length })
})

router.get('/article/:id', function (req, res, next) {
  var article = mocks.articles.filter(function (article) {
    return article.id == req.params.id
  })[0]
  if (article) return res.json(article)

  res.status(404).json({ error: 'not found' })
})

router.post('/article', function (req, res, next) {
  var body = req.body
  var article = {
    text: body.text,
    title: body.title,
    id: rndm(ID_LENGTH),
    user: body.user,
    date: new Date(),
    imgUrl: body.imgUrl,
  }
  mocks.articles.push(article)
  res.json(article)
})

router.get('/comment', function (req, res, next) {
  var aid = req.query.article || null
  var limit = Number(req.query.limit) || mocks.comments.length
  var offset = Number(req.query.offset) || 0

  var comments =
    aid !== null
      ? mocks.comments.filter(function (comment) {
          return comment.article === aid
        })
      : mocks.comments

  res.json({
    total: comments.length,
    records: comments.slice(offset, limit + offset),
  })
})

router.post('/comment', function (req, res, next) {
  var comment = {
    id: Date.now(),
    text: req.body.text,
    user: req.body.user,
    article: req.body.article,
  }
  mocks.comments.push(comment)
  res.json(comment)
})

module.exports = router

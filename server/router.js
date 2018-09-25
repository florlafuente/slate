const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID

// const request = require('superagent');
// const async = require('async');

  router.route('/documents')
    .get( async(req, res, next) => {
      try {
        const allDocuments = await (req.db.collection('documents').find()).toArray()
        res.status(200).json(allDocuments)
      } catch(err) {
        next(err)
      }
    })
    .post(async (req, res, next) => {
      try {
        const newDocument = await (req.db.collection('documents').insertOne({
          content: req.body.content
        }))
        res.status(201).json(newDocument)
      } catch (err) {
        next(err)
      }
    })

  router.route('/documents/:id')
    .get(async (req, res, next) => {
      try {
        const result = await (req.db.collection('documents').findOne(
          { _id: ObjectID(req.params.id) }
        ))
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    })
    .put(async (req, res, next) => {
      try {
        const updateDocument = await (req.db.collection('documents').updateOne(
          { _id: ObjectID(req.params.id) },
          { $set: {
            content: req.body.content
          }}
        ))
        res.status(200).json(updateDocument)
      } catch (err) {
        next(err)
      }
    })
    .delete( async (req, res, next) => {
      try {
        const deleteDocument = await (req.db.collection('documents').deleteOne({
          _id: ObjectID(req.params.id)
        }))
        res.status(200).json(deleteDocument)
      } catch (err) {
        next(err)
      }
    })

  router.route('/comments')
    .get(async (req, res, next) => {
      try {
        const query = {}
        if (req.query.ids) {
          query._id = { 
            $in: req.query.ids
              .split(',')
              .map((id) => ObjectID(id))
          }
        }
        const results = await (req.db.collection('comments').find(query)).toArray()
        res.status(200).json({
          results: results
        })
      } catch (err) {
        next(err)
      }
    })
    .post(async (req, res, next) => {
      try {
        const newComment = await (req.db.collection('comments').insertOne({
          content: req.body.content,
          document: ObjectID(req.body.document)
        }))
        res.status(200).json({
          id: newComment.insertedId
        })
      } catch (err) {
        next(err)
      }
    }
  )

  router.route('/comments/:id')
    .get(async (req, res, next) => {
      try {
        const result = await (req.db.collection('comments').findOne(
          { _id: ObjectID(req.params.id) }
        ))
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    })
    .put(async (req, res, next) => {
      try {
        const updateComment = await (req.db.collection('comments').updateOne(
          { _id: ObjectID(req.params.id) },
          { $set: {
            content: req.body.content
          }}
        ))
        res.status(200).json(updateDocument)
      } catch (err) {
        next(err)
      }
    })
    .delete( async (req, res, next) => {
      try {
        const deleteComment = await (req.db.collection('comments').deleteOne({
          _id: ObjectID(req.params.id)
        }))
        res.status(200).json(deleteDocument)
      } catch (err) {
        next(err)
      }
    })


// router.get('/search', (req, res) => {
//   request
//   .get('https://api.spotify.com/v1/search')
//   .set('Content-Type', 'application/json')
//   .query({
//     type: 'artist',
//     q: req.query.query,
//     limit: req.query.limit,
//     offset: req.query.offset
//   })
//   .end((err, response) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     res.status(200).json(response.body);
//   });
// });

// router.get('/artist/:id', (req, res) => {
//   async.auto({
//     artist: function(callback) {
//       request
//       .get('https://api.spotify.com/v1/artists/' + req.params.id)
//       .end((err, response) => callback(err, response.body));
//     },
//     albums: ['artist', (results, callback) => {
//       request
//       .get('https://api.spotify.com/v1/artists/' + req.params.id + '/albums')
//       .query({
//         album_type: 'album',
//         limit: req.query.limit,
//         offset: req.query.offset
//       })
//       .end((err, response) => {
//         callback(err, {
//           'items': response.body.items,
//           'limit': response.body.limit,
//           'offset': response.body.offset,
//           'total': response.body.total
//         });
//       });
//     }]
//   }, (err, results) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     res.status(200).json(results);
//   });
// });

// router.get('/album/:id', (req, res) => {
//   request
//   .get('https://api.spotify.com/v1/albums/' + req.params.id)
//   .end((err, response) => {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     res.status(200).json(response.body);
//   });
// });

module.exports = router
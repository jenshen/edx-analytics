Future = Npm.require('fibers/future');

Meteor.methods
  'aggregate': (params) ->
    console.log params
    fut = new Future();
    MongoInternals\
      .defaultRemoteCollectionDriver()\
      .mongo._getCollection(params.collection)\
      .aggregate params.pipe, (err, result) ->
            fut.return(result);
    return fut.wait();
    
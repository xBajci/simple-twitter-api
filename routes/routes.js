import Router from 'koa-router';
import Tweets from '../models/tweets';
import Users from '../models/users';
import response from '../middleware/response';

let router = new Router();

router.get('/users',
  response(() => Users.findAll())
);

router.get('/users/:id',
  response(context => Users.findById(context.params.id))
);

router.post('/users',
  response(context => Users.insert(context.request.body.name))
);

router.delete('/users/:id',
  response(context => Users.remove(context.params.id))
);

router.get('/users/:id/tweets',
  response(context => function *() {
    let user = yield Users.findById(context.params.id);
    if (!user) {
      return;
    }

    let tweets = [];
    if (user.follow) {
      let allUsers = [user._id].concat(user.follow.map(user => user._id));
      tweets = yield Tweets.findByUserIds(allUsers);
    }
    else {
      tweets = yield Tweets.findByUserId(context.params.id);
    }

    return tweets;
  })
);

router.post('/users/:id/tweets',
  response(context => function *() {
    let user = yield Users.findById(context.params.id);
    if (!user) {
      return;
    }

    return Tweets.insert(user._id, context.request.body.tweet);
  })
);

router.post('/users/:id/follow/:otherId',
  response(context => function *() {
    let id = context.params.id;
    let otherId = context.params.otherId;

    if (id === otherId) {
      throw new Error('Can\'t follow yourself.');
    }

    let user = yield Users.findById(id);
    if (!user) {
      throw new Error('Unknown user ' + id);
    }

    let otherUser = yield Users.findById(otherId);
    if (!otherUser) {
      throw new Error('Unknown user ' + otherId);
    }

    return Users.follow(user, otherUser);
  })
);

router.get('/stats',
  response(() => Tweets.getStats())
);

export default {
  getRoutes: () => router.middleware()
};
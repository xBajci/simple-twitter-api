import Router from 'koa-router';
import userActions from './actions/users';
import tweetActions from './actions/tweets';
import response from '../middleware/response';

let router = new Router();

router.get('/users', response(userActions.getUsers));
router.get('/users/:id', response(userActions.getUserById));
router.post('/users', response(userActions.createNewUser));
router.post('/users/:id/follow/:otherId', response(userActions.followUser));
router.delete('/users/:id', response(userActions.removeUser));

router.get('/users/:id/tweets', response(tweetActions.getTweets));
router.post('/users/:id/tweets', response(tweetActions.insertTweet));

router.get('/stats', response(tweetActions.getStats));

export default {
  getRoutes: () => router.middleware()
};

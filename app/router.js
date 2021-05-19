import EmberRouter from '@ember/routing/router';
import config from 'benzy-clubbers-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
  // Overrides didTransition method: fixes a bug when page stays scrolled down after changing the route
  didTransition() {
    this._super(...arguments);
    window.scrollTo(0, 0);
  }  
}

// 'car-modle-reviews' is associated with path 'benzy-clubbers.netlify.app/model/:id'
Router.map(function () {
  this.route('car-model-reviews', { path: '/model/:id' });
});

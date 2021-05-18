import Route from '@ember/routing/route';
import Ember from 'ember';
import ENV from 'benzy-clubbers-ember/config/environment';

export default class CarModelDetailsRoute extends Route {
  async model(model_id) {
    console.log('Fetching model data.');
    const response_car = await fetch(ENV.APP.API_HOST + '/cars/model/' + model_id.id
    );
    const data_car = await response_car.json();

    console.log('Fetching reviews data.');
    const response_reviews = await fetch(ENV.APP.API_HOST + '/cars/reviews/model/' + model_id.id
    );
    const data_reviews = await response_reviews.json();
    data_reviews.forEach((k) => {
      if (k.rating > 7) k['rating_color'] = 'text-success';
      else if (k.rating > 5 && k.rating <= 7)
        k['rating_color'] = 'text-warning';
      else if (k.rating <= 5) k['rating_color'] = 'text-danger';
    });

    console.log('Fetching image data.');
    const response_image = await fetch(ENV.APP.API_HOST + '/cars/images/model/' + model_id.id
    );
    const data_image = await response_image.json();

    console.log('Fetching trim data.');
    const response_trim = await fetch(ENV.APP.API_HOST + '/cars/trims/model/' + model_id.id
    );
    const data_trim = await response_trim.json();

    return Ember.RSVP.hash({
      car: data_car[0],
      reviews: data_reviews.sort((b, a) => a.id - b.id),
      images: data_image,
      trims: data_trim,
    });
  }

  // This is used to create a short cut. Instead of "this.model.car", it will be just "car"
  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'car', model.car);
    Ember.set(controller, 'reviews', model.reviews);
    Ember.set(controller, 'images', model.images);
    Ember.set(controller, 'trims', model.trims);
  }
}

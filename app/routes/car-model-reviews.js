import Route from '@ember/routing/route';
import Ember from 'ember';
import ENV from 'benzy-clubbers-ember/config/environment';

export default class CarModelDetailsRoute extends Route {
  // model_id is a parameter taken from the 'id' variable in the path: ".../model/:id"
  async model(model_id) {
    // GET operation on car model data
    console.log('Fetching model data.');
    const response_car = await fetch(ENV.APP.API_HOST + '/cars/model/' + model_id.id
    );
    const data_car = await response_car.json();

    // GET operation on all reviews records associated with the model id
    console.log('Fetching reviews data.');
    const response_reviews = await fetch(ENV.APP.API_HOST + '/cars/reviews/model/' + model_id.id
    );
    const data_reviews = await response_reviews.json();
    // Add an attribute rating_color that will change color based to value
    data_reviews.forEach((k) => {
      if (k.rating > 7) k['rating_color'] = 'text-success';
      else if (k.rating > 5 && k.rating <= 7)
        k['rating_color'] = 'text-warning';
      else if (k.rating <= 5) k['rating_color'] = 'text-danger';
    });

    // GET operation on all images records associated with the model id
    console.log('Fetching image data.');
    const response_image = await fetch(ENV.APP.API_HOST + '/cars/images/model/' + model_id.id
    );
    const data_image = await response_image.json();

    // GET operation on all trims records associated with the model id
    console.log('Fetching trim data.');
    const response_trim = await fetch(ENV.APP.API_HOST + '/cars/trims/model/' + model_id.id
    );
    const data_trim = await response_trim.json();

    // Combine all fetched data together
    return Ember.RSVP.hash({
      car: data_car[0], // Response data returned list of one object
      reviews: data_reviews.sort((b, a) => a.id - b.id), // Reviews must be ordered by id. All ID's by default are ordered by time
      images: data_image, // List of objects
      trims: data_trim, // List of objets
    });
  }

  // This is used to create a short cut in car-model-reviews.hbs file. Instead of "this.model.car", it will be just "car"
  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'car', model.car);
    Ember.set(controller, 'reviews', model.reviews);
    Ember.set(controller, 'images', model.images);
    Ember.set(controller, 'trims', model.trims);
  }
}

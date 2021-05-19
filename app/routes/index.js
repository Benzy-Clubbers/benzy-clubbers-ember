import Route from '@ember/routing/route';
import ENV from 'benzy-clubbers-ember/config/environment';

export default class IndexRoute extends Route {
  // Returns list of objects to the index.hbs. Accessible as 'this.model'
  async model() {
    console.log("Fetching all cars data.");
    const response = await fetch(ENV.APP.API_HOST + '/cars/models'); // Send GET request to the back-end
    const data = await response.json();
    return data.sort((a, b) => a.id - b.id); // Sort by id
  }
}

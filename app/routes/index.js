import Route from '@ember/routing/route';
import ENV from 'benzy-clubbers-ember/config/environment';

export default class IndexRoute extends Route {
  async model() {
    console.log("Fetching all cars data.");
    const response = await fetch(ENV.APP.API_HOST + '/cars/models');
    const data = await response.json();
    return data.sort((a, b) => a.id - b.id);
  }
}

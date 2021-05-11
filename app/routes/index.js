import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    console.log("Fetching all cars data.");
    const response = await fetch('http://localhost:3000/cars/models');
    const data = await response.json();
    return data.sort((a, b) => a.id - b.id);
  }
}

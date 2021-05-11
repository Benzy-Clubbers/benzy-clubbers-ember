import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    setRating: function(selected) {
      this.set('rating', selected);
    },
    post: function(id) {    
      return $.ajax({ 
        type: 'POST', 
        url: "http://localhost:3000/cars/review/model/" + id, 
        data: {
          review: this.get('review'),
          title: this.get('title'),
          rating: this.get('rating') == undefined ? 10 : this.get('rating'), 
        },
        success: function (data, status) { 
            console.log(data);
            location.reload();
        }
    });
    },
  }
});
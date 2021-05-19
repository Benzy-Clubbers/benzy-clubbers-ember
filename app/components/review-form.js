import Ember from 'ember';
import ENV from 'benzy-clubbers-ember/config/environment';

export default Ember.Component.extend({
  actions: {
    // Changes values of 'rating' after selecting different rating
    setRating: function (selected) {
      this.set('rating', selected);
    },
    // Changes values of 'trim' after selecting different trim
    setTrim: function (selected) {
      this.set('trim', selected);
    },
    post: function (id) {
      return $.ajax({
        type: 'POST',
        url: ENV.APP.API_HOST + '/cars/review/model/' + id,
        data: {
          review: this.get('review'),
          title: this.get('title'),
          // If rating wasn't changed ('undefined') it will be 10 by default
          rating: this.get('rating') == undefined ? 10 : this.get('rating'), 
          // If trim wasn't changed ('undefined') it will be 'Trim not specified' by default
          trim_name:
            this.get('trim') == undefined
              ? 'Trim not specified'
              : this.get('trim'),
        },
        success: function (data, status) {
          console.log(data);
          location.reload(); // Update the page after submitting review
        },
      });
    },
  },
});

import Ember from 'ember';

export default Ember.Component.extend({
  // 'reviews' is a list of objects passed to the component
  //  will by default be unfiltered ("return true")
  filteredReviews: Ember.computed
    .filter('reviews', function (review) {
      if (this.get('trimFilter') == null || this.get('trimFilter') == 'No filter') {
        return true;
      }
      return review.trim_name == this.get('trimFilter');
    })
    .property('trimFilter'),
  // applied sort to filtered/unfiltered list of reviews
  sortedReviews: Ember.computed.sort('filteredReviews', 'sortDefinition'),
  // initialize booleans
  trimFilter: null,
  sortByRating: false,
  sortByContentLength: false,
  sortRatingDirection: false,
  sortContentLengthDirection: false,
  // will apply sort based on boolean states
  sortDefinition: Ember.computed('rating', 'sortRatingDirection', 'review', 'sortContentLengthDirection', function () {
    let sortRatingOrder = this.get('sortRatingDirection') ? 'desc' : 'asc';
    let sortContentLengthOrder = this.get('sortContentLengthDirection') ? 'desc' : 'asc';
    return [this.get('sortByRating') ? `rating:${sortRatingOrder}` : '', 
            this.get('sortByContentLength') ? `review.length:${sortContentLengthOrder}` : '' ];
  }),

  actions: {
    filterByTrim: function (selected) {
      this.set('trimFilter', selected);
    },
    // will filter and any sort applied
    resetFilters() {
      this.set('trimFilter', null);
      this.set('sortByRating', false);
      this.set('sortByContentLength', false);
      this.set('sortRatingDirection', null);
      this.set('sortContentLengthDirection', null);
      document.getElementById('trim-filter').selectedIndex = 0;
    },
    // can only be applied one sort
    ratingSort() {
      this.set('sortByRating', true);
      this.set('sortByContentLength', false);
      this.set('sortContentLengthDirection', null);
      this.set('sortRatingDirection', !this.get('sortRatingDirection'));
    },
    contentLengthSort() {
      this.set('sortByContentLength', true);
      this.set('sortByRating', false);
      this.set('sortRatingDirection', null);
      this.set('sortContentLengthDirection', !this.get('sortContentLengthDirection'));
    },
  },
});

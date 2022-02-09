import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeIndex from './bike-index.js';

function clearFields () {
  $('#zip-code').val("");
  $('#show-errors').html("");
  $('#show-bikes').html("");
}

function getElements(response) {
  console.log(response);
  if (response.bikes.length === 0) {
    $('#show-bikes').text(`No bikes have been reported stolen within 10 miles of this zip code.`);
  } else if (response.bikes) {
    $('#show-bikes').text(`The last bike that was stolen in your zipcode is a ${response.bikes[0].frame_colors.toString()} ${response.bikes[0].frame_model} ${response.bikes[0].manufacturer_name}`);
  } else {
    $('#show-bikes').text(`Oopsie! Something went wrong on our end.`);
  }
}

$(document).ready(function() {
  $('#bike-search').click(function() {
    let zip = $('#zip-code').val();
    clearFields();
    BikeIndex.getBikes(zip)
      .then(function(response) {
        getElements(response);
      });
  });
});

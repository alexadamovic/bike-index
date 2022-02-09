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
  if (response.bikes) {
    console.log(response);
    $('#show-bikes').text(`The last bike that was stolen in your zipcode is a ${response.bikes[0].frame_colors.toString()} ${response.bikes[0].frame_model} ${response.bikes[0].manufacturer_name}`);
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

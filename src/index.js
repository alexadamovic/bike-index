import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeLookup from './bike-lookup.js';

function clearFields () {
  $('#zip-code').val("");
  $('#show-errors').html("");
  $('#show-bikes').html("");
}

function getElements(response) {
  if (!response.bikes) {
    $('#show-errors').text(`Oopsie daisy! Something went wrong on our end. Error: ${response}`);
    return;
  } else if (response.bikes.length === 0) {
    $('#show-bikes').text(`No bikes have been reported stolen within 10 miles of this zip code.`);
  } else if (response.bikes) {
    $('#show-bikes').text(`The last bike that was stolen in your zipcode is a ${response.bikes[0].frame_colors.toString()} ${response.bikes[0].frame_model} ${response.bikes[0].manufacturer_name}`);
  }
}

$(document).ready(function() {
  $('#bike-search').click(function() {
    let zip = $('#zip-code').val();
    clearFields();
    if (zip.length === 5) {
      BikeLookup.getBikes(zip)
        .then(function(response) {
          getElements(response);
        });
    } else {
      $('#show-errors').text(`We need a 5 digit zipcode to process this request.`);
    }
  });
});

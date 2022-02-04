const options = {
  url: `https://restcountries.com/v2/all?fields=name,flag`,
  getValue: `name`,
  list: {
    match:{
      enabled: true
    }
  },
  template: {
		type: "custom",
		method: function (value, item) {
      return `
      <span style="color: tomato">${value}</span> 
      <span style="color: gray">${item.capital}</span>
      <img src="${item.flag}" alt="${item.name}" style="width: 20px"></img>
      `
    }
	}
};

$(`#country`).easyAutocomplete(options);

$(`.form`).on(`submit`, function(e){
  e.preventDefault();

  $(`.loader`).addClass(`active`);
  let country = $(`#country`).val();
  $.ajax({
    url:  `https://restcountries.com/v2/name` + country ,
  })
  .done(function (response) {
    let country = response[0];
    $(`#name`).text(country.name);
    $(`#capital`).text(country.capital);
    $(`#population`).text(country.population);
  })
  .always(function () {
    $(`.loader`).removeClass(`active`);
  })
})


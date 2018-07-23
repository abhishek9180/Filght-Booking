
// city data used in showing search suggestion
var city = ["Agartala IXA", "Agra AGR", "Ahmedabad AMD", "Allahabad IXD", "Amritsar ATQ", "Aurangabad IXU", "Bagdogra IXB", "Bangalore BLR", "Bhavnagar BHU", "Bhopal BHO", "Bhubaneswar BBI", "Kolkata CCU", "Chennai MAA", "Goa GOI", "Mumbai BOM", "Nagpur NAG", "Delhi DEL", "Pune PNQ"];

//get input refrence
var originCity = document.querySelector('#origin-city');
var destinationCity = document.querySelector('#destination-city');
var departureDate = document.querySelector('#departure-date');
var arrivalDate = document.querySelector('#arrival-date');
var flightUnitPrice = document.querySelector('#flight-unit-price');
var passengerCount = document.querySelector('#passenger-count');

// get tabs refrence
var tabs = document.querySelectorAll('.tab-label');

// get toggle filter refrence
var filterToggle = document.querySelector("#filter-toggle");
var filterSection = document.querySelector("#filter-section");

// add event listeners
/*initiate the autocomplete function on input element*/
autocomplete(originCity, city);
autocomplete(destinationCity, city);

// listener to update selected range value
flightUnitPrice.addEventListener('change', updateSelectedUnitPrice);

// listener to change tabs and show hide arrival input
tabs[0].addEventListener('click', toggleTabs);
tabs[1].addEventListener('click', toggleTabs);

// listener to toggle(show/hide) filter flight widget
filterToggle.addEventListener('click', toggleFilter);
// add window resize event listener to show/hide filter according to screensize
window.addEventListener('resize', handleResize);

// set max and min allowed date to input
var today = new Date();
departureDate.min = getFormattedDate(today);
departureDate.max = getFormattedDate(today.setMonth(today.getMonth() + 3));
departureDate.addEventListener('change', function () {
    let dtoday = new Date(departureDate.value);
    arrivalDate.min = getFormattedDate(dtoday);
    arrivalDate.max = getFormattedDate(dtoday.setMonth(dtoday.getMonth() + 3));
});

// return date YYYY-MM-DD
function getFormattedDate(dateString) {
    var date = new Date(dateString);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

function updateSelectedUnitPrice() {
    var selectedRange = document.querySelector('#selected-range');
    selectedRange.textContent = flightUnitPrice.value;
}

// event listener callbacks
function toggleTabs(e) {
    console.log("event: ", e.target.textContent.trim())
    if (e.target.textContent.trim() === 'Oneway') {
        arrivalDate.style.display = 'none';
        arrivalDate.required = false;
    } else if (e.target.textContent.trim() === 'Return') {
        arrivalDate.style.display = 'block';
        arrivalDate.required = true;
    }

}

function toggleFilter() {
    if (window.innerWidth < 768) {
        // translate filter-toggle button
        filterToggle.style.transform = filterToggle.style.transform === 'translateX(0px) rotate(90deg)' ? 'translateX(299px) rotate(90deg)' : 'translateX(0px) rotate(90deg)';
        // translate filter section
        filterSection.style.transform = (!filterSection.style.transform || filterSection.style.transform === 'translateX(-301px)') ? 'translateX(0px)' : 'translateX(-301px)';

        let filterToggleImage = document.querySelector('#filter-toggle-image');
        // hide header
        let detailHeader = document.querySelector('.flight-detail-header');
        if (filterToggle.style.transform === 'translateX(0px) rotate(90deg)') {
            filterToggleImage.style.transform = 'rotate(270deg)';
            detailHeader.style.opacity = '1';
        } else {
            filterToggleImage.style.transform = 'rotate(90deg)';
            detailHeader.style.opacity = '0';
        }
    }
    setFlightDetailHeader();
}

function handleResize() {
    if (window.innerWidth > 767) {
        //filterToggle.style.transform = 'translateX(0px) rotate(90deg)';
        filterSection.style.transform = 'translateX(0px)';
    } else {
        filterToggle.style.transform = 'translateX(0px) rotate(90deg)';
        filterSection.style.transform = 'translateX(-301px)';
    }
}


// show city suggestion input
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}







/*
* Date Processing Section
* Read Data and show filtered flight details
*/
// variable to hold entire flight data
var flightData = [];

// read json file data
fetch('./assets/flight-data/flight-data.json')
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                flightData = data;
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });

// filter the data on form submission
function filterData() {
    let arrive = [];
    let depart = [];
    flightData.forEach(d => {
        if (+d.price <= +flightUnitPrice.value) {
            if (d.origin === originCity.value && d.destination === destinationCity.value && d.flight_running_days.includes(new Date(departureDate.value).getDay())) {
                depart.push(d);
            }
            if (arrivalDate.value && arrivalDate.style.display === 'block') {
                if (d.origin === destinationCity.value && d.destination === originCity.value && d.flight_running_days.includes(new Date(arrivalDate.value).getDay())) {
                    arrive.push(d);
                }
            }
        }
    });
    // hide filter widget if opened for mobile
    toggleFilter();
    showFlightData(depart, arrive);
    // prevent the form from submission
    return false;
}

// set header
function setFlightDetailHeader() {
        let flightDetailHeader1 = document.querySelector('#flight-detail-header1');
        let flightDetailHeader2 = document.querySelector('#flight-detail-header2');
        let flightDetailHeader3 = document.querySelector('#flight-detail-header3');
        let text1 = originCity.value.substring(originCity.value.lastIndexOf(" ")) + ' - ' + destinationCity.value.substring(destinationCity.value.lastIndexOf(" "));
        let text2 = 'Depart: ' + departureDate.value;
        let text3 = '';
        if (arrivalDate.value) {
            text1 += ' - ' + originCity.value.substring(originCity.value.lastIndexOf(" "));
            text3 = 'Return: ' + arrivalDate.value;
        }
        flightDetailHeader1.textContent = text1;
        flightDetailHeader2.textContent = text2;
        flightDetailHeader3.textContent = text3;
}

// create dom that contains filtered data
function showFlightData(depart, arrive) {
    // hide flight search message
    let searchMessage = document.querySelector('#search-flight');
    searchMessage.style.display = 'none';

    //update search header
    setFlightDetailHeader();

    let flightDetailContainer = document.querySelector("#scroll-panel-details");

    // Remove old filght detail data
    while (flightDetailContainer.childNodes.length > 1) {
        flightDetailContainer.removeChild(flightDetailContainer.lastChild);
    }


    let largestLength = depart.length > arrive.length ? depart.length : arrive.length;
    for (let row = 0; row < largestLength; row++) {
        let panel
        if (row < depart.length) {
            panel = document.createElement('div')
            panel.classList.add("filter-result-panel");
            // add arrival & departure flight details
            let data = findData(depart[row]);
            panel.appendChild(createFlightDetailView(data));

            if (row < arrive.length) {
                data = ((+depart[row]['price']) * (+passengerCount.value) + (+arrive[row]['price']) * (+passengerCount.value)).toFixed(2);
                panel.appendChild(createDivider(data, true));
                data = findData(arrive[row]);
                panel.appendChild(createFlightDetailView(data));
            } else {
                data = ((+depart[row]['price']) * (+passengerCount.value)).toFixed(2);
                panel.appendChild(createDivider(data, false));
            }
        }
        flightDetailContainer.appendChild(panel);
    }
    if (!depart.length) {
        flightDetailContainer.appendChild(createNoResultDiv());
    }

}

// create detail paenl
function createFlightDetailView(data) {
    let panelChild1 = document.createElement('div');
    panelChild1.classList.add("filter-child");
    let c = 0;
    for (let i = 0; i < 2; i++) {
        let panelChild11 = document.createElement('div');
        if (i === 0) {
            panelChild11.classList.add('larger-flex');
        }

        let panelChild111 = document.createElement('div');

        let panelChild1111, panelChild1112;
        panelChild1111 = document.createElement('div');
        panelChild1111.classList.add('bold-text');
        panelChild1112 = document.createElement('div');
        panelChild1112.classList.add('light-smaller-text');

        let text1 = document.createTextNode(data[c++]);
        let text2 = document.createTextNode(data[c++]);
        panelChild1111.appendChild(text1);
        panelChild1112.appendChild(text2);

        panelChild111.appendChild(panelChild1111);
        panelChild111.appendChild(panelChild1112);

        panelChild11.appendChild(panelChild111);
        panelChild1.appendChild(panelChild11);
    }
    return panelChild1;
}

// create divider if return date is specified
function createDivider(data, showIcon) {
    let panelChild1 = document.createElement('div');
    panelChild1.classList.add('filter-exchange');
    if (showIcon) {
        let iconChild = document.createElement('i');
        iconChild.classList.add('fas');
        iconChild.classList.add('fa-exchange-alt');
        panelChild1.appendChild(iconChild);
    }

    let panelChild11 = document.createElement('div')
    let text = document.createTextNode(data);
    panelChild11.appendChild(text);
    panelChild1.appendChild(panelChild11);

    return panelChild1;
}

function findData(data) {
    let d = [];
    d.push(data['departure_time'] + ' - ' + data['arrival_time']);
    d.push('AirGO');
    d.push(data['flight_no']);
    d.push(data['origin'].substring(data['origin'].lastIndexOf(" ")) + ' - ' + data['destination'].substring(data['destination'].lastIndexOf(" ")));
    return d;
}

// create no data panel
function createNoResultDiv() {
    let noResult = document.createElement('div');
    noResult.classList.add('no-result');
    let noResultChild1 = document.createElement('div');
    let noResultChildImg = document.createElement('img');
    noResultChildImg.src = './assets/img/alert.png';
    noResultChild1.appendChild(noResultChildImg);
    let noResultChild2 = document.createElement('div');
    let text = document.createTextNode('No Flights Found');
    noResultChild2.appendChild(text);
    noResult.appendChild(noResultChild1);
    noResult.appendChild(noResultChild2);
    return noResult;
}
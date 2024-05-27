let map; // Declare map variable outside the function scope

function searchAddress(event) {
    event.preventDefault();
    const address = document.getElementById("address").value;

    // Perform geocoding to get latitude and longitude coordinates
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const { lat, lon } = data[0];

            // Check if map is already initialized
            if (!map) {
                map = L.map('map').setView([lat, lon], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
            } else {
                map.setView([lat, lon], 15); // Update map view
            }

            L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${address}</b>`).openPopup();
        } else {
            alert("Address not found!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error searching for address!");
    });
}

$(document).ready(function() {
    var year = new Date().getFullYear();
    $("#year").html("<i class='fa-solid fa-leaf'></i> <span style='font-weight: bold;'>" + year + "</span>  <i class='fa-solid fa-angle-left'></i>Recuperiamo insieme il patrimonio immobiliare italiano<i class='fa-solid fa-angle-right'></i>");
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.selectable-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            cards.forEach(c => {
                c.classList.remove('selezionata');
            });

            // Add box shadow to the clicked card
            this.classList.add('selezionata');

            calculateValues_finan();
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.selectable-card2');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove box shadow from all cards
            cards.forEach(c => {
                c.classList.remove('selezionata2');
            });

            // Add box shadow to the clicked card
            this.classList.add('selezionata2');

            calculateValues_finan();

        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.selectable-card3');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove "selected" class from all cards
            cards.forEach(c => {
                c.classList.remove('selezionata3');

            });

            // Add "selected" class to the clicked card
            this.classList.add('selezionata3');

            calculateValues_finan();
        });
    });
});


// Set focus on the "Utente" input field when the page loads
window.onload = function() {
    document.getElementById("username").focus();
};

$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();

        // Get username and password from form
        var username = $('#username').val();
        var password = $('#password').val();

        // Check if username and password match
        if ((username === 'chris' && password === 'chris') || (username === 'thom' && password === 'thom')) {
            // Authentication successful, redirect to the main page
            $('#loginForm').hide();
            $('#title').hide();
            $('#webapp').show();
            $('#footer').show();
        } else {
            // Authentication failed, display error message
            alert('Invalid username or password. Please try again.');
        }
    });

    const yearsInput = document.getElementById("yearsInput");
    const selectedYears = document.getElementById("selectedYears");

    yearsInput.addEventListener("input", function() {
        selectedYears.textContent = this.value + " Anni";
    });

    const quoteInput = document.getElementById("desired_net_income_percentageInput");
    const selectedQuote = document.getElementById("selectedQuote");

    quoteInput.addEventListener("input", function() {
        selectedQuote.textContent = this.value + "%";
    });

    const lettiInput = document.getElementById("lettiInput");
    const selectedLetti = document.getElementById("selectedLetti");

    lettiInput.addEventListener("input", function() {
        if (lettiInput.value == "1") {
            selectedLetti.textContent = this.value + " posto letto";

        } else {
            selectedLetti.textContent = this.value + " posti letto";
        }
    });

    const bagniInput = document.getElementById("bagniInput");
    const selectedBagni = document.getElementById("selectedBagni");

    bagniInput.addEventListener("input", function() {
        if (bagniInput.value == "1") {
            selectedBagni.textContent = this.value + " bagno completo";

        } else {
            selectedBagni.textContent = this.value + " bagni completi";
        }
    });

    $('#analisi_progetto').click(function() {
        // Do something when a card is clicked
        $('#scelta').hide();
        $('#analisi').show();
        window.scrollTo({
          top: 250,
          behavior: 'smooth' // Optional: Smooth scrolling behavior
        });
    });

    $('#finanziabilita_progetto').click(function() {
        // Do something when a card is clicked
        $('#scelta').hide();
        $('#finanziabilita').show();
        window.scrollTo({
          top: 250,
          behavior: 'smooth' // Optional: Smooth scrolling behavior
        });
    });

    $('#back_button_f').click(function() {
        // Do something when a card is clicked
        $('#scelta').show();
        $('#finanziabilita').hide();
        $('#address').val('');
        $('#mqInput').val('');
        $('#rendInput').val('');
        $('#condInput').val('');
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Smooth scrolling behavior
        });
    });

    function validateValues() {
        // Get the values of the input fields
        const addressValue = $('#address').val();
        const mqValue = $('#mqInput').val();
        const rendValue = $('#rendInput').val();
        const condValue = $('#condInput').val();

        // Check if any of the values are empty
        if (addressValue === '' || mqValue === '' || rendValue === '' || condValue === '') {
            // Return false if any value is empty
            return false;
        } else {
            // Return true if all values are filled
            return true;
        }
    }

    $('#next_button_1').click(function() {
        // Perform validation to check if all values are completed
        if (validateValues()) {
            // Do something when all values are completed
            $('#finanziabilita').hide();
            $('#finanziabilita_2').show();
            calculateValues_finan();
            window.scrollTo({
                top: 250,
                behavior: 'smooth' // Optional: Smooth scrolling behavior
            });
        } else {
            // Show an alert or message indicating that all values need to be completed
            alert("Completa tutti i campi per un preventivo!");
        }
    });

    $('#back_button').click(function() {
        // Do something when a card is clicked
        $('#scelta').show();
        $('#analisi').hide();
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Optional: Smooth scrolling behavior
        });
    });

    $('#back_button_2').click(function() {
        // Do something when a card is clicked
        $('#finanziabilita').show();
        $('#finanziabilita_2').hide();
        window.scrollTo({
          top: 250,
          behavior: 'smooth' // Optional: Smooth scrolling behavior
        });
    });
});


$(document).ready(function () {
    $('#inputForm input').on('keypress', function (e) {
        if (e.which === 13) {
            $(this).blur();
        }
    });

    $('#restructuring_cost').on('keypress', function (e) {
        if (e.which === 13) {
            $(this).blur();
        }
    });
});

$(document).ready(function () {
    $('#inputForm input').on('input', function () {
        calculateValues();
    });

    $('#restructuring_cost').on('input', function () {
        if ($(this).val() === '') {
            $('#rcost').hide();
        } else {
            calculateValues();
            $('#rcost').show();
        }
    });

    $('#yearsInput').on('input', function () {
        calculateValues_finan();
    });

    $('#financing_optionsInput').on('input', function () {
        calculateValues_finan();
    });

    $('#irpef').on('input', function () {
        calculateValues_finan();
    });

    $('#desired_net_income_percentageInput').on('input', function () {
        calculateValues_finan();
    });

});




$(document).ready(function () {
    // Calculate values when the page loads
    calculateValues();

    $('#inputForm input, #financing_options, #irpef').on('input', function () {
        calculateValues();
    });

});

function calculateValues() {
    // Retrieve input values

	// dai contratto
    const contractTypology = $('#contract_typology').val()
    const years = parseFloat($('#years').val());
    const uncertaintyPer = parseFloat($('#uncertainty_range').val()) / 100;
    const desiredNetIncomePercentage = parseFloat($('#desired_net_income_percentage').val());
    const riskFreeRate = parseFloat($('#risk_free_rate').val());
    const premioRischio = parseFloat($('#premio_rischio').val());
    const quotaStartup = 0.15;

    const irpef = parseFloat($('#irpef').val());

	// ricavi
	const grossMonthlyIncome = parseFloat($('#gross_monthly_income').val());
    const grossAnnualIncome = grossMonthlyIncome * 12;
	const revenuesMin = grossAnnualIncome * (1 - uncertaintyPer);
    const revenuesMax = grossAnnualIncome * (1 + uncertaintyPer);
    const revenuesMid = grossAnnualIncome;

	// costi
    const notaio = parseFloat($('#notaio').val()) / years;

	const secondHomeTaxMid = parseFloat($('#second_home_tax').val());
    const secondHomeTaxMin = secondHomeTaxMid * (1 + uncertaintyPer);
    const secondHomeTaxMax = secondHomeTaxMid * (1 - uncertaintyPer);

    const wasteCollectionTaxMid = parseFloat($('#waste_collection_tax').val())
    const wasteCollectionTaxMin = wasteCollectionTaxMid * (1 + uncertaintyPer);
    const wasteCollectionTaxMax = wasteCollectionTaxMid * (1 - uncertaintyPer);

    const monthlyCondoFeesMid = parseFloat($('#monthly_condo_fees').val())
    const monthlyCondoFeesMin = monthlyCondoFeesMid * (1 + uncertaintyPer);
    const monthlyCondoFeesMax = monthlyCondoFeesMid * (1 - uncertaintyPer);

    const monthlyUtilitiesMid = parseFloat($('#monthly_utilities').val())
    const monthlyUtilitiesMin = monthlyUtilitiesMid * (1 + uncertaintyPer);
    const monthlyUtilitiesMax = monthlyUtilitiesMid * (1 - uncertaintyPer);

    const monthlyUtilitiesEmptyMid = monthlyUtilitiesMid * 0.6
    const monthlyUtilitiesEmptyMin = monthlyUtilitiesMin * 0.6
    const monthlyUtilitiesEmptyMax = monthlyUtilitiesMax * 0.6

    const monthlyMiscellaneousCostsMid = parseFloat($('#monthly_miscellaneous_costs').val());
    const monthlyMiscellaneousCostsMin = monthlyMiscellaneousCostsMid * (1 + uncertaintyPer);
    const monthlyMiscellaneousCostsMax = monthlyMiscellaneousCostsMid * (1 - uncertaintyPer);

	const monthlyMiscellaneousCostsEmptyMid = monthlyUtilitiesEmptyMid * 0.5
	const monthlyMiscellaneousCostsEmptyMin = monthlyUtilitiesEmptyMin * 0.5
	const monthlyMiscellaneousCostsEmptyMax = monthlyUtilitiesEmptyMax * 0.5

    const propertyManagementFeesMid = parseFloat($('#property_management_fees').val());
    const propertyManagementFeesMin = propertyManagementFeesMid * (1 + uncertaintyPer);
    const propertyManagementFeesMax = propertyManagementFeesMid * (1 - uncertaintyPer);

    const taxesHomeMin = secondHomeTaxMin + wasteCollectionTaxMin;
    const taxesHomeMax = secondHomeTaxMax + wasteCollectionTaxMax;
    const taxesHomeMid = secondHomeTaxMid + wasteCollectionTaxMid;

    const feesMin = (monthlyCondoFeesMin + monthlyUtilitiesMin + monthlyMiscellaneousCostsMin) * 12;
    const feesMax = (monthlyCondoFeesMax + monthlyUtilitiesMax + monthlyMiscellaneousCostsMax) * 12;
    const feesMid = (monthlyCondoFeesMid + monthlyUtilitiesMid + monthlyMiscellaneousCostsMid) * 12;

	const feesEmptyMin = (monthlyCondoFeesMin + monthlyUtilitiesEmptyMin + monthlyMiscellaneousCostsEmptyMin) * 12;
	const feesEmptyMax = (monthlyCondoFeesMax + monthlyUtilitiesEmptyMax + monthlyMiscellaneousCostsEmptyMax) * 12;
	const feesEmptyMid = (monthlyCondoFeesMid + monthlyUtilitiesEmptyMid + monthlyMiscellaneousCostsEmptyMid) * 12;

    const fixedcostMin = (monthlyCondoFeesMin + monthlyUtilitiesEmptyMin + monthlyMiscellaneousCostsEmptyMin) * 12 + taxesHomeMin + notaio;
    const fixedcostMax = (monthlyCondoFeesMax + monthlyUtilitiesEmptyMax + monthlyMiscellaneousCostsEmptyMax) * 12 + taxesHomeMax + notaio;
    const fixedcostMid = (monthlyCondoFeesMid + monthlyUtilitiesEmptyMid + monthlyMiscellaneousCostsEmptyMid) * 12 + taxesHomeMid + notaio;

    const managementCostsMin = propertyManagementFeesMin * 12;
    const managementCostsMax = propertyManagementFeesMax * 12;
    const managementCostsMid = propertyManagementFeesMid * 12;

    const totalStartupTaxesMid = (revenuesMid - feesMid - managementCostsMid) * 0.28
    const totalStartupTaxesMin = (revenuesMin - feesMin - managementCostsMin) * 0.28
    const totalStartupTaxesMax = (revenuesMax - feesMax - managementCostsMax) * 0.28

    const totalTaxesMin = totalStartupTaxesMin + taxesHomeMin;
    const totalTaxesMax = totalStartupTaxesMax + taxesHomeMax;
    const totalTaxesMid = totalStartupTaxesMid + taxesHomeMid;

    const utileRichiestoMid = revenuesMid * quotaStartup;
    const utileRichiestoMin = revenuesMin * quotaStartup;
    const utileRichiestoMax = revenuesMax * quotaStartup;

    const generalCostsMin = feesMin + managementCostsMin + notaio;
    const generalCostsMax = feesMax + managementCostsMax + notaio;
    const generalCostsMid = feesMid + managementCostsMid + notaio;

    const generalCostsEmptyMin = feesEmptyMin + notaio;
    const generalCostsEmptyMax = feesEmptyMax + notaio;
    const generalCostsEmptyMid = feesEmptyMid + notaio;

    const totalCostsMin = totalTaxesMin + generalCostsMin;
    const totalCostsMax = totalTaxesMax + generalCostsMax;
    const totalCostsMid = totalTaxesMid + generalCostsMid;
    const expectedAnnualProfitMin = revenuesMin - totalCostsMin;
    const expectedAnnualProfitMax = revenuesMax - totalCostsMax;
    const expectedAnnualProfitMid = revenuesMid - totalCostsMid;
    const ownerFeeMin = expectedAnnualProfitMin * (desiredNetIncomePercentage / 100);
    const ownerFeeMax = expectedAnnualProfitMax * (desiredNetIncomePercentage / 100);
    const ownerFeeMid = expectedAnnualProfitMid * (desiredNetIncomePercentage / 100);

    const downpayment = $('#financing_options').val();
    let downpaymentQuantityMin = 0;
    let downpaymentQuantityMax = 0;
    let downpaymentQuantityMid = 0;

    if (downpayment == 'Costi Fissi') {
        downpaymentQuantityMin = fixedcostMin / 1.22;
        downpaymentQuantityMax = fixedcostMax / 1.22;
        downpaymentQuantityMid = fixedcostMid / 1.22;
    } else if (downpayment == 'Cond.+Imu+Tari') {
        downpaymentQuantityMin = (taxesHomeMin + monthlyCondoFeesMin) / 1.22;
        downpaymentQuantityMax = (taxesHomeMax + monthlyCondoFeesMax) / 1.22;
        downpaymentQuantityMid = (taxesHomeMid + monthlyCondoFeesMid) / 1.22;
    } else if (downpayment == 'Imu+Tari') {
        downpaymentQuantityMin = taxesHomeMin / 1.22;
        downpaymentQuantityMax = taxesHomeMax / 1.22;
        downpaymentQuantityMid = taxesHomeMid / 1.22;
    } else if (downpayment == 'Imu') {
        downpaymentQuantityMin = secondHomeTaxMin / 1.22;
        downpaymentQuantityMax = secondHomeTaxMax / 1.22;
        downpaymentQuantityMid = secondHomeTaxMid / 1.22;
    }

    const utileSpendibileMin = expectedAnnualProfitMin - ownerFeeMin + downpaymentQuantityMin * 0.72 - utileRichiestoMid;
    const utileSpendibileMax = expectedAnnualProfitMax - ownerFeeMax + downpaymentQuantityMax * 0.72 - utileRichiestoMax;
    const utileSpendibileMid = expectedAnnualProfitMid - ownerFeeMid + downpaymentQuantityMid * 0.72 - utileRichiestoMid;

    const totalRate = (riskFreeRate + premioRischio) / 100;
    const rfRate = riskFreeRate / 100;

    const totaleFinanziabileMin = utileSpendibileMin * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const totaleFinanziabileMax = utileSpendibileMax * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const totaleFinanziabileMid = utileSpendibileMid * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const totaleFinanziabileVeroMin = totaleFinanziabileMin / (1 + irpef);
    const totaleFinanziabileVeroMax = totaleFinanziabileMax / (1 + irpef);
    const totaleFinanziabileVeroMid = totaleFinanziabileMid / (1 + irpef);

	let fiscalbenefitMin;
    let fiscalbenefitMax;
    let fiscalbenefitMid;

    if (irpef > 0) {
        fiscalbenefitMin = totaleFinanziabileVeroMin / 2 / 10;
        fiscalbenefitMax = totaleFinanziabileVeroMax / 2 / 10;
        fiscalbenefitMid = totaleFinanziabileVeroMid / 2 / 10;
    } else {
        fiscalbenefitMin = 0;
        fiscalbenefitMax = 0;
        fiscalbenefitMid = 0;
    }

    const ricaviTotaliMid = revenuesMid * years;
    const ricaviTotaliMin = revenuesMin * years;
    const ricaviTotaliMax = revenuesMax * years;

    const costiTotaliMid = (notaio + taxesHomeMid + feesMid + managementCostsMid) * years;
    const costiTotaliMin = (notaio + taxesHomeMin + feesMin + managementCostsMin) * years;
    const costiTotaliMax = (notaio + taxesHomeMax + feesMax + managementCostsMax) * years;

    const utiliTotaliLordiMid = ricaviTotaliMid - costiTotaliMid;
    const utiliTotaliLordiMin = ricaviTotaliMin - costiTotaliMin;
    const utiliTotaliLordiMax = ricaviTotaliMax - costiTotaliMax;

    const utiliTotaliNettiMid = utiliTotaliLordiMid - (ricaviTotaliMid - (feesMid + managementCostsMid) * years) * 0.28;
    const utiliTotaliNettiMin = utiliTotaliLordiMin - (ricaviTotaliMin - (feesMin + managementCostsMin) * years) * 0.28;
    const utiliTotaliNettiMax = utiliTotaliLordiMax - (ricaviTotaliMax - (feesMax + managementCostsMax) * years) * 0.28;

    const recuperoCapitaleMid = totaleFinanziabileMid / (utiliTotaliNettiMid) * years;
    const recuperoCapitaleMin = totaleFinanziabileMin / (utiliTotaliNettiMin) * years;
    const recuperoCapitaleMax = totaleFinanziabileMax / (utiliTotaliNettiMax) * years;

    const utiliTotaleNettiPropMid = (utiliTotaliLordiMid + notaio * years) * 0.79;
    const utiliTotaleNettiPropMin = (utiliTotaliLordiMin + notaio * years) * 0.79;
    const utiliTotaleNettiPropMax = (utiliTotaliLordiMax + notaio * years) * 0.79;

    const costiLavoriPropMid = totaleFinanziabileMid * 1.20;
    const costiLavoriPropMin = totaleFinanziabileMin * 1.20;
    const costiLavoriPropMax = totaleFinanziabileMax * 1.20;

    const recuperoCapitalePropMid = years - costiLavoriPropMid / (utiliTotaleNettiPropMid) * years;
    const recuperoCapitalePropMin = years - costiLavoriPropMin / (utiliTotaleNettiPropMin) * years;
    const recuperoCapitalePropMax = years - costiLavoriPropMax / (utiliTotaleNettiPropMin) * years;

    const profitOnRevenues = (expectedAnnualProfitMid + totalStartupTaxesMid + notaio) / revenuesMid * 100;
    const profitOnRevenuesMin = (expectedAnnualProfitMin + totalStartupTaxesMin + notaio) / revenuesMin * 100;
    const profitOnRevenuesMax = (expectedAnnualProfitMax + totalStartupTaxesMax + notaio) / revenuesMax * 100;

    const returnOnICapital = ((utiliTotaliLordiMid / totaleFinanziabileMid) - 1) * 100;
    const returnOnICapitalMin = ((utiliTotaliLordiMin / totaleFinanziabileMin) - 1) * 100;
    const returnOnICapitalMax = ((utiliTotaliLordiMax / totaleFinanziabileMax) - 1) * 100;

    const annualizedReturn = (Math.pow(1 + returnOnICapital/100, 1 / years) - 1) * 100;
    const annualizedReturnMin = (Math.pow(1 + returnOnICapitalMin/100, 1 / years) - 1) * 100;
    const annualizedReturnMax = (Math.pow(1 + returnOnICapitalMax/100, 1 / years) - 1) * 100;

    const returnOnICapitalNet = ((utiliTotaliNettiMid / totaleFinanziabileMid) - 1) * 100;
    const returnOnICapitalNetMin = ((utiliTotaliNettiMin / totaleFinanziabileMin) - 1) * 100;
    const returnOnICapitalNetMax = ((utiliTotaliNettiMax / totaleFinanziabileMax) - 1) * 100;

    const annualizedReturnNet = (Math.pow(1 + returnOnICapitalNet/100, 1 / years) - 1) * 100;
    const annualizedReturnNetMin = (Math.pow(1 + returnOnICapitalNetMin/100, 1 / years) - 1) * 100;
    const annualizedReturnNetMax = (Math.pow(1 + returnOnICapitalNetMax/100, 1 / years) - 1) * 100;

    const quotaProprietarioMid = -downpaymentQuantityMid * 1.22 + ownerFeeMid
    const quotaProprietarioMin = -downpaymentQuantityMin * 1.22 + ownerFeeMin
    const quotaProprietarioMax = -downpaymentQuantityMax * 1.22 + ownerFeeMax

    const coeffVar = (utiliTotaliNettiMax - utiliTotaliNettiMin)/(utiliTotaliNettiMax + utiliTotaliNettiMin) * 100;
    const devStand = (utiliTotaliNettiMax - utiliTotaliNettiMin)/2

    const revcostMid = revenuesMid / (totalCostsMid - totalStartupTaxesMid);
    const revcostMin = revenuesMin / (totalCostsMin - totalStartupTaxesMin);
    const revcostMax = revenuesMax / (totalCostsMax - totalStartupTaxesMax);

    let renditaPareggioMid = (taxesHomeMid + generalCostsEmptyMid + utileSpendibileMid - downpaymentQuantityMid * 0.72) / 12;
    let renditaPareggioMin = (taxesHomeMin + generalCostsEmptyMin + utileSpendibileMin - downpaymentQuantityMin * 0.72) / 12;
    let renditaPareggioMax = (taxesHomeMax + generalCostsEmptyMax + utileSpendibileMax - downpaymentQuantityMax * 0.72) / 12;

    const totaleFinanziato = parseFloat($('#restructuring_cost').val());

    const recuperoCapitaleMid_eff = totaleFinanziato / (utiliTotaliNettiMid) * years
    const recuperoCapitaleMin_eff = totaleFinanziato / (utiliTotaliNettiMin) * years
    const recuperoCapitaleMax_eff = totaleFinanziato / (utiliTotaliNettiMax) * years

    const costiLavoriPropMid_eff = totaleFinanziato * 1.20;
    const costiLavoriPropMin_eff = totaleFinanziato * 1.20;
    const costiLavoriPropMax_eff = totaleFinanziato * 1.20;

    const recuperoCapitalePropMid_eff = years - costiLavoriPropMid_eff / (utiliTotaleNettiPropMid) * years;
    const recuperoCapitalePropMin_eff = years - costiLavoriPropMin_eff / (utiliTotaleNettiPropMin) * years;
    const recuperoCapitalePropMax_eff = years - costiLavoriPropMax_eff / (utiliTotaleNettiPropMax) * years;

    const totRata = totaleFinanziato / ((1 - Math.pow(1 + totalRate, -years)) / totalRate);
    const totFinanziatoRiskFree = totRata * (1 - Math.pow(1 + rfRate, -years)) / rfRate;

    const returnOnICapital_eff = ((utiliTotaliLordiMid / totaleFinanziato) -1) * 100;
    const returnOnICapitalMin_eff = ((utiliTotaliLordiMin / totaleFinanziato) -1) * 100;
    const returnOnICapitalMax_eff = ((utiliTotaliLordiMax / totaleFinanziato) -1) * 100;

    const annualizedReturn_eff = (Math.pow(1 + returnOnICapital_eff/100, 1 / years) - 1) * 100;
    const annualizedReturnMin_eff = (Math.pow(1 + returnOnICapitalMin_eff/100, 1 / years) - 1) * 100;
    const annualizedReturnMax_eff = (Math.pow(1 + returnOnICapitalMax_eff/100, 1 / years) - 1) * 100;

    const returnOnICapitalNet_eff = ((utiliTotaliNettiMid / totaleFinanziato) -1) * 100;
    const returnOnICapitalNetMin_eff = ((utiliTotaliNettiMin / totaleFinanziato) -1) * 100;
    const returnOnICapitalNetMax_eff = ((utiliTotaliNettiMax / totaleFinanziato) -1) * 100;

    const annualizedReturnNet_eff = (Math.pow(1 + returnOnICapitalNet_eff/100, 1 / years) - 1) * 100;
    const annualizedReturnNetMin_eff = (Math.pow(1 + returnOnICapitalNetMin_eff/100, 1 / years) - 1) * 100;
    const annualizedReturnNetMax_eff = (Math.pow(1 + returnOnICapitalNetMax_eff/100, 1 / years) - 1) * 100;

    const coeffVar_eff = (utiliTotaliNettiMax - utiliTotaliNettiMin) / (utiliTotaliNettiMax + utiliTotaliNettiMin) * 100;
    const devStand_eff = (utiliTotaliNettiMax - utiliTotaliNettiMin) / 2

    let renditaPareggioMid_eff = (taxesHomeMid + generalCostsEmptyMid + totRata - downpaymentQuantityMid * 0.72) / 12;
    let renditaPareggioMin_eff = (taxesHomeMin + generalCostsEmptyMin + totRata - downpaymentQuantityMin * 0.72) / 12;
    let renditaPareggioMax_eff = (taxesHomeMax + generalCostsEmptyMax + totRata - downpaymentQuantityMax * 0.72) / 12;

    const npvMid = (utiliTotaliNettiMid / years + downpaymentQuantityMid * 0.72) * (1 - Math.pow(1 + totalRate, -years)) / totalRate - totaleFinanziabileMid;
    const npvMin = (utiliTotaliNettiMin / years + downpaymentQuantityMin * 0.72) * (1 - Math.pow(1 + totalRate, -years)) / totalRate - totaleFinanziabileMin;
    const npvMax = (utiliTotaliNettiMax / years + downpaymentQuantityMax * 0.72) * (1 - Math.pow(1 + totalRate, -years)) / totalRate - totaleFinanziabileMax;

    const npvMid_eff = (utiliTotaliNettiMid / years + downpaymentQuantityMid * 0.72) * (1 - Math.pow(1 + totalRate, -years)) / totalRate - totaleFinanziato;
    const npvMin_eff = (utiliTotaliNettiMin / years + downpaymentQuantityMin * 0.72) * (1 - Math.pow(1 + totalRate, -years)) / totalRate - totaleFinanziato;
    const npvMax_eff = (utiliTotaliNettiMax / years + downpaymentQuantityMax * 0.72) * (1 - Math.pow(1 + totalRate, -years)) / totalRate - totaleFinanziato;

    const utileImmobileMid = expectedAnnualProfitMid + totalStartupTaxesMid + notaio;
    const utileImmobileMin = expectedAnnualProfitMin + totalStartupTaxesMin + notaio;
    const utileImmobileMax = expectedAnnualProfitMax + totalStartupTaxesMax + notaio;

    function calculateDigitalPutTotalPV(S, K, sigma, r, maturity, step, dividendYield) {
        let totalPV = 0;

        for (let t = 1; t <= maturity; t++) {
            for (let m = K; m >= step; m -= step) {
                // Calculate time to maturity
                let T = t;

                // Calculate d1 and d2
                let d1 = (Math.log(S / m) + (r - dividendYield + (sigma ** 2) / 2) * T) / (sigma * Math.sqrt(T));
                let d2 = d1 - sigma * Math.sqrt(T);

                // Calculate N(-d2)
                let Nd2 = Math.exp(-0.5 * d2 ** 2) / Math.sqrt(2 * Math.PI);

                // Calculate PV
                let PV = Math.exp(-r * T) * Nd2;

                // Add PV to total
                totalPV += PV * step;

            }
        }

        // Convert total PV to euro
        let totalPremiumEuro = totalPV;

        return totalPremiumEuro;
    }

    // Example usage:
    let volatility = 0.20;

    let totalPremiumEuroMid = calculateDigitalPutTotalPV(grossAnnualIncome, renditaPareggioMid_eff * 12, volatility, rfRate, years, 10, -rfRate);
    let totalPremiumEuroMin = calculateDigitalPutTotalPV(revenuesMin, renditaPareggioMin_eff * 12, volatility, rfRate, years, 10, -rfRate);
    let totalPremiumEuroMax = calculateDigitalPutTotalPV(revenuesMax, renditaPareggioMax_eff * 12, volatility, rfRate, years, 10, -rfRate);

    // Update output placeholders
    $('#output').html(`
        <strong><p>Totale entrate annuali previste: ${revenuesMid.toFixed(2)}€ (${revenuesMin.toFixed(2)}€/${revenuesMax.toFixed(2)}€)</p></strong>
        <br>
        <p style="font-weight: 500; padding-top: 5px;">Uscite generali: ${generalCostsMid.toFixed(2)}€ (${generalCostsMin.toFixed(2)}€/${generalCostsMax.toFixed(2)}€)</p>
        <em><p>&emsp;&#8226 Costo atto notarile per usufrutto: ${notaio.toFixed(2)}€ (${notaio.toFixed(2)}€/${notaio.toFixed(2)}€)</p></em>
        <em><p>&emsp;&#8226 Spese annuali per utenze, condominio e varie: ${feesMid.toFixed(2)}€ (${feesMin.toFixed(2)}€/${feesMax.toFixed(2)}€)</p></em>
        <em><p>&emsp;&#8226 Spese gestione immobiliare: ${managementCostsMid.toFixed(2)}€ (${managementCostsMin.toFixed(2)}€/${managementCostsMax.toFixed(2)}€)</p></em>
        <p style="font-weight: 500; padding-top: 5px;">Tasse ed imposte: ${totalTaxesMid.toFixed(2)} (${totalTaxesMin.toFixed(2)}€/${totalTaxesMax.toFixed(2)}€)</p>
        <em><p>&emsp;&#8226 Tassa rifiuti e tassa possesso fabbricati: ${taxesHomeMid.toFixed(2)}€ (${taxesHomeMin.toFixed(2)}€/${taxesHomeMax.toFixed(2)}€)</p></em>
        <em><p>&emsp;&#8226 IRES + IRAP: ${totalStartupTaxesMid.toFixed(2)}€ (${totalStartupTaxesMin.toFixed(2)}€/${totalStartupTaxesMax.toFixed(2)}€)</p></em>

        <strong><p>Totale uscite annuali previste: ${totalCostsMid.toFixed(2)}€ (${totalCostsMin.toFixed(2)}€/${totalCostsMax.toFixed(2)}€)</p></strong>
        <br>
        <p>Utile annuale previsto: ${expectedAnnualProfitMid.toFixed(2)}€ (${expectedAnnualProfitMin.toFixed(2)}€/${expectedAnnualProfitMax.toFixed(2)}€)</p>
        <p>Quota entrate richiesta dal proprietario: ${ownerFeeMid.toFixed(2)}€ (${ownerFeeMin.toFixed(2)}€/${ownerFeeMax.toFixed(2)}€)</p>
        <p>Quota startup: ${utileRichiestoMid.toFixed(2)}€ (${utileRichiestoMin.toFixed(2)}€/${utileRichiestoMax.toFixed(2)}€)</p>
        <strong><p>Utile annuale destinato al rimborso prestito: ${utileSpendibileMid.toFixed(2)}€ (${utileSpendibileMin.toFixed(2)}€/${utileSpendibileMax.toFixed(2)}€)</p></strong>
        <br>
        <p style="font-size: 0.75rem;">Totale finanziabile: <strong>${totaleFinanziabileMid.toFixed(2)}€ (${totaleFinanziabileMin.toFixed(2)}€/${totaleFinanziabileMax.toFixed(2)}€)</strong></p>
        <p style="font-size: 0.95rem;">Totale lavori finanziabili: <strong>${totaleFinanziabileVeroMid.toFixed(2)}€ (${totaleFinanziabileVeroMin.toFixed(2)}€/${totaleFinanziabileVeroMax.toFixed(2)}€)</strong></p>
        <!-- Add more calculated values here -->
    `);

    // Update output placeholders
    $('#startupGains').html(`
        <p>Ricavi lordi totali: ${ricaviTotaliMid.toFixed(2)}€ (${ricaviTotaliMin.toFixed(2)}€/${ricaviTotaliMax.toFixed(2)}€)</p>
        <p>Utili netti totali: ${utiliTotaliNettiMid.toFixed(2)}€ (${utiliTotaliNettiMin.toFixed(2)}€/${utiliTotaliNettiMax.toFixed(2)}€)</p>
        <p>Totale finanziato: ${totaleFinanziabileMid.toFixed(2)}€ (${totaleFinanziabileMin.toFixed(2)}€/${totaleFinanziabileMax.toFixed(2)}€)</p>
        <p style="font-size: 0.95rem;">Net Present Value: <strong>${npvMid.toFixed(2)}€ (${npvMin.toFixed(2)}€/${npvMax.toFixed(2)}€)</strong></p>
    `);

    // Update output placeholders
    $('#entrateuscite').html(`
        <center><p style="font-size: 2rem;">${revcostMid.toFixed(2)}x</p></center>
        <center><p style="font-size: 0.8rem;">(${revcostMin.toFixed(2)}x/${revcostMax.toFixed(2)}x)</p></center>
    `);

    // Update output placeholders
    $('#rendita_pareggio').html(`
        <center><p style="font-size: 2rem;">${renditaPareggioMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${renditaPareggioMin.toFixed(2)}€/${renditaPareggioMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#lavorifinanziati').html(`
        <center><p style="font-size: 2rem;">${totaleFinanziabileVeroMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${totaleFinanziabileVeroMin.toFixed(2)}€/${totaleFinanziabileVeroMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#quotapagata').html(`
        <center><p style="font-size: 2rem;">${quotaProprietarioMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${quotaProprietarioMin.toFixed(2)}€/${quotaProprietarioMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#utileprevisto').html(`
        <center><p style="font-size: 2rem;">${utileImmobileMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${utileImmobileMin.toFixed(2)}€/${utileImmobileMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#por').html(`
        <center><p style="font-size: 2rem;">${profitOnRevenues.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${profitOnRevenuesMin.toFixed(2)}%/${profitOnRevenuesMax.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#fixedcost').html(`
        <center><p style="font-size: 2rem;">${fixedcostMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${fixedcostMin.toFixed(2)}€/${fixedcostMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#fiscal').html(`
        <center><p style="font-size: 2rem;">${fiscalbenefitMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${fiscalbenefitMin.toFixed(2)}€/${fiscalbenefitMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#rois').html(`
        <center><p style="font-size: 2rem;">${returnOnICapital.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${returnOnICapitalMin.toFixed(2)}%/${returnOnICapitalMax.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#roisannualized').html(`
        <center><p style="font-size: 2rem;">${annualizedReturn.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${annualizedReturnMin.toFixed(2)}%/${annualizedReturnMax.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#roisn').html(`
        <center><p style="font-size: 2rem;">${returnOnICapitalNet.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${returnOnICapitalNetMin.toFixed(2)}%/${returnOnICapitalNetMax.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#roisannualizedn').html(`
        <center><p style="font-size: 2rem;">${annualizedReturnNet.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${annualizedReturnNetMin.toFixed(2)}%/${annualizedReturnNetMax.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#rendita_pareggio').html(`
        <center><p style="font-size: 2rem;">${renditaPareggioMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${renditaPareggioMin.toFixed(2)}€/${renditaPareggioMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#recupero_capitale').html(`
        <center><p style="font-size: 2rem;">${recuperoCapitaleMid.toFixed(2)} anni</p></center>
        <center><p style="font-size: 0.8rem;">(${recuperoCapitaleMin.toFixed(2)} anni/${recuperoCapitaleMax.toFixed(2)} anni)</p></center>
    `);

    // Update output placeholders
    $('#recupero_capitale_prop').html(`
        <center><p style="font-size: 2rem;">${recuperoCapitalePropMid.toFixed(2)} anni</p></center>
        <center><p style="font-size: 0.8rem;">(${recuperoCapitalePropMin.toFixed(2)} anni/${recuperoCapitalePropMax.toFixed(2)} anni)</p></center>
    `);

    // Update output placeholders
    $('#coeffVariazione').html(`
        <div class="row">
            <div class="col-md-6" style="text-align: center;">
                <p style="font-size: 0.7rem; margin-top: 0px; padding-top: 2px; margin-left: 20px; margin-bottom: 10px; padding-bottom: 2px;"><strong>Deviazione Standard:</strong></p>
                <p style="font-size: 2rem; margin-left: 20px; margin-bottom: 0px; padding-bottom: 10px;">${devStand.toFixed(2)}€</p>
            </div>
            <div class="col-md-6" style="text-align: center;">
                <p style="font-size: 0.7rem; margin-top: 0px; padding-top: 2px; margin-left: 20px; margin-bottom: 10px; padding-bottom: 2px;"><strong>Coefficiente di Variazione:</strong></p>
                <p style="font-size: 2rem; margin-left: 20px; margin-bottom: 7px; padding-bottom: 0px;">${coeffVar.toFixed(2)}%</p>
            </div>
        </div>
    `);

    // Update output placeholders
    $('#ricavi_eff').html(`
        <center><p style="font-size: 2rem;">${ricaviTotaliMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${ricaviTotaliMin.toFixed(2)}€/${ricaviTotaliMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#costi_eff').html(`
        <center><p style="font-size: 2rem;">${costiTotaliMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${costiTotaliMin.toFixed(2)}€/${costiTotaliMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#utililordi_eff').html(`
        <center><p style="font-size: 2rem;">${utiliTotaliLordiMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${utiliTotaliLordiMin.toFixed(2)}€/${utiliTotaliLordiMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#utilinetti_eff').html(`
        <center><p style="font-size: 2rem;">${utiliTotaliNettiMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${utiliTotaliNettiMin.toFixed(2)}€/${utiliTotaliNettiMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#rois_eff').html(`
        <center><p style="font-size: 2rem;">${returnOnICapital_eff.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${returnOnICapitalMin_eff.toFixed(2)}%/${returnOnICapitalMax_eff.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#roisannualized_eff').html(`
        <center><p style="font-size: 2rem;">${annualizedReturn_eff.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${annualizedReturnMin_eff.toFixed(2)}%/${annualizedReturnMax_eff.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#roisn_eff').html(`
        <center><p style="font-size: 2rem;">${returnOnICapitalNet_eff.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${returnOnICapitalNetMin_eff.toFixed(2)}%/${returnOnICapitalNetMax_eff.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#roisannualizedn_eff').html(`
        <center><p style="font-size: 2rem;">${annualizedReturnNet_eff.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${annualizedReturnNetMin_eff.toFixed(2)}%/${annualizedReturnNetMax_eff.toFixed(2)}%)</p></center>
    `);

    // Update output placeholders
    $('#digital_cost_eff').html(`
        <center><p style="font-size: 2rem;">${totalPremiumEuroMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${totalPremiumEuroMin.toFixed(2)}€/${totalPremiumEuroMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#rendita_pareggio_eff').html(`
        <center><p style="font-size: 2rem;">${renditaPareggioMid_eff.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${renditaPareggioMin_eff.toFixed(2)}€/${renditaPareggioMax_eff.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#recupero_capitale_eff').html(`
        <center><p style="font-size: 2rem;">${recuperoCapitaleMid_eff.toFixed(2)} anni</p></center>
        <center><p style="font-size: 0.8rem;">(${recuperoCapitaleMin_eff.toFixed(2)} anni/${recuperoCapitaleMax_eff.toFixed(2)} anni)</p></center>
    `);

    // Update output placeholders
    $('#recupero_capitale_prop_eff').html(`
        <center><p style="font-size: 2rem;">${recuperoCapitalePropMid_eff.toFixed(2)} anni</p></center>
        <center><p style="font-size: 0.8rem;">(${recuperoCapitalePropMin_eff.toFixed(2)} anni/${recuperoCapitalePropMax_eff.toFixed(2)} anni)</p></center>
    `);

        // Update output placeholders
    $('#npv').html(`
        <center><p style="font-size: 0.75rem; padding-bottom: 10px;">NPV effettivo del progetto</p></center>
        <center><p style="font-size: 2rem;">${npvMid_eff.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${npvMin_eff.toFixed(2)}€/${npvMax_eff.toFixed(2)}€)</p></center>
    `);
}

function calculateValues_finan() {

    const database = [
        { "N. letti": 1, "N. bagni": 1, "occupazione media": "57%", "Rendita mensile": 1022.02 },
        { "N. letti": 2, "N. bagni": 1, "occupazione media": "52%", "Rendita mensile": 1391.08 },
        { "N. letti": 3, "N. bagni": 1, "occupazione media": "43%", "Rendita mensile": 1684.41 },
        { "N. letti": 4, "N. bagni": 1, "occupazione media": "45%", "Rendita mensile": 1750.46 },
        { "N. letti": 5, "N. bagni": 1, "occupazione media": "57%", "Rendita mensile": 2866.18 },
        { "N. letti": 6, "N. bagni": 1, "occupazione media": "48%", "Rendita mensile": 3971.98 },
        { "N. letti": 1, "N. bagni": 2, "occupazione media": "57%", "Rendita mensile": 1022.02 },
        { "N. letti": 2, "N. bagni": 2, "occupazione media": "52%", "Rendita mensile": 1448.64 },
        { "N. letti": 3, "N. bagni": 2, "occupazione media": "44%", "Rendita mensile": 1889.15 },
        { "N. letti": 4, "N. bagni": 2, "occupazione media": "46%", "Rendita mensile": 1987.29 },
        { "N. letti": 5, "N. bagni": 2, "occupazione media": "57%", "Rendita mensile": 2876.60 },
        { "N. letti": 6, "N. bagni": 2, "occupazione media": "47%", "Rendita mensile": 5172.56 },
        { "N. letti": 1, "N. bagni": 3, "occupazione media": "54%", "Rendita mensile": 1188.97 },
        { "N. letti": 2, "N. bagni": 3, "occupazione media": "50%", "Rendita mensile": 1744.47 },
        { "N. letti": 3, "N. bagni": 3, "occupazione media": "43%", "Rendita mensile": 2205.78 },
        { "N. letti": 4, "N. bagni": 3, "occupazione media": "45%", "Rendita mensile": 2317.28 },
        { "N. letti": 5, "N. bagni": 3, "occupazione media": "52%", "Rendita mensile": 3069.93 },
        { "N. letti": 6, "N. bagni": 3, "occupazione media": "44%", "Rendita mensile": 4751.46 },
        { "N. letti": 1, "N. bagni": 4, "occupazione media": "50%", "Rendita mensile": 1651.64 },
        { "N. letti": 2, "N. bagni": 4, "occupazione media": "46%", "Rendita mensile": 1876.85 },
        { "N. letti": 3, "N. bagni": 4, "occupazione media": "47%", "Rendita mensile": 2015.39 },
        { "N. letti": 4, "N. bagni": 4, "occupazione media": "45%", "Rendita mensile": 2417.29 },
        { "N. letti": 5, "N. bagni": 4, "occupazione media": "49%", "Rendita mensile": 3548.27 },
        { "N. letti": 6, "N. bagni": 4, "occupazione media": "44%", "Rendita mensile": 4743.23 }
    ];

    const mq = parseFloat($('#mqInput').val());
    const quotaStartup = 0.15;

    let letti = parseFloat(document.getElementById("lettiInput").value);

    if (letti > 6) {
        letti = 6;
    }

    const bagni = parseFloat(document.getElementById("bagniInput").value);

    function findRenditaMensile(bagni, letti) {
        const entry = database.find(item => item["N. bagni"] === bagni && item["N. letti"] === letti);
        return entry ? entry["Rendita mensile"] : null;
    }

    const grossMonthlyIncome = findRenditaMensile(bagni, letti);
    // const grossMonthlyIncome = 1000;

    const selectedCard = document.querySelector('.selezionata');
    let livello = null;

    if (selectedCard) {
        livello = selectedCard.id;
    }

    const selectedCard2 = document.querySelector('.selezionata2');
    let finiture = null;

    if (selectedCard2) {
        finiture = selectedCard2.id;
    }

    let pxalmqMin = 0;
    let pxalmqMax = 0;
    let costoRistrutturazioneMin = 0;
    let costoRistrutturazioneMax = 0;

    if (livello == 'leggera' && finiture == 'economiche') {
        costoRistrutturazioneMin = 5000;
        costoRistrutturazioneMax = 10000;
    } else if (livello == 'leggera' && finiture == 'medie') {
        costoRistrutturazioneMin = 10000;
        costoRistrutturazioneMax = 15000;
    } else if (livello == 'leggera' && finiture == 'qualita') {
        costoRistrutturazioneMin = 15000;
        costoRistrutturazioneMax = 20000;
    } else if (livello == 'media' && finiture == 'economiche') {
        costoRistrutturazioneMin = 20000;
        costoRistrutturazioneMax = 30000;
    } else if (livello == 'media' && finiture == 'medie') {
        costoRistrutturazioneMin = 30000;
        costoRistrutturazioneMax = 40000;
    } else if (livello == 'media' && finiture == 'qualita') {
        costoRistrutturazioneMin = 30000;
        costoRistrutturazioneMax = 40000;
    } else if (livello == 'completo' && finiture == 'economiche') {
        pxalmqMin = 500;
        pxalmqMax = 700;
        costoRistrutturazioneMin = pxalmqMin * mq;
        costoRistrutturazioneMax = pxalmqMax * mq;
    } else if (livello == 'completa' && finiture == 'medie') {
        pxalmqMin = 700;
        pxalmqMax = 1000;
        costoRistrutturazioneMin = pxalmqMin * mq;
        costoRistrutturazioneMax = pxalmqMax * mq;
    } else {
        pxalmqMin = 1000;
        pxalmqMax = 1400;
        costoRistrutturazioneMin = pxalmqMin * mq;
        costoRistrutturazioneMax = pxalmqMax * mq;
    }

    // Retrieve input values
    const years = parseFloat($('#yearsInput').val());
    const grossAnnualIncome = grossMonthlyIncome * 12;
    const uncertaintyPer = 0.05;
    const revenuesMin = grossAnnualIncome * (1 - uncertaintyPer);
    const revenuesMax = grossAnnualIncome * (1 + uncertaintyPer);
    const revenuesMid = grossAnnualIncome;
    const notaio = parseFloat($('#notaio').val()) / years;

    const monthlyCondoFeesMid = parseFloat($('#condInput').val()) / 12;
    const monthlyCondoFeesMax = monthlyCondoFeesMid;
    const monthlyCondoFeesMin = monthlyCondoFeesMid;

    const monthlyUtilitiesMid = mq * 22 / 12;
    const monthlyUtilitiesMin = monthlyUtilitiesMid * (1 + uncertaintyPer);
    const monthlyUtilitiesMax = monthlyUtilitiesMid * (1 - uncertaintyPer);

    const monthlyMiscellaneousCostsMid = 50;
    const monthlyMiscellaneousCostsMin = monthlyMiscellaneousCostsMid * (1 + uncertaintyPer);
    const monthlyMiscellaneousCostsMax = monthlyMiscellaneousCostsMid * (1 - uncertaintyPer);

    const propertyManagementFeesMid = 200;
    const propertyManagementFeesMin = propertyManagementFeesMid * (1 + uncertaintyPer);
    const propertyManagementFeesMax = propertyManagementFeesMid * (1 - uncertaintyPer);

    const secondHomeTaxMid = parseFloat($('#rendInput').val()) * 1.05 * 160 * 10.6 / 1000;
    const secondHomeTaxMax = secondHomeTaxMid;
    const secondHomeTaxMin = secondHomeTaxMid;

    const wasteCollectionTaxMid = mq * 3.5;
    const wasteCollectionTaxMin = wasteCollectionTaxMid;
    const wasteCollectionTaxMax = wasteCollectionTaxMid;

    const desiredNetIncomePercentage = parseFloat($('#desired_net_income_percentageInput').val());

    const riskFreeRate = parseFloat($('#risk_free_rate').val());
    const premioRischio = parseFloat($('#premio_rischio').val());

    const utileRichiestoMid = revenuesMid * quotaStartup;
    const utileRichiestoMin = revenuesMin * quotaStartup;
    const utileRichiestoMax = revenuesMax * quotaStartup;

    // Perform calculations
    const taxesHomeMin = secondHomeTaxMin + wasteCollectionTaxMin;
    const taxesHomeMax = secondHomeTaxMax + wasteCollectionTaxMax;
    const taxesHomeMid = secondHomeTaxMid + wasteCollectionTaxMid;

    const feesMid = (monthlyCondoFeesMid + monthlyUtilitiesMid + monthlyMiscellaneousCostsMid) * 12;
    const feesMin = (monthlyCondoFeesMin + monthlyUtilitiesMin + monthlyMiscellaneousCostsMin) * 12;
    const feesMax = (monthlyCondoFeesMax + monthlyUtilitiesMax + monthlyMiscellaneousCostsMax) * 12;

    const fixedcostMin = (monthlyCondoFeesMin + 100) * 12 + taxesHomeMin;
    const fixedcostMax = (monthlyCondoFeesMax + 100) * 12 + taxesHomeMax;
    const fixedcostMid = (monthlyCondoFeesMid + 100) * 12 + taxesHomeMid;

    const condotaxMin = fixedcostMin - 100 * 12;
    const condotaxMax = fixedcostMin - 100 * 12;
    const condotaxMid = fixedcostMin - 100 * 12;

    const managementCostsMid = propertyManagementFeesMid * 12;
    const managementCostsMin = propertyManagementFeesMin * 12;
    const managementCostsMax = propertyManagementFeesMax * 12;

    const totalStartupTaxesMid = (revenuesMid - feesMid - managementCostsMid) * 0.28
    const totalStartupTaxesMin = (revenuesMin - feesMin - managementCostsMin) * 0.28
    const totalStartupTaxesMax = (revenuesMax - feesMax - managementCostsMax) * 0.28

    const totalTaxesMid = totalStartupTaxesMid + taxesHomeMid;
    const totalTaxesMin = totalStartupTaxesMin + taxesHomeMin;
    const totalTaxesMax = totalStartupTaxesMax + taxesHomeMax;

    const selectedCard3 = document.querySelector('.selezionata3');
    let downpayment = null;

    if (selectedCard3) {
        downpayment = selectedCard3.id;
    }

    let downpaymentQuantityMin = 0;
    let downpaymentQuantityMax = 0;
    let downpaymentQuantityMid = 0;

    if (downpayment == 'CostiFissi') {
        downpaymentQuantityMin = fixedcostMin;
        downpaymentQuantityMax = fixedcostMax;
        downpaymentQuantityMid = fixedcostMid;
    } else if (downpayment == 'CondominialiTasse') {
        downpaymentQuantityMin = fixedcostMin - 100 * 12;
        downpaymentQuantityMax = fixedcostMax - 100 * 12;
        downpaymentQuantityMid = fixedcostMid - 100 * 12;
    } else if (downpayment == 'Tasse') {
        downpaymentQuantityMin = taxesHomeMin;
        downpaymentQuantityMax = taxesHomeMax;
        downpaymentQuantityMid = taxesHomeMid;
    }

    const generalCostsMin = feesMin + managementCostsMin + notaio;
    const generalCostsMax = feesMax + managementCostsMax + notaio;
    const generalCostsMid = generalCostsMin + (generalCostsMax - generalCostsMin)/2;

    const totalCostsMin = totalTaxesMin + generalCostsMin;
    const totalCostsMax = totalTaxesMax + generalCostsMax;
    const totalCostsMid = totalCostsMin + (totalCostsMax - totalCostsMin)/2;
    const expectedAnnualProfitMin = revenuesMin - totalCostsMin;
    const expectedAnnualProfitMax = revenuesMax - totalCostsMax;
    const expectedAnnualProfitMid = expectedAnnualProfitMin + (expectedAnnualProfitMax-expectedAnnualProfitMin)/2;
    const ownerFeeMin = expectedAnnualProfitMin * (desiredNetIncomePercentage / 100);
    const ownerFeeMax = expectedAnnualProfitMax * (desiredNetIncomePercentage / 100);
    const ownerFeeMid = expectedAnnualProfitMid * (desiredNetIncomePercentage / 100);
    const utileSpendibileMin = expectedAnnualProfitMin - ownerFeeMin + downpaymentQuantityMin - utileRichiestoMid;
    const utileSpendibileMax = expectedAnnualProfitMax - ownerFeeMax + downpaymentQuantityMax - utileRichiestoMax;
    const utileSpendibileMid = utileSpendibileMin + (utileSpendibileMax - utileSpendibileMin)/2;
    const totalRate = (riskFreeRate + premioRischio) / 100;
    const rfRate = riskFreeRate / 100;
    const totaleFinanziabileMin = utileSpendibileMin * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const totaleFinanziabileMax = utileSpendibileMax * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const totaleFinanziabileMid = utileSpendibileMid * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const fiscalbenefitMin = costoRistrutturazioneMin * 0.5 / 10;
    const fiscalbenefitMax = costoRistrutturazioneMax * 0.5 / 10;
    const totalquoteMin = fiscalbenefitMin + ownerFeeMin - downpaymentQuantityMax;
    const totalquoteMax = fiscalbenefitMax + ownerFeeMax - downpaymentQuantityMin;
    const entrateMin = fiscalbenefitMin + ownerFeeMin
    const usciteMax = downpaymentQuantityMax

    let textpaghiincassi = "";

    if (totalquoteMin<0) {
        textpaghiincassi = "<strong>pagherai una quota annuale massima di " + Math.round(-totalquoteMin)+ "€ </strong>"
    } else  {
        textpaghiincassi = "<strong>incasserai una quota annuale minima di " + Math.round(totalquoteMin)+ "€ </strong>"
    }

    let ratioFinanziabilitaMin = 100;
    let ratioFinanziabilitaMax = 100;
    let pagamentoMin = 0;
    let pagamentoMax = 0;

    if (costoRistrutturazioneMax <= totaleFinanziabileMin) {
        ratioFinanziabilitaMin = 100;
        pagamentoMax = 0;
    } else {
        ratioFinanziabilitaMin = totaleFinanziabileMin / costoRistrutturazioneMax * 100;
        pagamentoMax = costoRistrutturazioneMax - totaleFinanziabileMin
    }

    if (costoRistrutturazioneMin <= totaleFinanziabileMid) {
        ratioFinanziabilitaMax = 100;
        pagamentoMin = 0;
    } else {
        ratioFinanziabilitaMax = totaleFinanziabileMid / costoRistrutturazioneMin * 100;
        pagamentoMin = costoRistrutturazioneMin - totaleFinanziabileMid
    }

    let ratiotext = "";
    let ratiomintext = "";
    let pagamentotext = "";

    if (ratioFinanziabilitaMin == ratioFinanziabilitaMax) {
        ratiotext = Math.round(ratioFinanziabilitaMin * 100) / 100 + "%";
        ratiomintext = Math.round(ratioFinanziabilitaMin * 100) / 100;
        pagamentotext = "0€";
    } else {
        ratiotext = "dal " + Math.round(ratioFinanziabilitaMin * 100) / 100 + "% al " + Math.round(ratioFinanziabilitaMax * 100) / 100 + "%";
        ratiomintext = Math.round(ratioFinanziabilitaMin * 100) / 100;
        pagamentotext = "da " + Math.round(pagamentoMin) + "€ a " + Math.round(pagamentoMax) + "€";
    }

    let finaltext = "";

    finaltext = "Il tuo immobile e le tue preferenze riguardo entrate, uscite e anni di contratto garantiscono un nostro pagamento minimo del <span style='font-weight: bold; color: #CC1A48;'>" + Math.round(ratioFinanziabilitaMin * 100) / 100 + "% </span> dei costi stimati per una <strong>ristrutturazione " + livello + " con finiture " + finiture + ".</strong> <br><br> Con la nostra formula ZEROPENSIERI, per <span style='font-weight: bold; color: #CC1A48;'>" + years + " anni </span>" + textpaghiincassi + " senza altri costi e senza doverti preoccupare della gestione del tuo immobile.<br><br> Il costo iniziale a tuo carico stimato è di massimo <span style='font-weight: bold; color: #CC1A48;'>" + Math.round(pagamentoMax) + "€ </span> ed alla scadenza del contratto avrai un <strong>immobile rinnovato e con possibilità di rendita maggiori</strong>.<br><br>"

    // Update output placeholders
    $('#tquote').html(`
       <p style="font-size: 1.5rem; text-align:center;">${taxesHomeMid.toFixed(2)}€</p>
    `);

    // Update output placeholders
    $('#cdtquote').html(`
       <p style="font-size: 1.5rem; text-align:center;">${condotaxMid.toFixed(2)}€</p>
    `);

    // Update output placeholders
    $('#cfquote').html(`
       <p style="font-size: 1.5rem; text-align:center;">${fixedcostMid.toFixed(2)}€</p>
    `);

    // Update output placeholders
    $('#lavori_finanziabili').html(`
        <center><p style="font-size: 0.8rem; padding-top: 40px;">Ecco i risultati basati sul tuo immobile e sulle tue preferenze:</p></center><br><br>
        <div class="row" style="padding-left: 50px; padding-right: 50px; padding-bottom: 40px;">
            <div class="col-md-3">
                <div class="card cardstyle" style="height: 100px; padding: 10px; background-color: white;">
                    <p style="font-size: 0.65rem; text-align: center;">Quota dei lavori a nostro carico:</p>
                    <strong><p style="font-size: 1.5rem; text-align: center;"><span style="font-size: 1.5rem;">min</span>${ratiomintext.toFixed(0)}%</p></strong>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card cardstyle" style="height: 100px; padding: 10px;">
                    <p style="font-size: 0.65rem; text-align: center;">Anni di durata dell\'accordo:</p>
                    <strong><p style="font-size: 1.5rem; text-align: center;">${years}</p></strong>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card cardstyle" style="height: 100px; padding: 10px;">
                    <p style="font-size: 0.65rem; text-align: center;">Le tue entrate annuali minime:</p>
                    <strong><p style="font-size: 1.5rem; text-align: center;">${entrateMin.toFixed(2)}€</p></strong>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card cardstyle" style="height: 100px; padding: 10px;">
                    <p style="font-size: 0.65rem; text-align: center;">Le tue uscite annuali massime:</p>
                    <strong><p style="font-size: 1.5rem; text-align: center;">${usciteMax.toFixed(2)}€</p></strong>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <strong><p style="font-size: 0.7rem; padding-left: 50px; text-align: left;">RISTRUTTURAZIONE:</p></strong>
                <strong><p style="font-size: 0.65rem; padding-left: 50px; text-align: left;">Stima indicativa dei costi di ristrutturazione:</p></strong>
                <br>
                <strong><p style="font-size: 0.7rem; padding-left: 50px; text-align: left;">FLUSSI DI CASSA ANNUALI PER TE:</p></strong>
                <p style="font-size: 0.65rem; padding-left: 50px; text-align: left;">Beneficio fiscale annuale (x10 anni):</p>
                <p style="font-size: 0.65rem; padding-left: 50px; text-align: left;">Quota annuale pagata:</p>
                <p style="font-size: 0.65rem; padding-left: 50px; text-align: left;">Stima delle rendite annuali incassate:</p>
                <strong><p style="font-size: 0.65rem; padding-left: 50px; text-align: left;">Totale:</p></strong>
                <br>
                <strong><p style="font-size: 0.7rem; padding-left: 50px; text-align: left;">PAGAMENTO COSTI DI RISTRUTTURAZIONE:</p></strong>
                <strong><p style="font-size: 0.65rem; padding-left: 50px; text-align: left;">Quota pagata da noi:</p></strong>
                <strong><p style="font-size: 0.65rem; padding-left: 50px; text-align: left;">Costo ristrutturazione a carico tuo:</p></strong>
                <br>
                <br>
            </div>
            <div class="col-md-4">
                <strong><p style="height: 0.85rem; padding-left: 50px; text-align: left;"></p></strong>
                <strong><p style="font-size: 0.65rem; padding-right: 50px; text-align: right;">da ${costoRistrutturazioneMin.toFixed(2)}€ a ${costoRistrutturazioneMax.toFixed(2)}€</p></strong>
                <br>
                <strong><p style="height: 0.85rem; padding-left: 50px; text-align: left;"></p></strong>
                <p style="font-size: 0.65rem; padding-right: 50px; text-align: right;">da ${fiscalbenefitMin.toFixed(2)}€ a ${fiscalbenefitMax.toFixed(2)}€</p>
                <p style="font-size: 0.65rem; padding-right: 50px; text-align: right;">da ${downpaymentQuantityMin.toFixed(2)}€ a ${downpaymentQuantityMin.toFixed(2)}€</p>
                <p style="font-size: 0.65rem; padding-right: 50px; text-align: right;">da ${ownerFeeMin.toFixed(2)}€ a ${ownerFeeMax.toFixed(2)}€</p>
                <strong><p style="font-size: 0.65rem;  padding-right: 50px; text-align: right;">da ${totalquoteMin.toFixed(2)}€ a ${totalquoteMax.toFixed(2)}€</p></strong>
                <br>
                <strong><p style="height: 0.85rem; padding-left: 50px; text-align: left;"></p></strong>
                <strong><p style="font-size: 0.65rem; padding-right: 50px; text-align: right;">${ratiotext}</p></strong>
                <strong><p style="font-size: 0.65rem; padding-right: 50px; text-align: right;">${pagamentotext}</p></strong>
            </div>
        </div>
        <p style="font-size: 0.75rem; padding-left: 50px; padding-right: 50px; text-align: left;">${finaltext}</p>
        <br>
        <strong><p style="font-size: 0.75rem; padding-left: 50px; padding-right: 50px; padding-bottom: 40px; text-align: left;">Invia la richiesta se vuoi essere contattato da un nostro esperto per il preventivo dettagliato!</p></strong>
    `);
}

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

    $('#desired_net_income_percentageInput').on('input', function () {
        calculateValues_finan();
    });

});

$(document).ready(function () {
    $('#contract_typology').change(function () {
        if ($(this).val() === "Concordato") {
            // Set the cedolare secca rate to 10%
            $('#cedolare_secca_rate').val('0.1');
            $('#waste_collection_tax').val('0');
            $('#monthly_utilities').val('0');
            $('#property_management_fees').val('0');
            $('#monthly_miscellaneous_costs').val('0');
            $('#propmanaging_fees').val('5');
            calculateValues();
        }
    });
});


$(document).ready(function () {
    // Calculate values when the page loads
    calculateValues();

    // Bind input event to trigger calculation when input values change
    $('#inputForm input, #cedolare_secca_rate').on('input', function () {
        calculateValues();
    });

    $('#inputForm input, #financing_options').on('input', function () {
        calculateValues();
    });
});

function calculateValues() {
    // Retrieve input values

    const contractTypology = $('#contract_typology').val()
    const years = parseFloat($('#years').val());
    const grossMonthlyIncome = parseFloat($('#gross_monthly_income').val());
    const grossAnnualIncome = grossMonthlyIncome * 12;
    const uncertaintyPer = parseFloat($('#uncertainty_range').val()) / 100;
    const revenuesMin = grossAnnualIncome * (1 - uncertaintyPer);
    const revenuesMax = grossAnnualIncome * (1 + uncertaintyPer);
    const revenuesMid = revenuesMin + (revenuesMax - revenuesMin) / 2;

    const cedolareSeccaRate = parseFloat($('#cedolare_secca_rate').val());
    const tasseCedolareMin = revenuesMin * cedolareSeccaRate
    const tasseCedolareMax = revenuesMax * cedolareSeccaRate
    const monthlyCondoFeesMin = parseFloat($('#monthly_condo_fees').val()) * (1 + uncertaintyPer);
    const monthlyCondoFeesMax = parseFloat($('#monthly_condo_fees').val()) * (1 - uncertaintyPer);
    const monthlyUtilitiesMin = parseFloat($('#monthly_utilities').val()) * (1 + uncertaintyPer);
    const monthlyUtilitiesMax = parseFloat($('#monthly_utilities').val()) * (1 - uncertaintyPer);
    const monthlyMiscellaneousCostsMin = parseFloat($('#monthly_miscellaneous_costs').val()) * (1 + uncertaintyPer);
    const monthlyMiscellaneousCostsMax = parseFloat($('#monthly_miscellaneous_costs').val()) * (1 - uncertaintyPer);
    const propertyManagementFeesMin = parseFloat($('#property_management_fees').val()) * (1 + uncertaintyPer);
    const propertyManagementFeesMax = parseFloat($('#property_management_fees').val()) * (1 - uncertaintyPer);
    const secondHomeTaxMin = parseFloat($('#second_home_tax').val()) * (1 + uncertaintyPer);
    const secondHomeTaxMax = parseFloat($('#second_home_tax').val()) * (1 - uncertaintyPer);
    const secondHomeTaxMid = secondHomeTaxMin + (secondHomeTaxMax - secondHomeTaxMin)/2

    const wasteCollectionTaxMin = parseFloat($('#waste_collection_tax').val()) * (1 + uncertaintyPer);
    const wasteCollectionTaxMax = parseFloat($('#waste_collection_tax').val()) * (1 - uncertaintyPer);
    const desiredNetIncomePercentage = parseFloat($('#desired_net_income_percentage').val());

    const riskFreeRate = parseFloat($('#risk_free_rate').val());
    const premioRischio = parseFloat($('#premio_rischio').val());
    const restructure_fees = parseFloat($('#restructure_fees').val())/100;
    const propmanaging_fees = parseFloat($('#propmanaging_fees').val())/100;

    const totaleFinanziato = parseFloat($('#restructuring_cost').val());

    // Perform calculations
    const taxesMin = tasseCedolareMin
    const taxesMax = tasseCedolareMax
    const taxesMid = tasseCedolareMin + (tasseCedolareMax - tasseCedolareMin)/2
    const taxesHomeMin = secondHomeTaxMin + wasteCollectionTaxMin;
    const taxesHomeMax = secondHomeTaxMax + wasteCollectionTaxMax;
    const taxesHomeMid = taxesHomeMin + (taxesHomeMax - taxesHomeMin)/2
    const totalTaxesMin = tasseCedolareMin + taxesHomeMin;
    const totalTaxesMax = tasseCedolareMax + taxesHomeMax;
    const totalTaxesMid = totalTaxesMin + (totalTaxesMax - totalTaxesMin)/2;
    const feesMin = (monthlyCondoFeesMin + monthlyUtilitiesMin + monthlyMiscellaneousCostsMin) * 12;
    const feesMax = (monthlyCondoFeesMax + monthlyUtilitiesMax + monthlyMiscellaneousCostsMax) * 12;
    const feesMid = feesMin + (feesMax - feesMin)/2;
    const fixedcostMin = (monthlyCondoFeesMin + 100) * 12 + taxesHomeMin;
    const fixedcostMax = (monthlyCondoFeesMax + 100) * 12 + taxesHomeMax;
    const fixedcostMid = fixedcostMin + (fixedcostMax - fixedcostMin)/2;

    const downpayment = $('#financing_options').val();
    let downpaymentQuantityMin = 0;
    let downpaymentQuantityMax = 0;
    let downpaymentQuantityMid = 0;

    if (downpayment == 'Costi Fissi') {
        downpaymentQuantityMin = fixedcostMin;
        downpaymentQuantityMax = fixedcostMax;
        downpaymentQuantityMid = fixedcostMid;
    } else if (downpayment == 'Cond.+Imu+Tari') {
        downpaymentQuantityMin = fixedcostMin - 100 * 12;
        downpaymentQuantityMax = fixedcostMax - 100 * 12;
        downpaymentQuantityMid = fixedcostMid - 100 * 12;
    } else if (downpayment == 'Imu+Tari') {
        downpaymentQuantityMin = taxesHomeMin;
        downpaymentQuantityMax = taxesHomeMax;
        downpaymentQuantityMid = taxesHomeMid;
    } else if (downpayment == 'Imu') {
        downpaymentQuantityMin = secondHomeTaxMin;
        downpaymentQuantityMax = secondHomeTaxMax;
        downpaymentQuantityMid = secondHomeTaxMid;
    }

    const managementCostsMin = propertyManagementFeesMin * 12;
    const managementCostsMax = propertyManagementFeesMax * 12;
    const managementCostsMid = managementCostsMin + (managementCostsMax - managementCostsMin)/2;
    const startupCommissionsMin = revenuesMin * propmanaging_fees;
    const startupCommissionsMax = revenuesMax * propmanaging_fees;
    const startupCommissionsMid = startupCommissionsMin + (startupCommissionsMax - startupCommissionsMin)/2
    const generalCostsMin = feesMin + managementCostsMin + startupCommissionsMin;
    const generalCostsMax = feesMax + managementCostsMax + startupCommissionsMax;
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
    const utileSpendibileMin = expectedAnnualProfitMin - ownerFeeMin + downpaymentQuantityMin;
    const utileSpendibileMax = expectedAnnualProfitMax - ownerFeeMax + downpaymentQuantityMax;
    const utileSpendibileMid = utileSpendibileMin + (utileSpendibileMax - utileSpendibileMin)/2;
    const totalRate = (riskFreeRate + premioRischio) / 100;
    const rfRate = riskFreeRate / 100;
    const totaleFinanziabileMin = utileSpendibileMin * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const totaleFinanziabileMax = utileSpendibileMax * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const totaleFinanziabileMid = utileSpendibileMid * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const recuperoCapitaleMid = totaleFinanziabileMid / (utileSpendibileMid+startupCommissionsMid)
    const recuperoCapitaleMin = totaleFinanziabileMin / (utileSpendibileMin+startupCommissionsMin)
    const recuperoCapitaleMax = totaleFinanziabileMax / (utileSpendibileMax+startupCommissionsMax)

    const fiscalbenefitMin = totaleFinanziabileMin/2/10
    const fiscalbenefitMax = totaleFinanziabileMax/2/10
    const fiscalbenefitMid = totaleFinanziabileMid/2/10
    const fiscalfixedcostMin = fiscalbenefitMin / fixedcostMin * 100
    const fiscalfixedcostMax = fiscalbenefitMax / fixedcostMax * 100
    const fiscalfixedcostMid = fiscalbenefitMid / fixedcostMid * 100
    const totaleFinanziabileRiskFreeMin = utileSpendibileMin * (1 - Math.pow(1 + rfRate, -years)) / rfRate;
    const totaleFinanziabileRiskFreeMax = utileSpendibileMax * (1 - Math.pow(1 + rfRate, -years)) / rfRate;
    const totaleFinanziabileRiskFreeMid = utileSpendibileMid * (1 - Math.pow(1 + rfRate, -years)) / rfRate;
    const lendGainMin = totaleFinanziabileRiskFreeMin - totaleFinanziabileMin;
    const lendGainMax = totaleFinanziabileRiskFreeMax - totaleFinanziabileMax;
    const lendGainMid = totaleFinanziabileRiskFreeMid - totaleFinanziabileMid;
    const restructureGainMin = totaleFinanziabileMin * restructure_fees;
    const restructureGainMax = totaleFinanziabileMax * restructure_fees;
    const restructureGainMid = totaleFinanziabileMid * restructure_fees;
    const managingCommissionsMin = startupCommissionsMin * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const managingCommissionsMax = startupCommissionsMax * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const managingCommissionsMid = startupCommissionsMid * (1 - Math.pow(1 + totalRate, -years)) / totalRate;
    const totalGainMin = lendGainMin + restructureGainMin + managingCommissionsMin;
    const totalGainMax = lendGainMax + restructureGainMax + managingCommissionsMax;
    const totalGainMid = lendGainMid + restructureGainMid + managingCommissionsMid;

    const costiOperativiMid = managingCommissionsMid * 0.4 + lendGainMid * 0.05
    const utiliLordiMid = totalGainMid - costiOperativiMid
    const imposteMid = utiliLordiMid * 0.24 + utiliLordiMid * 0.24 * 0.035
    const utiliNettiMid = utiliLordiMid - imposteMid

    const costiOperativiMin = managingCommissionsMin * 0.4 + lendGainMin * 0.05
    const utiliLordiMin = totalGainMin - costiOperativiMin
    const imposteMin = utiliLordiMin * 0.24 + utiliLordiMin * 0.24 * 0.035
    const utiliNettiMin = utiliLordiMin - imposteMin

    const costiOperativiMax = managingCommissionsMax * 0.4 + lendGainMax * 0.05
    const utiliLordiMax = totalGainMax - costiOperativiMax
    const imposteMax = utiliLordiMax * 0.24 + utiliLordiMax * 0.24 * 0.035
    const utiliNettiMax = utiliLordiMax - imposteMax

    const profitOnRevenues = expectedAnnualProfitMid / revenuesMid * 100;
    const profitOnRevenuesMin = expectedAnnualProfitMin / revenuesMin * 100;
    const profitOnRevenuesMax = expectedAnnualProfitMax / revenuesMax * 100;

    const returnOnInvestment = expectedAnnualProfitMid / totalCostsMid * 100;
    const returnOnInvestmentMin = expectedAnnualProfitMin / totalCostsMin * 100;
    const returnOnInvestmentMax = expectedAnnualProfitMax / totalCostsMax * 100;

    const returnOnICapital = utiliLordiMid / totaleFinanziabileMid * 100;
    const returnOnICapitalMin = utiliLordiMin / totaleFinanziabileMin * 100;
    const returnOnICapitalMax = utiliLordiMax / totaleFinanziabileMax * 100;

    const annualizedReturn = (Math.pow(1 + returnOnICapital/100, 1 / years) - 1) * 100;
    const annualizedReturnMin = (Math.pow(1 + returnOnICapitalMin/100, 1 / years) - 1) * 100;
    const annualizedReturnMax = (Math.pow(1 + returnOnICapitalMax/100, 1 / years) - 1) * 100;

    const returnOnICapitalNet = utiliNettiMid / totaleFinanziabileMid * 100;
    const returnOnICapitalNetMin = utiliNettiMin / totaleFinanziabileMin * 100;
    const returnOnICapitalNetMax = utiliNettiMax / totaleFinanziabileMax * 100;

    const annualizedReturnNet = (Math.pow(1 + returnOnICapitalNet/100, 1 / years) - 1) * 100;
    const annualizedReturnNetMin = (Math.pow(1 + returnOnICapitalNetMin/100, 1 / years) - 1) * 100;
    const annualizedReturnNetMax = (Math.pow(1 + returnOnICapitalNetMax/100, 1 / years) - 1) * 100;

    const shareLend = lendGainMid / totalGainMid * 100;
    const shareLendMin = lendGainMin / totalGainMin * 100;
    const shareLendMax = lendGainMax / totalGainMax * 100;

    const shareRestructure = restructureGainMid / totalGainMid * 100;
    const shareRestructureMin = restructureGainMin / totalGainMin * 100;
    const shareRestructureMax = restructureGainMax / totalGainMax * 100;

    const shareManaging = managingCommissionsMid / totalGainMid * 100;
    const shareManagingMin = managingCommissionsMin / totalGainMin * 100;
    const shareManagingMax = managingCommissionsMax / totalGainMax * 100;

    const quotaProprietarioMid = -downpaymentQuantityMid + ownerFeeMid
    const quotaProprietarioMin = -downpaymentQuantityMin + ownerFeeMin
    const quotaProprietarioMax = -downpaymentQuantityMax + ownerFeeMax

    const coeffVar = (utiliNettiMax-utiliNettiMin)/(utiliNettiMax+utiliNettiMin) * 100;
    const devStand = (utiliNettiMax-utiliNettiMin)/2

    const revcostMid = revenuesMid/totalCostsMid;
    const revcostMin = revenuesMid/totalCostsMin;
    const revcostMax = revenuesMid/totalCostsMax;

    let renditaPareggioMid = (taxesMid + taxesHomeMid + generalCostsMid - startupCommissionsMid + utileSpendibileMid - downpaymentQuantityMid) / 12;
    let renditaPareggioMin = (taxesMin + taxesHomeMin + generalCostsMin - startupCommissionsMin + utileSpendibileMin - downpaymentQuantityMin) / 12;
    let renditaPareggioMax = (taxesMax + taxesHomeMax + generalCostsMax - startupCommissionsMax + utileSpendibileMax - downpaymentQuantityMax) / 12;

    const recuperoCapitaleMid_eff = totaleFinanziato / (utileSpendibileMid+startupCommissionsMid)
    const recuperoCapitaleMin_eff = totaleFinanziato / (utileSpendibileMin+startupCommissionsMin)
    const recuperoCapitaleMax_eff = totaleFinanziato / (utileSpendibileMax+startupCommissionsMax)

    const totRata = totaleFinanziato / ((1 - Math.pow(1 + totalRate, -years)) / totalRate);
    const totFinanziatoRiskFree = totRata * (1 - Math.pow(1 + rfRate, -years)) / rfRate;

    const lendGain_eff = totFinanziatoRiskFree - totaleFinanziato;
    const restructureGain_eff = totaleFinanziato * restructure_fees;

    const totalGainMin_eff = lendGain_eff + restructureGain_eff + managingCommissionsMin;
    const totalGainMax_eff = lendGain_eff + restructureGain_eff + managingCommissionsMax;
    const totalGainMid_eff = lendGain_eff + restructureGain_eff + managingCommissionsMid;

    const costiOperativiMid_eff = managingCommissionsMid * 0.4 + lendGain_eff * 0.05
    const utiliLordiMid_eff = totalGainMid_eff - costiOperativiMid_eff
    const imposteMid_eff = utiliLordiMid_eff * 0.24 + utiliLordiMid_eff * 0.24 * 0.035
    const utiliNettiMid_eff = utiliLordiMid_eff - imposteMid_eff

    const costiOperativiMin_eff = managingCommissionsMin * 0.4 + lendGain_eff * 0.05
    const utiliLordiMin_eff = totalGainMin_eff - costiOperativiMin_eff
    const imposteMin_eff = utiliLordiMin_eff * 0.24 + utiliLordiMin_eff * 0.24 * 0.035
    const utiliNettiMin_eff = utiliLordiMin_eff - imposteMin_eff

    const costiOperativiMax_eff = managingCommissionsMax * 0.4 + lendGain_eff * 0.05
    const utiliLordiMax_eff = totalGainMax_eff - costiOperativiMax_eff
    const imposteMax_eff = utiliLordiMax_eff * 0.24 + utiliLordiMax_eff * 0.24 * 0.035
    const utiliNettiMax_eff = utiliLordiMax_eff - imposteMax_eff

    const returnOnICapital_eff = utiliLordiMid_eff / totaleFinanziato * 100;
    const returnOnICapitalMin_eff = utiliLordiMin_eff / totaleFinanziato * 100;
    const returnOnICapitalMax_eff = utiliLordiMax_eff / totaleFinanziato * 100;

    const annualizedReturn_eff = (Math.pow(1 + returnOnICapital_eff/100, 1 / years) - 1) * 100;
    const annualizedReturnMin_eff = (Math.pow(1 + returnOnICapitalMin_eff/100, 1 / years) - 1) * 100;
    const annualizedReturnMax_eff = (Math.pow(1 + returnOnICapitalMax_eff/100, 1 / years) - 1) * 100;

    const returnOnICapitalNet_eff = utiliNettiMid_eff / totaleFinanziato * 100;
    const returnOnICapitalNetMin_eff = utiliNettiMin_eff / totaleFinanziato * 100;
    const returnOnICapitalNetMax_eff = utiliNettiMax_eff / totaleFinanziato * 100;

    const annualizedReturnNet_eff = (Math.pow(1 + returnOnICapitalNet_eff/100, 1 / years) - 1) * 100;
    const annualizedReturnNetMin_eff = (Math.pow(1 + returnOnICapitalNetMin_eff/100, 1 / years) - 1) * 100;
    const annualizedReturnNetMax_eff = (Math.pow(1 + returnOnICapitalNetMax_eff/100, 1 / years) - 1) * 100;

    const coeffVar_eff = (utiliNettiMax_eff-utiliNettiMin_eff)/(utiliNettiMax_eff+utiliNettiMin_eff) * 100;
    const devStand_eff = (utiliNettiMax_eff-utiliNettiMin_eff)/2

    let renditaPareggioMid_eff = (taxesMid + taxesHomeMid + generalCostsMid - startupCommissionsMid + totRata - downpaymentQuantityMid) / 12;
    let renditaPareggioMin_eff = (taxesMin + taxesHomeMin + generalCostsMin - startupCommissionsMin + totRata - downpaymentQuantityMin) / 12;
    let renditaPareggioMax_eff = (taxesMax + taxesHomeMax + generalCostsMax - startupCommissionsMax + totRata - downpaymentQuantityMax) / 12;

    const canvas = document.getElementById('myChart');

    // Check if the canvas element exists and if there's an associated Chart instance
    if (canvas && Chart.getChart(canvas)) {
        // If there's an existing Chart instance, destroy it
        Chart.getChart(canvas).destroy();
    }

    // Now create the new Chart instance
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Finanziamento', 'Ristrutturazione', 'Gestione immobiliare'],
            datasets: [
            {
                label: 'Worst Case',
                data: [shareLendMax, shareRestructureMax, shareManagingMax],
                backgroundColor: 'rgba(175, 18, 90, 0.5)',
                borderColor: 'rgba(175, 18, 90, 0.5)',
                borderWidth: 1
            },
            {
                label: 'Base Case',
                data: [shareLend, shareRestructure, shareManaging],
                backgroundColor: '#64A6BD',
                borderColor: '#64A6BD',
                borderWidth: 1
            }, {
                label: 'Best Case',
                data: [shareLendMin, shareRestructureMin, shareManagingMin],
                backgroundColor: 'rgba(96, 219, 185, 0.7)',
                borderColor: 'rgba(96, 219, 185, 0.7)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                        callback: function(value) {
                            return value.toFixed(2) + '%';
                        },
                        font: {
                            family: 'Roboto Mono',
                            size: 8,
                            color: '#000'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Roboto Mono',
                            size: 10,
                            color: '#000'
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Roboto Mono',
                            size: 7,
                            color: '#000'
                        }
                    }
                }
            }
        }
    });

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
        <em><p>&emsp;&#8226 Spese annuali per utenze, condominio e varie: ${feesMid.toFixed(2)}€ (${feesMin.toFixed(2)}€/${feesMax.toFixed(2)}€)</p></em>
        <em><p>&emsp;&#8226 Spese gestione immobiliare: ${managementCostsMid.toFixed(2)}€ (${managementCostsMin.toFixed(2)}€/${managementCostsMax.toFixed(2)}€)</p></em>
        <em><p>&emsp;&#8226 Commissioni startup: ${startupCommissionsMid.toFixed(2)}€ (${startupCommissionsMin.toFixed(2)}€/${startupCommissionsMax.toFixed(2)}€)</p></em>
        <p style="font-weight: 500; padding-top: 5px;">Tasse ed imposte: ${totalTaxesMid.toFixed(2)} (${totalTaxesMin.toFixed(2)}€/${totalTaxesMax.toFixed(2)}€)</p>
        <em><p>&emsp;&#8226 Cedolare secca: ${taxesMid.toFixed(2)}€ (${taxesMin.toFixed(2)}€/${taxesMax.toFixed(2)}€)</p></em>
        <em><p>&emsp;&#8226 Tassa rifiuti e tassa possesso fabbricati: ${taxesHomeMid.toFixed(2)}€ (${taxesHomeMin.toFixed(2)}€/${taxesHomeMax.toFixed(2)}€)</p></em>
        <strong><p>Totale uscite annuali previste: ${totalCostsMid.toFixed(2)}€ (${totalCostsMin.toFixed(2)}€/${totalCostsMax.toFixed(2)}€)</p></strong>
        <br>
        <p>Utile annuale previsto: ${expectedAnnualProfitMid.toFixed(2)}€ (${expectedAnnualProfitMin.toFixed(2)}€/${expectedAnnualProfitMax.toFixed(2)}€)</p>
        <p>Quota entrate richiesta dal proprietario: ${ownerFeeMid.toFixed(2)}€ (${ownerFeeMin.toFixed(2)}€/${ownerFeeMax.toFixed(2)}€)</p>
        <p>Downpayment del finanziamento: ${downpaymentQuantityMid.toFixed(2)}€ (${downpaymentQuantityMin.toFixed(2)}€/${downpaymentQuantityMax.toFixed(2)}€)</p>
        <strong><p>Utile annuale destinato al rimborso prestito: ${utileSpendibileMid.toFixed(2)}€ (${utileSpendibileMin.toFixed(2)}€/${utileSpendibileMax.toFixed(2)}€)</p></strong>
        <br>
        <p style="font-size: 0.95rem;">Totale lavori finanziabili: <strong>${totaleFinanziabileMid.toFixed(2)}€ (${totaleFinanziabileMin.toFixed(2)}€/${totaleFinanziabileMax.toFixed(2)}€)</strong></p>
        <!-- Add more calculated values here -->
    `);

    // Update output placeholders
    $('#startupGains').html(`
        <p>+ Ricavi dal prestito: ${lendGainMid.toFixed(2)}€ (${lendGainMin.toFixed(2)}€/${lendGainMax.toFixed(2)}€)</p>
        <p>+ Ricavi sulla ristrutturazione: ${restructureGainMid.toFixed(2)}€ (${restructureGainMin.toFixed(2)}€/${restructureGainMax.toFixed(2)}€)</p>
        <p>+ Ricavi sulla gestione immobiliare: ${managingCommissionsMid.toFixed(2)}€ (${managingCommissionsMin.toFixed(2)}€/${managingCommissionsMax.toFixed(2)}€)</p>
        <p style="font-size: 0.74rem;">= Totale ricavi: <strong>${totalGainMid.toFixed(2)}€ (${totalGainMin.toFixed(2)}€/${totalGainMax.toFixed(2)}€)</strong></p>
        <p>- Costi operativi e accantonamenti: ${costiOperativiMid.toFixed(2)}€ (${costiOperativiMin.toFixed(2)}€/${costiOperativiMax.toFixed(2)}€)</p>
        <p style="font-size: 0.74rem;">= Utili lordi: <strong>${utiliLordiMid.toFixed(2)}€ (${utiliLordiMin.toFixed(2)}€/${utiliLordiMax.toFixed(2)}€)</strong></p>
        <p>- Imposte: ${imposteMid.toFixed(2)}€ (${imposteMin.toFixed(2)}€/${imposteMax.toFixed(2)}€)</p>
        <p style="font-size: 0.95rem;">= Utili netti della startup: <strong>${utiliNettiMid.toFixed(2)}€ (${utiliNettiMin.toFixed(2)}€/${utiliNettiMax.toFixed(2)}€)</strong></p>
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
        <center><p style="font-size: 2rem;">${totaleFinanziabileMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${totaleFinanziabileMin.toFixed(2)}€/${totaleFinanziabileMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#quotapagata').html(`
        <center><p style="font-size: 2rem;">${quotaProprietarioMid.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${quotaProprietarioMin.toFixed(2)}€/${quotaProprietarioMax.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#por').html(`
        <center><p style="font-size: 2rem;">${profitOnRevenues.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${profitOnRevenuesMin.toFixed(2)}%/${profitOnRevenuesMax.toFixed(2)}%)</p></center>
    `);

     // Update output placeholders
    $('#roii').html(`
        <center><p style="font-size: 2rem;">${returnOnInvestment.toFixed(2)}%</p></center>
        <center><p style="font-size: 0.8rem;">(${returnOnInvestmentMin.toFixed(2)}%/${returnOnInvestmentMax.toFixed(2)}%)</p></center>
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
        <center><p style="font-size: 2rem; margin-bottom: 0px; padding-bottom: 0px;">${recuperoCapitaleMid.toFixed(2)}</p></center>
        <center><p style="font-size: 1.5rem;">anni</p></center>
        <center><p style="font-size: 0.8rem;">(${recuperoCapitaleMin.toFixed(2)} anni/${recuperoCapitaleMax.toFixed(2)} anni)</p></center>
    `);

    // Update output placeholders
    $('#coeffVariazione').html(`
        <p style="font-size: 0.65rem; margin-top: 0px; padding-top: 2px; margin-left: 20px; margin-bottom: 0px; padding-bottom: 2px;"><strong>Deviazione Standard:</strong></p>
        <p style="font-size: 1.5rem; margin-left: 20px; margin-bottom: 0px; padding-bottom: 10px;">${devStand.toFixed(2)}€</p>
        <p style="font-size: 0.65rem; margin-left: 20px; margin-bottom: 0px; padding-bottom: 0px;""><strong>Coefficiente di Variazione:</strong></p>
        <p style="font-size: 1.5rem; margin-left: 20px; margin-bottom: 7px; padding-bottom: 0px;">${coeffVar.toFixed(2)}%</p>
    `);

    // Update output placeholders
    $('#ricavi_eff').html(`
        <center><p style="font-size: 2rem;">${totalGainMid_eff.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${totalGainMin_eff.toFixed(2)}€/${totalGainMax_eff.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#costi_eff').html(`
        <center><p style="font-size: 2rem;">${costiOperativiMid_eff.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${costiOperativiMin_eff.toFixed(2)}€/${costiOperativiMax_eff.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#utililordi_eff').html(`
        <center><p style="font-size: 2rem;">${utiliLordiMid_eff.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${utiliLordiMin_eff.toFixed(2)}€/${utiliLordiMax_eff.toFixed(2)}€)</p></center>
    `);

    // Update output placeholders
    $('#utilinetti_eff').html(`
        <center><p style="font-size: 2rem;">${utiliNettiMid_eff.toFixed(2)}€</p></center>
        <center><p style="font-size: 0.8rem;">(${utiliNettiMin_eff.toFixed(2)}€/${utiliNettiMax_eff.toFixed(2)}€)</p></center>
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
        <center><p style="font-size: 2rem; margin-bottom: 0px; padding-bottom: 0px;">${recuperoCapitaleMid_eff.toFixed(2)}</p></center>
        <center><p style="font-size: 1.5rem;">anni</p></center>
        <center><p style="font-size: 0.8rem;">(${recuperoCapitaleMin_eff.toFixed(2)} anni/${recuperoCapitaleMax_eff.toFixed(2)} anni)</p></center>
    `);

    // Update output placeholders
    $('#coeffVariazione_eff').html(`
        <p style="font-size: 0.65rem; margin-top: 0px; padding-top: 2px; margin-left: 20px; margin-bottom: 0px; padding-bottom: 2px;"><strong>Deviazione Standard:</strong></p>
        <p style="font-size: 1.5rem; margin-left: 20px; margin-bottom: 0px; padding-bottom: 10px;">${devStand_eff.toFixed(2)}€</p>
        <p style="font-size: 0.65rem; margin-left: 20px; margin-bottom: 0px; padding-bottom: 0px;""><strong>Coefficiente di Variazione:</strong></p>
        <p style="font-size: 1.5rem; margin-left: 20px; margin-bottom: 7px; padding-bottom: 0px;">${coeffVar_eff.toFixed(2)}%</p>
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
    const uncertaintyPer = 0.1;
    const revenuesMin = grossAnnualIncome * (1 - uncertaintyPer);
    const revenuesMax = grossAnnualIncome * (1 + uncertaintyPer);
    const revenuesMid = revenuesMin + (revenuesMax - revenuesMin) / 2;

    const cedolareSeccaRate = 0.21;
    const tasseCedolareMin = revenuesMin * cedolareSeccaRate
    const tasseCedolareMax = revenuesMax * cedolareSeccaRate
    const monthlyCondoFeesMin = parseFloat($('#condInput').val()) / 12;
    const monthlyCondoFeesMax = parseFloat($('#condInput').val()) / 12;
    const monthlyUtilitiesMin = mq * 22 * (1 + uncertaintyPer) / 12;
    const monthlyUtilitiesMax = mq * 22 * (1 - uncertaintyPer) / 12;
    const monthlyMiscellaneousCostsMin = 50 * 12 * (1 + uncertaintyPer) / 12;
    const monthlyMiscellaneousCostsMax = 50 * 12 * (1 - uncertaintyPer) / 12;
    const propertyManagementFeesMin = 50 * 12 * (1 + uncertaintyPer) / 12;
    const propertyManagementFeesMax = 50 * 12 * (1 - uncertaintyPer) / 12;
    const secondHomeTaxMin = parseFloat($('#rendInput').val()) * 1.05 * 160 * 10.6 / 1000;
    const secondHomeTaxMax = secondHomeTaxMin;
    const secondHomeTaxMid = secondHomeTaxMin;

    const wasteCollectionTaxMin = mq * 3.5;
    const wasteCollectionTaxMax = wasteCollectionTaxMin;
    const desiredNetIncomePercentage = parseFloat($('#desired_net_income_percentageInput').val());

    const riskFreeRate = parseFloat($('#risk_free_rate').val());
    const premioRischio = parseFloat($('#premio_rischio').val());
    const restructure_fees = parseFloat($('#restructure_fees').val())/100;
    const propmanaging_fees = parseFloat($('#propmanaging_fees').val())/100;

    // Perform calculations
    const taxesMin = tasseCedolareMin
    const taxesMax = tasseCedolareMax
    const taxesMid = tasseCedolareMin + (tasseCedolareMax - tasseCedolareMin)/2
    const taxesHomeMin = secondHomeTaxMin + wasteCollectionTaxMin;
    const taxesHomeMax = secondHomeTaxMax + wasteCollectionTaxMax;
    const taxesHomeMid = taxesHomeMin + (taxesHomeMax - taxesHomeMin)/2
    const totalTaxesMin = tasseCedolareMin + taxesHomeMin;
    const totalTaxesMax = tasseCedolareMax + taxesHomeMax;
    const totalTaxesMid = totalTaxesMin + (totalTaxesMax - totalTaxesMin)/2;
    const feesMin = (monthlyCondoFeesMin + monthlyUtilitiesMin + monthlyMiscellaneousCostsMin) * 12;
    const feesMax = (monthlyCondoFeesMax + monthlyUtilitiesMax + monthlyMiscellaneousCostsMax) * 12;
    const feesMid = feesMin + (feesMax - feesMin)/2;
    const fixedcostMin = (monthlyCondoFeesMin + 100) * 12 + taxesHomeMin;
    const fixedcostMax = (monthlyCondoFeesMax + 100) * 12 + taxesHomeMax;
    const fixedcostMid = fixedcostMin + (fixedcostMax - fixedcostMin)/2;
    const condotaxMin = fixedcostMin - 100 * 12;
    const condotaxMax = fixedcostMin - 100 * 12;
    const condotaxMid = fixedcostMin - 100 * 12;

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

    const managementCostsMin = propertyManagementFeesMin * 12;
    const managementCostsMax = propertyManagementFeesMax * 12;
    const managementCostsMid = managementCostsMin + (managementCostsMax - managementCostsMin)/2;
    const startupCommissionsMin = revenuesMin * propmanaging_fees;
    const startupCommissionsMax = revenuesMax * propmanaging_fees;
    const startupCommissionsMid = startupCommissionsMin + (startupCommissionsMax - startupCommissionsMin)/2
    const generalCostsMin = feesMin + managementCostsMin + startupCommissionsMin;
    const generalCostsMax = feesMax + managementCostsMax + startupCommissionsMax;
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
    const utileSpendibileMin = expectedAnnualProfitMin - ownerFeeMin + downpaymentQuantityMin;
    const utileSpendibileMax = expectedAnnualProfitMax - ownerFeeMax + downpaymentQuantityMax;
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
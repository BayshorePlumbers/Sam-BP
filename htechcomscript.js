document.addEventListener('DOMContentLoaded', function() {
    const technicianRates = {
        'Brian Solis': 25,
        'Bryan Magańa': 60,
        'Edvin Garcia': 30,
        'Horacio Rojo': 40,
        'Jesus Escalante': 40,
        'Jose Rodriguez (Chepe)': 26,
        'Ryan Felt': 50,
        'Walter Calderon' : 50,
    };

    const technicianCheckboxes = document.querySelectorAll('input[name="technicians"]');
    const HourlyRateInput = document.getElementById('rate');
    const projectDurationInput = document.getElementById('pd');
    const printButton = document.getElementById('printButton');
    const otherExpenseField = document.getElementById('oe');
    const totalPriceInput = document.getElementById('tp');
    
    function updateHourlyRate() {
        let totalRate = 0;
        technicianCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalRate += technicianRates[checkbox.value] || 0;
            }
        });
        HourlyRateInput.value = totalRate;
    }

    // Attach event listeners to all technician checkboxes
    technicianCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateHourlyRate);
    });

    // Improved Project Duration Validation and Rounding
    function validateDuration() {
        let duration = parseFloat(projectDurationInput.value) || 0;

        // If input is empty or being modified, skip validation
        if (isNaN(duration)) return;

        if (duration < 1) {
            alert("Project Duration value cannot be less than 1 hour.");
            projectDurationInput.value = 1; // Reset value to 1 hour
        } else {
            roundDuration(duration);
        }
    }

    function roundDuration(duration) {
        if (duration >= 1.1 && duration <= 1.49) {
            projectDurationInput.value = 1.5;
        } else if (duration >= 1.51 && duration <= 1.99) {
            projectDurationInput.value = 2;
        } else if (duration >= 2.1 && duration <= 2.49) {
            projectDurationInput.value = 2.5;
        } else if (duration >= 2.51 && duration <= 2.99) {
            projectDurationInput.value = 3;
        } else {
            // Extend logic for higher ranges
            for (let i = 3; i <= 100; i++) {
                if (duration >= i + 0.1 && duration <= i + 0.49) {
                    projectDurationInput.value = (i + 0.5).toFixed(1);
                    break;
                } else if (duration >= i + 0.51 && duration <= i + 0.99) {
                    projectDurationInput.value = (i + 1).toFixed(1);
                    break;
                }
            }
        }
    }

    projectDurationInput.addEventListener("input", function() {
        // Allow user to modify the input without premature validation
        this.setCustomValidity('');
    });

    projectDurationInput.addEventListener("change", validateDuration); // Final validation on change

    // Custom Print confirmation popup with OK and Cancel
    printButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default print behavior

        // Show custom confirmation message
        const userConfirmed = confirm("I HEREBY CONFIRM THAT ALL THE CONTENTS OF THIS DOCUMENT ARE CORRECT AND I TAKE FULL RESPONSIBILITY OF THIS DOCUMENT.");
        
        if (userConfirmed) {
            // Proceed to show the print window
            openPrintWindow();
        }
    });

    function openPrintWindow() {
        const technicianNames = Array.from(document.querySelectorAll('input[name="technicians"]:checked')).map(tech => tech.value).join(', ');
        const notes = document.getElementById('notes').value;
        const jobAddress = document.getElementById('ja').value;
        const totalPrice = document.getElementById('tp').value;
        const materialExpenses = document.getElementById('material').value;
        const otherExpenses = document.getElementById('oe').value;
        const projectDuration = document.getElementById('pd').value;
        const day1 = document.getElementById('day1').value;
        const day2 = document.getElementById('day2').value;
        const day3 = document.getElementById('day3').value;
        const day4 = document.getElementById('day4').value;
        const day5 = document.getElementById('day5').value;
        const additionalHours = document.getElementById('ah').value;
        const overtimeHours = document.getElementById('toh').value;
        const totalHours = document.getElementById('totalHours').value;
        const sw = document.getElementById('sw').value;
        const wh = document.getElementById('wh').value;
        const rd = document.getElementById('rd').value;
        const bpp = document.getElementById('bpp').value;
        const kicker = document.getElementById('kicker').textContent;

        // Create the HTML content for the print window
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>TECHNICIAN POTENTIAL COMMISSION</title>
                <link rel="stylesheet" href="print.css" type="text/css" media="print">
                <style>
                    .logo-container img {
                        width: 200px;
                        height: auto;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo-container">
                        <img src="BP.png" alt="BP logo">
                    </div>
                    <h2>TECHNICIAN COMMISSION CALCULATOR</h2>
                    <div class="details-section">
                    <h3>DETAILS:</h3>
                    <table>
                        <tr><th>Technicians' Names:</th><td>${technicianNames}</td></tr>
                        <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                        <tr><th>Project Duration:</th><td>${projectDuration}</td></tr>
                        <tr><th>Material Expenses:</th><td>${materialExpenses}</td></tr>
                        <tr><th>Other Expenses:</th><td>${otherExpenses}</td></tr>
                        <tr><th>Total Price:</th><td>${totalPrice}</td></tr>
                        <tr><th>Job Description:</th><td>${notes}</td></tr>
                    </table>
                    </div>
                    <div class="labor-details-section">
                        <h3>LABOR DETAILS:</h3>
                        <table>
                            <tr>
                                <th>Day 1</th><th>Day 2</th><th>Day 3</th><th>Day 4</th><th>Day 5</th>
                            </tr>
                            <tr>
                                <td>${day1}</td><td>${day2}</td><td>${day3}</td><td>${day4}</td><td>${day5}</td>
                            </tr>
                            <tr>
                                <th>Additional Hours</th><th>Overtime Hours</th><th>Total Hours</th>
                            </tr>
                            <tr>
                                <td>${additionalHours}</td><td>${overtimeHours}</td><td>${totalHours}</td>
                            </tr>
                        </table>
                    </div>
                    <h3>FOR OFFICE USE ONLY:</h3>
                    <table>
                        <tr>
                            <th>SW21/RP21</th><th>WH32</th><th>RD15/UL15</th><th>BPP%</th>
                        </tr>
                        <tr>
                            <td>${sw}</td><td>${wh}</td><td>${rd}</td><td>${bpp}</td></tr>
                    </table>
                    <div class="commission-details-section">
                    <h3>KICKER DETAILS:</h3>
                    <table>
                        <tr><th>Kicker:</th><td>${kicker}</td></tr>
                    </table>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Open a new window with the content
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus(); // Focus the new window

        // Trigger the print dialog
        printWindow.print();
    }

    // Toggle logic for Assisted Sale / Non-Assisted Sale
    document.getElementById('assistToggle').addEventListener('click', function() {
        const button = document.getElementById('assistToggle');
        const totalPrice = parseFloat(totalPriceInput.value) || 0;
        const addedExpense = totalPrice * 0.10; // 2% of total price
        const currentExpense = parseFloat(otherExpenseField.value) || 0; // Get current value in other expenses

        if (button.classList.contains('green-button')) {
            button.classList.remove('green-button');
            button.classList.add('red-button');
            button.textContent = 'NON ASSISTED SALE';
            otherExpenseField.value = (currentExpense - addedExpense).toFixed(2); // Deduct 2% if assisted sale is disabled
        } else {
            button.classList.remove('red-button');
            button.classList.add('green-button');
            button.textContent = 'ASSISTED SALE';
            otherExpenseField.value = (currentExpense + addedExpense).toFixed(2); // Add 2% to OTHER EXPENSE
        }
    });

    // Function to calculate the kicker (unchanged)
    function calculateKicker() {
        // Get values from the form fields
        let totalPrice = parseFloat(document.getElementById('tp').value) || 0;
        let materialExpenses = parseFloat(document.getElementById('material').value) || 0;
        let otherExpenses = parseFloat(document.getElementById('oe').value) || 0;
        let pd = parseFloat(document.getElementById('pd').value) || 0;

        // Calculate total hours
        let day1 = parseFloat(document.getElementById('day1').value) || 0;
        let day2 = parseFloat(document.getElementById('day2').value) || 0;
        let day3 = parseFloat(document.getElementById('day3').value) || 0;
        let day4 = parseFloat(document.getElementById('day4').value) || 0;
        let day5 = parseFloat(document.getElementById('day5').value) || 0;
        let additionalHours = parseFloat(document.getElementById('ah').value) || 0;
        let overtimeHours = parseFloat(document.getElementById('toh').value) || 0;

        let totalHours = day1 + day2 + day3 + day4 + day5 + additionalHours + (1.5 * overtimeHours);
        document.getElementById('totalHours').value = totalHours.toFixed(2);

        // Get hourly rate from the input field
        let hourlyRate = parseFloat(HourlyRateInput.value) || 0;

        // Calculate gross amount
        const grossAmount = totalPrice - (materialExpenses * 1.2) - (totalHours * 75) - otherExpenses;

        // Calculate Base commission
        const baseCommission = hourlyRate * pd;

        // Calculate gross profit
        let grossProfit = grossAmount - baseCommission;

        // Calculate overheads and profit
        const overheads = pd * 246;
        let profit = grossProfit - overheads + (materialExpenses * 1.2 * 0.1667) + (totalHours * 75 * 0.4);

        // Adjust Salary Based on multiple technicians
        const selectedTechnicians = document.querySelectorAll('input[name="technicians"]:checked');
        const numTechnicians = selectedTechnicians.length;

        if (numTechnicians > 0) {
            const totalSalary = hourlyRate * pd * numTechnicians;
            profit = totalPrice - (materialExpenses * 1.2) - (totalHours * 75) - otherExpenses - totalSalary - overheads + (materialExpenses * 1.2 * 0.1667) + (totalHours * 75 * 0.4);

            // Calculate kicker based on profit percentage
            let profper = totalPrice !== 0 ? ((profit / totalPrice) * 100).toFixed(2) : '0.00';

            let kicker = 0;
            if (profper >= 30.01 && profper <= 39.99) {
                kicker = 0.015 * totalPrice;
            } else if (profper >= 40.01 && profper <= 49.99) {
                kicker = 0.02 * totalPrice;
            } else if (profper >= 50.01 && profper <= 59.99) {
                kicker = 0.025 * totalPrice;
            } else if (profper >= 60.01) {
                kicker = 0.03 * totalPrice;
            }

            // Display Kicker Information for multiple technicians
            let kickerDisplay = '';
            if (numTechnicians === 1) {
                kickerDisplay = `Kicker = $${kicker.toFixed(2)}`;
            } else {
                kickerDisplay = `Kicker Total = $${kicker.toFixed(2)}`;
                const kickerPerTechnician = kicker / numTechnicians;
                selectedTechnicians.forEach((tech, index) => {
                    kickerDisplay += `, Kicker ${index + 1} = $${kickerPerTechnician.toFixed(2)}`;
                });
            }
            document.getElementById('kicker').textContent = kickerDisplay;

            // Update Net Profit and Profit Percentage
            profit -= kicker;
            let nprofit = profit;
            let nprofper = totalPrice !== 0 ? ((nprofit / totalPrice) * 100).toFixed(2) : '0.00';

            // Calculate SW, WH, and RD (assuming these are percentage calculations)
            const sw = ((materialExpenses) / totalPrice) * 100 || 0;
            const wh = sw; // Example calculation (replace as needed)
            const rd = sw; // Example calculation (replace as needed)

            // Update BP% with emojis based on finalProfitPercentage
            let bppValue = '';
            if (nprofper < 10) {
                bppValue = `${nprofper}% : 👎 JOB BUST`;
            } else if (nprofper >= 10 && nprofper <= 19.99) {
                bppValue = `${nprofper}% : 😬 MARGINAL`;
            } else if (nprofper >= 20 && nprofper <= 29.99) {
                bppValue = `${nprofper}% : 👍 GOOD`;
            } else if (nprofper >= 30 && nprofper <= 39.99) {
                bppValue = `${nprofper}% : 😀 NICE`;
            } else if (nprofper >= 40 && nprofper <= 59.99) {
                bppValue = `${nprofper}% : ⭐ GREAT`;
            } else {
                bppValue = `${nprofper}% : 🌟 EXCELLENT`;
            }
    
            document.getElementById('bpp').value = bppValue;

            document.getElementById('sw').value = sw.toFixed(2);
            document.getElementById('wh').value = wh.toFixed(2);
            document.getElementById('rd').value = rd.toFixed(2);
            document.getElementById('bpp').value = bppValue;

            // Check BP% and show "JOB BUST" if less than 10%
            if (parseFloat(nprofper) < 10) {
                document.getElementById("jobBustMessage").textContent = "RESULT: JOB BUST";
            } else {
                document.getElementById("jobBustMessage").textContent = ""; // Clear message if not applicable
            }
        } else {
            alert('Please select at least one technician');
        }
    }

    // Attach event listeners for automatic calculation on button click and input changes
    document.getElementById("calculateBtn").addEventListener("click", calculateKicker);
    document.getElementById("assistToggle").addEventListener("click", calculateKicker);
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener("input", calculateKicker);
    });
});
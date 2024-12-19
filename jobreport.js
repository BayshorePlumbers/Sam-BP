document.addEventListener('DOMContentLoaded', function() {
    const projectDurationInput = document.getElementById('pd');
    const printButton = document.getElementById('printButton');
    const totalPriceInput = document.getElementById('tp');
    const materialExpensesInput = document.getElementById('material');
    const otherExpensesInput = document.getElementById('oe');
    const calculateBtn = document.getElementById('calculateBtn');
    const bppField = document.getElementById('bpp'); // BP% placeholder field

    // Project Duration Validation and Rounding
    function validateDuration() {
        let duration = parseFloat(projectDurationInput.value) || 0;

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
        this.setCustomValidity('');
    });

    projectDurationInput.addEventListener("change", validateDuration);

    // Function to calculate BP% and display the report
    function calculateReport() {
        let totalPrice = parseFloat(totalPriceInput.value) || 0;
        let materialExpenses = parseFloat(materialExpensesInput.value) || 0;
        let otherExpenses = parseFloat(otherExpensesInput.value) || 0;
        let projectDuration = parseFloat(projectDurationInput.value) || 0;

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

        // Calculate gross amount
        const grossAmount = totalPrice - (materialExpenses * 1.2) - (totalHours * 75) - otherExpenses;

        // Calculate Sales commission
        const salescom = totalPrice * 0.1;

        // Calculate overheads and profit
        const overheads = projectDuration * 246;
        let profit = grossAmount - overheads - salescom;

        // Calculate BP%
        let bpp = totalPrice !== 0 ? ((profit / totalPrice) * 100).toFixed(2) : '0.00';

        // Determine emoji based on BP%
        let bppDisplay = '';
        if (parseFloat(bpp) < 10) {
            bppDisplay = `${bpp}% : 👎 JOB BUST`;
        } else if (parseFloat(bpp) >= 10.00 && parseFloat(bpp) <= 19.99) {
            bppDisplay = `${bpp}% : 😬 MARGINAL`;
        } else if (parseFloat(bpp) >= 20.00 && parseFloat(bpp) <= 29.99) {
            bppDisplay = `${bpp}% : 👍 GOOD`;
        } else if (parseFloat(bpp) >= 30.00 && parseFloat(bpp) <= 39.99) {
            bppDisplay = `${bpp}% : 😀 NICE`;
        } else if (parseFloat(bpp) >= 40.00 && parseFloat(bpp) <= 49.99) {
            bppDisplay = `${bpp}% : ⭐ GREAT`;
        } else if (parseFloat(bpp) >= 50.00) {
            bppDisplay = `${bpp}% : 🌟 EXCELLENT`;
        }

        // Update BP% field with percentage and emoji
        bppField.value = bppDisplay;

        // Display "JOB BUST" message if BP% is less than 10
        if (parseFloat(bpp) < 10) {
            document.getElementById("jobBustMessage").textContent = "RESULT: JOB BUST";
        } else {
            document.getElementById("jobBustMessage").textContent = ""; // Clear the message if not applicable
        }

        // Calculate SW, WH, and RD (assuming these are percentage calculations)
        const sw = ((materialExpenses * 1.2) / totalPrice) * 100 || 0;
        const wh = sw;
        const rd = sw;

        // Output final values
        document.getElementById('sw').value = sw.toFixed(2);
        document.getElementById('wh').value = wh.toFixed(2);
        document.getElementById('rd').value = rd.toFixed(2);
    }

    calculateBtn.addEventListener("click", calculateReport);

    // Attach event listeners to all input fields for automatic recalculation
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(input => {
        input.addEventListener('input', calculateReport);  // Automatically recalculate on input change
    });

    // Custom Print confirmation popup with OK and Cancel
    printButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default print behavior

        // Show custom confirmation message
        const userConfirmed = confirm("I HEREBY CONFIRM THAT ALL THE CONTENTS OF THIS DOCUMENT ARE CORRECT AND I TAKE FULL RESPONSIBILITY OF THIS DOCUMENT.");
        
        if (userConfirmed) {
            openPrintWindow();
        }
    });

    // Print functionality
    function openPrintWindow() {
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

        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>PROJECT REPORT - BAYSHORE PLUMBERS</title>
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
                    <h2>PROJECT REPORT</h2>
                    <div class="details-section">
                        <h3>DETAILS:</h3>
                        <table>
                            <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                            <tr><th>Total Price:</th><td>${totalPrice}</td></tr>
                            <tr><th>Material Expenses:</th><td>${materialExpenses}</td></tr>
                            <tr><th>Other Expenses:</th><td>${otherExpenses}</td></tr>
                            <tr><th>Project Duration:</th><td>${projectDuration}</td></tr>
                            <tr><th>Job Description:</th><td>${document.getElementById('notes').value}</td></tr>
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
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }
});

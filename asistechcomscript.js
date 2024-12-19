document.addEventListener('DOMContentLoaded', function () {
    // Ensure the calculate button exists
    const calculateBtn = document.getElementById('calculateBtn');
    const printButton = document.getElementById('printButton');

    if (!calculateBtn) {
        console.error("Calculate button not found");
        return;
    }
    if (!printButton) {
        console.error("Print button not found");
        return;
    }

    // Define the calculateCommission function
    function calculateCommission() {
        const tp = parseFloat(document.getElementById('tp').value) || 0;

        // Debugging log to check if the total price is being read correctly
        console.log("Total Price: ", tp);

        // Check if total price is valid
        if (tp <= 0) {
            alert("Please enter a valid total price");
            return;
        }

        // Base commission calculation (assuming it's 2% of total price)
        const baseCommission = 0.02 * tp;
        console.log("Base Commission: ", baseCommission);
        document.getElementById('baseCommission').textContent = baseCommission.toFixed(2);
    }

    // Attach event listener to the calculate button
    calculateBtn.addEventListener('click', calculateCommission);

    // Add print functionality
    printButton.addEventListener('click', function () {
        const name = document.getElementById('tn').value;
        const techassist = document.getElementById('ta').value;
        const notes = document.getElementById('notes').value;
        const jobAddress = document.getElementById('ja').value;
        const totalPrice = document.getElementById('tp').value;
        const invoiceNumber = document.getElementById('in').value;
        const baseCommission = document.getElementById('baseCommission').textContent;
        const date = document.getElementById('date').value;

        // Check if all required fields are filled before printing
        if (!name || !techassist || !jobAddress || !totalPrice || !invoiceNumber || !date) {
            alert("Please fill all required fields before printing.");
            return;
        }

        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>SALES COMMISSION CALCULATOR</title>
            <link rel="stylesheet" href="style.css" type="text/css">
            <link rel="stylesheet" href="print.css" type="text/css" media="print">
        </head>
        <body>
            <div class="container">
                <div class="logo-container">
                    <img src="BP.png" alt="BP logo" style="width: 50px; height: auto; max-width: 50px;">
                </div>
                <h2>SALES COMMISSION CALCULATOR</h2>
                <table>
                    <tr><th>Name:</th><td>${name}</td></tr>
                    <tr><th>Technician Assisted:</th><td>${techassist}</td></tr>
                    <tr><th>Invoice Number:</th><td>${invoiceNumber}</td></tr>
                    <tr><th>Job Address:</th><td>${jobAddress}</td></tr>
                    <tr><th>Date:</th><td>${date}</td></tr>
                    <tr><th>Total Price:</th><td>${totalPrice}</td></tr>
                    <tr><th>Notes:</th><td>${notes}</td></tr>
                </table>
                
                <h3>COMMISSION DETAILS:</h3>
                <table>
                    <tr><th>Commission:</th><td>${baseCommission}</td></tr>
                </table>
            </div>
        </body>
        </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const calculateBtn = document.getElementById('calculateBtn');
    const printButton = document.getElementById('printButton');

    function calculateCommission() {
        const tp = parseFloat(document.getElementById('tp').value) || 0;

        let job = document.getElementById('job').value;
        let pay = job === 'Follow up & Close - From Day 8 to Day 21' ? 0.02 : 0.10;

        const baseCommission = pay * tp;
        document.getElementById('baseCommission').textContent = `$${baseCommission.toFixed(2)}`;

        const grossAmount = tp - baseCommission;

        const pd = parseFloat(document.getElementById('pd')?.value) || 0;
        const overheads = pd * 246;
        const finalProfit = grossAmount - overheads;

        const profitPercentage = tp !== 0 ? ((finalProfit / tp) * 100).toFixed(2) : '0.00';
        const bppField = document.getElementById('bpp');
        if (bppField) {
            bppField.value = `${profitPercentage}%`;
        }
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCommission);
    }

    if (printButton) {
        printButton.addEventListener('click', function () {
            const printData = {
                "Name": document.getElementById('tn').value,
                "Job Address": document.getElementById('ja').value,
                "Date": document.getElementById('date').value,
                "Total Price": document.getElementById('tp').value,
                "Sale Details": document.getElementById('job').value,
                "Notes": document.getElementById('notes').value,
                "Commission": document.getElementById('baseCommission').textContent,
            };

            const printWindow = window.open('', '', 'width=800,height=600');
            printWindow.document.write(`
                <html>
                <head><title>SALES POTENTIAL COMMISSION</title>
                <head>
                <link rel="stylesheet" href="print.css" type="text/css">
            </head>
        <body>
            <div class="logo-container">
                <img src="BP.png" alt="BP logo" style="width: 50px; height: auto; max-width: 50px;">
            </div></head>
                <body>
                    <h2>SALES COMMISSION CALCULATOR</h2>
                    <table>
                        ${Object.entries(printData).map(([key, value]) => `
                            <tr><th>${key}:</th><td>${value}</td></tr>
                        `).join('')}
                    </table>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        });
    }
});

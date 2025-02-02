document.getElementById('addMore').addEventListener('click', function() {
    const inputsContainer = document.getElementById('inputsContainer');

    // Create a new entry row for amount and time
    const newEntry = document.createElement('div');
    newEntry.classList.add('entry');
    newEntry.innerHTML = `
        <label for="amount">Amount:</label>
        <input type="number" class="amount" required>
        
        <label for="startDate">Start Date:</label>
        <input type="date" class="startDate" required>

        <label for="endDate">End Date:</label>
        <input type="date" class="endDate" required>
    `;

    inputsContainer.appendChild(newEntry);
});

document.getElementById('interestForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const name = document.getElementById('name').value;
    const rate = parseFloat(document.getElementById('rate').value);
    const entries = document.querySelectorAll('.entry');
    const resultContainer = document.getElementById('resultContainer');
    const userNameDisplay = document.getElementById('userName');
    const resultTableBody = document.querySelector('#resultTable tbody');

    // Clear previous results
    resultTableBody.innerHTML = '';

    let totalAmount = 0;
    let totalInterest = 0;

    entries.forEach(entry => {
        const amount = parseFloat(entry.querySelector('.amount').value);
        const startDate = new Date(entry.querySelector('.startDate').value);
        const endDate = new Date(entry.querySelector('.endDate').value);
        const time = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate days

        // Calculate simple interest
        const interest = (amount * time) / (1500); // Convert days to years

        // Create a new row for the result table
        const resultRow = document.createElement('tr');
        resultRow.innerHTML = `
            <td>${amount.toFixed(2)}</td>
            <td>${rate.toFixed(2)}%</td>
            <td>${time}</td>
            <td>${interest.toFixed(2)}</td>
            <td>${startDate.toLocaleDateString()}</td>
            <td>${endDate.toLocaleDateString()}</td>
        `;

        // Append the new row to the table body
        resultTableBody.appendChild(resultRow);

        // Update totals
        totalAmount += amount;
        totalInterest += interest;
    });

    // Display the user's name in the results section
    userNameDisplay.textContent = name;
    resultContainer.style.display = 'block'; // Show the results container

    // Create a summary row for totals
    const summaryRow = document.createElement('tr');
    summaryRow.innerHTML = `
        <td><strong>Total:</strong> ${totalAmount.toFixed(2)}</td>
        <td colspan="3"><strong>Total Interest:</strong> ${totalInterest.toFixed(2)}</td>
        <td colspan="2"><strong>Grand Total:</strong> ${(totalAmount + totalInterest).toFixed(2)}</td>
    `;
    resultTableBody.appendChild(summaryRow);

    // Clear the form fields
    document.getElementById('interestForm').reset();

    // Clear dynamic inputs
    document.getElementById('inputsContainer').innerHTML = `
        <div class="entry">
            <label for="amount">Amount:</label>
            <input type="number" class="amount" required>
            
            <label for="startDate">Start Date:</label>
            <input type="date" class="startDate" required>

            <label for="endDate">End Date:</label>
            <input type="date" class="endDate" required>
        </div>
    `;
});

document.getElementById('reenterData').addEventListener('click', function() {
    document.getElementById('interestForm').reset();
    document.getElementById('inputsContainer').innerHTML = `
        <div class="entry">
            <label for="amount">Amount:</label>
            <input type="number" class="amount" required>
            
            <label for="startDate">Start Date:</label>
            <input type="date" class="startDate" required>

            <label for="endDate">End Date:</label>
            <input type="date" class="endDate" required>
        </div>
    `;
    document.querySelector('#resultTable tbody').innerHTML = ''; // Clear results
    document.getElementById('resultContainer').style.display = 'none'; // Hide results
});

document.getElementById('printResults').addEventListener('click', function() {
    const printContent = document.getElementById('resultContainer').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent; // Replace body content with results
    window.print(); // Print the current page

    document.body.innerHTML = originalContent; // Restore original content
});
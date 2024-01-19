// server.js
const express = require('express');

const axios = require('axios');
const xlsx = require('xlsx');

const app = express();
const port = 5000;

// Read data from Excel sheet
const workbook = xlsx.readFile('./upload/filterupload.xlsx'); 
const sheetName = workbook.SheetNames[0];
const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// API endpoint to fetch and modify flight data
app.get('/api/flights', async (req, res) => {
  try { 
    // Fetch data from Amadeus API
    const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${location.state.details.origin}&destinationLocationCode=${location.state.details.destination}&departureDate=${location.state.details.from}&returnDate=${location.state.details.to}&adults=${location.state.details.passengerData.adults}&children=${location.state.details.passengerData.children}&infants=${location.state.details.passengerData.infant}&travelClass=${location.state.details.cabin}&currencyCode=USD&max=40`;

    const response = await axios.get(apiUrl);
    const apiData = response.data;

    // Apply discounts and filters
    const discountedAndFilteredData = apiData.map(flight => {
      const matchingRow = excelData.find(row => row.FlightNumber === flight.number);

      if (matchingRow) {
        flight.price -= matchingRow.Discount;
        // Apply other filters...
      }

      return flight;
    });

    res.json(discountedAndFilteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

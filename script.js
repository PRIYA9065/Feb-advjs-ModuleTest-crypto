// fetching url

const APIURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

let responseData;

async function fetchData(){
    
    const response = await fetch(APIURL);
    const data = await response.json();
    console.log(data);
    responseData = data;
    renderTable(data);
}

function fetchDataThen(){
    fetch(APIURL)
    .then(res=>res.json())
    .then((data)=>{
        console.log(data);
        responseData = data;
        return renderTable(data);
    })
}

fetchData();


//function to create table and fetching all the data from the url given 
function renderTable(data){
    const tableBody = document.getElementById("table");
    tableBody.innerHTML='';

    data.forEach((coin) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><img class="img" src="${coin.image}" alt="${coin.name}"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol}</td>     
        <td>$${coin.current_price}</td>
        <td>$${coin.total_supply}</td>
        <td class="percent-1">${coin.market_cap_change_percentage_24h}</td>              
        <td>Mkt cap: ${coin.total_volume}</td>
        `
    // Appending all the rows to the table

        tableBody.appendChild(row);
    });
}


// function to filter data on the basis of our search input by converting the typed data into lower case and returning it.
function filterData() {
    const searchInput = document.getElementById('input');
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = responseData.filter(coin => coin.name.toLowerCase().includes(searchTerm));
    renderTable(filteredData);
  }



  //Sorting data on the basis of marketcap and percentagechange by using eventlistener with the help of parameter passed 
  function sortData(sortBy) {
    const sortedData = responseData.sort((a, b) => {
      if (sortBy === 'marketCap') {
        return b.market_cap - a.market_cap;
      } else if (sortBy === 'percentageChange') {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
    });

    renderTable(sortedData);
  }


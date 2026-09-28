const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");


searchBtn.addEventListener("click", getCountry);


countryInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        getCountry();
    }

});


async function getCountry() {

    const countryName = countryInput.value.trim();


    if (countryName === "") {

        result.innerHTML = `
            <p class="error">
                Please enter a country name.
            </p>
        `;

        return;
    }


    result.innerHTML = `
        <p class="loading">
            Loading...
        </p>
    `;


    try {

        const url =
            `https://countries.dev/name/${encodeURIComponent(countryName)}`;


        const response = await fetch(url);


        if (!response.ok) {
            throw new Error("Country not found");
        }


        const data = await response.json();


        console.log(data);


        /*
            The API returns the country object.
        */

        const country = Array.isArray(data)
            ? data[0]
            : data;


        if (!country) {
            throw new Error("Country not found");
        }


        const name =
            country.name || "N/A";


        const capital =
            country.capital || "N/A";


        const population =
            country.population
                ? country.population.toLocaleString()
                : "N/A";


        const region =
            country.region || "N/A";


        const subregion =
            country.subregion || "N/A";


        const flag =
            country.flag || "";


        let languages = "N/A";


        if (Array.isArray(country.languages)) {

            languages = country.languages
                .map(language => {

                    if (typeof language === "string") {
                        return language;
                    }

                    return language.name || "";

                })
                .filter(Boolean)
                .join(", ");

        }


        let currencies = "N/A";


        if (Array.isArray(country.currencies)) {

            currencies = country.currencies
                .map(currency => {

                    if (typeof currency === "string") {
                        return currency;
                    }

                    return `${currency.name || ""} ${currency.symbol || ""}`;

                })
                .filter(Boolean)
                .join(", ");

        }


        result.innerHTML = `

            <div class="country-card">

                <img
                    src="${flag}"
                    alt="${name} flag"
                >

                <h2>${name}</h2>

                <div class="country-info">

                    <div class="info-box">

                        <strong>Capital</strong>

                        <span>
                            ${capital}
                        </span>

                    </div>


                    <div class="info-box">

                        <strong>Population</strong>

                        <span>
                            ${population}
                        </span>

                    </div>


                    <div class="info-box">

                        <strong>Region</strong>

                        <span>
                            ${region}
                        </span>

                    </div>


                    <div class="info-box">

                        <strong>Subregion</strong>

                        <span>
                            ${subregion}
                        </span>

                    </div>


                    <div class="info-box">

                        <strong>Languages</strong>

                        <span>
                            ${languages}
                        </span>

                    </div>


                    <div class="info-box">

                        <strong>Currency</strong>

                        <span>
                            ${currencies}
                        </span>

                    </div>

                </div>

            </div>

        `;

    }

    catch (error) {

        console.error(error);

        result.innerHTML = `
            <p class="error">
                Country not found. Please try again.
            </p>
        `;

    }

}
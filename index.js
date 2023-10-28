const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");
const dateInput = document.getElementById("dateInput");
const enterButton = document.getElementById("enterButton");
const monthDropdown = document.getElementById("monthDropdown");
const yearDropdown = document.getElementById("yearDropdown");

// Initialize the current date
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// Define an array of month names
const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

// Populate the month dropdown
months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = month;
    monthDropdown.appendChild(option);
});

monthDropdown.value = currMonth;
yearDropdown.value = currYear;



// Populate the year dropdown with a range of years (e.g., from 2020 to 2030)
for (let year = 2020; year <= 2030; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearDropdown.appendChild(option);
}

// Function to update the current month and year based on the selected values in the dropdowns
const updateMonthYear = () => {
    currMonth = parseInt(monthDropdown.value);
    currYear = parseInt(yearDropdown.value);
    renderCalendar(); // Update the calendar when the month and year change
    updateCurrentDateText(); // Update the current date text
};

// Add event listeners to the dropdowns to trigger the update
monthDropdown.addEventListener("change", updateMonthYear);
yearDropdown.addEventListener("change", updateMonthYear);

// Function to update the current date text
const updateCurrentDateText = () => {
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
};

// Function to render the calendar
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                    && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    daysTag.innerHTML = liTag;
};

// Initialize the calendar with the current month and year
renderCalendar();
updateCurrentDateText(); // Update the current date text initially

prevNextIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
        updateCurrentDateText(); // Update the current date text when changing the month
    });
});

const dayElements = daysTag.querySelectorAll("li");
dayElements.forEach((dayElement, index) => {
    dayElement.addEventListener("click", () => {
        dayElements.forEach((element) => {
            element.classList.remove("selected");
        });
        dayElement.classList.add("selected");
    });
});

enterButton.addEventListener("click", () => {
    const enteredDate = parseInt(dateInput.value);
    if (enteredDate >= 1 && enteredDate <= 31) {
        const selectedDates = document.querySelectorAll(".selected");
        selectedDates.forEach((date) => {
            date.classList.remove("selected");
        });
        dayElements[enteredDate - 1].classList.add("selected");
    } else {
        alert("Please enter a valid date (1-31).");
    }
});

import publicLandfill from './data/publicLandfill.js'

mapboxgl.accessToken =
    'pk.eyJ1IjoiZmFiaW9sb2NvIiwiYSI6ImNsZHljNDdrYzBwcjEzdnFqNWE3ZHNnd2wifQ.INwO8p9TjPluZ-i5LxDp6w'

// Generate a unique id for popups
let uniqueID = () => {
    return `popup_${Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)}`
}

// Create the map
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [5, 44],
    zoom: 8.9,
})

// Geolocation control added
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
    })
)

// Create the DOM elements for the SVG icons
// Marker
const renderIconMarker = node => {
    const iconMarker = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    const iconPath_1 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    )
    const iconPath_2 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    )

    iconMarker.classList.add('icon_marker')
    iconPath_1.setAttribute(
        'd',
        'M20.82,13.05a10.93,10.93,0,0,0,.29-2.49A10.56,10.56,0,1,0,0,10.56a10.41,10.41,0,0,0,.3,2.49,15.69,15.69,0,0,0,1.15,4.11c1,2.18,5.4,9.37,7.41,12.65-2.71.35-4,1.51-4,2.61,0,1.31,1.77,2.71,5.67,2.71s5.66-1.4,5.66-2.71c0-1.1-1.25-2.26-4-2.61,2-3.28,6.37-10.47,7.4-12.65A15.66,15.66,0,0,0,20.82,13.05ZM14.59,32.42c-.11.31-1.47,1.08-4,1.08s-4-.79-4-1.07c.07-.27,1.19-.94,3.29-1.07l0,.09a.81.81,0,0,0,1.39,0l.05-.09C13.38,31.49,14.49,32.14,14.59,32.42ZM19.22,12.7a.13.13,0,0,1,0,.06,14.51,14.51,0,0,1-1,3.7c-1.05,2.2-5.83,10.05-7.63,13-1.81-2.95-6.59-10.8-7.64-13a14.94,14.94,0,0,1-1-3.7.13.13,0,0,0,0-.06,9.08,9.08,0,0,1-.26-2.14,8.93,8.93,0,1,1,17.85,0A8.59,8.59,0,0,1,19.22,12.7Z'
    )
    iconPath_2.setAttribute(
        'd',
        'M10.56,4.62a5.67,5.67,0,1,0,5.66,5.67A5.67,5.67,0,0,0,10.56,4.62Zm0,9.7a4,4,0,1,1,4-4A4,4,0,0,1,10.56,14.32Z'
    )
    iconMarker.appendChild(iconPath_1)
    iconMarker.appendChild(iconPath_2)

    return node.appendChild(iconMarker)
}

// Create the markers and the popups
// Loop in the datas for retrieving all we need
publicLandfill.forEach(landfill => {
    const marker = document.createElement('div')
    marker.className = 'marker_public'

    // Create the popup
    const popup = document.createElement('div')
    popup.className = 'popup_public'
    popup.id = uniqueID()

    // Create a heading for the landfill name
    if (landfill.NAME != null) {
        const landfillHeading = document.createElement('h1')
        landfillHeading.textContent = landfill.NAME
        popup.appendChild(landfillHeading)
    }

    // A box for the landfill informations
    const informationsBox = document.createElement('div')
    informationsBox.className = 'box_informations'
    popup.appendChild(informationsBox)

    const contactBox = document.createElement('div')
    contactBox.classList.add('contact')
    const addressBox = document.createElement('div')
    addressBox.classList.add('box_address')
    const addressTextBox = document.createElement('div')
    addressTextBox.classList.add('box_address_text')
    const phoneBox = document.createElement('div')
    phoneBox.classList.add('box_phone')
    const websiteBox = document.createElement('div')
    websiteBox.classList.add('box_website')
    renderIconMarker(addressBox)

    // Create a paragraph for the landfill address
    if (landfill.ADDRESS != null) {
        const address = document.createElement('p')
        address.className = 'address'
        address.textContent = landfill.ADDRESS
        addressTextBox.appendChild(address)
    }

    // Create a paragraph for the landfill city
    if (landfill.CITY != null) {
        const city = document.createElement('p')
        city.className = 'city'
        city.textContent = landfill.CITY
        addressTextBox.appendChild(city)
    }
    addressBox.appendChild(addressTextBox)

    // Create a paragraph for the landfill phone number
    if (landfill.PHONE != null) {
        const phone = document.createElement('p')
        phone.textContent = landfill.PHONE
        phoneBox.appendChild(phone)
    }

    // Create a link for the landfill website
    if (landfill.WEBSITE != null) {
        const website = document.createElement('a')
        website.href = landfill.WEBSITE
        website.textContent = 'Site web'
        websiteBox.appendChild(website)
    }
    contactBox.appendChild(addressBox)
    contactBox.appendChild(phoneBox)
    contactBox.appendChild(websiteBox)
    informationsBox.appendChild(contactBox)

    const descriptionBox = document.createElement('div')
    descriptionBox.classList.add('box_description')

    const title = document.createElement('h3')
    title.textContent = "Modalités d'accès :"
    descriptionBox.appendChild(title)

    if (landfill.DESCRIPTION != null) {
        const description = document.createElement('p')
        description.textContent = landfill.DESCRIPTION
        descriptionBox.appendChild(description)
    }
    informationsBox.appendChild(descriptionBox)

    const scheduleBox = document.createElement('div')
    scheduleBox.classList.add('box_schedule')

    // Create the table for the schedule
    const table = document.createElement('table')
    const headerRow = table.createTHead()
    const morningRow = document.createElement('tr')
    const summerMorningRow = document.createElement('tr')
    const afternoonRow = document.createElement('tr')
    const summerAfternoonRow = document.createElement('tr')

    // The header
    const headers = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    headers.forEach(headerText => {
        const header = document.createElement('th')
        header.textContent = headerText
        headerRow.appendChild(header)
    })
    table.appendChild(headerRow)

    // The Body
    if (landfill.HOURS_MORNING != null) {
        landfill.HOURS_MORNING.forEach(morningHour => {
            const morning = document.createElement('td')
            morning.className = 'morning_hours'
            morning.textContent = morningHour
            morningRow.appendChild(morning)
        })
        table.appendChild(morningRow)
    }

    if (landfill.HOURS_MORNING_SUMMER != null) {
        landfill.HOURS_MORNING_SUMMER.forEach(summerMorningHour => {
            const summerMorning = document.createElement('td')
            summerMorning.className = 'morning_hours_summer'
            summerMorning.textContent = summerMorningHour
            summerMorningRow.appendChild(summerMorning)
        })
        table.appendChild(summerMorningRow)
    }

    if (landfill.HOURS_AFTERNOON != null) {
        landfill.HOURS_AFTERNOON.forEach(afternoonHour => {
            const afternoon = document.createElement('td')
            afternoon.className = 'afternoon_hours'
            afternoon.textContent = afternoonHour
            afternoonRow.appendChild(afternoon)
        })
        table.appendChild(afternoonRow)
    }

    if (landfill.HOURS_AFTERNOON_SUMMER != null) {
        landfill.HOURS_AFTERNOON_SUMMER.forEach(summerAfternoonHour => {
            const summerAfternoon = document.createElement('td')
            summerAfternoon.className = 'afternoon_hours_summer'
            summerAfternoon.textContent = summerAfternoonHour
            summerAfternoonRow.appendChild(summerAfternoon)
        })
        table.appendChild(summerAfternoonRow)
    }

    // The wastes types list
    const wasteBox = document.createElement('div')
    wasteBox.classList.add('box_waste')

    if (landfill.AUTHORIZED_WASTE != null) {
        const authorizedWasteBox = document.createElement('div')
        authorizedWasteBox.classList.add('box_waste_authorized')
        const authorizedWasteTitle = document.createElement('h3')
        authorizedWasteTitle.textContent = 'Déchets autorisés'
        const authorizedWasteList = document.createElement('ul')

        landfill.AUTHORIZED_WASTE.forEach(authorizedWaste => {
            const authorizedWasteItem = document.createElement('li')
            authorizedWasteItem.textContent = authorizedWaste
            authorizedWasteList.appendChild(authorizedWasteItem)
        })
        wasteBox.appendChild(authorizedWasteBox)
        authorizedWasteBox.appendChild(authorizedWasteTitle)
        authorizedWasteBox.appendChild(authorizedWasteList)
    }

    if (landfill.FORBIDDEN_WASTE != null) {
        const forbiddenWasteBox = document.createElement('div')
        forbiddenWasteBox.classList.add('box_waste_forbidden')
        const forbiddenWasteTitle = document.createElement('h3')
        forbiddenWasteTitle.textContent = 'Déchets refusés'
        const forbiddenWasteList = document.createElement('ul')

        landfill.FORBIDDEN_WASTE.forEach(forbiddenWaste => {
            const forbiddenWasteItem = document.createElement('li')
            forbiddenWasteItem.textContent = forbiddenWaste
            forbiddenWasteList.appendChild(forbiddenWasteItem)
        })
        wasteBox.appendChild(forbiddenWasteBox)
        forbiddenWasteBox.appendChild(forbiddenWasteTitle)
        forbiddenWasteBox.appendChild(forbiddenWasteList)
    }

    // The markers with their popups added
    new mapboxgl.Marker(marker)
        .setLngLat(landfill.COORDINATES)
        .setPopup(new mapboxgl.Popup().setDOMContent(popup))
        .addTo(map)

    scheduleBox.appendChild(table)

    popup.appendChild(informationsBox)
    popup.appendChild(scheduleBox)
    if (landfill.HOURS_INFORMATIONS != null) {
        const hoursInformationsBox = document.createElement('div')
        hoursInformationsBox.className = 'hours_informations_box'
        const hoursInformations = document.createElement('p')
        hoursInformations.textContent = landfill.HOURS_INFORMATIONS
        hoursInformationsBox.appendChild(hoursInformations)
        popup.appendChild(hoursInformationsBox)
    }
    popup.appendChild(wasteBox)
})

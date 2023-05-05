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
    iconMarker.setAttribute('viewBox', '-10 -1.5 38 38')
    iconMarker.setAttribute('height', '50')
    iconMarker.setAttribute('width', '50')
    iconMarker.setAttribute('stroke', '#98dc62')
    iconMarker.setAttribute('fill', '#98dc62')
    iconMarker.setAttribute('stroke-width', '1.5px')

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

// Create the DOM elements for the SVG icons
// Marker
const renderIconPhone = node => {
    const iconPhone = document.createElementNS(
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
    const iconPath_3 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    )

    iconPhone.classList.add('icon_phone')
    iconPhone.setAttribute('viewBox', '-3.5 -3.5 38 38')
    iconPhone.setAttribute('height', '50')
    iconPhone.setAttribute('width', '50')
    iconPhone.setAttribute('stroke', '#FFBC2F')
    iconPhone.setAttribute('fill', '#FFBC2F')
    iconPhone.setAttribute('stroke-width', '1.5px')

    iconPath_1.setAttribute(
        'd',
        'M1.93,6.28a3.49,3.49,0,0,0-.37.47A6,6,0,0,0,.15,12.31,25.45,25.45,0,0,0,22.78,32.78l.72,0A6.57,6.57,0,0,0,27,31.9a4.82,4.82,0,0,0,1.24-1l1-1.06a5.08,5.08,0,0,0-.36-7.17l-1.62-1.46a5.05,5.05,0,0,0-3.4-1.32A5.1,5.1,0,0,0,20,21.56l-1,1.07a5.35,5.35,0,0,0-.9,1.39,17.93,17.93,0,0,1-8.92-8.17,5.1,5.1,0,0,0,1.85-1.3l1-1.06a5.06,5.06,0,0,0-.36-7.17L10.06,4.85a5.08,5.08,0,0,0-7.17.36Zm1.93-.19a3.78,3.78,0,0,1,5.33-.27l1.62,1.47a3.78,3.78,0,0,1,.27,5.32l-1,1.07h0a3.79,3.79,0,0,1-1.7,1.08l-.29.08a.63.63,0,0,0-.41.37.62.62,0,0,0,0,.55l.14.27a19.18,19.18,0,0,0,10.19,9.35l.25.1a.65.65,0,0,0,.51,0,.71.71,0,0,0,.35-.39l.08-.25A3.8,3.8,0,0,1,20,23.5l1-1.06a3.77,3.77,0,0,1,5.32-.27l1.63,1.47A3.76,3.76,0,0,1,28.19,29l-1,1.07a3.83,3.83,0,0,1-.93.75,5.54,5.54,0,0,1-3.41.7A24.15,24.15,0,0,1,1.43,12.06a4.77,4.77,0,0,1,1-4.36l.06,0,0-.05.05-.07a3.57,3.57,0,0,1,.3-.38Z'
    )
    iconPath_2.setAttribute(
        'd',
        'M32.52,15.49A15.51,15.51,0,0,0,17,0a1.36,1.36,0,1,0,0,2.71A12.8,12.8,0,0,1,29.81,15.49a1.36,1.36,0,1,0,2.71,0Zm-1.36.71a.7.7,0,0,1-.7-.71A13.45,13.45,0,0,0,17,2.06a.7.7,0,0,1-.71-.7A.71.71,0,0,1,17,.65,14.86,14.86,0,0,1,31.87,15.49.71.71,0,0,1,31.16,16.2Z'
    )
    iconPath_3.setAttribute(
        'd',
        'M16.86,5.05a1.36,1.36,0,0,0,0,2.71,7.9,7.9,0,0,1,7.9,7.9,1.36,1.36,0,0,0,2.72,0A10.63,10.63,0,0,0,16.86,5.05Zm9.26,11.31a.7.7,0,0,1-.71-.7,8.55,8.55,0,0,0-8.55-8.55.7.7,0,0,1-.7-.71.7.7,0,0,1,.7-.7,10,10,0,0,1,10,10A.7.7,0,0,1,26.12,16.36Z'
    )
    iconPhone.appendChild(iconPath_1)
    iconPhone.appendChild(iconPath_2)
    iconPhone.appendChild(iconPath_3)

    return node.appendChild(iconPhone)
}
// website icon
const renderIconWebsite = node => {
    const iconWebsite = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    const iconPath_1 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    )

    iconWebsite.classList.add('icon_website')
    iconWebsite.setAttribute('viewBox', '-3.5 -3.5 38 38')
    iconWebsite.setAttribute('height', '50')
    iconWebsite.setAttribute('width', '50')
    iconWebsite.setAttribute('stroke', '#7CBBFF')
    iconWebsite.setAttribute('fill', '#7CBBFF')
    iconWebsite.setAttribute('stroke-width', '1.5px')

    iconPath_1.setAttribute(
        'd',
        'M15.35,32.39H16.9A16.2,16.2,0,0,0,16.9,0H15.34a16.21,16.21,0,0,0,0,32.38Zm-9.8-5.71a18.22,18.22,0,0,1,3.32-1.91,19.49,19.49,0,0,0,4.62,6.13A15,15,0,0,1,5.55,26.68Zm10,4.32A18.3,18.3,0,0,1,10,24.3a19,19,0,0,1,5.55-1.1Zm0-9a19.79,19.79,0,0,0-6.06,1.21,18.45,18.45,0,0,1-1.29-5.8h7.35Zm0-5.85H8.2a18.7,18.7,0,0,1,1-6,19.82,19.82,0,0,0,6.38,1.35Zm3.13,14.84a19.36,19.36,0,0,0,4.78-6.39,18,18,0,0,1,3.56,1.93A14.91,14.91,0,0,1,18.72,30.94Zm9.17-5.41A19.5,19.5,0,0,0,24,23.39a19.64,19.64,0,0,0,1.29-6h5.85A14.72,14.72,0,0,1,27.89,25.53Zm.47-18a14.81,14.81,0,0,1,2.81,8.61H25.31a19.62,19.62,0,0,0-1-6.24A20.05,20.05,0,0,0,28.36,7.48Zm-.77-1a18.49,18.49,0,0,1-3.74,2.19,19.58,19.58,0,0,0-5.13-7.23A15,15,0,0,1,27.59,6.49Zm-10.75-5a18.57,18.57,0,0,1,5.85,7.62,18.24,18.24,0,0,1-5.85,1.08Zm0,10a19.87,19.87,0,0,0,6.28-1.16,18.81,18.81,0,0,1,.94,5.78H16.84Zm0,5.87H24A18.77,18.77,0,0,1,22.8,23a20.05,20.05,0,0,0-6-1Zm0,5.83a19.07,19.07,0,0,1,5.47.93,18.44,18.44,0,0,1-5.47,6.76ZM15.59,1.39V10.2A18.44,18.44,0,0,1,9.66,8.94,18.34,18.34,0,0,1,15.59,1.39Zm-2.1.1a19.56,19.56,0,0,0-5,7A18.37,18.37,0,0,1,5,6.28,15,15,0,0,1,13.49,1.49ZM4.24,7.25A20,20,0,0,0,8.05,9.61a20.08,20.08,0,0,0-1.11,6.5H1.25A14.78,14.78,0,0,1,4.24,7.25ZM1.3,17.36H7a19.69,19.69,0,0,0,1.39,6.27,18.76,18.76,0,0,0-3.66,2.12A14.79,14.79,0,0,1,1.3,17.36Z'
    )

    iconWebsite.appendChild(iconPath_1)

    return node.appendChild(iconWebsite)
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
    contactBox.classList.add('box_contact')
    const addressBox = document.createElement('div')
    addressBox.classList.add('box_address')
    const addressTextBox = document.createElement('div')
    addressTextBox.classList.add('box_address_text')
    const phoneBox = document.createElement('div')
    phoneBox.classList.add('box_phone')
    const websiteBox = document.createElement('div')
    websiteBox.classList.add('box_website')
    renderIconMarker(addressBox)
    renderIconPhone(phoneBox)
    renderIconWebsite(websiteBox)

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

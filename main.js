import publicLandfill from './data/publicLandfill.js'

mapboxgl.accessToken =
    'pk.eyJ1IjoiZmFiaW9sb2NvIiwiYSI6ImNsZHljNDdrYzBwcjEzdnFqNWE3ZHNnd2wifQ.INwO8p9TjPluZ-i5LxDp6w'

// Generate a unique id for popups
let uniqueID = () => {
    return `popup_${Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)}`
}

const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [5, 44],
    zoom: 8.9,
})

// Loop in the datas for retrieving all we need
publicLandfill.forEach(landfill => {
    const marker = document.createElement('div')
    marker.className = 'marker'

    // Create the popup
    const popup = document.createElement('div')
    popup.className = 'popup'
    popup.id = uniqueID()

    const addressBox = document.createElement('div')
    addressBox.classList.add('box_address')

    // Create a heading for the landfill name
    if (landfill.HOURS_AFTERNOON != null) {
        const landfillHeading = document.createElement('h1')
        landfillHeading.textContent = landfill.NAME
        popup.appendChild(landfillHeading)
    }

    // Create a paragraph for the landfill address
    if (landfill.ADDRESS != null) {
        const address = document.createElement('p')
        address.textContent = `Adresse : ${landfill.ADDRESS}`
        addressBox.appendChild(address)
    }

    // Create a paragraph for the landfill phone number
    if (landfill.PHONE != null) {
        const phone = document.createElement('p')
        phone.textContent = `Téléphone : ${landfill.PHONE}`
        addressBox.appendChild(phone)
    }

    // Create a link for the landfill website
    if (landfill.WEBSITE != null) {
        const website = document.createElement('a')
        website.href = landfill.WEBSITE
        website.textContent = 'Site web'
        addressBox.appendChild(website)
    }

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

    const scheduleBox = document.createElement('div')
    scheduleBox.classList.add('box_schedule')

    // Create the table for the schedule
    const table = document.createElement('table')
    const headerRow = table.createTHead()
    const morningRow = document.createElement('tr')
    const afternoonRow = document.createElement('tr')
    const summerRow = document.createElement('tr')

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
            morning.textContent = morningHour
            morningRow.appendChild(morning)
        })
        table.appendChild(morningRow)
    }

    if (landfill.HOURS_AFTERNOON != null) {
        landfill.HOURS_AFTERNOON.forEach(afternoonHour => {
            const afternoon = document.createElement('td')
            afternoon.textContent = afternoonHour
            afternoonRow.appendChild(afternoon)
        })
        table.appendChild(afternoonRow)
    }

    if (landfill.HOURS_SUMMER != null) {
        landfill.HOURS_SUMMER.forEach(summerHour => {
            const summer = document.createElement('td')
            summer.textContent = summerHour
            summerRow.appendChild(summer)
        })
        table.appendChild(summerRow)
    }

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

    new mapboxgl.Marker(marker)
        .setLngLat(landfill.COORDINATES)
        .setPopup(new mapboxgl.Popup().setDOMContent(popup))
        .addTo(map)

    scheduleBox.appendChild(table)

    popup.appendChild(addressBox)
    popup.appendChild(descriptionBox)
    popup.appendChild(scheduleBox)
    popup.appendChild(wasteBox)
})

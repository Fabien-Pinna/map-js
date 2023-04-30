import publicLandfill from './data/publicLandfill.js'

mapboxgl.accessToken =
    'pk.eyJ1IjoiZmFiaW9sb2NvIiwiYSI6ImNsZHljNDdrYzBwcjEzdnFqNWE3ZHNnd2wifQ.INwO8p9TjPluZ-i5LxDp6w'

// Generate a unique id for popups
let uniqueID = () => {
    return `popup_${Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)}`
}

// Loop in the datas for retrieving all we need
publicLandfill.forEach(landfill => {
    // Create the popup
    const popup = document.createElement('div')
    popup.classList.add('popup')
    popup.id = uniqueID()

    const addressBox = document.createElement('div')
    addressBox.classList.add('box_address')

    // Create a heading for the landfill name
    const landfillHeading = document.createElement('h1')
    landfillHeading.textContent = landfill.NAME
    popup.appendChild(landfillHeading)

    // Create a paragraph for the landfill address
    const address = document.createElement('p')
    address.textContent = `Adresse : ${landfill.ADDRESS}`
    addressBox.appendChild(address)

    // Create a paragraph for the landfill phone number
    const phone = document.createElement('p')
    phone.textContent = `Téléphone : ${landfill.PHONE}`
    addressBox.appendChild(phone)

    // Create a link for the landfill website
    const website = document.createElement('a')
    website.href = landfill.WEBSITE
    website.textContent = 'Site web'
    addressBox.appendChild(website)

    const descriptionBox = document.createElement('div')
    descriptionBox.classList.add('box_description')

    const title = document.createElement('h3')
    title.textContent = "Modalités d'accès :"
    descriptionBox.appendChild(title)

    const description = document.createElement('p')
    description.textContent = landfill.DESCRIPTION
    descriptionBox.appendChild(description)

    const scheduleBox = document.createElement('div')
    scheduleBox.classList.add('box_schedule')

    // Create the table for the schedule
    const table = document.createElement('table')
    const headerRow = table.createTHead()
    const morningRow = document.createElement('tr')
    const afternoonRow = document.createElement('tr')

    // The header
    const headers = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
    headers.forEach(headerText => {
        const header = document.createElement('th')
        header.textContent = headerText
        headerRow.appendChild(header)
    })
    table.appendChild(headerRow)

    // The Body
    landfill.HOURS_MORNING.forEach(morningHour => {
        const morning = document.createElement('td')
        morning.textContent = morningHour
        morningRow.appendChild(morning)
    })
    table.appendChild(morningRow)

    landfill.HOURS_AFTERNOON.forEach(afternoonHour => {
        const afternoon = document.createElement('td')
        afternoon.textContent = afternoonHour
        afternoonRow.appendChild(afternoon)
    })
    table.appendChild(afternoonRow)

    scheduleBox.appendChild(table)

    popup.appendChild(scheduleBox)
    popup.appendChild(addressBox)
    popup.appendChild(descriptionBox)
    document.body.appendChild(popup)
})

// Add the popup to the page

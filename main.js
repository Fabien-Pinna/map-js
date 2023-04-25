mapboxgl.accessToken =
    'pk.eyJ1IjoiZmFiaW9sb2NvIiwiYSI6ImNsZHljNDdrYzBwcjEzdnFqNWE3ZHNnd2wifQ.INwO8p9TjPluZ-i5LxDp6w'
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/fabioloco/clgw2jxrm008801qycujpczwb',
    center: [5, 44],
    zoom: 8.9,
})

map.on('load', () => {
    map.addSource('places', {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: 'geojson',
        data: './publicLandfill.geojson',
    })
    // Add a layer showing the places.
    map.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
            'icon-image': 'markerrr',
            'icon-allow-overlap': true,
        },
    })

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', e => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice()
        const name = e.features[0].properties.LANDFILL_NAME
        const description = e.features[0].properties.LANDFILL_DESCRIPTION

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        new mapboxgl.Popup({ className: 'details-popup' })
            .setLngLat(coordinates)
            .setHTML(name)
            .addTo(map)
    })

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer'
    })

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = ''
    })
})

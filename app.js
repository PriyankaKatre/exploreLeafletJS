// // Initialize the map centered on Maharashtra
// const map = L.map("map").setView([21.7679, 78.8718], 5.4);

// // Add a tile layer (OpenStreetMap)
// let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// });
// osm.addTo(map)

// let googleStreets = L.tileLayer(
//     "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
//     {
//         maxZoom: 20,
//         subdomains: ["mt0", "mt1", "mt2", "mt3"],
//     }
// );
// googleStreets.addTo(map)

// let googleHybrid = L.tileLayer(
//     "http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}",
//     {
//         maxZoom: 20,
//         subdomains: ["mt0", "mt1", "mt2", "mt3"],
//     }
// );
// //googleHybrid.addTo(map);

// let googleSat = L.tileLayer("http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}", {
//     maxZoom: 20,
//     subdomains: ["mt0", "mt1", "mt2", "mt3"],
// });

// //googleSat.addTo(map);

// let googleTerrain = L.tileLayer(
//     "http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}",
//     {
//         maxZoom: 20,
//         subdomains: ["mt0", "mt1", "mt2", "mt3"],
//     }
// );
// //googleHybrid.addTo(map);



// //Marker
// let myIcon = L.icon({
//     iconUrl: "marker.svg",
//     iconSize: [40, 40],
//     iconAnchor: [22, 94],
//     popupAnchor: [-3, -76],
// });

// let firstMarker = L.marker([21.7679, 78.8718], { icon: myIcon, draggable: true });
// let secondMarker = L.marker([20.7679, 79.8718], {
//     icon: myIcon,
//     draggable: true,
// });
// let popup = firstMarker.bindPopup("This is India. " + firstMarker.getLatLng()).openPopup();
// firstMarker.addTo(map)

// let baseMaps = {
//     "OpenStreetMap": osm,
//     "googleHybrid": googleHybrid,
//     "googleStreets": googleStreets,
//     "googleTerrain": googleTerrain,
//     "googleSat": googleSat,
// };

// let overlayMaps = {
//     "first Marker": firstMarker,
//     "second Marker": secondMarker,
// };

// L.control.layers(baseMaps, overlayMaps).addTo(map);

// Initialize the map centered on India


// List of GeoJSON file paths
const geojsonFiles = ["./maharashtra.geojson", "./madhya_pradesh.geojson"];

// Function to generate random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const stateColors = {
  "Madhya Pradesh": { fillColor: "#FF5733", borderColor: "#C70039" },
  Maharashtra: { fillColor: "#33FF57", borderColor: "#39C700" },
  Assam: { fillColor: "#3357FF", borderColor: "#0039C7" }, // Add specific colors for the rest of the states... };
};

// Function to load a GeoJSON file
const loadGeoJson = (filePath) => {
  return fetch(filePath).then((response) => response.json());
};

// Main function to load and display GeoJSON with specific colors
const displayGeoJsonWithColors = async (filePaths) => {
  let combinedFeatures = [];

  for (const filePath of filePaths) {
    try {
      const geojson = await loadGeoJson(filePath);
      combinedFeatures = combinedFeatures.concat(geojson.features);
    } catch (error) {
      console.error("Error loading GeoJSON:", error);
    }
  }

  const combinedGeoJson = {
    type: "FeatureCollection",
    features: combinedFeatures,
  };

  // Initialize the map centered on Madhya Pradesh
  const map = L.map("map").setView([23.2599, 77.4126], 7);

  // Add a tile layer (OpenStreetMap)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add GeoJSON layer to the map with specific colors
  L.geoJSON(combinedGeoJson, {
    style: function (feature) {
      return {
        color: feature.properties.borderColor, // Use the specific border color assigned
        weight: 2, // Border width
        fillColor: feature.properties.fillColor, // Use the specific fill color assigned
        fillOpacity: 0.6, // Opacity of the fill
      };
    },
    onEachFeature: function (feature, layer) {
      // Add popup with district name
      layer.bindPopup(
        `${feature.properties.district}, ${feature.properties.st_nm}`
      );
    },
  }).addTo(map);
};

// Display the GeoJSON files with specific colors
displayGeoJsonWithColors(geojsonFiles);

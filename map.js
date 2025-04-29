var initLoad = true;
// Define global variable to track current chapter ID
var currentChapterId = "";

/* Create two variables that will hold:
1. The different types of layers available to Mapbox and their
respective opacity attributes.
2. The possible alignments which could be applied to the vignettes.*/
var layerTypes = {
  fill: ["fill-opacity"],
  line: ["line-opacity"],
  circle: ["circle-opacity", "circle-stroke-opacity"],
  symbol: ["icon-opacity", "text-opacity"],
  raster: ["raster-opacity"],
  "fill-extrusion": ["fill-extrusion-opacity"],
  heatmap: ["heatmap-opacity"],
};

var alignments = {
  left: "lefty",
  center: "centered",
  right: "righty",
  full: "fully",
};

// Timeline graph data for the dynamic visualization
const fundingData = [
  { year: '2020', emergency: 1700, nonEmergency: 6500, floodRisk: 850, bric: 750 },
  { year: '2021', emergency: 7300, nonEmergency: 6400, floodRisk: 1200, bric: 900 },
  { year: '2022', emergency: 10200, nonEmergency: 5800, floodRisk: 1800, bric: 1350 },
  { year: '2023', emergency: 3900, nonEmergency: 7200, floodRisk: 1600, bric: 1200 },
  { year: '2024', emergency: 3800, nonEmergency: 8000, floodRisk: 1500, bric: 1350 },
  { year: '2025 Q1', emergency: 3700, nonEmergency: 7800, floodRisk: 1400, bric: 1300 },
  { year: '2025 Q2', emergency: 1500, nonEmergency: 7000, floodRisk: 800, bric: 0 },
  { year: '2025 Q3', emergency: 250, nonEmergency: 6500, floodRisk: 200, bric: 0 },
  { year: '2025 Q4', emergency: 200, nonEmergency: 6500, floodRisk: 150, bric: 0 },
  { year: '2026', emergency: 50, nonEmergency: 7000, floodRisk: 50, bric: 0 },
  { year: '2027', emergency: 50, nonEmergency: 7000, floodRisk: 50, bric: 0 },
  { year: '2028', emergency: 50, nonEmergency: 7000, floodRisk: 50, bric: 0 },
  { year: '2029', emergency: 50, nonEmergency: 7000, floodRisk: 50, bric: 0 }
];

// Timeline graph variables
let timelineGraphContainer = null;
let timelineGraphSvg = null;
let currentTimelineChapter = null;

// Function to load D3.js dynamically if not already loaded
function loadD3Library(callback) {
  if (window.d3) {
    callback();
    return;
  }
  
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://d3js.org/d3.v7.min.js';
  script.onload = callback;
  document.head.appendChild(script);
}

/* The next two functions help turn on and off individual
layers through their opacity attributes: The first one gets
the type of layer and the second one adjusts the layer's opacity */
function getLayerPaintType(layer) {
  var layerType = map.getLayer(layer).type;
  return layerTypes[layerType];
}

function setLayerOpacity(layer) {
  var paintProps = getLayerPaintType(layer.layer);
  paintProps.forEach(function (prop) {
    var options = {};
    if (layer.duration) {
      var transitionProp = prop + "-transition";
      options = { duration: layer.duration };
      map.setPaintProperty(layer.layer, transitionProp, options);
    }
    map.setPaintProperty(layer.layer, prop, layer.opacity, options);
  });
}

// Add these functions to your map.js file after the map initialization
function showMap() {
  document.getElementById('map').classList.add('visible');
}

function hideMap() {
  document.getElementById('map').classList.remove('visible');
}

// Function to show the Justice40 map - will be called from chapter callbacks
function showJustice40Map() {
  // Implementation would go here
  console.log("Showing Justice40 map");
}

// Function to hide the Justice40 map
function hideJustice40Map() {
  // Implementation would go here
  console.log("Hiding Justice40 map");
}

// Create the timeline graph container that will overlay on the map
function createTimelineGraph() {
  loadD3Library(function() {
    if (document.getElementById('timeline-graph-container')) {
      return;
    }
    
    // Create the container
    timelineGraphContainer = document.createElement('div');
    timelineGraphContainer.id = 'timeline-graph-container';
    timelineGraphContainer.style.position = 'absolute';
    timelineGraphContainer.style.top = '0';
    timelineGraphContainer.style.left = '0';
    timelineGraphContainer.style.width = '100%';
    timelineGraphContainer.style.height = '100vh';
    timelineGraphContainer.style.zIndex = '1000';
    timelineGraphContainer.style.pointerEvents = 'none';
    timelineGraphContainer.style.opacity = '0';
    timelineGraphContainer.style.transition = 'opacity 0.5s ease';
    
    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.id = 'graph-content';
    contentDiv.style.width = '90%';
    contentDiv.style.height = '80vh';
    contentDiv.style.margin = '10vh auto 0';
    contentDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
    contentDiv.style.borderRadius = '10px';
    contentDiv.style.padding = '20px';
    contentDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    
    // Create a title element
    const titleElement = document.createElement('h2');
    titleElement.id = 'timeline-title';
    titleElement.style.textAlign = 'center';
    titleElement.style.marginBottom = '10px';
    titleElement.style.fontFamily = "'Gill Sans', 'Helvetica', sans-serif";
    
    // Create a description element
    const descElement = document.createElement('p');
    descElement.id = 'timeline-description';
    descElement.style.textAlign = 'center';
    descElement.style.marginBottom = '20px';
    descElement.style.fontFamily = "'Gill Sans', 'Helvetica', sans-serif";
    
    // Create SVG container
    const svgContainer = document.createElement('div');
    svgContainer.id = 'timeline-svg-container';
    svgContainer.style.width = '100%';
    svgContainer.style.height = 'calc(100% - 100px)';
    
    // Add elements to the container
    contentDiv.appendChild(titleElement);
    contentDiv.appendChild(descElement);
    contentDiv.appendChild(svgContainer);
    timelineGraphContainer.appendChild(contentDiv);
    
    // Add to the map container
    document.getElementById('map').appendChild(timelineGraphContainer);
  });
}

// Function to update the timeline graph based on the chapter
function updateTimelineGraph(chapterId) {
  if (!window.d3 || !timelineGraphContainer) {
    return;
  }
  
  currentTimelineChapter = chapterId;
  
  // Define chapter-specific configurations
  const chapterConfigs = {
    'funding2022': {
      yearRange: [0, 3], // Show 2020 to 2022
      highlightYear: '2022',
      title: "2022: THE PEAK OF CLIMATE FUNDING",
      description: "Federal emergency climate funding reached an unprecedented $10.2 billion"
    },
    'funding2025': {
      yearRange: [0, 9], // Show 2020 to 2025 Q4
      highlightYear: '2025 Q3',
      title: "2025: THE COLLAPSE OF CLIMATE PROTECTION",
      description: "By 2025, emergency climate funding plummeted to just $200 million - a 98% drop"
    },
    'funding2029': {
      yearRange: [0, 13], // Show full range to 2029/2030
      highlightYear: '2026',
      title: "2029: THE CONSEQUENCES FOR VULNERABLE COMMUNITIES",
      description: "Projections show emergency climate funding will remain at just $50 million through 2029"
    }
  };
  
  // If this isn't a funding chapter, hide the graph
  if (!chapterConfigs[chapterId]) {
    timelineGraphContainer.style.opacity = '0';
    return;
  }
  
  // Show the graph for funding chapters
  timelineGraphContainer.style.opacity = '1';
  
  // Get the chapter-specific config
  const config = chapterConfigs[chapterId];
  
  // Update title and description
  document.getElementById('timeline-title').textContent = config.title;
  document.getElementById('timeline-description').textContent = config.description;
  
  // Get the SVG container
  const svgContainer = document.getElementById('timeline-svg-container');
  svgContainer.innerHTML = '';
  
  // Set up dimensions
  const margin = {top: 40, right: 100, bottom: 80, left: 80};
  const width = svgContainer.clientWidth - margin.left - margin.right;
  const height = svgContainer.clientHeight - margin.top - margin.bottom;
  
  // Create SVG
  d3.select('#timeline-svg-container').selectAll('*').remove();

  const svg = d3.select('#timeline-svg-container')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${svgContainer.clientWidth} ${svgContainer.clientHeight}`)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // Get data for this chapter
  const chapterData = fundingData.slice(config.yearRange[0], config.yearRange[1]);
  
  // Set up scales
  const x = d3.scaleBand()
    .domain(chapterData.map(d => d.year))
    .range([0, width])
    .padding(0.1);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(chapterData, d => Math.max(d.emergency, d.nonEmergency, d.floodRisk, d.bric)) * 1.1])
    .nice()
    .range([height, 0]);
  
  // Add X axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-45)')
    .style('font-size', '12px')
    .style('font-family', "'Gill Sans', 'Helvetica', sans-serif");
  
  // Add Y axis
  svg.append('g')
    .call(d3.axisLeft(y))
    .selectAll('text')
    .style('font-size', '12px')
    .style('font-family', "'Gill Sans', 'Helvetica', sans-serif");
  
  // Add Y axis label
  svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left + 20)
    .attr('x', -height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .style('font-family', "'Gill Sans', 'Helvetica', sans-serif")
    .text('Funding (millions USD)');
  
  // Add grid lines
  svg.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft(y)
      .tickSize(-width)
      .tickFormat('')
    )
    .selectAll('line')
    .style('stroke', '#e0e0e0')
    .style('stroke-opacity', 0.7);
  
  // Define line generators
  const emergencyLine = d3.line()
    .x(d => x(d.year) + x.bandwidth()/2)
    .y(d => y(d.emergency));
  
  const nonEmergencyLine = d3.line()
    .x(d => x(d.year) + x.bandwidth()/2)
    .y(d => y(d.nonEmergency));
  
  const floodRiskLine = d3.line()
    .x(d => x(d.year) + x.bandwidth()/2)
    .y(d => y(d.floodRisk));
  
  const bricLine = d3.line()
    .x(d => x(d.year) + x.bandwidth()/2)
    .y(d => y(d.bric));
  
  // Add lines with animation
  svg.append('path')
    .datum(chapterData)
    .attr('fill', 'none')
    .attr('stroke', '#e74c3c')
    .attr('stroke-width', 3)
    .attr('d', emergencyLine)
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .style('opacity', 1);
  
  svg.append('path')
    .datum(chapterData)
    .attr('fill', 'none')
    .attr('stroke', '#3498db')
    .attr('stroke-width', 2)
    .attr('d', nonEmergencyLine)
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .style('opacity', 1);
  
  svg.append('path')
    .datum(chapterData)
    .attr('fill', 'none')
    .attr('stroke', '#27ae60')
    .attr('stroke-width', 2)
    .attr('d', floodRiskLine)
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .style('opacity', 1);
  
  svg.append('path')
    .datum(chapterData)
    .attr('fill', 'none')
    .attr('stroke', '#8e44ad')
    .attr('stroke-width', 2)
    .attr('d', bricLine)
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .style('opacity', 1);
  
  // Add legend
  const legend = svg.append('g')
    .attr('font-family', "'Gill Sans', 'Helvetica', sans-serif")
    .attr('font-size', 10)
    .attr('text-anchor', 'start')
    .selectAll('g')
    .data(['Emergency Climate Funding', 'Non-Emergency Funding', 'Flood Risk Funding', 'FEMA BRIC Program'])
    .enter().append('g')
    .attr('transform', (d, i) => `translate(${width - 170},${i * 20})`);
  
  legend.append('rect')
    .attr('x', 0)
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', (d, i) => ['#e74c3c', '#3498db', '#27ae60', '#8e44ad'][i]);
  
  legend.append('text')
    .attr('x', 20)
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(d => d);
  
  // Highlight the specified year
  if (config.highlightYear) {
    const highlightedData = chapterData.find(d => d.year === config.highlightYear);
    if (highlightedData) {
      const yearX = x(config.highlightYear) + x.bandwidth()/2;
      
      // Add vertical line at highlighted year
      svg.append('line')
        .attr('x1', yearX)
        .attr('y1', 0)
        .attr('x2', yearX)
        .attr('y2', height)
        .attr('stroke', '#555')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '5,5')
        .style('opacity', 0)
        .transition()
        .duration(1200)
        .style('opacity', 0.7);
      
      // Add highlights for each data point
      const dataPoints = [
        { value: highlightedData.emergency, color: '#e74c3c' },
        { value: highlightedData.nonEmergency, color: '#3498db' },
        { value: highlightedData.floodRisk, color: '#27ae60' },
        { value: highlightedData.bric, color: '#8e44ad' }
      ];
      
      dataPoints.forEach(point => {
        svg.append('circle')
          .attr('cx', yearX)
          .attr('cy', y(point.value))
          .attr('r', 0)
          .attr('fill', point.color)
          .transition()
          .duration(1500)
          .attr('r', 6);
      });
      
      // Add value for highlighted emergency funding
      svg.append('text')
        .attr('x', yearX + 10)
        .attr('y', y(highlightedData.emergency) - 10)
        .attr('fill', '#e74c3c')
        .attr('font-weight', 'bold')
        .style('font-size', '0.9rem')
        .style('font-family', "'Gill Sans', 'Helvetica', sans-serif")
        .style('opacity', 0)
        .text('$' + highlightedData.emergency + 'M')
        .transition()
        .duration(1500)
        .style('opacity', 1);
    }
  }
  
  // Add special visualization for the dramatic drop in 2025
  if (chapterId === 'funding2025' || chapterId === 'funding2029') {
    const q2Index = chapterData.findIndex(d => d.year === '2025 Q2');
    const q3Index = chapterData.findIndex(d => d.year === '2025 Q3');
    
    if (q2Index !== -1 && q3Index !== -1) {
      const q2Data = chapterData[q2Index];
      const q3Data = chapterData[q3Index];
      
      const q2X = x(q2Data.year) + x.bandwidth()/2;
      const q3X = x(q3Data.year) + x.bandwidth()/2;
      const q2Y = y(q2Data.emergency);
      const q3Y = y(q3Data.emergency);
      
      // Calculate percentage drop
      const percentDrop = ((q2Data.emergency - q3Data.emergency) / q2Data.emergency * 100).toFixed(0);
      
      // Draw annotation
      svg.append('path')
        .attr('d', `M${q2X},${q2Y} L${q2X+15},${q2Y-15} L${q3X-15},${q3Y-15} L${q3X},${q3Y}`)
        .attr('fill', 'none')
        .attr('stroke', '#e74c3c')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '3,3')
        .style('opacity', 0)
        .transition()
        .delay(1500)
        .duration(800)
        .style('opacity', 1);
      
      // Add dramatic drop text
      svg.append('text')
        .attr('x', (q2X + q3X) / 2)
        .attr('y', ((q2Y + q3Y) / 2) - 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#e74c3c')
        .attr('font-weight', 'bold')
        .style('font-size', '0.9rem')
        .style('font-family', "'Gill Sans', 'Helvetica', sans-serif")
        .text(`${percentDrop}% drop`)
        .style('opacity', 0)
        .transition()
        .delay(1800)
        .duration(800)
        .style('opacity', 1);
    }
  }
}

// Function to show the timeline graph - called from chapter callbacks
function showTimelineGraph() {
  if (!timelineGraphContainer) {
    createTimelineGraph();
    setTimeout(() => updateTimelineGraph(currentChapterId), 100);
  } else {
    updateTimelineGraph(currentChapterId);
  }
}

// Function to hide the timeline graph
function hideTimelineGraph() {
  if (timelineGraphContainer) {
    timelineGraphContainer.style.opacity = '0';
  }
}

// Add the cloudburst transition functions
function fadeInCloudburstImage() {
  console.log("Fading in cloudburst image");
  const overlay = document.getElementById('cloudburstOverlay');
  if (overlay) {
    overlay.style.opacity = "1";
  }
}

function fadeOutCloudburstImage() {
  console.log("Fading out cloudburst image");
  const overlay = document.getElementById('cloudburstOverlay');
  if (overlay) {
    overlay.style.opacity = "0";
  }
}

// Add the Queens video playback function
function setupQueensVideoPlayback() {
  // Get the chapter element
  const videoChapter = document.getElementById("QUEENS_VIDEO");
  
  // Add an intersection observer to detect when the video chapter is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const videoElement = document.getElementById("queensVideo");
      if (!videoElement) return;
      
      if (entry.isIntersecting) {
        // Play the video when chapter becomes visible
        videoElement.play().catch(e => console.error("Video play error:", e));
      } else {
        // Optionally pause the video when not visible
        // videoElement.pause();
      }
    });
  }, { threshold: 0.3 }); // Trigger when 30% of the element is visible
  
  // Start observing the video chapter when it exists in the DOM
  if (videoChapter) {
    observer.observe(videoChapter);
  } else {
    // If the chapter doesn't exist yet, check again after a short delay
    setTimeout(() => {
      const videoChapterDelayed = document.getElementById("QUEENS_VIDEO");
      if (videoChapterDelayed) {
        observer.observe(videoChapterDelayed);
      }
    }, 2000);
  }
}

/* Here we add the two extra layers we are using, just like in our previous
tutorial. At the end, however, we setup the functions that will tie the
scrolling to the chapters and move the map from one location to another
while changing the zoom level, pitch and bearing */

/* Next, these variables and functions create the story and vignette html
elements, and populate them with the content from the config.js file.
They also assign a css class to certain elements, also based on the
config.js file */
var story = document.getElementById("story");
var features = document.createElement("div");
var header = document.createElement("div");
features.setAttribute("id", "features");

// If the content exists, then assign it to the 'header' element
// Note how each one of these are assigning 'innerHTML'
if (config.topTitle) {
  var topTitle = document.createElement("div");
  topTitle.innerHTML = config.topTitle;
  header.appendChild(topTitle);
}
if (config.title) {
  var titleText = document.createElement("div");
  titleText.innerHTML = config.title;
  header.appendChild(titleText);
}
if (config.subtitle) {
  var subtitleText = document.createElement("div");
  subtitleText.innerHTML = config.subtitle;
  header.appendChild(subtitleText);
}
if (config.byline) {
  var bylineText = document.createElement("div");
  bylineText.innerHTML = config.byline;
  header.appendChild(bylineText);
}
if (config.description) {
  var descriptionText = document.createElement("div");
  descriptionText.innerHTML = config.description;
  header.appendChild(descriptionText);
}

// If after this, the header has anything in it, it gets appended to the story
if (header.innerText.length > 0) {
  header.classList.add(config.theme);
  header.setAttribute("id", "header");
  story.appendChild(header);
}

/* After building the elements and assigning content to the header these
functions will loop through the chapters in the config.js file,
create the vignette elements and assign them their respective content */
config.chapters.forEach((record, idx) => {
  /* These first two variables will hold each vignette, the chapter
  element will go in the container element */
  var container = document.createElement("div");
  var chapter = document.createElement("div");
  // Adds a class to the vignette
  chapter.classList.add("br3");
  // Adds all the content to the vignette's div
  chapter.innerHTML = record.chapterDiv;
  // Sets the id for the vignette and adds the step css attribute
  container.setAttribute("id", record.id);
  container.classList.add("step");
  // If the chapter is the first one, set it to active
  if (idx === 0) {
    container.classList.add("active");
  }
  // Adds the overall theme to the chapter element
  chapter.classList.add(config.theme);
  /* Appends the chapter to the container element and the container
  element to the features element */
  container.appendChild(chapter);
  container.classList.add(alignments[record.alignment] || "centered");
  if (record.hidden) {
    container.classList.add("hidden");
  }
  features.appendChild(container);
});

// Appends the features element (with the vignettes) to the story element
story.appendChild(features);

/* Next, this section creates the footer element and assigns it
its content based on the config.js file */
var footer = document.createElement("div");

if (config.footer) {
  var footerText = document.createElement("p");
  footerText.innerHTML = config.footer;
  footer.appendChild(footerText);
}

if (footer.innerText.length > 0) {
  footer.classList.add(config.theme);
  footer.setAttribute("id", "footer");
  story.appendChild(footer);
}

// Adds the Mapbox access token
mapboxgl.accessToken = config.accessToken;

/* This section creates the map element with the
attributes from the main section of the config.js file */
var map = new mapboxgl.Map({
  container: "map",
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  bearing: config.chapters[0].location.bearing,
  pitch: config.chapters[0].location.pitch,
  interactive: false,
  projection: config.projection,
});

// Create a inset map if enabled in config.js
if (config.inset) {
  map.addControl(
    new GlobeMinimap({ ...config.insetOptions }),
    config.insetPosition
  );
}

if (config.showMarkers) {
  var marker = new mapboxgl.Marker({ color: config.markerColor });
  marker.setLngLat(config.chapters[0].location.center).addTo(map);
}

// Function to create random points within a bounding box, avoiding the center
function createRandomPointsAroundEdges(centerLng, centerLat, count, outerRadiusKm, innerRadiusKm) {
  const points = [];
  const earthRadius = 6371; // Earth radius in kilometers

  // Convert radii from km to degrees (approximate)
  const outerRadiusDeg = (outerRadiusKm / earthRadius) * (180 / Math.PI);
  const innerRadiusDeg = (innerRadiusKm / earthRadius) * (180 / Math.PI);
  
  while (points.length < count) {
    // Generate random point within the outer square
    const rndX = (Math.random() * 2 - 1) * outerRadiusDeg;
    const rndY = (Math.random() * 2 - 1) * outerRadiusDeg;
    
    // Calculate distance from center (in degrees)
    const distFromCenter = Math.sqrt(rndX * rndX + rndY * rndY);
    
    // Only add points that are outside the inner radius but inside the outer radius
    if (distFromCenter > innerRadiusDeg && distFromCenter < outerRadiusDeg) {
      points.push({
        lng: centerLng + rndX,
        lat: centerLat + rndY,
        // Assign a random image from our collection of 4
        imgId: Math.floor(Math.random() * 4) + 1 // Images are named 1,2,3,4
      });
    }
  }
  
  return points;
}

// instantiate the scrollama
var scroller = scrollama();


/* Here we add the two extra layers we are using, just like in our previous
tutorial. At the end, however, we setup the functions that will tie the
scrolling to the chapters and move the map from one location to another
while changing the zoom level, pitch and bearing */
map.on("load", function () {
  if (config.use3dTerrain) {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

    // add a sky layer that will show when the map is highly pitched
    map.addLayer({
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0.0, 0.0],
        "sky-atmosphere-sun-intensity": 15,
      },
    });
  }

// 311 DATA 
map.addLayer({
  'id': '311',  // This ID should match what you use in the chapter config
  'type': 'circle',
  'source': {
    'type': 'geojson',
    'data': 'Data/Flooding.geojson'
  },
  'paint': {
    'circle-color': '#00ffea',      // Light blue fill
    'circle-opacity': 0.7,          // Added opacity (70%)
    'circle-stroke-color': '#0066aa', // Dark blue border
    'circle-stroke-width': 1.5,     // Border width
    'circle-radius': [
      'interpolate', ['linear'], ['zoom'],
      10, 5,
      15, 6
    ]
  }
});

// 311 DATA LABELS
map.addLayer({
  'id': '311-labels',
  'type': 'symbol',
  'source': {
    'type': 'geojson',
    'data': 'Data/Flooding.geojson'
  },
  'layout': {
    'text-field': 'Complaint: Street Flooding',
    'text-size': 12,
    'text-offset': [0, -1.5],
    'text-anchor': 'bottom',
    'text-max-width': 8,
    'text-allow-overlap': false,
    'text-ignore-placement': false
  },
  'paint': {
    'text-color': '#000000',
    'text-halo-color': '#ffffff',
    'text-halo-width': 1,
    'text-opacity': 0.7  // Changed from 0 to match point opacity
  },
  'minzoom': 13
});

  // STREET LEVEL FLOODING DATA 
  map.addLayer({
    'id': 'all-flooding',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': 'Data/Clipped gs.geojson'
    },
    'paint': {
      'fill-color': '#00ffea',
      'fill-opacity': 0  // Start invisible
    }
  });
  
  map.addLayer({
    'id': 'all-flooding-outline',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': 'Data/Clipped gs.geojson'
    },
    'paint': {
      'line-color': '#000',
      'line-width': 1,
      'line-opacity': 0  // Start invisible
    }
  });

  // FEMA FLOODING DATA
  map.addLayer({
    'id': 'Fema-flooding',
    'type': 'fill',
    'source': {
      'type': 'geojson',
      'data': 'Data/Fema.geojson'
    },
    'paint': {
      'fill-color': '#00ffea',
      'fill-opacity': 0  // Start invisible
    }
  });
  
  map.addLayer({
    'id': 'Fema-flooding-outline',
    'type': 'line',
    'source': {
      'type': 'geojson',
      'data': 'Data/Fema.geojson'
    },
    'paint': {
      'line-color': '#000',
      'line-width': 1,
      'line-opacity': 0  // Start invisible
    }
  });

  // REDLINE
  map.addLayer({
    id: "redline",
    type: "fill",
    source: {
      type: "geojson",
      data: "Data/NYS_Disadvantaged_Communities_(DAC).geojson"
    },
    paint: {
      "fill-opacity": 0,  // Start invisible
      "fill-color": [
        "step",
        ["get", "Redline"],
        "rgba(0, 0, 0, 0)",  // transparent for lower values
        60, "#bc8f8f",     // rosy brown for values 60-79.9
        80, "#8b4513",     // saddle brown for values 80-89.9
        90, "#5c3317"      // very dark brown for values 90-100
      ]
    }
  }, 'water');

  // Combined Race/Ethnicity Layer
  map.addLayer({
    id: "race-ethnicity",
    type: "fill",
    source: {
      type: "geojson",
      data: "Data/NYS_Disadvantaged_Communities_(DAC).geojson"
    },
    paint: {
      "fill-opacity": 0,  // Start invisible
      "fill-color": [
        "case",
        // Asian predominant
        [">", ["get", "Asian_Pct"], 
          ["max", ["get", "Black_Pct"], ["get", "Lat_Pct"]]
        ],
        [
          "step",
          ["get", "Asian_Pct"],
          "#e0ecf4", // light blue - lower percentage
          50, "#9ebcda",
          75, "#8c96c6",
          90, "#8856a7"  // purple - highest percentage
        ],
        
        // Black predominant
        [">", ["get", "Black_Pct"], ["get", "Lat_Pct"]],
        [
          "step",
          ["get", "Black_Pct"],
          "#fee6ce", // light orange - lower percentage
          50, "#fdae6b",
          75, "#fd8d3c",
          90, "#e6550d"  // dark orange - highest percentage
        ],
        
        // Latino predominant (default)
        [
          "step",
          ["get", "Lat_Pct"],
          "#e5f5e0", // light green - lower percentage
          50, "#a1d99b",
          75, "#74c476",
          90, "#41ab5d"  // dark green - highest percentage
        ]
      ]
    }
  }, 'water');

  // DISADVANTAGED COMMUNITIES
  map.addLayer(
    {
      id: "DAC",
      type: "fill",
      source: {
        type: "geojson",
        data: "Data/NYS_Disadvantaged_Communities_(DAC).geojson",
      },
      paint: {
        "fill-opacity": 0,  // Start invisible
        "fill-color": [
          "step",
          ["get", "Comb_Sc"],
          "#ffffff",
          85, "#ccedf5",
          90, "#99daea",
          95, "#66c7e0",
          100, "#33b5d5",
          105, "#00a2ca"
        ],
      },
    }
  );
  
  // LOW AMI
  map.addLayer(
    {
      id: "verylowincome",
      type: "fill",
      source: {
        type: "geojson",
        data: "Data/NYS_Disadvantaged_Communities_(DAC).geojson"
      },
      paint: {
        "fill-opacity": 0,  // Start invisible
        "fill-color": [
          "step",
          ["get", "LMI_80_AMI"],
          "#ffffff",   // < 60: low share of low-income residents
          60, "#e0ecf4",
          70, "#9ebcda",
          80, "#8c96c6",
          90, "#8856a7",
          95, "#810f7c"
        ]
      }
    },
    'water'
  );
 // Function to toggle Justice40 map visibility
 window.toggleJustice40Map = function() {
  const justice40Visible = document.getElementById('justice40-overlay');
  if (justice40Visible && justice40Visible.style.opacity === "1") {
    justice40Visible.style.opacity = "0";
  } else if (justice40Visible) {
    justice40Visible.style.opacity = "1";
  }
};

// Setup the instance of scrollama
const scroller = scrollama();

// Setup the scroll functionality
scroller
  .setup({
    step: ".step", // The step class that is defined on each section
    offset: 0.5, // How far from the top of the viewport to trigger a step
    debug: false, // Set to true to see the trigger point
  })
  .onStepEnter((response) => {
    // Get the current chapter ID
    const chapter = config.chapters.find(
      (chap) => chap.id === response.element.id
    );
    currentChapterId = response.element.id;
    
    // Update active chapter and story
    response.element.classList.add("active");
    
    // Fly to the location if animation is flyTo
    if (chapter.location && chapter.mapAnimation === "flyTo") {
      map.flyTo({
        center: chapter.location.center,
        zoom: chapter.location.zoom,
        pitch: chapter.location.pitch,
        bearing: chapter.location.bearing,
        duration: 1000,
        essential: true
      });
    }
    
    // Handle chapter-specific callback function
    if (chapter.callback) {
      window[chapter.callback]();
    }
    
    // Handle layer opacity for chapter enter
    if (chapter.onChapterEnter) {
      chapter.onChapterEnter.forEach((layer) => {
        if (layer.transition) {
          window[layer.transition]();
        } else if (map.getLayer(layer.layer)) {
          setLayerOpacity(layer);
        }
      });
    }
  })
  .onStepExit((response) => {
    // Exit only if scrolling forward
    if (!response.direction === 'down') {
      return;
    }
    
    // Get the current chapter
    const chapter = config.chapters.find(
      (chap) => chap.id === response.element.id
    );
    
    // Update classes
    response.element.classList.remove("active");
    
    // Handle chapter-specific exit callback function
    if (chapter.exitCallback) {
      window[chapter.exitCallback]();
    }
    
    // Handle layer opacity for chapter exit
    if (chapter.onChapterExit) {
      chapter.onChapterExit.forEach((layer) => {
        if (layer.transition) {
          window[layer.transition]();
        } else if (map.getLayer(layer.layer)) {
          setLayerOpacity(layer);
        }
      });
    }
  });


// Setup resize event
window.addEventListener("resize", scroller.resize);
});
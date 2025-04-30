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
  { year: '2025 Q4', emergency: 200, nonEmergency: 6500, floodRisk: 150, bric: 0 }
];

// Top 5 emergency climate funds
const topEmergencyFunds = [
  { name: "Greenhouse Gas Reduction Fund", amount: "$27B" },
  { name: "Environmental Justice Program", amount: "$3B" },
  { name: "NY Climate Disaster Prevention", amount: "$300M" },
  { name: "FEMA BRIC Program", amount: "$882M" },
  { name: "Cloudburst Infrastructure Program", amount: "$192M" }
];

// NYT-style color palette
const nytColors = {
  emergency: '#fd8d3c',      // Orange for emergency funding
  nonEmergency: '#74c476',   // Green for non-emergency
  floodRisk: '#3182bd',      // Blue for flood risk
  bric: '#9e9ac8'            // Purple for BRIC program
};

// Timeline graph variables
let timelineGraphContainer = null;
let timelineGraphSvg = null;
let currentTimelineChapter = null;
let graphTransition = {
  active: false,
  from: null,
  to: null,
  progress: 0
};
let lastScrollY = 0;
let scrollDirection = 'down';
let previousData = null;

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

// Function to generate scribble-like path with noise
function generateScribblePath(points, noise = 3) {
  if (!window.d3 || points.length < 2) return '';
  
  let path = `M${points[0][0]},${points[0][1]}`;
  
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i-1];
    const [x2, y2] = points[i];
    
    // Add small random variations to create hand-drawn appearance
    const numSegments = Math.ceil(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 10);
    
    for (let j = 1; j <= numSegments; j++) {
      const ratio = j / numSegments;
      const xPos = x1 + (x2 - x1) * ratio;
      const yPos = y1 + (y2 - y1) * ratio;
      
      // Add random noise
      const xNoise = (Math.random() - 0.5) * noise;
      const yNoise = (Math.random() - 0.5) * noise;
      
      path += ` L${xPos + xNoise},${yPos + yNoise}`;
    }
  }
  
  return path;
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
    contentDiv.style.width = '100%';
    contentDiv.style.height = '100vh';
    contentDiv.style.margin = '0vh auto 0';
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
    
    // Track scroll direction to control animation
    window.addEventListener('scroll', function() {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
    });
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
    description: "In 2022, federal emergency climate funding reached $10.2 billion\n" +
                 "with $3B for Environmental Justice programs.\n" +
                 "Queens received $200M for flood prevention projects.",
    showSeries: ['emergency', 'nonEmergency', 'floodRisk', 'bric']
  },
  'funding2025': {
    yearRange: [0, 9], // Show 2020 to 2025 Q4
    highlightYear: '2025 Q3',
    title: "2025: THE COLLAPSE OF CLIMATE PROTECTION",
    description: "By 2025, funding fell 98% to just $200M with FEMA BRIC eliminated.\n" +
                 "Critical projects canceled in East Elmhurst ($50M),\n" +
                 "Corona ($47M), and Kissena Park ($46M).",
    showSeries: ['emergency', 'nonEmergency', 'floodRisk', 'bric']
  },
  'floodFunding': {
    yearRange: [0, 9], // Show 2020 to 2025 Q4
    highlightYear: '2025 Q3',
    title: "FLOOD PROTECTION IN DECLINE",
    description: "Both flood risk funding and FEMA BRIC program have seen dramatic cuts.\n" +
                 "$5B in BRIC program funding eliminated, with $882M returned to Treasury.\n" +
                 "Every $1 in prevention saves $6 in recovery costs.",
    showSeries: ['floodRisk', 'bric']
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
  const svg = d3.select('#timeline-svg-container')
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${svgContainer.clientWidth} ${svgContainer.clientHeight}`)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // Get data for this chapter
  const chapterData = fundingData.slice(config.yearRange[0], config.yearRange[1]);
  
  // Store the current data for transition effects
  if (previousData === null) {
    previousData = chapterData;
  }
  
  // Determine transition data based on scroll direction and current chapter
  let transitionData = chapterData;
  if (graphTransition.active) {
    // Create data for transitions
    if (scrollDirection === 'down' && (chapterId === 'funding2025' || chapterId === 'floodFunding')) {
      // Transitioning from 2022 to 2025 or floodFunding (extending the graph)
      const startData = fundingData.slice(0, 3); // 2020-2022
      const endData = fundingData.slice(0, 9);   // 2020-2025 Q4
      
      // Calculate how much of the new data to show based on progress
      const progress = graphTransition.progress;
      const dataPoints = Math.round(3 + (endData.length - 3) * progress);
      transitionData = fundingData.slice(0, Math.max(3, dataPoints));
    } 
    else if (scrollDirection === 'up' && chapterId === 'funding2022') {
      // Transitioning from 2025 to 2022 (shrinking the graph)
      const progress = 1 - graphTransition.progress;
      const maxPoints = fundingData.slice(0, 9).length;
      const dataPoints = Math.round(3 + (maxPoints - 3) * progress);
      transitionData = fundingData.slice(0, Math.max(3, dataPoints));
    }
  }
  
  // Set up scales
  const x = d3.scaleBand()
    .domain(fundingData.map(d => d.year))
    .range([0, width])
    .padding(0.1);
  
  // Calculate y domain based on visible series
  const maxValue = d3.max(fundingData, d => {
    let seriesMax = 0;
    config.showSeries.forEach(series => {
      if (d[series] > seriesMax) seriesMax = d[series];
    });
    return seriesMax;
  });
  
  const y = d3.scaleLinear()
    .domain([0, maxValue * 1.1])
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
  
  // Create the hand-drawn scribble paths - MODIFIED LINE THICKNESS
  function createScribbleLine(data, series, color, strokeWidth) {
    // Filter out data if this series isn't shown in the current chapter
    if (!config.showSeries.includes(series)) return;
    
    // Adjust thickness according to series type - MODIFIED as requested
    let adjustedStrokeWidth = strokeWidth;
    if (series === 'emergency' || series === 'floodRisk' || series === 'bric') {
      adjustedStrokeWidth = strokeWidth * 2; // Double thickness for these series
    }
    
    // Create points for the line
    const points = data.map(d => [
      x(d.year) + x.bandwidth()/2, 
      y(d[series])
    ]);
    
    // Generate the scribble path
    const scribblePath = generateScribblePath(points, 2);
    
    // Add the path to the SVG
    svg.append('path')
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', adjustedStrokeWidth)
      .attr('d', scribblePath)
      .style('opacity', 1);
    
    // Add dots at each data point
    svg.selectAll(`.dot-${series}`)
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.year) + x.bandwidth()/2)
      .attr('cy', d => y(d[series]))
      .attr('r', adjustedStrokeWidth * 0.8)
      .attr('fill', color);
  }
  
  // Create scribble lines for each data series with NYT colors - MODIFIED thickness values
  createScribbleLine(transitionData, 'emergency', nytColors.emergency, 3);
  createScribbleLine(transitionData, 'nonEmergency', nytColors.nonEmergency, 2);
  createScribbleLine(transitionData, 'floodRisk', nytColors.floodRisk, 2);
  createScribbleLine(transitionData, 'bric', nytColors.bric, 2);
  
  // Add legend with NYT colors
  const legendData = [
    { name: 'Emergency Climate Funding', series: 'emergency', color: nytColors.emergency },
    { name: 'Non-Emergency Funding', series: 'nonEmergency', color: nytColors.nonEmergency },
    { name: 'Flood Risk Funding', series: 'floodRisk', color: nytColors.floodRisk },
    { name: 'FEMA BRIC Program', series: 'bric', color: nytColors.bric }
  ].filter(item => config.showSeries.includes(item.series));
  
  const legend = svg.append('g')
    .attr('font-family', "'Gill Sans', 'Helvetica', sans-serif")
    .attr('font-size', 10)
    .attr('text-anchor', 'start')
    .selectAll('g')
    .data(legendData)
    .enter().append('g')
    .attr('transform', (d, i) => `translate(${width - 170},${i * 20})`);
  
  legend.append('rect')
    .attr('x', 0)
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', d => d.color);
  
  legend.append('text')
    .attr('x', 20)
    .attr('y', 9.5)
    .attr('dy', '0.32em')
    .text(d => d.name);
  
  // ADD TOP 5 EMERGENCY CLIMATE FUNDS LIST
  const fundsListX = width - 210;
  const fundsListY = height - 230; // Moved higher up to avoid overlap
  
  // Add header for the funds list with Justice40 reference
  svg.append('text')
    .attr('x', fundsListX)
    .attr('y', fundsListY - 40)
    .attr('font-family', "'Gill Sans', 'Helvetica', sans-serif")
    .attr('font-size', 12)
    .attr('font-weight', 'bold')
    .text('TOP 5 FUNDS UNDER JUSTICE40 INITIATIVE');
    
  svg.append('text')
    .attr('x', fundsListX)
    .attr('y', fundsListY - 25)
    .attr('font-family', "'Gill Sans', 'Helvetica', sans-serif")
    .attr('font-size', 9)
    .attr('font-style', 'italic')
    .text('40% of benefits directed to disadvantaged communities');
  
  // Add funds list items
  topEmergencyFunds.forEach((fund, i) => {
    svg.append('text')
      .attr('x', fundsListX)
      .attr('y', fundsListY + (i * 16))
      .attr('font-family', "'Gill Sans', 'Helvetica', sans-serif")
      .attr('font-size', 10)
      .text(`${fund.name}: ${fund.amount}`);
  });
  
  
  // Highlight the specified year
  if (config.highlightYear) {
    const highlightedData = transitionData.find(d => d.year === config.highlightYear);
    if (highlightedData) {
      const yearX = x(config.highlightYear) + x.bandwidth()/2;
      
      // Add vertical line at highlighted year
      svg.append('path')
        .attr('d', `M${yearX},0 L${yearX},${height}`)
        .attr('stroke', '#555')
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '5,5')
        .style('opacity', 0.7);
    }
  }
  
  // Chapter-specific highlights
  if (chapterId === 'funding2022') {
    // Highlight 2022 peak
    const year2022 = transitionData.find(d => d.year === '2022');
    if (year2022) {
      svg.append('circle')
        .attr('cx', x('2022') + x.bandwidth()/2)
        .attr('cy', y(year2022.emergency))
        .attr('r', 8) // Increased size
        .attr('fill', nytColors.emergency)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
      
      svg.append('text')
        .attr('x', x('2022') + x.bandwidth()/2 + 10)
        .attr('y', y(year2022.emergency) - 10)
        .attr('fill', nytColors.emergency)
        .attr('font-weight', 'bold')
        .style('font-size', '0.9rem')
        .style('font-family', "'Gill Sans', 'Helvetica', sans-serif")
        .text('$' + year2022.emergency + 'M');
    }
  } 
  else if (chapterId === 'funding2025') {
    // Show the dramatic drop in 2025
    const q2Data = transitionData.find(d => d.year === '2025 Q2');
    const q3Data = transitionData.find(d => d.year === '2025 Q3');
    
    if (q2Data && q3Data) {
      const q2X = x(q2Data.year) + x.bandwidth()/2;
      const q3X = x(q3Data.year) + x.bandwidth()/2;
      const q2Y = y(q2Data.emergency);
      const q3Y = y(q3Data.emergency);
      
      // Calculate percentage drop
      const percentDrop = ((q2Data.emergency - q3Data.emergency) / q2Data.emergency * 100).toFixed(0);
      
      // Draw annotation with scribble effect
      const annotationPoints = [
        [q2X, q2Y],
        [q2X+15, q2Y-15],
        [q3X-15, q3Y-15],
        [q3X, q3Y]
      ];
      
      svg.append('path')
        .attr('d', generateScribblePath(annotationPoints, 3))
        .attr('fill', 'none')
        .attr('stroke', nytColors.emergency)
        .attr('stroke-width', 2) // Increased thickness
        .attr('stroke-dasharray', '3,3');
      
      // Add dramatic drop text
      svg.append('text')
        .attr('x', (q2X + q3X) / 2)
        .attr('y', ((q2Y + q3Y) / 2) - 25)
        .attr('text-anchor', 'middle')
        .attr('fill', nytColors.emergency)
        .attr('font-weight', 'bold')
        .style('font-size', '1rem') // Increased size
        .style('font-family', "'Gill Sans', 'Helvetica', sans-serif")
        .text(`${percentDrop}% drop`);
      
      // Highlight Q4 value
      const q4Data = transitionData.find(d => d.year === '2025 Q4');
      if (q4Data) {
        svg.append('circle')
          .attr('cx', x('2025 Q4') + x.bandwidth()/2)
          .attr('cy', y(q4Data.emergency))
          .attr('r', 8) // Increased size
          .attr('fill', nytColors.emergency)
          .attr('stroke', 'white')
          .attr('stroke-width', 2);
        
        svg.append('text')
          .attr('x', x('2025 Q4') + x.bandwidth()/2 + 10)
          .attr('y', y(q4Data.emergency) - 10)
          .attr('fill', nytColors.emergency)
          .attr('font-weight', 'bold')
          .style('font-size', '0.9rem')
          .style('font-family', "'Gill Sans', 'Helvetica', sans-serif")
          .text('$' + q4Data.emergency + 'M');
      }
    }
  }
  else if (chapterId === 'floodFunding') {
    // Highlight the dramatic drop in flood risk funding
    const q1Data = transitionData.find(d => d.year === '2025 Q1');
    const q3Data = transitionData.find(d => d.year === '2025 Q3');
    
    if (q1Data && q3Data) {
      // Calculate percentage drops
      const floodRiskDrop = ((q1Data.floodRisk - q3Data.floodRisk) / q1Data.floodRisk * 100).toFixed(0);
      const bricDrop = 100; // BRIC dropped to 0
      
      // Highlight flood risk drop
      const q1X = x(q1Data.year) + x.bandwidth()/2;
      const q3X = x(q3Data.year) + x.bandwidth()/2;
      const q1YFlood = y(q1Data.floodRisk);
      const q3YFlood = y(q3Data.floodRisk);
      
      // Draw annotation with scribble effect for flood risk
      const floodAnnotationPoints = [
        [q1X, q1YFlood],
        [q1X+15, q1YFlood-15],
        [q3X-15, q3YFlood-15],
        [q3X, q3YFlood]
      ];
      
      svg.append('path')
        .attr('d', generateScribblePath(floodAnnotationPoints, 3))
        .attr('fill', 'none')
        .attr('stroke', nytColors.floodRisk)
        .attr('stroke-width', 2) // Increased thickness
        .attr('stroke-dasharray', '3,3');
      
      // Add drop text for flood risk
      svg.append('text')
        .attr('x', (q1X + q3X) / 2)
        .attr('y', ((q1YFlood + q3YFlood) / 2) - 25)
        .attr('text-anchor', 'middle')
        .attr('fill', nytColors.floodRisk)
        .attr('font-weight', 'bold')
        .style('font-size', '1rem') // Increased size
        .style('font-family', "'Gill Sans', 'Helvetica', sans-serif")
        .text(`${floodRiskDrop}% drop`);
      
      // Highlight BRIC program elimination
      const q1YBric = y(q1Data.bric);
      const q2Data = transitionData.find(d => d.year === '2025 Q2');
      const q2X = x(q2Data.year) + x.bandwidth()/2;
      const q2YBric = y(q2Data.bric);
      
      // Circle and text to highlight BRIC elimination
      svg.append('circle')
        .attr('cx', q2X)
        .attr('cy', q2YBric)
        .attr('r', 8) // Increased size
        .attr('fill', nytColors.bric)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
      
      svg.append('text')
        .attr('x', q2X + 10)
        .attr('y', q2YBric - 10)
        .attr('fill', nytColors.bric)
        .attr('font-weight', 'bold')
        .style('font-size', '1rem') // Increased size
        .style('font-family', "'Gill Sans', 'Helvetica', sans-serif")
        .text('Program eliminated');
    }
  }
  
  // Update the previous data reference
  previousData = transitionData;
}

// Function to show the timeline graph - called from chapter callbacks
function showTimelineGraph() {
  if (!timelineGraphContainer) {
    createTimelineGraph();
    setTimeout(() => updateTimelineGraph(currentChapterId), 100);
  } else {
    // Start a transition effect if we're changing chapters
    const prevChapter = currentTimelineChapter;
    
    if (prevChapter && prevChapter !== currentChapterId) {
      graphTransition = {
        active: true,
        from: prevChapter,
        to: currentChapterId,
        progress: 0
      };
      
      // Animated transition over 1 second
      let startTime = null;
      const duration = 800; // ms
      
      function animateTransition(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        
        // Calculate progress (0 to 1)
        graphTransition.progress = Math.min(elapsed / duration, 1);
        
        // Update the graph with transition data
        timelineGraphContainer.style.opacity = '1';
        updateTimelineGraph(currentChapterId);
        
        // Continue animation if not complete
        if (graphTransition.progress < 1) {
          requestAnimationFrame(animateTransition);
        } else {
          // Finish transition
          graphTransition.active = false;
        }
      }
      
      // Start the animation
      requestAnimationFrame(animateTransition);
    } else {
      // No transition needed
      timelineGraphContainer.style.opacity = '1';
      updateTimelineGraph(currentChapterId);
    }
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
  const overlay = document.getElementById('cloudburstOverlay');
  if (overlay) {
    overlay.style.opacity = "1";
  }
}

function fadeOutCloudburstImage() {
  const overlay = document.getElementById('cloudburstOverlay');
  if (overlay) {
    overlay.style.opacity = "0";
  }
}

// Initialize the Queens video when that chapter is reached
function initQueensVideo() {
  const video = document.getElementById('queensVideo');
  if (video) {
    video.play();
  }
}

// Helper function to create cloudburstOverlay if it doesn't exist
function createCloudburstOverlay() {
  if (!document.getElementById('cloudburstOverlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'cloudburstOverlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.zIndex = '10';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 1.5s ease';
    overlay.style.pointerEvents = 'none';
    
    const img = document.createElement('img');
    img.src = 'Images/Cloudburst Section.png';
    img.alt = 'Cloudburst Section';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
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

// Helper function to set layer opacity
function setLayerOpacity(layer) {
  const { layer: layerId, opacity, duration } = layer;
  const layerType = map.getLayer(layerId).type;
  const paintProps = layerTypes[layerType] || [];
  
  if (paintProps.length) {
    paintProps.forEach(prop => {
      map.setPaintProperty(layerId, prop, opacity);
    });
  }
}

// instantiate the scrollama
var scroller = scrollama();

/* Here we add the two extra layers we are using, just like in our previous
tutorial. At the end, however, we setup the functions that will tie the
scrolling to the chapters and move the map from one location to another
while changing the zoom level, pitch and bearing */
map.on("load", function () {
  // Create cloudburst overlay for later use
  createCloudburstOverlay();

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
      'circle-color': '#0066aa',       // Darker blue fill
      'circle-opacity': 0,           // 70% opacity for fill
      'circle-stroke-color': '#003366', // Much darker blue border
      'circle-stroke-width': 1.5,        // 4 times thicker (from 1.5 to 6)
      'circle-stroke-opacity': 0,    // 50% opacity for border
      'circle-radius': [
        'interpolate', ['linear'], ['zoom'],
        10, 0.7,
        15, 6
      ]
    }
  });

// In the map.js file, after defining your audioClips array and before adding them to the map,
// add this code to make them all hidden by default:

// // Define audio clips with their coordinates
// const audioClips = [
//   {
//     id: 'audio1',
//     audioFile: 'Images/1FloodedCars.mp3',
//     coordinates: [-73.859, 40.758],
//     title: 'Flooded Cars'
//   },
//   {
//     id: 'audio2',
//     audioFile: 'Images/2ThisEntireRoadwayWasFlooded.mp3',
//     coordinates: [-73.854, 40.756],
//     title: 'Flooded Roadway'
//   },
//   {
//     id: 'audio3',
//     audioFile: 'Images/3WaterUpToMyKnee.mp3',
//     coordinates: [-73.852, 40.759],
//     title: 'Knee-Deep Water'
//   },
//   {
//     id: 'audio4',
//     audioFile: 'Images/4ItsLikeLifeStops.mp3',
//     coordinates: [-73.857, 40.755],
//     title: 'Life Stops'
//   }
// ];


  
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
      'text-opacity': 0.7  // Keeping this the same
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
      'fill-color': '#0066aa',      // Darker blue fill (#0066aa)
      'fill-opacity': 0             // Start invisible
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
      'line-color': '#003366',      // Darker blue outline (#003366)
      'line-width': 2,              // Slightly thicker line
      'line-opacity': 0             // Start invisible
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
      'fill-color': '#0066aa',      // Darker blue fill (#0066aa)
      'fill-opacity': 0             // Start invisible
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
      'line-color': '#003366',      // Darker blue outline (#003366)
      'line-width': 0,              // Slightly thicker line
      'line-opacity': 0             // Start invisible
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
  map.addLayer({
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
  });
  
  // LOW AMI
  map.addLayer({
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
  }, 'water');

  // Justice40 layer
  map.addLayer({
    id: "justice40-layer",
    type: "fill",
    source: {
      type: "geojson",
      data: "Data/NYS_Disadvantaged_Communities_(DAC).geojson"
    },
    paint: {
      "fill-opacity": 0,  // Start invisible
      "fill-color": "#ff5500"  // Orange color for Justice40 areas
    }
  }, 'water');

  map.addLayer({
    id: "justice40-outline",
    type: "line",
    source: {
      type: "geojson",
      data: "Data/NYS_Disadvantaged_Communities_(DAC).geojson"
    },
    paint: {
      "line-color": "#cc4400",  // Darker orange for outlines
      "line-width": 1,
      "line-opacity": 0  // Start invisible
    }
  }, 'water');


  // Setup the scrollama instance
  scroller
    .setup({
      step: ".step", // class name of trigger elements
      offset: 0.5,   // trigger when element is 50% in viewport
      debug: false   // display trigger boundaries
    })
    .onStepEnter(response => {
      // Get the current chapter based on the step id
      const chapter = config.chapters.find(chap => chap.id === response.element.id);
      
      // Store the current chapter ID for use in other functions
      currentChapterId = response.element.id;
      
      // Add 'active' class to the current step
      response.element.classList.add("active");
      
      // If this chapter has a location, fly to it
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
      
      // If this chapter has a callback function, execute it
      if (chapter.callback) {
        window[chapter.callback]();
      }
      
      // Apply layer changes on chapter enter
      if (chapter.onChapterEnter) {
        chapter.onChapterEnter.forEach(layer => {
          if (layer.callback) {
            // Execute callback function if present
            window[layer.callback]();
          } else if (layer.transition) {
            // Execute custom transition function
            window[layer.transition]();
          } else if (map.getLayer(layer.layer)) {
            // Set layer opacity using helper function
            setLayerOpacity(layer);
          }
        });
      }
    })
    .onStepExit(response => {
      // Remove 'active' class from the exited step
      response.element.classList.remove("active");
      
      // Get the current chapter
      const chapter = config.chapters.find(chap => chap.id === response.element.id);
      
      // If this chapter has an exit callback, execute it
      if (chapter.exitCallback) {
        window[chapter.exitCallback]();
      }
      
      // Apply layer changes on chapter exit
      if (chapter.onChapterExit) {
        chapter.onChapterExit.forEach(layer => {
          if (layer.callback) {
            // Execute callback function if present
            window[layer.callback]();
          } else if (layer.transition) {
            // Execute custom transition function
            window[layer.transition]();
          } else if (map.getLayer(layer.layer)) {
            // Set layer opacity using helper function
            setLayerOpacity(layer);
          }
        });
      }
    });
  
  // Handle window resize
  window.addEventListener("resize", scroller.resize);
});
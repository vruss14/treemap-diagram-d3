function fetchData() {
    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
    .then(response => response.json())
    .then(response => {
        visualizeData(response);
    })
}

function visualizeData(data) {
    console.log(data);

    let width = 1300;
    let height = 650;
    let tooltip = d3.select('#tooltip');

    // Draw the SVG canvas

    const svg = d3.select("#treemap-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    // Create a D3 hierarchy based on given data
    // Tiles are sorted by highest to lowest value

    let hierarchy = d3.hierarchy(data, (node) => {
        return node.children;
    }).sum((node) => {
        return node.value;
    }).sort((node1, node2) => {
        return node2.value - node1.value
    })

    // Create a treemap based on D3 hierarchy
    let treeMap = d3.treemap().size([width, height])
    treeMap(hierarchy);

    let tiles = hierarchy.leaves();

    // Create groups based on the D3 hierarchy
    // Groups (categories) contain several children (games)

    let groupElement = svg.selectAll('g')
    .data(tiles)
    .enter()
    .append('g')
    .attr('transform', (item) => {
        return `translate(${item.x0}, ${item.y0})`
    })

    // Each group has several tiles (the games)

    groupElement.append('rect')
    .attr('class', 'tile')
    .attr('fill', (item) => {
        switch (item.data.category) {
            case '2600':
                return 'Aquamarine';
            case 'PS3':
                return 'CadetBlue';
            case 'N64':
                return 'CornflowerBlue';
            case 'Wii':
                return 'DarkCyan';
            case 'PS2':
                return 'DarkGray';
            case 'PS':
                return 'DarkGreen'
            case 'NES':
                return 'DarkOliveGreen';
            case 'SNES':
                return 'DarkSeaGreen'
            case 'XB':
                return 'DarkSlateGray'
            case 'GB':
                return 'DodgerBlue'
            case 'GBA':
                return 'Gold'
            case 'PC':
                return 'GoldenRod'
            case 'DS':
                return 'Green'
            case 'PS4':
                return 'GreenYellow'
            case 'PSP':
                return 'LightBlue'
            case 'X360':
                return 'LightCoral'
            case '3DS':
                return 'LightSalmon'
            case 'XOne':
                return 'Olive'      
            default:
                break;
        }
    })
    .attr('data-name', (item) => item.data.name)
    .attr('data-category', (item) => item.data.category)
    .attr('data-value', (item) => item.data.value)
    .attr('width', (item) => item.x1 - item.x0)
    .attr('height', (item) => item.y1 - item.y0)

    groupElement.append('text')
    .text((item) => item.data.name)
    .attr('x', 5)
    .attr('y', 20)
}

fetchData();

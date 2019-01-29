console.log("asdfttz")


var eventHandler = function(event) {
    width = window.innerWidth;
    console.log(width);
    if (width < 993 ) {
        d3.select('#viz-list').attr('class', 'nav-item dropdown');
        d3.select('#viz-link').attr('class', 'nav-link dropdown-toggle');
        d3.select('#viz-link').attr('data-toggle', 'dropdown');
        d3.select('#viz-link').attr('href', '#')
        console.log("small");
    }else {
            d3.select('#viz-list').attr('class', 'nav-item');
            d3.select('#viz-link').attr('class', 'nav-link');
            d3.select('#viz-link').attr('data-toggle', '');
            d3.select('#viz-link').attr('href', "/visualizations")
            console.log('big')
        }
};
window.addEventListener('resize', eventHandler, false);
window.addEventListener('load', eventHandler, false);
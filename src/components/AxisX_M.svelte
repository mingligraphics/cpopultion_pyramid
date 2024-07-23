<script>
    export let xMScale;
    export let xMTicks;
    export let height;
    export let width;
    
    </script>
    
    <g class="axis x" transform="translate(0 {height})">
        {#each xMTicks as tick, i}
          <g class="tick tick-{tick}" transform="translate({xMScale(tick)} 0)">
            <line x1="0" x2="0" y1="0" y2={0} stroke="#dcddde" stroke-width=1/>
            <text x=0 y=0 dx={i===0 ? -3: 0} dy=20 dominant-baseline="middle" 
            >{tick / 1000} {i === xMTicks.length - 1 ? "" : ""}</text>
          </g>
        {/each}
        <text x={1/2*width - 15 } y={0}
        dx="0"
        dy="40"
        dominant-baseline="start"
        text-anchor= "start"
        class = "axis-label"
        >million</text>
        <text x={5/12*width + 8 } y={0}
        dx="0"
        dy="57"
        dominant-baseline="start"
        text-anchor= "start"
        class = "axis-title"
        style="text-transform: uppercase"
        >Population</text>
    </g>
    
    <style>
     
    </style>
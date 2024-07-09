<script>
    export let xFScale;
    export let xFTicks;
    export let height;
    
    </script>
    
    <g class="axis x" transform="translate(0 {height})">
        {#each xFTicks as tick, i}
          <g class="tick tick-{tick}" transform="translate({xFScale(tick)} 0)">
            <line x1="0" x2="0" y1="0" y2={0} stroke="#dcddde" stroke-width=1/>
            <text x=0 y=0 dx={i===0 ? -3: 0} dy=20 dominant-baseline="middle" 
            >{tick / 1000}</text>
          </g>
        {/each}
    </g>
    
    <style>
    
    </style>
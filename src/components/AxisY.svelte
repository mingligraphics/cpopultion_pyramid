<script>
    export let yScale;
    export let yTicks; 
    export let width;
</script>
    
<g class="axis y" transform="translate(0 0)">
  {#each yTicks as tick, i}
   <g
    class="tick tick-{tick}"
    transform="translate(0 {yScale(tick)+yScale.bandwidth()})">
    <line
    class="line-{tick}"
    x1={i === yTicks.length - 1 ? 3.5/12 * width : 0} 
    y1={0}
    x2={width} 
    y2={0}
    stroke={i === 0 ? "none" : "#e5e7eb"}/>
    <text x={i === yTicks.length - 1 ? (width - 10) : (width - 15)} y={-5} style='text-anchor:end'> {i === yTicks.length - 1 ? "AGE " : ""} {tick}{i === yTicks.length - 1 ? "+" : ""}</text>
  </g>
  {/each}
</g>
        
<style>
   .line-zero {
    z-index: 999;
   }     
</style>
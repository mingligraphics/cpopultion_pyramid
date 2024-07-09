<script>
  import data from "./data/CN_pop_2022.json";
  import { scaleLinear, scaleBand } from "d3-scale";
  import { max } from "d3-array";
  import { fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
	import * as easings from 'svelte/easing';
  import Steps from "/components/Steps.svelte";
  import AxisX_F from "/components/AxisX_F.svelte";
  import AxisX_M from "/components/AxisX_M.svelte";
  import AxisY from "/components/AxisY.svelte";

  let initialData = data;
  let renderedData = initialData;

  	// Here we split the data in 2, which we need in order to animate between them
  $: year = 1980;
	const data1980 = initialData.filter(d => d.Time === 1980);
  const data2016 = initialData.filter(d => d.Time === 2016);
  const data2024 = initialData.filter(d => d.Time === 2024);
	const data2050 = initialData.filter(d => d.Time === 2050);
	
	// With Svelte's tweened, you can interpolate between data values, see https://svelte.dev/docs#tweened. The initial values are set here to be the data from 2018
	const tweenedPoints = tweened(data1980, {
		delay: 0,
		duration: 1500,
		easing: easings.cubicOut
	});
	
	//With "$:" you can specify reactive statements in Svelte. Svelte checks all variables in the statement, and when one of them changes, the statement is run and everything is updated. In this case, tweenedPoints is updated depending on the selected year radio button. See https://svelte.dev/docs#3_$_marks_a_statement_as_reactive
	// $: if(year == 1980){
	// 	tweenedPoints.set(data1980)
	// }
	// else if (year == 2024){
  //   tweenedPoints.set(data2024)
  // }
  // else{
  //   tweenedPoints.set(data2050)
  // }

  //
  let width = 450;
  let height = 700;
    
  const margin = {
        top: 30,
        right: 10,
        bottom: 50,
        left: 10
    }
  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

  $: xMScale = scaleLinear()
		.domain([0, max(renderedData, d => d.Value)]) //extent(data, (d) => d.Index)
		.range([innerWidth / 2, margin.left]);
  
  $: xFScale = scaleLinear()
    .domain(xMScale.domain())
    .range([innerWidth / 2, innerWidth - margin.right])

  let yScale = scaleBand()
		.domain(renderedData.map(d => d.Age))
		.range([innerHeight, 0])
    .padding(0.1);

  $: console.log(yScale(0) + yScale.bandwidth());

  let currentStep;
  $: {
    if(currentStep === 0){
      year = 1980;
      tweenedPoints.set(data1980);
    }
    if(currentStep === 1){
      year = 1980;
      tweenedPoints.set(data1980);
    }
    if(currentStep === 2){
      year = 2016;
      tweenedPoints.set(data2016);
    }
    if(currentStep === 3){
      year = 2024;
      tweenedPoints.set(data2024);
    }
    if(currentStep === 4){
      year = 2050;
      tweenedPoints.set(data2050);
    }
  };

  $: yTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  $: xFTicks = xFScale.ticks(5);
  $: xMTicks = xMScale.ticks(5);

  $:console.log(tweenedPoints);


  // stroke={d.Gender === "PopMale" ? (d.Age > 64 ? "#C7C8CA" : d.Age > 14 ? "none" : "#C7C8CA") : d.Age > 64 ? "#C7C8CA" : d.Age > 14 ? "none" : "#C7C8CA"}
  // fill={d.Gender === "PopMale" ? (d.Age > 64 ? "none" : d.Age > 14 ? "#5AC5C2" : "none") : d.Age > 64 ? "none" : d.Age > 14 ? "#AC8FBE" : "none"}
</script>

<main>
  <section>
  <div class="sticky">
  <div class="chart-container" bind:clientWidth={width}>
    <!-- <label> 
      <input type=radio bind:group={year} name="year" value={1979}>
      1979
    </label>
    <label>
      <input type=radio bind:group={year} name="year" value={2024}>
      2024
    </label>
    <label>
      <input type=radio bind:group={year} name="year" value={2050}>
      2050
    </label>
    <label>
      <input type=radio bind:group={year} name="year" value={2100}>
      2100
    </label> -->
    <svg {width} {height}>
      <g class='inner-chart' transform="translate({margin.left}, {margin.top})">
        {#if currentStep < 4}
        <text 
        x={xMScale(8000)}
        y={yScale(82)}
        class="year-lable"
        font-weight=300 
        font-size=18
        color="#333333"
        >Male</text>
        <text 
        x={xFScale(5000)}
        y={yScale(82)}
        class="year-lable"
        font-weight=300 
        font-size=18
        color="#333333"
        >Female</text>
        {/if}
      <AxisX_F {xFScale} {xFTicks} height = {innerHeight} width = {innerWidth}/>
      <AxisX_M {xMScale} {xMTicks} height = {innerHeight} width = {innerWidth}/>
      <AxisY  {yTicks} {yScale} width = {width}/>
      {#each $tweenedPoints as d, i}
      <rect
      transition:fade={{ delay: 550, duration: 300 }}
      x={d.Gender === "PopMale" ? xMScale(d.Value) : xFScale(0)}
      y={yScale(d.Age)}
      width={d.Gender === "PopMale" ? xMScale(0) - xMScale(d.Value) : xFScale(d.Value) - xFScale(0)}
      height={yScale.bandwidth()}
      stroke={"white"}
      stroke-width={0.8}
      fill={currentStep == 0 ? "#AC8FBE"
      : currentStep == 1 && d.Age == 0 ? "#5AC5C2" 
      : currentStep == 2 && d.Age < 36 && d.Age > 0 ? "#5AC5C2" 
      : currentStep == 3 && d.Age < 46 && d.Age > 9 ? "#5AC5C2"
      : currentStep == 4 && d.Age < 72 && d.Age > 35 ? "#5AC5C2"
      : "#E2E3E4"}
      opacity="1"
      />
      {/each}
      {#if currentStep > 1}
      <line 
      transition:fade={{ delay: 550, duration: 300 }}
      x1={5} y1={yScale(64)} x2={25} y2={yScale(64)} stroke="currentColor" />
      <line 
      transition:fade={{ delay: 550, duration: 300 }}
      x1={15} y1={yScale(64)} x2={15} y2={yScale(44)} stroke="currentColor" />
      <line 
      transition:fade={{ delay: 550, duration: 300 }}
      x1={15} y1={yScale(38)} x2={15} y2={yScale(19)} stroke="currentColor" />
      <line transition:fade={{ delay: 550, duration: 300 }}
      x1={5} y1={yScale(19)} x2={25} y2={yScale(19)} stroke="currentColor" />
      <text
      class="year-lable"
      fill="currentColor"
      text-anchor="right"
      x={-11}
      y={yScale(40)}
      font-weight=300 
      font-size=15
      >
      Working-age*
      </text>
      {/if}
      <text 
    x={xMScale(15000)}
    y={yScale(95)}
    class="year-lable"
    font-weight=500 
    font-size=36
    color="#333333"
    >{year}</text>
    <line
    x1={0} 
    y1={innerHeight}
    x2={width} 
    y2={innerHeight}
    stroke="#333333"/>
      </g>
    </svg>
    <p class="footnote">*Age 20–64
    <br>Source: United Nations</p>
    </div>
  </div>
    <Steps bind:currentStep/>
    </section>
</main>
  
    <style>
    .chart-container {
    height:100%;
    width:100%;
    max-width: 500px;
    /* position: absolute;
    left: 0px;
    height: 100%;
    width: 400px; */
  }
  
  .sticky {
    position: sticky;
    z-index: 1;
    height:90vh;
    top:5vh;
    margin-bottom: 1rem;
    display: flex;
    align-items: left;
    justify-content: left;
    /* the three lines above is how a parent center its children */
}

    section {
      position: relative;
  }
  
    main {
      max-width: 1200px;
      margin:0 auto;
      /* background-color:#EFEFF0; */
  }

  .year-lable{
    font-family: Retina, sans-serif;
  }

  :global(.tick text, .axis-title){
      fill: #666;
      text-anchor: start;
      font-family: RetinaNarrowLight,  sans-serif;
      font-size: 13px;
      line-height: 15.6px;
    }

    :global(.axis-title){
        line-height: 13px;
    }
    .footnote{
    color: #727272;
    font-weight: 300;
    font-family: Retina, sans-serif;
    font-size: 13px;
    line-height: 17px;
    margin-top:4px;
  }
    </style>
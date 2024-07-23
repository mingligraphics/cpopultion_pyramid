<script>
    export let currentStep;
    import Scrolly from "../helpers/Scrolly.svelte";

    $: steps = [
      `<p>When China instituted the one-child policy nationwide in 1980, it had a largely normal age distribution, except for the cohort born in the early 1960s, when the country was devastated by famine.</p>`,
    // 0 
    `<p><span style="color:white; background-color:#5AC5C2;padding:3.5px;margin:1px;border-radius:4px;font-weight:500">Those born in 1980</span> 
       were the first to be affected by the one-child policy which lasted 35 years.</p>`,
    `In 2016, China ended the one-child policy. By then,  <span style="color:white; background-color:#5AC5C2;padding:3.5px;margin:1px;border-radius:4px;font-weight:500">an increasing share of workers had been born during the policy </span>, foreshadowing a worker shortage in the coming decades.`,
    `The one-child policy has left a dent in the younger portion of today's working-age population.`,
    // 2 
    `By 2050, the population dent created by the policy means there will be fewer than two Chinese workers for each retiree.
    <br><br><span style="color: #727272;font-weight: 300; font-family: Retina, sans-serif;font-size: 13px;line-height: 17px; margin-top:6px;">Source: United Nations Population Division</span>`
  ];

</script>
<div class="steps">
    <Scrolly bind:value={currentStep}>
      {#each steps as text, i}
      <div class="step" class:active={currentStep === i}>
        <div class="step-content">
          {@html text}
        </div>
      </div>
      {/each}
    </Scrolly>
  </div>

  <style>
    .step {
    height: 90vh;
    opacity: 0.3;
    transition: opacity 300ms ease;

/* vertically and horizontally center the steps */
    display: flex;
    justify-content: center;
    place-items: center;

}

.step-content {
  position: relative;
  box-sizing: border-box;
  z-index: 1;
  -webkit-transform: translate3d(0, 0, 0); /*for safari z-index issue*/
  height: auto;
  width: 100%;
  max-width: 600px; 
  margin: 0 auto;
  font-family: RetinaLight, sans-serif;
  font-size: 17px;
  line-height: 27px;
  font-weight: 400;
  color: #333;
  padding: 20px 25px 20px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, .4);
  overflow: visible;
  background-color: rgba(255, 255, 255, .9);
}

.step.active {
  opacity: 1;
}

.steps {
  position: relative;
  z-index: 2;
  pointer-events: none;
  display: flex;
  justify-content: right;
  place-items: right;
}

/* mark{
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 4px;
  padding-right: 4px;
  margin-right: 1px;
  margin-left: 1px;
  border-radius: 4px;
  white-space: nowrap;
  font-weight: 500;
  text-shadow: none;
} */
  </style>
<script>
    import TimeCard from "./TimeCard.svelte";

    let daysInWeek = 5;

    let dayName = 2;

    let h12 = true;

    let OT = true;
    let OTHours = 8;
    $: OTperDay = true;
    let showHoursperDay = false;

    let minTime = 0;
    let weekNum = 1;
    let weeks = [];
    let weeksInAM = [];
    let weeksOutAM = [];
    let timeSums = [];
    let OTTimeSums = [];
    let noOTTimeSums = [];
    let daysofweek = [
        ["1", "2", "3", "4", "5", "6", "7"],
        ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
        [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
    ];

    for (let i = 0; i < weekNum; i++) {
        weeks[i] = new Array();
        for (let j = 0; j < daysInWeek; j++) {
            weeks[i].push({ in: "", out: "", dow: j });
        }
    }

    for (let i = 0; i < weeks.length; i++) {
        weeksInAM[i] = new Array(daysInWeek).fill(true);
        weeksOutAM[i] = new Array(daysInWeek).fill(false);
    }

    const clearFields = () => {
        for (let i = 0; i < weeks.length; i++) {
            for (let j = 0; j < daysInWeek; j++) {
                weeks[i][j].in = "";
                weeks[i][j].out = "";
            }
            weeksInAM[i] = new Array(daysInWeek).fill(true);
            weeksOutAM[i] = new Array(daysInWeek).fill(false);
        }
        weeks = weeks;
    };
    const dayNameCycle = () => {
        dayName = (dayName + 1) % daysofweek.length;
    };
    const addWeek = () => {
        weeks = [...weeks, new Array()];
        for (let j = 0; j < daysInWeek; j++) {
            weeks[weeks.length - 1].push({ in: "", out: "", dow: j });
        }
        weeksInAM = [...weeksInAM, new Array(daysInWeek).fill(true)];
        weeksOutAM = [...weeksOutAM, new Array(daysInWeek).fill(false)];
        timeSums = [...timeSums, new Array()];
        OTTimeSums = [...OTTimeSums, new Array()];
        noOTTimeSums = [...noOTTimeSums, new Array()];
        weekNum++;
    };
    const removeWeek = () => {
        weeks = weeks.slice(0, weeks.length - 1);
        weeksInAM = weeksInAM.slice(0, weeksInAM.length - 1);
        weeksOutAM = weeksOutAM.slice(0, weeksOutAM.length - 1);
        timeSums = timeSums.slice(0, timeSums.length - 1);
        OTTimeSums = OTTimeSums.slice(0, OTTimeSums.length - 1);
        noOTTimeSums = noOTTimeSums.slice(0, noOTTimeSums.length - 1);
        weekNum--;
    };


</script>

<main>
    {#each weeks as week, index (index)}
        <TimeCard
            {daysInWeek}
            days={week}
            daysInAM={weeksInAM[index]}
            daysOutAM={weeksOutAM[index]}
            {h12}
            {minTime}
            {dayName}
            {OT}
            {OTHours}
            bind:timeSum={timeSums[index]}
            bind:OTTimeSum={OTTimeSums[index]}
            bind:noOTTimeSum={noOTTimeSums[index]}
        />
    {/each}
    <div class="bottomstuff">
        <div class="totaltimes">
            {#if !OT}
                <p>Every Week Total:</p>
                <p>
                    {(
                        Math.round(
                            (timeSums.reduce((a, b) => a + b, 0) / 60) * 100
                        ) / 100
                    ).toFixed(2)} hours
                </p>
                <p>
                    {Math.floor(timeSums.reduce((a, b) => a + b, 0) / 60)} hours
                    {timeSums.reduce((a, b) => a + b, 0) % 60} minutes
                </p>
            {:else}
                <p>Every Week Total(without O/T):</p>
                <p>
                    {noOTTimeSums.reduce((a, b) => a + b, 0) / 60} hours
                </p>
                <p>
                    {Math.floor(noOTTimeSums.reduce((a, b) => a + b, 0) / 60)} hours

                    {Math.round(
                        (noOTTimeSums.reduce((a, b) => a + b, 0) / 60 -
                            Math.floor(
                                noOTTimeSums.reduce((a, b) => a + b, 0) / 60
                            )) *
                            60
                    )}
                    minutes
                </p>
                <hr />
                <p>Every Week Total O/T:</p>
                <p>
                    {Math.floor(OTTimeSums.reduce((a, b) => a + b, 0) / 60 * 100)/100} hours
                </p>
                <p>
                    {Math.floor(OTTimeSums.reduce((a, b) => a + b, 0) / 60)} hours
                    {Math.round((OTTimeSums.reduce((a, b) => a + b, 0) / 60 - Math.floor(OTTimeSums.reduce((a, b) => a + b, 0) / 60)) * 60)} minutes
                </p>
                <hr />
            {/if}
        </div>

        <div class="options">
            <div>
                <input
                    type="checkbox"
                    name=""
                    id="12h"
                    bind:checked={h12}
                    on:change={clearFields}
                />
                <label for="12h">12 Hour Time</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    name=""
                    id="OT"
                    bind:checked={OT}
                    on:change={clearFields}
                />
                <label for="OT">O/T</label>
            </div>
            <div>
                <label for="minTime">Minimum Hours per Day:</label>
                <input
                    type="number"
                    id="minTime"
                    style="width:4em;"
                    bind:value={minTime}
                />
            </div>
            {#if OT}
                <hr />
                <!-- <div>
                    <input
                        type="checkbox"
                        name=""
                        id="OTperDay"
                        bind:checked={OTperDay}
                        on:change={() => {
                            clearFields();
                            if (OTperDay)
                                OTHours /= 5;
                            else
                                OTHours *= 5;
                        }}
                    />
                    <label for="OTperDay">O/T per Day</label>
                </div> -->
                <div>
                    <label for="minTime"
                        >Hours a {OTperDay ? "Day" : "Week"} before O/T:</label
                    >
                    <input
                        type="number"
                        id="minTime"
                        style="width:4em;"
                        bind:value={OTHours}
                    />
                </div>
            {/if}
        </div>

        <div class="buttons">
            <button on:click={clearFields}>Clear Fields</button>
            <button on:click={dayNameCycle}>Change Days</button>
            <button on:click={addWeek}>Add Week</button>
            <button on:click={removeWeek}>Remove Week</button>
        </div>
    </div>
</main>

<style>
    .bottomstuff {
        box-shadow: 0px 5px 5px #ddd;
        background: #386641;
        padding: 1.5rem;
        border-radius: 20px;
    }

    .totaltimes {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .options {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: row;
    }

    .options div {
        padding: 0 1em 0 1em;
    }

    .buttons {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 16px;
        align-items: center;
        justify-content: center;
        margin-top: 1rem;
    }

    .buttons button {
        background-color: #f2e8cf;
        color: #386641;
        border-radius: 6px;
        border: none;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 900;
        padding: 10px;
    }

    .bottomstuff p {
        padding: 0 20px 0 20px;
        margin: 0;
    }

    .bottomstuff p,
    label,
    input {
        color: #f2e8cf;
        border: none;
        font-weight: 900;
    }

    input {
        font-weight: normal;
        color: #000;
    }

    hr {
        width: 100%;
        border: solid 1px #6a994e;
    }
</style>

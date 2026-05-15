<script setup lang="ts">
import { computed, reactive } from 'vue'
import {
  calculatorStore,
  AMPM,
  TimeCardDay,
  TimeStamp
} from '../stores/calculatorStore.ts'

import {
  interpretTimeInput,
  calculateTime,
  daysOfWeek,
  decimalToHM
} from '../utils'

const props = defineProps(['cardI', 'print'])

// Mirror the store state to make changes easier
const times = reactive(calculatorStore?.timeCards[props.cardI].days)

const selectText = (e: any) => {
  e.target.select()
  e.target.focus()
}

const updateTime = (
  dayIndex: number,
  timeType: 'in' | 'out' | 'break',
  value: string
) => {
  if (timeType == 'break') {
    times[dayIndex]['break'] = Number(value.replace(/\D/g, '').trim())
  } else {
    const timeToUpdate = interpretTimeInput(
      value,
      times[dayIndex][timeType].amPm,
      calculatorStore.settings.h24
    ) ?? { hours: undefined, minutes: undefined, break: undefined }
    times[dayIndex][timeType] = {
      ...times[dayIndex][timeType],
      ...timeToUpdate
    }
  }
}

const cycleAMPM = (timeStamp: TimeStamp) => {
  timeStamp.amPm = timeStamp.amPm === AMPM.am ? AMPM.pm : AMPM.am
}

const formatTime = (time: TimeStamp): string => {
  if (time.hours === undefined) return ''

  let formattedHours: number
  let formattedMinutes: string

  if (calculatorStore.settings.h24)
    formattedHours =
      time.amPm === AMPM.pm && time.hours < 12 ? time.hours + 12 : time.hours
  // Convert 0 hours to 12 in 12-hour format
  else formattedHours = time.hours === 0 ? 12 : time.hours

  formattedMinutes = (time.minutes ?? 0).toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}`
}

const displayTimes = computed(() =>
  times.map((time: TimeCardDay) => ({
    in: formatTime(time.in),
    out: formatTime(time.out),
    break: time.break ? time.break + 'min' : ''
  }))
)

const computedHours = computed(() =>
  times.map((time: TimeCardDay) =>
    calculateTime(
      time.in,
      time.out,
      calculatorStore.settings.hasBreak ? (time.break ?? 0) : 0,
      calculatorStore.settings.minHoursPerDay,

      calculatorStore.settings.hasOT
        ? calculatorStore.settings.OTHours
        : undefined
    )
  )
)

const computedTotalWithoutOTHours = computed(() =>
  computedHours.value.reduce(
    (a: any, c: any) => (a ?? 0) + (c?.withoutOT ?? 0),
    0
  )
)

const computedTotalOTHours = computed(() =>
  computedHours.value.reduce((a: any, c: any) => (a ?? 0) + (c?.OT ?? 0), 0)
)

const visibleDays = computed(() =>
  times
    .map((day, i) => ({ day, i }))
    .filter(
      ({ i }) =>
        !props.print ||
        (computedHours.value[i]?.withoutOT ?? 0) +
          (computedHours.value[i]?.OT ?? 0)
    )
)

const columnCount = computed(() => {
  let n = 3 // day, in, out
  if (calculatorStore.settings.hasBreak) n += 1
  n += calculatorStore.settings.hasOT ? 2 : 1 // reg hours & ot hours
  return n
})

const clearCard = (cardI: number) => {
  calculatorStore.timeCards[cardI].days.map(day => {
    day.in = { hours: undefined, minutes: undefined, amPm: AMPM.am }
    day.out = { hours: undefined, minutes: undefined, amPm: AMPM.pm }
    day.break = undefined
  })
}
</script>

<template>
  <div class="relative">
    <span class="text-xs italic text-ink-muted ml-auto text-right">
      Week No. 1 · Mar 5, 2026
    </span>
    <button
      v-if="!props.print"
      tabindex="-1"
      class="absolute right-0 bottom-0 flex place-items-center h-8 px-2 text-xs hover:underline z-10"
      @click="clearCard(props.cardI)"
    >
      Clear Card
    </button>

    <table
      class="table-fixed w-full text-center text-sm border-collapse whitespace-nowrap relative"
      :class="!props.print ? 'border' : ''"
    >
      <colgroup>
        <!-- Day -->
        <col style="width: 15%" />
        <!-- In -->
        <col style="width: 25%" />
        <!-- Out -->
        <col style="width: 25%" />
        <!-- Break -->
        <col style="width: 10%" />
        <!-- Regular Hours -->
        <col
          :style="{ width: calculatorStore.settings.hasOT ? '12.5%' : '25%' }"
        />
        <!-- OT Hours -->
        <col v-if="calculatorStore.settings.hasOT" style="width: 12.5%" />
      </colgroup>

      <!-- header -->
      <thead
        :class="
          !props.print
            ? 'uppercase font-sans border-b-[3px] border-double font-medium text-ink-muted text-xs tracking-wider bg-paper-tint'
            : ''
        "
      >
        <tr class="h-16">
          <td class="border-none"></td>
          <th>In</th>
          <th>Out</th>
          <th v-if="calculatorStore.settings.hasBreak">Break</th>
          <th class="!grow">
            {{ calculatorStore.settings.hasOT ? 'Hours' : 'Hours' }}
          </th>
          <th v-if="calculatorStore.settings.hasOT" class="!grow-7">OT</th>
        </tr>
      </thead>

      <!-- day rows -->
      <tbody>
        <tr class="" v-for="{ day, i: dayI } in visibleDays" :key="dayI">
          <td class="italic font-serif">
            {{
              daysOfWeek[calculatorStore.settings.dayNames][
                (dayI + calculatorStore.settings.firstDay) % 7
              ]
            }}
          </td>

          <td
            class="relative border border-ink-primary"
            :class="calculatorStore.settings.hasBreak ? '' : ''"
          >
            <input
              v-if="!props.print"
              type="text"
              :class="!calculatorStore.settings.h24 ? 'pr-16' : ''"
              class="w-full placeholder:text-ink-faint focus:bg-paper-tint h-9 text-center bg-paper-base"
              :value="displayTimes[dayI].in"
              @focus="selectText"
              @blur="
                updateTime(
                  dayI,
                  'in',
                  ($event?.target as HTMLInputElement)?.value
                )
              "
              :placeholder="dayI == 0 && cardI == 0 ? '9:00' : ''"
            />
            <p class="w-full" v-else-if="true">
              {{ displayTimes[dayI].in + day.in.amPm }}
            </p>

            <button
              v-if="!props.print && !calculatorStore.settings.h24"
              @click="cycleAMPM(day.in)"
              tabindex="-1"
              class="w-16 absolute right-0 h-9 border-l z-[999] border-hairline bg-transparent"
            >
              {{ day.in.amPm }}
            </button>
          </td>

          <td
            class="relative border border-ink-primary"
            :class="calculatorStore.settings.hasBreak ? '' : ''"
          >
            <input
              v-if="!props.print"
              type="text"
              :class="!calculatorStore.settings.h24 ? 'pr-16' : ''"
              class="w-full placeholder:text-ink-faint focus:bg-paper-tint border-ink-primary border h-9 text-center bg-paper-base"
              :value="displayTimes[dayI].out"
              @focus="selectText"
              @blur="
                updateTime(
                  dayI,
                  'out',
                  ($event?.target as HTMLInputElement)?.value
                )
              "
              :placeholder="dayI == 0 && cardI == 0 ? '5:00' : ''"
            />
            <p class="w-full" v-else-if="true">
              {{
                displayTimes[dayI].out +
                (!calculatorStore.settings.h24 ? day.out.amPm : '')
              }}
            </p>

            <button
              v-if="!props.print && !calculatorStore.settings.h24"
              class="w-16 absolute right-0 h-9 border-l border-dashed z-[999] border-ink-primary bg-transparent"
              tabindex="-1"
              @click="cycleAMPM(day.out)"
            >
              {{ day.out.amPm }}
            </button>
          </td>

          <!-- break  -->
          <td class="relative border border-ink-primary">
            <input
              v-if="calculatorStore.settings.hasBreak && !props.print"
              class="w-full placeholder:text-ink-faint focus:bg-paper-tint border-ink-primary border h-9 text-center bg-paper-base"
              type="numeric"
              maxlength="3"
              :value="displayTimes[dayI].break"
              @focus="selectText"
              @blur="
                updateTime(
                  dayI,
                  'break',
                  ($event?.target as HTMLInputElement)?.value
                )
              "
              :placeholder="dayI == 0 && cardI == 0 ? '30min' : ''"
            />
            <p v-else-if="calculatorStore.settings.hasBreak">
              {{ displayTimes[dayI].break }}
            </p>
          </td>

          <td
            class=""
            :class="
              calculatorStore.settings.hasOT ? 'w-1/2 border-r-[1px]' : 'w-full'
            "
          >
            {{
              calculatorStore.settings.showHM
                ? decimalToHM(computedHours[dayI]?.withoutOT)
                : computedHours[dayI]?.withoutOT?.toFixed(2)
            }}
          </td>
          <td v-if="calculatorStore.settings.hasOT">
            {{
              computedHours[dayI]?.OT
                ? calculatorStore.settings.showHM
                  ? decimalToHM(computedHours[dayI]?.OT)
                  : computedHours[dayI]?.OT?.toFixed(2)
                : ''
            }}
          </td>
        </tr>
      </tbody>

      <!-- sums -->
      <tfoot>
        <tr>
          <td :colspan="columnCount" class="max-w-lg text-sm">
            <div class="flex flex-row mt-4 mb-2 mx-12 justify-center gap-x-4">
              <div class="flex flex-row place-items-center">
                <p class="mr-4 font-sans">Total</p>
                <p>
                  {{
                    calculatorStore.settings.showHM
                      ? decimalToHM(
                          computedTotalWithoutOTHours + computedTotalOTHours
                        )
                      : (
                          computedTotalWithoutOTHours + computedTotalOTHours
                        )?.toFixed(2)
                  }}
                </p>
              </div>

              §
              <div
                class="flex flex-row place-items-center"
                v-if="calculatorStore.settings.hasOT"
              >
                <p class="mr-4 font-sans">Regular</p>

                <p>
                  {{
                    calculatorStore.settings.showHM
                      ? decimalToHM(computedTotalWithoutOTHours)
                      : computedTotalWithoutOTHours?.toFixed(2)
                  }}
                </p>
              </div>
              ||
              <div
                class="flex flex-row place-items-center"
                v-if="calculatorStore.settings.hasOT"
              >
                <p class="mr-4 font-sans">OT</p>
                <p>
                  {{
                    calculatorStore.settings.showHM
                      ? decimalToHM(computedTotalOTHours)
                      : computedTotalOTHours?.toFixed(2)
                  }}
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style>
input {
  border: none;
}

input:focus {
  outline: none;
}

@media print {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  table {
    border-width: 0;
  }
  th,
  td {
    border-width: 1pt !important;
  }
}
</style>

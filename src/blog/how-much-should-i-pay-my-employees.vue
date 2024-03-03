<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useHead } from "@unhead/vue"

const progressBar = ref(null)

onMounted(() => {
  progressBar.value.style.width = `0px`

  window.addEventListener("scroll", () => {
    console.log(
      window.scrollY,
      document.documentElement.scrollHeight - window.innerHeight,
    )
    progressBar.value.style.width = `${
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      window.innerWidth *
      0.94
    }px`
  })
})

useHead({
  title: "How Much Should I Pay My Employees?",
  meta: [
    {
      name: "description",
      content:
        "Learn how to determine fair compensation for your employees with our comprehensive guide to salaries, bonuses, and benefits.",
    },
  ],
})
</script>

<template>
  <div ref="progressBar" class="sticky top-0 h-1 bg-black" />

  <div class="mt-8">
    <div
      class="flex sticky h-0 top-8 justify-end text-right text-xs font-medium"
    >
      <ul class="hidden lg:flex max-w-[156px] gap-4 flex flex-col">
        <li>
          <a href="#regulation " class="hover:underline">
            <div>Minimum Wages & Regulations</div>
          </a>
        </li>
        <li>
          <a href="#competitive-salaries" class="hover:underline">
            <div>How to Find Competitive Salaries</div>
          </a>
        </li>
        <li>
          <a href="#generosity" class="hover:underline">
            <div>Earn Dedication with Generosity</div>
          </a>
        </li>

        <li>
          <a href="#alternative-compensation" class="hover:underline">
            <div>About Alternative Compensation Methods</div>
          </a>
        </li>
        <li>
          <a href="#negotiation" class="hover:underline">
            <div>Control the Negotiation</div>
          </a>
        </li>
        <li>
          <a href="#raises" class="hover:underline">
            <div>Raises, Bonuses, and Adjusting to Market Trends</div>
          </a>
        </li>
        <li>
          <a href="#tldr" class="hover:underline">
            <div>TLDR</div>
          </a>
        </li>
      </ul>
    </div>

    <div
      class="flex flex-col max-w-xl mx-auto font-serif text-left text-lg lg:text-xl"
    >
      <div class="flex flex-col border-b-[1px] pb-4">
        <h1 class="italic font-semibold text-3xl lg:text-4xl">
          How much should I pay my employees?
        </h1>
        <h2 class="font-medium text-xl text-zinc-600 dark:text-zinc-400 mt-2">
          Your definitive guide to employee compensation, and its many
          considerations.
        </h2>
      </div>

      <div class="flex flex-col gap-8 mt-4 mb-2">
        <div class="flex flex-col items-end">
          <img src="/give-money.webp" alt="" />
          <p class="text-zinc-600 dark:text-zinc-400 italic text-sm mt-1">
            Man receiving money. Photograph by
            <a
              target="_blank"
              href="https://www.pexels.com/@timur-weber/"
              class="not-italic text-blue-800 dark:text-blue-400 underline"
            >
              Timur Weber</a
            >.
          </p>
        </div>

        <div>
          <p class="indent-4">
            Learn how to get the best value for your work, while ensuring your
            employees stay around for the long term.
          </p>
        </div>

        <div id="regulation">
          <h2 class="font-bold text-2xl indent-4 italic">
            Minimum Wages & Regulations
          </h2>
          <div
            class="text-center mt-4 p-4 bg-green-200 dark:bg-green-700 border-2 border-green-300 dark:border-green-800 rounded-xl"
          >
            <p class="">
              Before making the tough decisions, first understand the minimums
              required of you legally.
            </p>
          </div>

          <ol>
            <li>
              <h2 class="ml-2 mt-4 mb-2 font-semibold">
                Is Your Employee Exempt or Non-Exempt?
              </h2>
              <p class="indent-4">
                The Fair Labor Standards Act (FLSA) makes some employees exempt
                from being guaranteed the federal minimum wage and overtime.
                These employees instead are paid a fixed yearly salary. Review
                the Department of Labor's (DOL)
                <a
                  target="_blank"
                  href="https://www.dol.gov/agencies/whd/fact-sheets/17a-overtime"
                  class="text-blue-800 dark:text-blue-400 underline"
                >
                  fact sheets</a
                >
                to determine if your employee is exempt.
              </p>
              <p class="mt-2 indent-4">
                Generally exempt employees are those paid $684+ per week or
                $35,568+ annually; in one of the following categories of work:
              </p>
              <ul class="font-medium list-disc">
                <li>Executive</li>
                <li>Administrator</li>
                <li>Professional</li>
                <li>Computer Employee</li>
                <li>Outside Salesperson</li>
              </ul>
              <h2 class="ml-2 mt-4 mb-2 font-semibold">Minimum Wage</h2>
              <p class="indent-4">
                Federal minimum wage is <b>$7.25</b> an hour, though many states
                have enacted higher minimum wages. The DOL provides a
                <a
                  target="_blank"
                  href="https://www.dol.gov/agencies/whd/minimum-wage/state"
                  class="text-blue-800 dark:text-blue-400 underline"
                  >map of the minimum wage in every state</a
                >.
              </p>
            </li>
            <li>
              <h2 class="ml-2 mt-4 mb-2 font-semibold">
                Overtime Pay and Rules
              </h2>
              <p class="indent-4">
                Typically as definied in the FLSA, hours worked after 40 in a
                workweek are classified overtime, and these hours must be paid
                at time and a half or 1.5 times the normal rate. Some states
                have additional laws regarding overtime such as California.
                California also counts time and a half pay for hours worked past
                8 in a workday and double time after 12 hours.
              </p>
              <p class="indent-4 mt-2">
                A workweek is the employee's consecutive and reoccurring 168 (7
                × 24) hour period of work.
              </p>
            </li>
            <li>
              <h2 class="ml-2 mt-4 mb-2 font-semibold">Breaks</h2>
              <p class="indent-4">
                Federal law does not require paid vacation days, sick days, or
                holidays. Though many states require some amount of paid sick
                days.
              </p>
            </li>
            <li>
              <h2 class="ml-2 mt-4 mb-2 font-semibold">Pay frequency</h2>
              <p class="indent-4">
                It is most common to pay hourly employees once every other week.
                But most states have specific pay frequency laws, so review
                <a
                  target="_blank"
                  href="https://www.dol.gov/agencies/whd/state/payday"
                  class="text-blue-800 dark:text-blue-400 underline"
                  >this DOL table</a
                >
                to find out which payment schemes are available in your state.
              </p>
            </li>
          </ol>
        </div>

        <div id="competitive-salaries">
          <h2 class="font-bold text-2xl indent-4 italic">
            How to Find Competitive Salaries
          </h2>
          <div
            class="text-center mt-4 p-4 bg-green-200 dark:bg-green-700 border-2 border-green-300 dark:border-green-800 rounded-xl"
          >
            <p class="">
              Understanding what your employee expects to be paid is crucial,
              luckily
              <a
                target="_blank"
                href="https://www.bls.gov/bls/blswage.htm"
                class="text-blue-800 dark:text-blue-400 underline"
                >this information</a
              >
              is publically available.
            </p>
          </div>
          <p class="indent-4 mt-2">
            The percentage of your gross revenue spent on payroll can vary
            widely depending on industry, anything from 15-80% might be
            appropriate. To get an accurate picture of the going rate which your
            employee expects, you will need to do some research. The Bureau of
            Labor Statistics publishes
            <a
              target="_blank"
              href="https://www.bls.gov/bls/blswage.htm"
              class="text-blue-800 dark:text-blue-400 underline"
              >excellent figures on the average salary of each profession</a
            >
            in the U.S., which can be narrowed down by location. If this
            information isn't enough, online services such as Payscale and
            Glassdoor offer reports on salary ranges by position. This figure
            should inform the ballpark pay you offer, but considerations such as
            qualifications and aptitude will adjust this value up or down.
          </p>
        </div>

        <div id="generosity">
          <h2 class="font-bold text-2xl ml-4 italic">
            Earn Dedication with Generosity
          </h2>
          <p class="indent-4 mt-4">
            Paying above market rates can enhance employee retention and elevate
            the standard of work. This generosity fosters goodwill among your
            team, which is an invaluable asset to your company culture. Each
            time an employee leaves you are losing the resources spent
            onboarding them.
          </p>

          <p class="indent-4 mt-2">
            Don't be afraid to pay an employee more than yourself if the
            circumstances call for it. View your business as an asset from which
            you draw profit. Ultimately you benefit from the businesses' overall
            success, whereas employees are only motivated by their immediate
            compensation and recognition.
          </p>
        </div>

        <div id="alternative-compensation">
          <h2 class="font-bold text-2xl indent-4 italic">
            About Alternative Compensation Methods
          </h2>
          <p class="indent-4 mt-4">
            High wages are excellent if you can afford them, but if they aren't
            an option for your budget then entice employees with other perks.
          </p>
          <ul>
            <li>
              <h2 class="mt-4 mb-2 font-semibold">Work From Home</h2>
              <p class="indent-4">
                If the type of work can be performed from home, seriously
                consider offering work from home (WFH). Many have discovered
                during the COVID-19 quarantine that they prefer working from
                home, and can even perform better if they are alone and without
                distractions. The demand for WFH jobs greatly outweighs the
                availability, so if you can offer this it will put the
                negotiation ball in your court. Managers may be concerned that
                employees will provide less output or perform reduced quality
                work, but this can be remedied with increased check-ins and
                reviews.
              </p>
            </li>
            <li>
              <h2 class="mt-4 mb-2 font-semibold">Flexible Hours</h2>
              <p class="indent-4">
                If WFH isn't an option, flexible hours are the next best thing.
                Flexible hours can mean, earlier or later than 9-5, compressed
                10 hour shifts in a 4 day workweek, or flexible daily
                hours—where the employee may start their shift earlier or later
                each day. Allowing flexible hours will increase your potential
                pool of talent, as some people, such as parents, are unavailable
                for part of the typical workday. They will also signal that you
                encourage a healthy work-life balance.
              </p>
            </li>
            <li>
              <h2 class="mt-4 mb-2 font-semibold">Vacation & Sick Days</h2>
              <p class="indent-4">
                Everybody gets sick, and to keep your employees happy you should
                offer a minimum of 3 sick days a year. Including mental health
                days in your sick leave policy shows you prioritize their
                overall health and aligns with current workplace trends. With
                vacation days you have more leeway, but keep in mind that
                providing a healthy amount of vacation reduces the risk of
                burnout and helps with employee retention. Providing a generous
                amount of vacation—ranging from 10 to 20 paid days off,
                depending on the employee's seniority, and industry
                standards—can significantly enhance job satisfaction and
                employee retention.
              </p>
            </li>
            <li>
              <h2 class="mt-4 mb-2 font-semibold">
                Promotion Opportunities & Recognition
              </h2>
              <p class="indent-4">
                By making it clear to your employee that you will offer upwards
                mobility they will be more likely to stay. And they will work
                harder to make a good impression, when they do so, praise is the
                quickest way to your employee's heart, never miss an opportunity
                to show appreciation for a job well done.
              </p>
            </li>
            <li>
              <h2 class="mt-4 mb-2 font-semibold">
                Equity / Stock Opportunities
              </h2>
              <p class="indent-4">
                If your business is capable of it and you are short on cash,
                consider offering ownership stakes to your employee. This will
                make them directly invested in your success. But beware: it is a
                significant commitment towards them, so do not do this hastily.
              </p>
            </li>
            <li>
              <h2 class="mt-4 mb-2 font-semibold">Insurance</h2>
              <p class="indent-4">
                Offering insurance instead of a higher wage is cost effective
                since you the benefits are often tax-deductible, and the economy
                of scale will allow you to obtain a group rate cheaper than the
                employee would be able to find on their own. Insurance will
                increase your employee's satisfaction and peace of mind, making
                them more likely to stay with you. Health insurance is the most
                common but consider a comprehensive package with dental and
                vision. Employees with dependants will especially value if you
                offer life insurance. All-in-all insurance benefits will make
                your company more competitive on the job market.
              </p>
            </li>
          </ul>
        </div>

        <div id="negotiation">
          <h2 class="font-bold text-2xl indent-4 italic">
            Control the negotiation
          </h2>
          <p class="indent-4 mt-4">
            Before interviewing, calculate the value or ROI you expect from the
            new hire. You should understand the monetary value they will bring
            to your business as this will inform what it is practical to pay
            them.
          </p>
          <p class="indent-4 mt-2">
            Don't be tempted to offer a lowball salary just because they will
            accept it. They may be satisfied in the moment, but underpaying them
            will likely cause them to jump ship soon, and you'll have to find
            someone new—which can cost more in the long run in terms of rehiring
            and retraining. Conversely, don't offer an unsustainably high rate
            of pay in the rush to secure a candidate, if you won't be able to
            afford it later on. It is much easier to give a raise later on than
            a paycut.
          </p>
          <p class="indent-4 mt-2">
            Be prepared to be flexible. Start by explaining your offer,
            including the benefits and opportunities for growth. Explain how
            these benefits align with your candidates needs and aspirations.
            Next listen to their priorities and try to adjust your compensation
            package to their needs, this can make the negotiation a mutually
            beneficial agreement instead of a zero-sum game.
          </p>
        </div>

        <div id="raises">
          <h2 class="font-bold text-2xl indent-4 italic">
            Raises, Bonuses, and Adjusting to Market Trends
          </h2>
          <p class="indent-4 mt-4">
            Consider offering performance based bonuses for tasks such as making
            a sale or completing a project. Be clear in their reason, they
            should have objective criteria to inspire motivation and avoid
            feelings of favoritism. Sign-on bonuses can be useful for attacting
            exceptionally qualified candidates. A retention bonus might be
            offered if work conditions become unexpectedly difficult. Holiday or
            profit-sharing bonuses are a great way to share company success,
            reinforcing a sense of appreciation and mutual growth.
          </p>
          <p class="indent-4 mt-2">
            Market rates change; therefore, it's important to adjust annually
            for inflation and review the current going rates for jobs to ensure
            your compensation remains competitive. Inflation is usually around
            <b>3%</b> every year, so as an example, a $50,000 salary one year
            will only have the purchasing power of $48,500 the following year.
            However since inflation can fluctuate, sometimes even trending
            negative, you should check the current rates before adjusting
            compensation.
          </p>
        </div>

        <div id="tldr">
          <h2 class="font-bold text-2xl indent-4 italic">TLDR</h2>
          <ol
            class="mt-4 list-decimal p-8 pl-12 flex flex-col gap-2 bg-green-200 dark:bg-green-700 border-2 border-green-300 dark:border-green-800 rounded-xl"
          >
            <li>
              <p>Understand local laws.</p>
            </li>
            <li>
              <p>Research the going rate for the job title.</p>
            </li>
            <li>
              <p>Quantify the value you expect from your new employee.</p>
            </li>
            <li>
              <p>
                Earn their dedication by paying above the going rate and
                providing benefits where possible.
              </p>
            </li>
          </ol>
        </div>
      </div>

      <div>
        <div
          class="flex flex-row justify-end mt-4 mb-2 italic text-sm font-medium"
        >
          <router-link to="/meet-us" class="flex flex-row items-center">
            <h2>by <span class="not-italic">Thomas Huber</span></h2>
            <img
              src="/thomas-huber-small.webp"
              alt="picture of Thomas Huber"
              class="rounded-full object-cover mx-2 w-9 h-9"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

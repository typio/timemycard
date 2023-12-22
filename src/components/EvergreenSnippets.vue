<script lang="ts" setup>

const snippets = [
    {
        title: `What is a Time Card Calculator?`,
        body: `A Time Card Calculator is a tool for computing the total number
        of hours an employee has worked during a specific pay period. This calculator simplifies the process
        of totaling regular hours and overtime hours. It's an essential
        resource for small business owners, HR professionals, and employees, ensuring precision and
        efficiency in payroll processing. By inputting start and end times, users can effortlessly determine 
        their total worked hours, which is crucial for accurate wage calculations when mistakes aren't an option.
        `
    },
    {
        title: `How Does a Time Card Calculator Work?`,
        body: `A Time Card Calculator simply adds the difference between the employee's in and out times of each day.
        Our Time Card Calculator stands out with its intelligent time recognition and instant calculation features.
        It simplifies time entry by interpreting unformatted times–for instance, '9' is read as '9:00', 
        and '232' as '2:32'. The calculator effortlessly handles both 12-hour and 24-hour formats, automatically 
        adjusting inputs like '1432' in 12h to '2:32'. This flexibility makes it perfect for diverse work environments. 
        Switch between 12h and 24h views anytime, with in/out times instantly converted, ensuring a smooth and error-free 
        payroll calculation experience for all types of users.
        `
    },
    {
        title: `Benefits of Using an Online Time Card Calculator`,
        body: `An Online Time Card Calculator is a game-changer in payroll management. It guarantees accurate time tracking 
        and simplifies wage calculations, especially beneficial for businesses juggling multiple employee schedules. 
        This tool reduces manual errors, enhances productivity by automating tedious calculations, and ensures compliance
        with labor laws for overtime and breaks. Its accessibility and user-friendliness make it an indispensable resource
        for any business looking to streamline their payroll processes.
        `
    },
    {
        title: `Who Can Benefit from a Time Card Calculator?`,
        body: `Small business owners can manage payroll more efficiently, freelancers can track project hours accurately, 
        HR departments can streamline employee timekeeping, and employees can ensure their work hours are correctly recorded. 
        This tool is a valuable asset for anyone needing a reliable and straightforward method to calculate work hours and manage 
        payroll effectively. Time Card Calculators are versatile tools benefiting a wide range of users.
        `
    },
    {
        title: `Features of Our Time Card Calculator`,
        body: `Our Time Card Calculator is designed with user convenience in mind. It features easy printing options, 
        customizable formatting, and a variety of calculation settings to suit different business needs. Whether you're 
        calculating regular hours, overtime, or adjusting for breaks, our tool offers flexibility and precision. Additionally, 
        its intuitive interface makes it simple for users of all skill levels to navigate and utilize effectively for their payroll 
        needs.
        `
    },
    {
        title: `Guides and Best Practices`,
        body: `To ensure optimal use of the Time Card Calculator, we recommend the following best practices:
        </br></br><b>1. Double-Check Entries</b>: Verify the accuracy of your in/out times to prevent errors.
        </br><b>2. Double-Check Results</b>: Verify the calculations produced by this website, just in case.
        </br><b>3. Understand Overtime Regulations</b>: Familiarize yourself with local labor laws to correctly calculate overtime. 
        </br><b>4. Utilize Break Time Features</b>: Accurately log break times for precise total work hour calculations. 
        </br><b>5. Leverage Printing Capabilities</b>: Regularly print time cards for physical records and backup. 
        </br></br>These guidelines will help maximize the efficiency and accuracy of your time tracking and payroll management processes.
        `
    },
    {
        title: `Frequently Asked Questions (FAQ)`,
        body: `Here is a replete list of answers to the questions you might have. If this doesn't answer your question, shoot us an email!
        </br></br><b>Q: How do I input time data into the calculator?</b>
        </br>A: Enter the start and end times for each work period, including any break times. The calculator will automatically compute the total hours.

        </br></br><b>Q: Can the calculator handle different time formats?</b>
        </br>A: Yes, our calculator can process both 12-hour and 24-hour time formats, automatically adjusting to your preference.

        </br></br><b>Q: Can this tool accurately calculate overtime hours?</b>
        </br>A: Yes, our Time Card Calculator is equipped with robust features to accurately calculate both regular 
        and overtime hours. It currently supports the standard overtime scheme, which is based on exceeding 8 hours per day. 
        We understand the diversity of overtime regulations, and we are actively working to incorporate additional overtime 
        calculation options. This upcoming feature will cater to various local laws and work patterns, ensuring our calculator 
        meets a wider range of needs. Stay tuned for updates on this enhancement!

        </br></br><b>Q: How secure is my data when using this calculator?</b>
        </br>A: We prioritize user data security. None of your time card data leaves your computer, ensuring your information 
        stays fully confidential.

        </br></br><b>Q: Can I print the calculated time card data?</b>
        </br>A: Yes, the calculator offers easy printing options for your convenience and record-keeping purposes.

        </br></br><b>Q: Is there a feature for tracking break times?</b>
        </br>A: Yes, the calculator allows you to input break times, which are then subtracted from the total work hours for accurate calculations.
        `
    }
]
</script>

<template>
    <div v-for="(snippet, i) in snippets">
        <h3 class="text-left mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{{ snippet.title }}</h3>
        <p class="text-left mt-2 text-base font-medium  text-zinc-700 dark:text-zinc-300 first-letter:text-[28px] first-letter:leading-[24px]  first-letter:text-zinc-900 dark:first-letter:text-zinc-100
  first-letter:mr-1 first-letter:float-left" v-html="snippet.body">
        </p>
        <div class="my-4 h-1 border-b-[1px] border-zinc-300 dark:border-zinc-700" v-if="i < snippets.length - 1" />
    </div>
</template>
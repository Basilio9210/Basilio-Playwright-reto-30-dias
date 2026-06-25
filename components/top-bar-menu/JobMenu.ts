import { Locator, Page } from "@playwright/test";

export class JobMenu {

    readonly page: Page
    readonly job: Locator
    readonly jobTitleOption
    readonly payGradesOption

    constructor(page: Page) {

        this.page = page
        this.job = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job')
        this.jobTitleOption = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Job Titles')
        this.payGradesOption = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Pay Grades')
    }

    async clickOnJob() {
        await this.job.click()
    }

    async clickOnJobTitles() {
        this.clickOnJob()
        await this.jobTitleOption.click()
    }

    async clickOnPayGrades() {
        this.clickOnJob()
        await this.payGradesOption.click()
    }

}
const core = require("@actions/core")
const github = require("@actions/github")

try {
  async function run() {
    const github_token = core.getInput("GITHUB_TOKEN")

    const octokit = github.getOctokit(github_token)


    const { data: milestones } = await octokit.rest.issues.listMilestones({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo
    })

    const maxMilestoneNumber = Math.max(...milestones.map(m => m.number))

    const currentDate = new Date()

    const latestMilestone = milestones.find(m => m.number === maxMilestoneNumber)
    const currentDueDate = new Date(latestMilestone.due_on)
    const adjustHourDate = new Date(new Date(currentDueDate).setHours(currentDueDate.getHours() + 2))
    const nextDueDate = new Date(adjustHourDate).setDate(adjustHourDate.getDate() + 14)
    let nextDueYear = new Date(nextDueDate).getFullYear().toString().substring(2)

    let currentDueDateMonth = currentDueDate.getMonth()
    let nextDueDateMonth = new Date(nextDueDate).getMonth()

    const diffDays = Math.ceil(Math.abs(nextDueDate - currentDate) / (1000*60 * 60 * 24))
    if (diffDays < 20) {
      if (latestMilestone.title.includes("-a") && currentDueDateMonth === nextDueDateMonth) {
        await octokit.rest.issues.createMilestone({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          title: "Sprint (" + (nextDueDateMonth + 1).toString() + "/" + nextDueYear + ")-b",
          due_on: new Date(nextDueDate).toISOString(),
        })
      } else if (latestMilestone.title.includes("-b") && currentDueDateMonth === nextDueDateMonth) {
        await octokit.rest.issues.createMilestone({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          title: "Sprint (" + (nextDueDateMonth + 1).toString() + "/" + nextDueYear + ")-c",
          due_on: new Date(nextDueDate).toISOString(),
        })
      } else if (currentDueDateMonth !== nextDueDateMonth) {
        await octokit.rest.issues.createMilestone({
          owner: github.context.repo.owner,
          repo: github.context.repo.repo,
          title: "Sprint (" + (nextDueDateMonth + 1).toString() + "/" + nextDueYear + ")-a",
          due_on: new Date(nextDueDate).toISOString(),
        })
      }
    }
  }
  run()
} catch (error) {
  core.setFailed(error.message)
}

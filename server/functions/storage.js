const lighthouse = require("@lighthouse-web3/sdk")
require("dotenv").config()

const API_KEY = process.env.LIGHTHOUSE_KEY

const uploadFile = async (path) => {
    // console.log(`Filepath: ${path}`)
    const response = await lighthouse.upload(path, API_KEY)
    // console.log(response)
    return response
}

module.exports = {
    uploadFile
}

// uploadFile('/workspaces/scaling-ethereum/server/uploads/signed-1713629505783-Heimdall Gantt.png')


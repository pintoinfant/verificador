const { http, createWalletClient } = require("viem")
const { arbitrumSepolia } = require("viem/chains")
const { privateKeyToAccount } = require("viem/accounts")
const { contractDetails } = require('./contractDetails')
require("dotenv").config()

const account = privateKeyToAccount(process.env.PRIVATE_KEY)

const client = createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http()
})

const createAttestation = async (to, uri, application, title) => {
    const hash = await client.writeContract({
        address: contractDetails.address,
        abi: contractDetails.abi,
        functionName: 'safeMint',
        args: [
            to,
            uri,
            application,
            title
        ]
    })
    console.log(hash)
    return hash;
}

module.exports = {
    createAttestation
}

// createAttestation(
//     '0xd69a4dd0dfb261a8EF37F45925491C077EF1dBFb',
//     'QmYxT4LnK8sqLupjbS6eRvu1si7Ly2wFQAqFebxhWntcf6',
//     "BAYC",
//     "Bored Ape Yacht Club"
// )
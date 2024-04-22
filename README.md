
## Verificador
Deep-fake verification platform using C2PA protocol to verify media file's metadata

## Description
This project allows users to upload media files which would then be injected with a C2PA compliant cryptographic hash and other relevant metadata about the origin of the video.
The second major feature on the platform allows users to upload any media file and check it's metadata to see the source and detect a deep fake.

## How it works?
Our dApp uses Nextjs to provide users with an upload and verify module. The backend uses an express.js API to make a request to a 'C2PA Metadata Generation Tool' to generate the metadata and embed it into the file. The file is also uploaded to IPFS using 'Lighthouse.storage' After this, the file is minted as a ERC-721 NFT and airdropped to the user. We then make an Attestation on the 'Arbitrum Sepolia' chain using 'Sign Protocol.'

## Contract Details
Arbitrum Sepolia Contract Address - 0xf609aa4d98c1f8bf6ef3f1b1dcdf22be36eed5e4

## Sign Protocol
Schema Link - https://testnet-scan.sign.global/schema/onchain_evm_421614_0x1c

// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

contract Verificador is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    ISP public spInstance;
    uint64 public schemaId;

    struct SchemaData {
        string application;
        address owner;
        string title;
    }

    constructor() ERC721("Verificador", "VDR") Ownable(_msgSender()) {}

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://cloudflare-ipfs.com/ipfs/";
    }

    function safeMint(
        address to,
        string memory uri,
        string memory application,
        string memory title
    ) public onlyOwner returns (uint64) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encode(to);

        SchemaData memory schemaData = SchemaData({
            application: application,
            owner: to,
            title: title
        });

        bytes memory data = abi.encode(schemaData);

        Attestation memory attestation = Attestation({
            schemaId: schemaId,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: data
        });
        uint64 attestationId = spInstance.attest(attestation, "", "", "");
        return attestationId;
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

const metadataGenerator = (claimGenerator, mimeType, filename, description) => {
    return {
        "claim_generator": claimGenerator,
        "format": mimeType,
        "title": filename,
        "label": description,
        "assertions": [
            {
                "label": "c2pa.actions",
                "data": {
                    "actions": [
                        {
                            "action": "c2pa.created"
                        }
                    ]
                }
            }
        ]
    }
}

module.exports = {
    metadataGenerator
}
import { ethers } from "hardhat";

async function main() {
  const verificador = await ethers.deployContract("Verificador", []);

  await verificador.waitForDeployment();
  let address = await verificador.getAddress();
  console.log("Verificador deployed to:", address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

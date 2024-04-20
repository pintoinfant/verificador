import { ethers } from "hardhat";

async function main() {
  const verificador = await ethers.deployContract("Verificador", []);

  await verificador.waitForDeployment();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

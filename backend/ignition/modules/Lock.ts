import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";
import {writeContractAddress} from "../../helper/contractsJsonHelper";
import {network} from "hardhat";

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI: bigint = 1_000_000_000n;

/**
 * デプロイスクリプト
 */
const LockModule = buildModule("LockModule", (m) => {
  console.log(` ======================= start ========================= `);
  // デプロイに必要なパラメータ
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);
  // コントラクトをデプロイ
  const lock: any = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "Lock",
    value: lock.id,
    network: network.name,
  });

  console.log(` ======================= end ========================= `);
  return {lock};
});

export default LockModule;

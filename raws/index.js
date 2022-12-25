const ipfs = "QmUDL68tGmnMNM6NBwamkHTNV3AV6fpCXmnye3Y7L1R1kg";
const count = 37;
const { addNewNFT } = require("../server/db/services/nft.services");

const run = async () => {
  let dataArray = [];
  for (let i = 1; i < count + 1; i++) {
    const metadata = {
      tokenId: i,
      name: `Pixat #${i}`,
      ipfs: `ipfs://${ipfs}/nft${i}.jpg`,
      desc: "pixat is the adorable pixel cat profile picture!",
      power: Math.floor(Math.random() * 9123048) % 1000,
    };

    // const asset = {
    //   assetName: metadata.name,
    //   assetQuantity: "1",
    //   metadata: metadata,
    //   label: "721",
    // };

    dataArray.push(metadata);
  }
  await addNewNFT(dataArray);

  console.log(dataArray);
};

run();

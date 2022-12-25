const express = require("express");
const bodyparser = require("body-parser");
require("./database");
const cors = require("cors");
const app = express();
const port = 3022;
const {
  getAllUnMintedNFTs,
  markAsMinted,
  getNFTById,
} = require("./services/nft.services");
const {
  addNewOgMeta,
  updateSignedTx,
  updateSubmitted,
  getOgMetaByTokenId,
} = require("./services/txMeta.service");

app.use(cors({ origin: "*" }));
app.use(bodyparser.json());

app.get("/unminted", async (req, res) => {
  const nfts = await getAllUnMintedNFTs();
  res.status(201).json({ result: "OK", data: nfts });
});

app.get("/mint/:tokenId", async (req, res) => {
  const { tokenId } = req.params;
  const nft = await getNFTById(tokenId);
  if (nft) {
    res.status(200).json({
      result: "OK",
      data: nft,
    });
  } else {
    res.status(403).json({ result: "Failed" });
  }
});

app.get("/og/:tokenId", async (req, res) => {
  const { tokenId } = req.params;
  const ogMeta = await getOgMetaByTokenId(tokenId);
  if (ogMeta) {
    res.status(200).json({
      result: "OK",
      data: ogMeta,
    });
  } else {
    res.status(403).json({ result: "Failed" });
  }
});

app.put("/mkMinted/:tokenId/:minter", async (req, res) => {
  const { tokenId, minter } = req.params;
  const result = await markAsMinted(tokenId, minter);
  if (result) {
    res.status(200).json({ result: "OK" });
  } else {
    res.status(403).json({ result: "failed" });
  }
});

app.post("/newMeta", async (req, res) => {
  const { tokenId, minter, ogMeta, maskedMeta } = req.body;
  await addNewOgMeta(tokenId, minter, ogMeta, maskedMeta);
  res.status(201).json({ result: "OK" });
});

app.put("/signed/:tokenId", async (req, res) => {
  const { tokenId } = req.params;
  const result = await updateSignedTx(tokenId);
  result
    ? res.status(200).json({ result: "OK" })
    : res.status(403).json({ result: "Failed" });
});
app.put("/minted/:tokenId", async (req, res) => {
  const { tokenId } = req.params;
  const result = await updateSubmitted(tokenId);
  result
    ? res.status(200).json({ result: "OK" })
    : res.status(403).json({ result: "Failed" });
});

app.listen(port, () => console.log(`db: connected on port  ${port}`));

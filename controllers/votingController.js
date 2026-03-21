const User = require('../models/User');
const BlockchainData = require('../models/BlockchainData');
const Block = require('../utils/Block');
const Blockchain = require('../utils/Blockchain');

// Initialize blockchain
let blockchain = new Blockchain();

// Load blockchain from database
const loadBlockchain = async () => {
  try {
    const data = await BlockchainData.findOne();
    if (data && data.chain.length > 0) {
      blockchain.chain = data.chain.map(blockData => {
        const block = new Block(
          blockData.index,
          blockData.timestamp,
          blockData.data,
          blockData.previousHash
        );
        block.hash = blockData.hash;
        block.nonce = blockData.nonce;
        return block;
      });
      console.log('✅ Blockchain loaded from database');
    }
  } catch (error) {
    console.error('Error loading blockchain:', error);
  }
};

// Save blockchain to database
const saveBlockchain = async () => {
  try {
    await BlockchainData.findOneAndUpdate(
      {},
      { chain: blockchain.chain, lastUpdated: new Date() },
      { upsert: true, new: true }
    );
  } catch (error) {
    console.error('Error saving blockchain:', error);
  }
};

// Initialize on startup
loadBlockchain();

// Cast a vote
exports.castVote = async (req, res) => {
  try {
    const { candidate } = req.body;
    const user = req.user;

    // Check if user already voted
    if (user.hasVoted) {
      return res.status(400).json({ error: 'You have already voted' });
    }

    // Create vote data
    const voteData = {
      voterId: user.voterId,
      candidate: candidate,
      timestamp: new Date().toISOString()
    };

    // Create new block
    const newBlock = new Block(
      blockchain.chain.length,
      new Date().toISOString(),
      voteData,
      blockchain.getLatestBlock().hash
    );

    // Add block to blockchain
    blockchain.addBlock(newBlock);

    // Update user
    user.hasVoted = true;
    user.votedAt = new Date();
    user.blockIndex = newBlock.index;
    await user.save();

    // Save blockchain to database
    await saveBlockchain();

    res.json({
      message: 'Vote recorded successfully on blockchain',
      blockIndex: newBlock.index,
      blockHash: newBlock.hash
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get election results
exports.getResults = async (req, res) => {
  try {
    const results = blockchain.getResults();
    const totalVotes = Object.values(results).reduce((a, b) => a + b, 0);

    res.json({
      results,
      totalVotes,
      isChainValid: blockchain.isChainValid()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get entire blockchain
exports.getBlockchain = async (req, res) => {
  try {
    res.json({
      chain: blockchain.chain,
      length: blockchain.chain.length,
      isValid: blockchain.isChainValid()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Validate blockchain
exports.validateChain = async (req, res) => {
  try {
    const isValid = blockchain.isChainValid();
    res.json({
      isValid,
      message: isValid ? 'Blockchain is valid' : 'Blockchain has been tampered with'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
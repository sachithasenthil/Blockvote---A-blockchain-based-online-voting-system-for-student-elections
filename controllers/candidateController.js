const Candidate = require('../models/Candidate');

// Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({ isActive: true });
    res.json({ candidates });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new candidate (Admin only)
exports.addCandidate = async (req, res) => {
  try {
    const { candidateId, name, party, slogan, imageUrl } = req.body;

    const candidate = new Candidate({
      candidateId,
      name,
      party,
      slogan,
      imageUrl
    });

    await candidate.save();
    res.status(201).json({ message: 'Candidate added successfully', candidate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
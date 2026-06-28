const Letter = require('../models/Letter');
const { Op } = require('sequelize');

const getAllLetters = async (req, res) => {
  try {
    const { school_id, type, status } = req.query;
    let where = {};

    if (school_id) where.school_id = school_id;
    if (type) where.type = type;
    if (status) where.status = status;

    const letters = await Letter.findAll({
      where,
      order: [['date', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Letters retrieved successfully',
      data: letters,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve letters',
      error: error.message,
    });
  }
};

const getLetterById = async (req, res) => {
  try {
    const letter = await Letter.findByPk(req.params.id);

    if (!letter) {
      return res.status(404).json({
        success: false,
        message: 'Letter not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Letter retrieved successfully',
      data: letter,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve letter',
      error: error.message,
    });
  }
};

const createLetter = async (req, res) => {
  try {
    const letter = await Letter.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Letter created successfully',
      data: letter,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create letter',
      error: error.message,
    });
  }
};

const updateLetter = async (req, res) => {
  try {
    const letter = await Letter.findByPk(req.params.id);

    if (!letter) {
      return res.status(404).json({
        success: false,
        message: 'Letter not found',
      });
    }

    await letter.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Letter updated successfully',
      data: letter,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update letter',
      error: error.message,
    });
  }
};

const deleteLetter = async (req, res) => {
  try {
    const letter = await Letter.findByPk(req.params.id);

    if (!letter) {
      return res.status(404).json({
        success: false,
        message: 'Letter not found',
      });
    }

    await letter.destroy();

    return res.status(200).json({
      success: true,
      message: 'Letter deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete letter',
      error: error.message,
    });
  }
};

const updateLetterStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const letter = await Letter.findByPk(req.params.id);

    if (!letter) {
      return res.status(404).json({
        success: false,
        message: 'Letter not found',
      });
    }

    await letter.update({ status });

    return res.status(200).json({
      success: true,
      message: 'Letter status updated successfully',
      data: letter,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update letter status',
      error: error.message,
    });
  }
};

const getIncomingLetters = async (req, res) => {
  try {
    const { school_id } = req.query;
    let where = { type: 'incoming' };
    if (school_id) where.school_id = school_id;

    const letters = await Letter.findAll({
      where,
      order: [['date', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Incoming letters retrieved successfully',
      data: letters,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve incoming letters',
      error: error.message,
    });
  }
};

const getOutgoingLetters = async (req, res) => {
  try {
    const { school_id } = req.query;
    let where = { type: 'outgoing' };
    if (school_id) where.school_id = school_id;

    const letters = await Letter.findAll({
      where,
      order: [['date', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Outgoing letters retrieved successfully',
      data: letters,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve outgoing letters',
      error: error.message,
    });
  }
};

module.exports = {
  getAllLetters,
  getLetterById,
  createLetter,
  updateLetter,
  deleteLetter,
  updateLetterStatus,
  getIncomingLetters,
  getOutgoingLetters,
};

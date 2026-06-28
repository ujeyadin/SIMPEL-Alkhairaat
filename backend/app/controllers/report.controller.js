const User = require('../models/User');
const School = require('../models/School');
const Finance = require('../models/Finance');
const Asset = require('../models/Asset');
const Visitor = require('../models/Visitor');
const Letter = require('../models/Letter');

const getDashboardData = async (req, res) => {
  try {
    const totalSchools = await School.count();
    const totalUsers = await User.count();
    const totalAssets = await Asset.count();
    const totalVisitors = await Visitor.count();
    const totalLetters = await Letter.count();

    return res.status(200).json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data: {
        total_schools: totalSchools,
        total_users: totalUsers,
        total_assets: totalAssets,
        total_visitors: totalVisitors,
        total_letters: totalLetters,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard data',
      error: error.message,
    });
  }
};

const getFinanceSummary = async (req, res) => {
  try {
    const finances = await Finance.findAll();
    const income = finances
      .filter(f => f.type === 'income')
      .reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);
    const expense = finances
      .filter(f => f.type === 'expense')
      .reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);

    return res.status(200).json({
      success: true,
      message: 'Finance summary retrieved successfully',
      data: { total_income: income, total_expense: expense, balance: income - expense },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve finance summary',
      error: error.message,
    });
  }
};

const getSchoolProfile = async (req, res) => {
  try {
    const { school_id } = req.query;
    const school = await School.findByPk(school_id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'School profile retrieved successfully',
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve school profile',
      error: error.message,
    });
  }
};

const getAssetsSummary = async (req, res) => {
  try {
    const totalAssets = await Asset.count();
    const activeAssets = await Asset.count({ where: { status: 'active' } });
    const inactiveAssets = await Asset.count({ where: { status: 'inactive' } });

    return res.status(200).json({
      success: true,
      message: 'Assets summary retrieved successfully',
      data: {
        total_assets: totalAssets,
        active_assets: activeAssets,
        inactive_assets: inactiveAssets,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve assets summary',
      error: error.message,
    });
  }
};

const getLettersSummary = async (req, res) => {
  try {
    const totalLetters = await Letter.count();
    const incomingLetters = await Letter.count({ where: { type: 'incoming' } });
    const outgoingLetters = await Letter.count({ where: { type: 'outgoing' } });

    return res.status(200).json({
      success: true,
      message: 'Letters summary retrieved successfully',
      data: {
        total_letters: totalLetters,
        incoming_letters: incomingLetters,
        outgoing_letters: outgoingLetters,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve letters summary',
      error: error.message,
    });
  }
};

const exportFinanceReport = async (req, res) => {
  try {
    const finances = await Finance.findAll();
    return res.status(200).json({
      success: true,
      message: 'Finance report exported successfully',
      data: finances,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to export finance report',
      error: error.message,
    });
  }
};

const exportAssetReport = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    return res.status(200).json({
      success: true,
      message: 'Asset report exported successfully',
      data: assets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to export asset report',
      error: error.message,
    });
  }
};

const exportVisitorReport = async (req, res) => {
  try {
    const visitors = await Visitor.findAll();
    return res.status(200).json({
      success: true,
      message: 'Visitor report exported successfully',
      data: visitors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to export visitor report',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
  getFinanceSummary,
  getSchoolProfile,
  getAssetsSummary,
  getLettersSummary,
  exportFinanceReport,
  exportAssetReport,
  exportVisitorReport,
};

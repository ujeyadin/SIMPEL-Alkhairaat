const Finance = require('../models/Finance');
const { Op } = require('sequelize');

const getAllFinances = async (req, res) => {
  try {
    const { school_id, type, start_date, end_date } = req.query;
    let where = {};

    if (school_id) where.school_id = school_id;
    if (type) where.type = type;
    if (start_date || end_date) {
      where.transaction_date = {};
      if (start_date) where.transaction_date[Op.gte] = new Date(start_date);
      if (end_date) where.transaction_date[Op.lte] = new Date(end_date);
    }

    const finances = await Finance.findAll({
      where,
      order: [['transaction_date', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Finances retrieved successfully',
      data: finances,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve finances',
      error: error.message,
    });
  }
};

const getFinanceById = async (req, res) => {
  try {
    const finance = await Finance.findByPk(req.params.id);

    if (!finance) {
      return res.status(404).json({
        success: false,
        message: 'Finance record not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Finance retrieved successfully',
      data: finance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve finance',
      error: error.message,
    });
  }
};

const createFinance = async (req, res) => {
  try {
    const finance = await Finance.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Finance record created successfully',
      data: finance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create finance record',
      error: error.message,
    });
  }
};

const updateFinance = async (req, res) => {
  try {
    const finance = await Finance.findByPk(req.params.id);

    if (!finance) {
      return res.status(404).json({
        success: false,
        message: 'Finance record not found',
      });
    }

    await finance.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Finance record updated successfully',
      data: finance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update finance record',
      error: error.message,
    });
  }
};

const deleteFinance = async (req, res) => {
  try {
    const finance = await Finance.findByPk(req.params.id);

    if (!finance) {
      return res.status(404).json({
        success: false,
        message: 'Finance record not found',
      });
    }

    await finance.destroy();

    return res.status(200).json({
      success: true,
      message: 'Finance record deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete finance record',
      error: error.message,
    });
  }
};

const getFinanceSummary = async (req, res) => {
  try {
    const { school_id, month, year } = req.query;
    let where = {};

    if (school_id) where.school_id = school_id;

    const finances = await Finance.findAll({ where });

    const income = finances
      .filter(f => f.type === 'income')
      .reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);
    const expense = finances
      .filter(f => f.type === 'expense')
      .reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);

    return res.status(200).json({
      success: true,
      message: 'Finance summary retrieved successfully',
      data: {
        total_income: income,
        total_expense: expense,
        balance: income - expense,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve finance summary',
      error: error.message,
    });
  }
};

const getMonthlyReport = async (req, res) => {
  try {
    const { school_id, year } = req.query;
    let where = {};

    if (school_id) where.school_id = school_id;

    const finances = await Finance.findAll({ where });

    const monthly = {};
    finances.forEach(f => {
      const month = new Date(f.transaction_date).toLocaleString('default', { month: 'long' });
      if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
      if (f.type === 'income') monthly[month].income += parseFloat(f.amount || 0);
      else monthly[month].expense += parseFloat(f.amount || 0);
    });

    return res.status(200).json({
      success: true,
      message: 'Monthly report retrieved successfully',
      data: monthly,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve monthly report',
      error: error.message,
    });
  }
};

module.exports = {
  getAllFinances,
  getFinanceById,
  createFinance,
  updateFinance,
  deleteFinance,
  getFinanceSummary,
  getMonthlyReport,
};

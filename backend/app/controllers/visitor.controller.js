const Visitor = require('../models/Visitor');
const { Op } = require('sequelize');

const getAllVisitors = async (req, res) => {
  try {
    const { school_id, category, date } = req.query;
    let where = {};

    if (school_id) where.school_id = school_id;
    if (category) where.visitor_category = category;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      where.check_in_time = { [Op.between]: [startDate, endDate] };
    }

    const visitors = await Visitor.findAll({
      where,
      order: [['check_in_time', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Visitors retrieved successfully',
      data: visitors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve visitors',
      error: error.message,
    });
  }
};

const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Visitor retrieved successfully',
      data: visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve visitor',
      error: error.message,
    });
  }
};

const createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Visitor created successfully',
      data: visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create visitor',
      error: error.message,
    });
  }
};

const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found',
      });
    }

    await visitor.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Visitor updated successfully',
      data: visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update visitor',
      error: error.message,
    });
  }
};

const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found',
      });
    }

    await visitor.destroy();

    return res.status(200).json({
      success: true,
      message: 'Visitor deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete visitor',
      error: error.message,
    });
  }
};

const checkoutVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found',
      });
    }

    await visitor.update({ check_out_time: new Date() });

    return res.status(200).json({
      success: true,
      message: 'Visitor checked out successfully',
      data: visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to checkout visitor',
      error: error.message,
    });
  }
};

const getVisitorsByCategory = async (req, res) => {
  try {
    const { school_id } = req.query;
    let where = {};
    if (school_id) where.school_id = school_id;

    const visitors = await Visitor.findAll({
      where,
      attributes: ['visitor_category'],
    });

    const grouped = {};
    visitors.forEach(v => {
      grouped[v.visitor_category] = (grouped[v.visitor_category] || 0) + 1;
    });

    return res.status(200).json({
      success: true,
      message: 'Visitors by category retrieved successfully',
      data: grouped,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve visitors by category',
      error: error.message,
    });
  }
};

module.exports = {
  getAllVisitors,
  getVisitorById,
  createVisitor,
  updateVisitor,
  deleteVisitor,
  checkoutVisitor,
  getVisitorsByCategory,
};

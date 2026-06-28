const Asset = require('../models/Asset');
const { Op } = require('sequelize');

const getAllAssets = async (req, res) => {
  try {
    const { school_id, category, status } = req.query;
    let where = {};

    if (school_id) where.school_id = school_id;
    if (category) where.category = category;
    if (status) where.status = status;

    const assets = await Asset.findAll({
      where,
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Assets retrieved successfully',
      data: assets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve assets',
      error: error.message,
    });
  }
};

const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Asset retrieved successfully',
      data: asset,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve asset',
      error: error.message,
    });
  }
};

const createAsset = async (req, res) => {
  try {
    const asset = await Asset.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Asset created successfully',
      data: asset,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create asset',
      error: error.message,
    });
  }
};

const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found',
      });
    }

    await asset.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'Asset updated successfully',
      data: asset,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update asset',
      error: error.message,
    });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found',
      });
    }

    await asset.destroy();

    return res.status(200).json({
      success: true,
      message: 'Asset deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete asset',
      error: error.message,
    });
  }
};

const getAssetsByCategory = async (req, res) => {
  try {
    const { school_id } = req.query;
    let where = {};
    if (school_id) where.school_id = school_id;

    const assets = await Asset.findAll({
      where,
      attributes: ['category', 'status'],
    });

    const grouped = {};
    assets.forEach(a => {
      if (!grouped[a.category]) grouped[a.category] = { count: 0, status: {} };
      grouped[a.category].count += 1;
      grouped[a.category].status[a.status] = (grouped[a.category].status[a.status] || 0) + 1;
    });

    return res.status(200).json({
      success: true,
      message: 'Assets by category retrieved successfully',
      data: grouped,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve assets by category',
      error: error.message,
    });
  }
};

const getAssetsByLocation = async (req, res) => {
  try {
    const { school_id } = req.query;
    let where = {};
    if (school_id) where.school_id = school_id;

    const assets = await Asset.findAll({
      where,
      attributes: ['location', 'name'],
    });

    const grouped = {};
    assets.forEach(a => {
      if (!grouped[a.location]) grouped[a.location] = [];
      grouped[a.location].push(a.name);
    });

    return res.status(200).json({
      success: true,
      message: 'Assets by location retrieved successfully',
      data: grouped,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve assets by location',
      error: error.message,
    });
  }
};

module.exports = {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  getAssetsByCategory,
  getAssetsByLocation,
};

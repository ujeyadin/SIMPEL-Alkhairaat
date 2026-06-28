const School = require('../models/School');

const getAllSchools = async (req, res) => {
  try {
    const schools = await School.findAll({
      order: [['name', 'ASC']],
    });

    return res.status(200).json({
      success: true,
      message: 'Schools retrieved successfully',
      data: schools,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve schools',
      error: error.message,
    });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'School retrieved successfully',
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve school',
      error: error.message,
    });
  }
};

const createSchool = async (req, res) => {
  try {
    const { name, code, level, province, district, sub_district, address, phone, email, principal_name } = req.body;

    const school = await School.create({
      name,
      code,
      level,
      province,
      district,
      sub_district,
      address,
      phone,
      email,
      principal_name,
    });

    return res.status(201).json({
      success: true,
      message: 'School created successfully',
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create school',
      error: error.message,
    });
  }
};

const updateSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    await school.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'School updated successfully',
      data: school,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update school',
      error: error.message,
    });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    await school.destroy();

    return res.status(200).json({
      success: true,
      message: 'School deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete school',
      error: error.message,
    });
  }
};

const getSchoolStatistics = async (req, res) => {
  try {
    const school = await School.findByPk(req.params.id);

    if (!school) {
      return res.status(404).json({
        success: false,
        message: 'School not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'School statistics retrieved successfully',
      data: {
        school_name: school.name,
        student_count: school.student_count,
        teacher_count: school.teacher_count,
        level: school.level,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve school statistics',
      error: error.message,
    });
  }
};

module.exports = {
  getAllSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool,
  getSchoolStatistics,
};

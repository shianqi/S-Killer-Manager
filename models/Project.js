/**
 * Created by killer on 2017/2/12.
 */
const mongoose = require('mongoose')
const ProjectSchemas = require('../schemas/ProjectSchemas')

const Project = mongoose.models('ProjectSchemas',ProjectSchemas)

module.exports = Project

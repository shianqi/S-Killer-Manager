/**
 * Created by killer on 2017/2/12.
 */
let mongoose = require('mongoose');
let ProjectSchemas = require('../schemas/ProjectSchemas');

let Project = mongoose.models('ProjectSchemas',ProjectSchemas);

module.exports = Project;
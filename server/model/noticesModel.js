const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    pdfUrl: {
      type: String,
      required: true,
    },
    advocateName: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    taluka: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    cityLimit: {
      type: Boolean,
      default: false,
    },
    gatNo: {
      type: Number,
      required: true,
    },
    bhumapanNo: {
      type: Number,
      required: true,
    },
    citySurveyNo: {
      type: Number,
      required: true,
    },
    plotNo: {
      type: Number,
      required: true,
    },
    publish: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);

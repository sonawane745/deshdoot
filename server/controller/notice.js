const Notice = require("../model/noticesModel");

exports.addNotice = async (req, res) => {
  try {
    const {
      pdfUrl,
      district,
      taluka,
      village,
      gatNo,
      bhumapanNo,
      citySurveyNo,
      plotNo,
      advocateName,
    } = req.body;

    const notice = new Notice({
      pdfUrl,
      district,
      taluka,
      village,
      gatNo,
      bhumapanNo,
      citySurveyNo,
      plotNo,
      advocateName,
    });
    await notice.save();

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.getAllNotice = async (req, res) => {
  try {
    const notice = await Notice.find();
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.getSingleNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findById(id);
    
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    await Notice.findByIdAndDelete(id);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      pdfUrl,
      district,
      taluka,
      village,
      gatNo,
      bhumapanNo,
      citySurveyNo,
      plotNo,
      advocateName,
    } = req.body;
    const data = {
      pdfUrl,
      district,
      taluka,
      village,
      gatNo,
      bhumapanNo,
      citySurveyNo,
      plotNo,
      advocateName,
    };
    const notice = await Notice.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.getByAdvocate = async (req, res) => {
  try {
    const { advocateName } = req.body;
    const notice = await Notice.find({ advocateName });
    if (notice.length === 0) {
        res.status(201).json({ success: true, message:"No Notices Found" });
    }
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.getByAddress = async (req, res) => {
  try {
    const { district, taluka, village } = req.body;
    const notice = await Notice.find({
      $or: [{ district }, { taluka }, { village }],
    });
    if (notice.length === 0) {
        res.status(201).json({ success: true, message:"No Notices Found" });
    }
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.getByLand = async (req, res) => {
  try {
    const { gatNo, bhumapanNo, citySurveyNo, plotNo } = req.body;
    const notice = await Notice.find({
      $or: [{ gatNo }, { bhumapanNo }, { citySurveyNo }, { plotNo }],
    });
    if (notice.length === 0) {
        res.status(201).json({ success: true, message:"No Notices Found" });
    }
        
    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// exports.getByDate = async (req, res) => {
//   try {
//     let firstDate;
   
//     const notice = await Notice.find({"createdAt": new Date(firstDate).toISOString()}
     
//     );
    
//     res.status(201).json({ success: true, notice });
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };

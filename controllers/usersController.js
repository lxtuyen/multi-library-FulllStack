import User from '../models/User.js';

export const createrUser = async (req, res) => {

  const newUser = new User(req.body);
 
  try {
    const savedUser = await newUser.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully created",
        data: savedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to created try again" });
  }
};
/* updateUser */
export const updateUser = async(req,res)=>{

  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(id, {
      $set: req.body,
    }, {new: true});

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully updated",
        data: updateUser,
      });
  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: "failed to update" });
  }
}
/*deleteUser */
export const deleteUser = async(req,res)=>{
  const id = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully delete",
      });
  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: "failed to delete" });
  }
}
/* get All User */
export const getAllUser = async(req,res)=>{

  try {
    const users = await User.find({}) 
    res
      .status(200)
      .json({
        success: true,
        message: "Successful",
        data: users,
      });  
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: "not found" });
  }
}
export const getSingleUser = async(req,res)=>{
  const id = req.params.id;
  try {
    const user = await User.findById(id).populate('followed');
    const followed = user.followed;
    const response = {
      success: true,
      data: followed
    }
    res.status(200).json(response);
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: error.message });
  }
}
import Carousel from '../models/Carousel.js';
import Genre from '../models/Genre.js';
import Slider from '../models/Slider.js';

/* createrCarousel */
export const createrCarousel = async (req, res) => {

  const newCarousel = new Carousel(req.body);
 
  try {
    const savedCarousel = await newCarousel.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully created",
        data: savedCarousel,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "failed to created try again" });
  }
};
/* updateCarousel */
export const updateCarousel = async(req,res)=>{

  const id = req.params.id;
  try {
    const updateCarousel = await Carousel.findByIdAndUpdate(id, {
      $set: req.body,
    }, {new: true});

    res
      .status(200)
      .json({
        success: true,
        message: "Successfully updated",
        data: updateCarousel,
      });
  } catch (error) {
    res
    .status(500)
    .json({ success: false, message: "failed to update" });
  }
}
/*deleteUser */
export const deleteCarousel = async(req,res)=>{
  const id = req.params.id;
  try {
    const deleteCarousel = await Carousel.findByIdAndDelete(id);

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
export const getAllCarousel = async(req,res)=>{

  try {
    const Carousels = await Carousel.find();
    res
      .status(200)
      .json({
        success: true,
        message: "Successful",
        data: Carousels,
      });  
  } catch (error) {
    res
    .status(404)
    .json({ success: false, message: error.message });
  }
}
export const createrGenre = async (req, res) => {

    const newGenre = new Genre(req.body);
   
    try {
      const savedGenre = await newGenre.save();
  
      res
        .status(200)
        .json({
          success: true,
          message: "Successfully created",
          data: savedGenre,
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "failed to created try again" });
    }
  };
  /* updateCarousel */
  export const updateGenre = async(req,res)=>{
  
    const id = req.params.id;
    try {
      const updateGenre = await Genre.findByIdAndUpdate(id, {
        $set: req.body,
      }, {new: true});
  
      res
        .status(200)
        .json({
          success: true,
          message: "Successfully updated",
          data: updateGenre,
        });
    } catch (error) {
      res
      .status(500)
      .json({ success: false, message: "failed to update" });
    }
  }
  /*deleteUser */
  export const deleteGenre = async(req,res)=>{
    const id = req.params.id;
    try {
      const deleteGenre = await Genre.findByIdAndDelete(id);
  
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
  export const getAllGenre = async(req,res)=>{
  
    try {
      const Genres = await Genre.find();
      res
        .status(200)
        .json({
          success: true,
          message: "Successful",
          data: Genres,
        });  
    } catch (error) {
      res
      .status(404)
      .json({ success: false, message: "not found" });
    }
  }
/* createrCarousel */
export const createrSlider = async (req, res) => {

    const newSlider = new Carousel(req.body);
   
    try {
      const savedSlider = await newSlider.save();
  
      res
        .status(200)
        .json({
          success: true,
          message: "Successfully created",
          data: savedSlider,
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "failed to created try again" });
    }
  };
  /* updateCarousel */
  export const updateSlider = async(req,res)=>{
  
    const id = req.params.id;
    try {
      const updateSlider = await Slider.findByIdAndUpdate(id, {
        $set: req.body,
      }, {new: true});
  
      res
        .status(200)
        .json({
          success: true,
          message: "Successfully updated",
          data: updateSlider,
        });
    } catch (error) {
      res
      .status(500)
      .json({ success: false, message: "failed to update" });
    }
  }
  /*deleteUser */
  export const deleteSlider = async(req,res)=>{
    const id = req.params.id;
    try {
      const deleteSlider = await Slider.findByIdAndDelete(id);
  
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
  export const getAllSlider = async(req,res)=>{
  
    try {
      const Sliders = await Slider.find();
      res
        .status(200)
        .json({
          success: true,
          message: "Successful",
          data: Sliders,
        });  
    } catch (error) {
      res
      .status(404)
      .json({ success: false, message: "not found" });
    }
  }
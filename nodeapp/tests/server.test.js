const userController = require('../controllers/userController');
const cropController = require('../controllers/cropController');
const agroChemicalController = require('../controllers/agroChemicalController');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { validateToken } = require('../authUtils');
const AgroChemical = require('../models/agroChemicalModel');
const Crop = require('../models/cropModel');


describe('User_Model_Test', () => {


  test('backend_usermodel_should_validate_a_user_with_missing_username', async () => {
    const invalidUserData = {
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_email', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_mobile', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_password', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_role', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });
});
describe('AgroChemical_Model_Test', () => {
  
  test('backend_agrochemical_model_should_validate_a_chemical_with_missing_name', async () => {
    const invalidChemicalData = {
      brand: 'DemoBrand',
      category: 'Fertilizer',
      description: 'A high-quality fertilizer',
      unit: 'kg',
      pricePerUnit: 12.5,
      image: 'imageurl'
    };

    const agroChemical = new AgroChemical(invalidChemicalData);

    await expect(agroChemical.validate()).rejects.toThrowError();
  });

  test('backend_agrochemical_model_should_validate_a_chemical_with_missing_brand', async () => {
    const invalidChemicalData = {
      name: 'DemoChemical',
      category: 'Fertilizer',
      description: 'A high-quality fertilizer',
      unit: 'kg',
      pricePerUnit: 12.5,
      image: 'imageurl'
    };

    const agroChemical = new AgroChemical(invalidChemicalData);

    await expect(agroChemical.validate()).rejects.toThrowError();
  });

  test('backend_agrochemical_model_should_validate_a_chemical_with_missing_category', async () => {
    const invalidChemicalData = {
      name: 'DemoChemical',
      brand: 'DemoBrand',
      description: 'A high-quality fertilizer',
      unit: 'kg',
      pricePerUnit: 12.5,
      image: 'imageurl'
    };

    const agroChemical = new AgroChemical(invalidChemicalData);

    await expect(agroChemical.validate()).rejects.toThrowError();
  });

  test('backend_agrochemical_model_should_validate_a_chemical_with_missing_description', async () => {
    const invalidChemicalData = {
      name: 'DemoChemical',
      brand: 'DemoBrand',
      category: 'Fertilizer',
      unit: 'kg',
      pricePerUnit: 12.5,
      image: 'imageurl'
    };

    const agroChemical = new AgroChemical(invalidChemicalData);

    await expect(agroChemical.validate()).rejects.toThrowError();
  });

  test('backend_agrochemical_model_should_validate_a_chemical_with_missing_unit', async () => {
    const invalidChemicalData = {
      name: 'DemoChemical',
      brand: 'DemoBrand',
      category: 'Fertilizer',
      description: 'A high-quality fertilizer',
      pricePerUnit: 12.5,
      image: 'imageurl'
    };

    const agroChemical = new AgroChemical(invalidChemicalData);

    await expect(agroChemical.validate()).rejects.toThrowError();
  });

  test('backend_agrochemical_model_should_validate_a_chemical_with_missing_pricePerUnit', async () => {
    const invalidChemicalData = {
      name: 'DemoChemical',
      brand: 'DemoBrand',
      category: 'Fertilizer',
      description: 'A high-quality fertilizer',
      unit: 'kg',
      image: 'imageurl'
    };

    const agroChemical = new AgroChemical(invalidChemicalData);

    await expect(agroChemical.validate()).rejects.toThrowError();
  });

  test('backend_agrochemical_model_should_validate_a_chemical_with_missing_image', async () => {
    const invalidChemicalData = {
      name: 'DemoChemical',
      brand: 'DemoBrand',
      category: 'Fertilizer',
      description: 'A high-quality fertilizer',
      unit: 'kg',
      pricePerUnit: 12.5
    };

    const agroChemical = new AgroChemical(invalidChemicalData);

    await expect(agroChemical.validate()).rejects.toThrowError();
  });
});
describe('Crop_Model_Test', () => {

  test('backend_crop_model_should_validate_a_crop_with_missing_cropName', async () => {
    const invalidCropData = {
      cropType: 'Vegetable',
      description: 'A green leafy vegetable.',
      plantingDate: new Date(),
      userId: new mongoose.Types.ObjectId()
    };

    const crop = new Crop(invalidCropData);

    await expect(crop.validate()).rejects.toThrowError();
  });

  test('backend_crop_model_should_validate_a_crop_with_missing_cropType', async () => {
    const invalidCropData = {
      cropName: 'Spinach',
      description: 'A green leafy vegetable.',
      plantingDate: new Date(),
      userId: new mongoose.Types.ObjectId()
    };

    const crop = new Crop(invalidCropData);

    await expect(crop.validate()).rejects.toThrowError();
  });

  test('backend_crop_model_should_validate_a_crop_with_missing_description', async () => {
    const invalidCropData = {
      cropName: 'Spinach',
      cropType: 'Vegetable',
      plantingDate: new Date(),
      userId: new mongoose.Types.ObjectId()
    };

    const crop = new Crop(invalidCropData);

    await expect(crop.validate()).rejects.toThrowError();
  });

  test('backend_crop_model_should_validate_a_crop_with_missing_plantingDate', async () => {
    const invalidCropData = {
      cropName: 'Spinach',
      cropType: 'Vegetable',
      description: 'A green leafy vegetable.',
      userId: new mongoose.Types.ObjectId()
    };

    const crop = new Crop(invalidCropData);

    await expect(crop.validate()).rejects.toThrowError();
  });

  test('backend_crop_model_should_validate_a_crop_with_missing_userId', async () => {
    const invalidCropData = {
      cropName: 'Spinach',
      cropType: 'Vegetable',
      description: 'A green leafy vegetable.',
      plantingDate: new Date()
    };

    const crop = new Crop(invalidCropData);

    await expect(crop.validate()).rejects.toThrowError();
  });

  test('backend_crop_model_should_validate_a_valid_crop', async () => {
    const validCropData = {
      cropName: 'Spinach',
      cropType: 'Vegetable',
      description: 'A green leafy vegetable.',
      plantingDate: new Date(),
      userId: new mongoose.Types.ObjectId()
    };

    const crop = new Crop(validCropData);

    await expect(crop.validate()).resolves.toBeUndefined();
  });

});
describe('getUserByEmailAndPassword_Test', () => {
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_200_status_code_when_user_found', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const user = {
      userName: 'TestUser',
      role: 'user',
      _id: new mongoose.Types.ObjectId()
    };
    User.findOne = jest.fn().mockResolvedValue(user);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

  });
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_404_status_code_when_user_not_found', async () => {
    const req = { 
      body: {   
        email: 'nonexistent@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockResolvedValue(null);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
describe('addUser_Test', () => {
  test('backend_add_user_in_usercontroller_should_return_200_status_code_when_user_added_successfully', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
        mobile:'9876543212'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockResolvedValue(req.body);

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_add_user_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
        mobile:'9876544321'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
describe('validateToken', () => {
 
  test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_invalidtoken', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue('invalidToken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the validateToken function
    validateToken(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_no_token', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue(null),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the validateToken function
    validateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
describe("crop_controller",()=>{
  test('backend_addcrop_should_return_200_status_code_when_crop_added_successfully', async () => {
    const req = {
      body: {
        cropName: 'Spinach',
        cropType: 'Vegetable',
        description: 'A leafy green vegetable.',
        plantingDate: new Date(),
        userId: new mongoose.Types.ObjectId()
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Crop.create = jest.fn().mockResolvedValue(req.body);

    await cropController.addCrop(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_addcrop_should_return_500_status_code_when_error_occurs', async () => {
    const req = {
      body: {
        cropName: 'Spinach',
        cropType: 'Vegetable',
        description: 'A leafy green vegetable.',
        plantingDate: new Date(),
        userId: new mongoose.Types.ObjectId()
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Crop.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await cropController.addCrop(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test('backend_getcropbyid_should_return_200_status_code_with_crop_data', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockCrop = { cropName: 'Spinach' };
    Crop.findById = jest.fn().mockResolvedValue(mockCrop);

    await cropController.getCropById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_getcropbyid_should_return_404_status_code_when_crop_not_found', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Crop.findById = jest.fn().mockResolvedValue(null);

    await cropController.getCropById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('backend_deletecrop_should_return_200_status_code_when_crop_deleted_successfully', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Crop.findByIdAndDelete = jest.fn().mockResolvedValue({});

    await cropController.deleteCrop(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_deletecrop_should_return_404_status_code_when_crop_not_found', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Crop.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await cropController.deleteCrop(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('backend_deletecrop_should_return_500_status_code_when_error_occurs', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    Crop.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await cropController.deleteCrop(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

})
describe('agrochemical_controller', () => {
  test('backend_addagrochemical_should_return_200_status_code_when_agrochemical_added_successfully', async () => {
    const req = {
      body: {
        name: 'Pesticide A',
        brand: 'Brand A',
        category: 'Pesticide',
        description: 'Effective pesticide for insects.',
        unit: 'Litre',
        pricePerUnit: 15.99,
        image: 'pesticide-a.jpg'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    AgroChemical.create = jest.fn().mockResolvedValue(req.body);

    await agroChemicalController.addAgroChemical(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_getagrochemicalbyid_should_return_200_status_code_with_agrochemical_data', async () => {
    const req = { params: { id: 'someid' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockAgroChemical = { name: 'Pesticide A', brand: 'Brand A' };
    AgroChemical.findById = jest.fn().mockResolvedValue(mockAgroChemical);

    await agroChemicalController.getAgroChemicalById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_getagrochemicalbyid_should_return_404_status_code_when_agrochemical_not_found', async () => {
    const req = { params: { id: 'someid' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    AgroChemical.findById = jest.fn().mockResolvedValue(null);

    await agroChemicalController.getAgroChemicalById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });


  test('backend_deleteagrochemical_should_return_200_status_code_when_agrochemical_deleted_successfully', async () => {
    const req = { params: { id: 'someid' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    AgroChemical.findByIdAndDelete = jest.fn().mockResolvedValue({});

    await agroChemicalController.deleteAgroChemical(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

});
const express = require('express');
const router = express.Router();
const Patient = require('../Model/Patientmodel');

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         identifier:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Identifier'
 *         active:
 *           type: boolean
 *         name:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Name'
 *         gender:
 *           type: string
 *           enum: [male, female, other, unknown]
 *         birthDate:
 *           type: string
 *           format: date
 *         address:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Address'
 *         telecom:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Telecom'
 *         maritalStatus:
 *           type: string
 *         age:
 *           type: integer
 *         text:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             div:
 *               type: string
 *       required:
 *         - birthDate
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Identifier:
 *       type: object
 *       properties:
 *         use:
 *           type: string
 *           enum: [usual, official, temp, secondary]
 *         type:
 *           type: object
 *           properties:
 *             coding:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   system:
 *                     type: string
 *                   code:
 *                     type: string
 *         system:
 *           type: string
 *         value:
 *           type: string
 *         period:
 *           type: object
 *           properties:
 *             start:
 *               type: string
 *               format: date
 *         assigner:
 *           type: object
 *           properties:
 *             display:
 *               type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Name:
 *       type: object
 *       properties:
 *         use:
 *           type: string
 *           enum: [usual, official, temp, nickname, anonymous, old, maiden]
 *         family:
 *           type: string
 *         given:
 *           type: array
 *           items:
 *             type: string
 *         period:
 *           type: object
 *           properties:
 *             start:
 *               type: string
 *               format: date
 *             end:
 *               type: string
 *               format: date
 *         suffix:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         use:
 *           type: string
 *           enum: [home, work, temp, old, billing]
 *         line:
 *           type: array
 *           items:
 *             type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         postalCode:
 *           type: string
 *         country:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Telecom:
 *       type: object
 *       properties:
 *         system:
 *           type: string
 *           enum: [phone, fax, email, pager, url, sms, other]
 *         value:
 *           type: string
 *         use:
 *           type: string
 *           enum: [home, work, temp, old, mobile]
 */

const toFhirPatient = (patient) => {
  console.log("Processing patient for FHIR conversion:", patient);

  const fhirPatient = {
    resourceType: "Patient",
    id: patient._id.toString(),
    text: {
      status: "generated",
      div: "<div>Patient information</div>"
    },
    identifier: patient.identifier ? patient.identifier.map(id => ({
      use: id.use,
      type: {
        coding: id.type && id.type.coding ? id.type.coding.map(code => ({
          system: "http://terminology.hl7.org/CodeSystem/v2-0203",
          code: code.code
        })) : []
      },
      system: "urn:oid:1.2.36.146.595.217.0.1",
      value: id.value,
      period: id.period ? { start: id.period.start } : null,
      assigner: id.assigner ? { display: id.assigner.display } : null
    })) : [],
    active: patient.active,
    name: patient.name ? patient.name.map(name => ({
      use: name.use,
      family: name.family,
      given: name.given || [],
      period: name.period || {},
      suffix: name.suffix || []
    })) : [],
    gender: patient.gender,
    birthDate: patient.birthDate,
    address: patient.address.map(address => ({
      use: address.use,
      line: address.line,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country
    })),
    telecom: patient.telecom.map(telecom => ({
      system: telecom.system,
      value: telecom.value,
      use: telecom.use
    })),
    maritalStatus: patient.maritalStatus,
    age: patient.age
  };

  console.log("Generated FHIR patient:", fhirPatient);

  return fhirPatient;
};
/**
 * @swagger
 * /api/patient:
 *   post:
 *     summary: Create a new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Name'
 *               gender:
 *                 type: string
 *                 enum: [male, female, other, unknown]
 *               birthDate:
 *                 type: string
 *                 format: date
 *               address:
 *                 $ref: '#/components/schemas/Address'
 *               telecom:
 *                 $ref: '#/components/schemas/Telecom'
 *               maritalStatus:
 *                 type: string
 *               age:
 *                 type: integer
 *             required:
 *               - name
 *               - gender
 *               - birthDate
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


router.post('/patient', async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { name, address, telecom, maritalStatus, age, gender, birthDate } = req.body;

    // Check for required fields
    if (!name || !name[0] || typeof name[0].family !== 'string') {
      throw new Error("Name is required and must be a string");
    }

    // Check for valid gender
    // const validGenders = ["male", "female", "other", "unknown"];
    // if (!validGenders.includes(gender)) {
    //   throw new Error("Invalid gender");
    // }

    // Process the name field to ensure it matches FHIR format
    const processedName = {
      use: name[0].use || 'official',
      family: name[0].family,
      given: name[0].given || [],
      period: name[0].period || {},
      suffix: name[0].suffix || []
    };

    // Generate identifier for the patient
    const identifier = generateIdentifier(); // Function to generate a unique identifier

    // Create a new patient from request body
    const newPatient = new Patient({
      identifier: [{
        use: 'official',
        type: {
          coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: 'MR' }]
        },
        system: 'urn:oid:1.2.36.146.595.217.0.1',
        value: identifier,
        period: { start: new Date() }, // Add start date for period
        assigner: { display: 'Assigner Name' } // Add assigner's display name
      }],
      active: true,
      name: [processedName], // Set the processed names field
      gender: gender,
      birthDate: birthDate,
      address: [address],
      telecom: [telecom],
      maritalStatus,
      age,
      text: {
        status: "generated",
        div: "<div>Patient information</div>"
      }
    });

    // Save the patient to the database
    const savedPatient = await newPatient.save();

    // Convert to FHIR format
    const fhirPatient = toFhirPatient(savedPatient);
    console.log("Converted FHIR patient:", fhirPatient);

    // Send response
    res.status(201).json(fhirPatient);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ message: error.message });
  }
});


// Function to generate a unique identifier
function generateIdentifier() {
  // Generate a random string for simplicity (you can implement your own logic)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let identifier = '';
  for (let i = 0; i < 10; i++) {
    identifier += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return identifier;
}
/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

// Get all Patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       '404':
 *         description: Patient not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


// Get a Patient by ID
router.get('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send();
    }
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});
/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Patient not found
 */

router.put('/patients/:id', async (req, res) => {
  try {
    const patientUpdates = req.body;
    
    // Handle updating nested fields in arrays
    const updateOperations = {};
    if (patientUpdates.address) {
      for (const [nestedKey, nestedValue] of Object.entries(patientUpdates.address)) {
        updateOperations[`address.0.${nestedKey}`] = nestedValue;
      }
    }
    if (patientUpdates.telecom) {
      for (const [nestedKey, nestedValue] of Object.entries(patientUpdates.telecom)) {
        updateOperations[`telecom.0.${nestedKey}`] = nestedValue;
      }
    }

    // Handle other fields
    for (const [key, value] of Object.entries(patientUpdates)) {
      if (key !== 'address' && key !== 'telecom') {
        updateOperations[key] = value;
      }
    }

    // Update the patient with the new fields
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: updateOperations },
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const fhirPatient = toFhirPatient(updatedPatient);
    res.status(200).json(fhirPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Given Patient Id Details Deleted Successfully
 *       '404':
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: GIVEN patient ID not found
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

// Delete a Patient by ID
router.delete('/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'GIVEN patient ID not found' });
    }
    res.status(200).json({
      message: "Given Patient Id Details Deleted Successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
    }
    });
    
     
    module.exports = router;

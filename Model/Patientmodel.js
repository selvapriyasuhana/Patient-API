// const mongoose = require('mongoose');

// const identifierSchema = new mongoose.Schema({
//   use: String,
//   type: {
//     coding: [{
//       system: String,
//       code: String,
//       display: String
//     }],
//     text: String
//   },
//   system: String,
//   value: String,
//   period: {
//     start: Date,
//     end: Date
//   },
//   assigner: {
//     display: String
//   }
// });

// const humanNameSchema = new mongoose.Schema({
//   use: String,
//   text: String,
//   family: String,
//   given: [String],
//   prefix: [String],
//   suffix: [String],
//   period: {
//     start: Date,
//     end: Date
//   }
// });

// const addressSchema = new mongoose.Schema({
//   use: String,
//   type: String,
//   text: String,
//   line: [String],
//   city: String,
//   district: String,
//   state: String,
//   postalCode: String,
//   country: String,
//   period: {
//     start: Date,
//     end: Date
//   }
// });

// const patientSchema = new mongoose.Schema({
//   resourceType: {
//     type: String,
//     default: 'Patient'
//   },
//   identifier: [identifierSchema],
//   active: Boolean,
//   name: [humanNameSchema],
//   telecom: [{
//     system: String,
//     value: String,
//     use: String,
//     rank: Number,
//     period: {
//       start: Date,
//       end: Date
//     }
//   }],
//   gender: String,
//   birthDate: Date,
//   deceasedBoolean: Boolean,
//   deceasedDateTime: Date,
//   address: [addressSchema],
//   maritalStatus: {
//     coding: [{
//       system: String,
//       code: String,
//       display: String
//     }],
//     text: String
//   },
//   contact: [{
//     relationship: [{
//       coding: [{
//         system: String,
//         code: String,
//         display: String
//       }],
//       text: String
//     }],
//     name: humanNameSchema,
//     telecom: [{
//       system: String,
//       value: String,
//       use: String,
//       rank: Number,
//       period: {
//         start: Date,
//         end: Date
//       }
//     }],
//     address: addressSchema,
//     gender: String,
//     organization: {
//       display: String
//     },
//     period: {
//       start: Date,
//       end: Date,
      
//     }
//   }]
// });

// const Patient = mongoose.model('Patient', patientSchema);

// module.exports = Patient;
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Define the FHIR Patient schema
// const patientSchema = new Schema({
//     resourceType: {
//         type: String,
//         required: true,
//         enum: ['Patient'],
//         default: 'Patient'
//     },
//     id: {
//         type: String,
       
//         unique: true
//     },
//     text: {
//         status: { type: String, enum: ['generated', 'extensions'] },
//         div: { type: String }
//     },
//     identifier: [{
//         use: { type: String, enum: ['usual', 'official', 'temp', 'secondary', 'old'] },
//         type: {
//             coding: [{
//                 system: { type: String },
//                 code: { type: String },
//                 display: { type: String }
//             }],
//             text: { type: String }
//         },
//         system: { type: String },
//         value: { type: String },
//         period: {
//             start: { type: Date },
//             end: { type: Date }
//         },
//         assigner: {
//             display: { type: String }
//         }
//     }],
//     active: { type: Boolean, default: true },
//     name: [{
//         use: { type: String, enum: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'] },
//         text: { type: String },
//         family: { type: String },
//         given: [String],
//         prefix: [String],
//         suffix: [String],
//         period: {
//             start: { type: Date },
//             end: { type: Date }
//         }
//     }],
//     telecom: [{
//         system: { type: String, enum: ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other'] },
//         value: { type: String },
//         use: { type: String, enum: ['home', 'work', 'temp', 'old', 'mobile'] },
//         rank: { type: Number },
//         period: {
//             start: { type: Date },
//             end: { type: Date }
//         }
//     }],
//     gender: { type: String, enum: ['male', 'female', 'other', 'unknown'] },
//     birthDate: { type: Date },
//     deceasedBoolean: { type: Boolean },
//     deceasedDateTime: { type: Date },
//     address: [{
//         use: { type: String, enum: ['home', 'work', 'temp', 'old', 'billing'] },
//         type: { type: String, enum: ['postal', 'physical', 'both'] },
//         text: { type: String },
//         line: [String],
//         city: { type: String },
//         district: { type: String },
//         state: { type: String },
//         postalCode: { type: String },
//         country: { type: String },
//         period: {
//             start: { type: Date },
//             end: { type: Date }
//         }
//     }],
//     maritalStatus: {
//         coding: [{
//             system: { type: String },
//             code: { type: String },
//             display: { type: String }
//         }],
//         text: { type: String }
//     },
//     multipleBirthBoolean: { type: Boolean },
//     multipleBirthInteger: { type: Number },
//     photo: [{
//         contentType: { type: String },
//         data: { type: String },
//         url: { type: String },
//         size: { type: Number },
//         hash: { type: String },
//         title: { type: String },
//         creation: { type: Date }
//     }],
//     contact: [{
//         relationship: [{
//             coding: [{
//                 system: { type: String },
//                 code: { type: String },
//                 display: { type: String }
//             }],
//             text: { type: String }
//         }],
//         name: {
//             use: { type: String, enum: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'] },
//             text: { type: String },
//             family: { type: String },
//             given: [String],
//             prefix: [String],
//             suffix: [String],
//             period: {
//                 start: { type: Date },
//                 end: { type: Date }
//             }
//         },
//         telecom: [{
//             system: { type: String, enum: ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other'] },
//             value: { type: String },
//             use: { type: String, enum: ['home', 'work', 'temp', 'old', 'mobile'] },
//             rank: { type: Number },
//             period: {
//                 start: { type: Date },
//                 end: { type: Date }
//             }
//         }],
//         address: {
//             use: { type: String, enum: ['home', 'work', 'temp', 'old', 'billing'] },
//             type: { type: String, enum: ['postal', 'physical', 'both'] },
//             text: { type: String },
//             line: [String],
//             city: { type: String },
//             district: { type: String },
//             state: { type: String },
//             postalCode: { type: String },
//             country: { type: String },
//             period: {
//                 start: { type: Date },
//                 end: { type: Date }
//             }
//         },
//         gender: { type: String, enum: ['male', 'female', 'other', 'unknown'] },
//         organization: {
//             display: { type: String }
//         },
//         period: {
//             start: { type: Date },
//             end: { type: Date }
//         }
//     }],
//     communication: [{
//         language: {
//             coding: [{
//                 system: { type: String },
//                 code: { type: String },
//                 display: { type: String }
//             }],
//             text: { type: String }
//         },
//         preferred: { type: Boolean }
//     }],
//     generalPractitioner: [{
//         reference: { type: String },
//         display: { type: String }
//     }],
//     managingOrganization: {
//         reference: { type: String },
//         display: { type: String }
//     },
//     link: [{
//         other: {
//             reference: { type: String },
//             display: { type: String }
//         },
//         type: { type: String, enum: ['replaced-by', 'replaces', 'refer', 'seealso'] }
//     }]
// }, { timestamps: true });

// // Create and export the Patient model
// const Patient = mongoose.model('Patient', patientSchema);
// module.exports = Patient;
const mongoose = require('mongoose');

const IdentifierSchema = new mongoose.Schema({
  use: { type: String, enum: ['usual', 'official', 'temp', 'secondary'], default: 'usual' },
  type: {
    coding: [
      {
        system: { type: String, default: 'http://terminology.hl7.org/CodeSystem/v2-0203' },
        code: { type: String }
      }
    ]
  },
  system: { type: String,  },
  value: { type: String },
  period: {
    start: { type: Date }
  },
  assigner: {
    display: { type: String }
  }
}, { _id: false });

// const NameSchema = new mongoose.Schema({
//   use: { type: String, enum: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'], default: 'official' },
//   family: { type: String },
//   given: { type: [String] }
// }, { _id: false });
const NameSchema = new mongoose.Schema({
  use: { type: String, enum: ['usual', 'official', 'temp', 'nickname', 'anonymous', 'old', 'maiden'], default: 'official' },
  family: { type: String },
  given: { type: [String] },
  period: {
    start: { type: Date },
    end: { type: Date }
  },
  suffix: { type: [String] }
}, { _id: false });


const AddressSchema = new mongoose.Schema({
  use: { type: String, enum: ['home', 'work', 'temp', 'old', 'billing'], default: 'home' },
  line: { type: [String] },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String }
}, { _id: false });

const TelecomSchema = new mongoose.Schema({
  system: { type: String, enum: ['phone', 'fax', 'email', 'pager', 'url', 'sms', 'other'], default: 'phone' },
  value: { type: String },
  use: { type: String, enum: ['home', 'work', 'temp', 'old', 'mobile'], default: 'home' }
}, { _id: false });

const PatientSchema = new mongoose.Schema({
  identifier: [IdentifierSchema],
  active: { type: Boolean, default: true },
  name: [NameSchema],
  gender: { type: String, enum: ['male', 'female', 'other', 'unknown'],  },
  birthDate: { type: Date, required: true },
  address: [AddressSchema],
  telecom: [TelecomSchema],
  maritalStatus: { type: String },
  age: { type: Number },
  text: {
    status: { type: String, default: 'generated' },
    div: { type: String, default: '<div>Patient information</div>' }
  }
});

module.exports = mongoose.model('Patient', PatientSchema);


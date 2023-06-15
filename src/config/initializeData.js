const Dog = require("../models/dog");

const initializeData = async () => {
  try {
    const existingData = await Dog.findOne();

    // If there is existing data, do not insert the initial data
    if (existingData) {
      console.log(
        "Data already exists in the table. Skipping data initialization."
      );
      return;
    }

    // Data to be inserted
    const dogsData = [
      { name: "Neo", color: "red&amber", tail_length: 22, weight: 32 },
      { name: "Jessy", color: "black&white", tail_length: 7, weight: 14 },
    ];

    // Insert data into the database
    await Dog.bulkCreate(dogsData);

    console.log("Initial data inserted successfully!");
  } catch (error) {
    console.error("Error inserting initial data:", error);
    throw error;
  }
};

module.exports = initializeData;

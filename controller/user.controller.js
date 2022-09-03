const ObjectId = require('mongodb').ObjectId;
const dbConnect = require("../utils/dbConnect");

// mongoDB connection 
const client = dbConnect();
const database = client.db("random_user");
const collectionUsers = database.collection('users');



// get random values 
function getRandom(input) {
    return input[Math.floor((Math.random() * input.length))];
}

// random select gender 
const randomGender = () => {
    const gender = ['male', 'female'];
    return getRandom(gender);
}

// random name select 
const randomName = () => {
    if (randomGender() === 'male') {
        return randomMaleName();
    }
    else {
        return randomFemaleName();
    }
}

// random male and female nam generator 
const randomMaleName = () => {
    const maleName = ['Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Theodore', 'Jack', 'Levi', 'Alexander', 'Jackson', 'Mated', 'Daniel', 'Michael', 'Mason', 'Sebastian', 'Ethan'];
    return getRandom(maleName);
}
const randomFemaleName = () => {
    const femaleName = ['Olivia', 'Emma', 'Charlotte', 'Amelia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Evelyn', 'Harper', 'Luna', 'Camilla', 'Dianna', 'Elizabeth', 'Eleanor', 'Ella', 'Abigail', 'Sofia', 'Avery', 'Scarlet'];
    return getRandom(femaleName);
}

// random user id generator 
const randomID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

//   random contact generator 
const randomContact = () => {
    const operators = ['016', '015', '017', '019', '018', '014'];
    const operator = getRandom(operators);
    return operator + Math.floor(Math.random() * 1000000000);
}

// random address generator 
// like ('34343,F street,Riyadh,East State,99625')
const randomAddress = () => {
    const streetNumbers = ['25489', '87459', '35478', '15975', '95125', '78965', '23435', '34343', '67763'];
    const streetNames = ['A street', 'B street', 'C street', 'D street', 'E street', 'F street'];
    const cityNames = ['Riyadh', 'Dammam', 'Jedda', 'Tabouk', 'Makka', 'Maddena', 'Haiel', 'Dhaka', 'Turkish'];
    const stateNames = ['Qassem State', 'North State', 'East State', 'South State', 'West State'];
    const zipCodes = ['28889', '96459', '35748', '15005', '99625', '71465', '24579', '24943', '27915', '57943'];

    return `${getRandom(streetNumbers)}, ${getRandom(streetNames)}, ${getRandom(cityNames)}, ${getRandom(stateNames)}, ${getRandom(zipCodes)}`;
}

// random photo url with size

// https://source.unsplash.com/user/c_v_r/1600x900.jpg
// https://source.unsplash.com/user/c_v_r/1600x900.webp
// https://picsum.photos/200/300
// https://picsum.photos/100.jpg
// https://picsum.photos/100.webp

const randomNumber = () => {
    return Math.floor(Math.random() * 10) + '00';
}
const randomPhotoUrl = () => {
    const urls = ['https://picsum.photos', 'https://source.unsplash.com'];
    const formate = ['.jpg', '.png', '.webp', ''];
    const url = getRandom(urls);
    const photoRange = randomNumber();
    if (url === 'https://picsum.photos') {
        return `https://picsum.photos/${photoRange}/${photoRange}${getRandom(formate)}`;
    }
    else {
        return `https://source.unsplash.com/user/c_v_r/${photoRange}x${photoRange}${getRandom(formate)}`;
    }
}

// ========================== get random user ===========================
module.exports.getRandomUser = (req, res) => {
    res.status(200).send({
        success: true,
        messages: "Success",
        data: {
            "Id": randomID(),
            "gender": randomGender(),
            "name": randomName(),
            "contact": randomContact(),
            "address": randomAddress(),
            "photoUrl": randomPhotoUrl()
        }
    })
}

// ================================ Mongodb operation ==================================
module.exports.defaultRoute = async(req, res) =>{
    res.send(`server is running on route ${req.url}`);
}
// ========================== save/insert a new user ===========================
module.exports.saveUser = async (req, res) => {
    const newUser = req.body;
    let err = '';
    Object.keys(newUser).forEach(key => {
        if (!newUser[key]) {
            // res.send(`please fill-up this field. ${key}`);
            err = key;
        }
    });
    if (err) {
        res.status(200).send({
            success: false,
            messages: "fail! Found error, please fullfil this field",
            field: `${err}`
        })
    }
    else {
        const result = await collectionUsers.insertOne(newUser);
        res.status(200).send({
            success: true,
            messages: "Save new user successfully.",
            response: result
        })
    }
}

// ========================== get all users with limit ===========================
module.exports.getAllUser = async (req, res) => {
    const { limit } = await req.query;
    console.log(limit);
    const users = await collectionUsers.find({}).toArray();
    const limitedUsers = users.slice(0, limit ? limit : users.length);
    res.status(200).send({
        success: true,
        messages: "Successfully got the users.",
        length: limitedUsers.length,
        data: limitedUsers,
    })
}

// ========================== update a user using id ===========================
module.exports.updateUser = async (req, res) => {
    const id = req.params.updateId;
    if (id.length === 24) {
        const filter = { _id: ObjectId(id) };
        let oldData = await collectionUsers.findOne(filter);
        const newData = req.body;
        if (oldData) {
            // console.log(newData);
            const updateData = {
                $set: oldData[id] = {
                    ...oldData[id],
                    ...newData,
                },
            };
            const result = await collectionUsers.updateOne(filter, updateData, { upsert: true });
            if (result.modifiedCount === 1) {
                res.status(200).send({
                    success: true,
                    messages: "Successfully updated user.",
                    response: result,
                })
            }
        }
        else {
            res.status(200).send({
                success: false,
                messages: "Can't found user. Please enter valid user ID with length must be 24.",
            })
        }
    }
    else {
        res.status(200).send({
            success: false,
            messages: "Fail !. Please enter valid user ID with length must be 24.",
        })
    }
}

// ========================== get all users with limit ===========================
module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    if (id.length === 24) {
        const query = { _id: ObjectId(id) };
        const result = await collectionUsers.deleteOne(query);
        if (result.deletedCount === 1) {
            res.status(200).send({
                success: true,
                messages: "Successfully deleted a user.",
                response: result,
                userId: id,
            })
        }
        else {
            res.status(200).send({
                success: false,
                messages: "Can't found user. Please enter valid user ID with length must be 24.",
            })
        }

    }
    else {
        res.status(200).send({
            success: false,
            messages: "Fail !. Please enter valid user ID with length must be 24.",
        })
    }

}


// ========================== get all users with limit ===========================
module.exports.bulkUpdate = async (req, res) => {
    const getData = req.body;
    const keys = Object.keys(getData);
    const property = keys[1];
    const values = Object.values(getData);
    const value1 = values[0];
    const updateValues = values[1];
    
    // res.send(value1);
    if (value1) {
        let updateResult = {};
        let errors = 0;
        for (i = 0; i < value1.length; i++) {
            let id = await value1[i];

            if (id.length === 24) {
                const filter = { _id: ObjectId(id) };
                let oldData = await collectionUsers.findOne(filter);
                const newData = await updateValues[i];
                if (oldData) {
                    // console.log(newData);
                    const updateData = {
                        $set: {
                            [property]: newData,
                        }
                    }
                    const result = await collectionUsers.updateOne(filter, updateData, { upsert: true });
                    if (result.modifiedCount === 1) {
                        updateResult = result;
                    }
                }
                else{
                    errors = errors + 1;
                }
            }
            else{
                errors = errors + 1;
            }
        }

        if (updateResult) {
            res.status(200).send({
                success: true,
                messages: "Successfully updated user.",
                modifiedCount: updateResult.modifiedCount,
                error: errors,
            })
        }
        else{
            res.status(200).send({
                success: false,
                messages: "Can't found user. Please enter valid user ID with length must be 24.",
                error: errors,
            })
        }
    }
}

